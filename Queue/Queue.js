class Queue {
    constructor(maxRunningThreads) {
        this.maxRunningThreads = maxRunningThreads;
        this.tasks = [];
        this.status = "stopped";
        this.runningThreads = 0;
    }

    run() {
        this.status = "running";
        this.loop();
    }

    stop() {
        this.status = "stopped";
    }

    pause() {
        this.status = "paused";
    }

    async add(task, onresolve, onreject, priority, numTask = 0) {
        // Create an object that includes the task function, onresolve, and onreject
        const taskObject = { task, onresolve, onreject };
        
        if (Math.random() < priority ? 0 : 1) {
            this.tasks.unshift(taskObject); // Add the task to the front of the queue
            priority = 1;
        } else {
            this.tasks.push(taskObject); // Add the task to the end of the queue
            priority = 0;
        }
        console.log(`Task №${numTask} has priority ${priority}`);

        await this.loop();
    }

    onFinish() {
        console.log("All tasks are completed");
    }

    async loop() {
        if (this.status === "running" && this.runningThreads < this.maxRunningThreads) {
            const taskObject = this.tasks.shift(); // Get the next task object from the queue
            if (taskObject) {
                this.runningThreads++;
                const { task, onresolve, onreject } = taskObject;

                try {
                    await task(); // Execute the task (it's assumed to be an asynchronous function)
                    if (onresolve) {
                        onresolve(); // Call onresolve callback on task success
                    }
                } catch (error) {
                    console.error(error);
                    if (onreject) {
                        onreject(error); // Call onreject callback on task failure
                    }
                } finally {
                    this.runningThreads--;
                    if (this.runningThreads === 0 && this.tasks.length === 0) {
                        this.onFinish();
                    }
                    await this.loop();
                }
            }
        }
    }
}

// Example usage
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let myQueue = new Queue(2);

myQueue.add(
    async () => {
        console.log("Task 1 started");
        await delay(1000);
        console.log("Task 1 completed");
    },
    () => {
        console.log("Task 1 resolved");
    },
    (error) => {
        console.error("Task 1 rejected: " + error);
    },
    Math.random(),
    1
);


myQueue.add(
    async () => {
        console.log("Task 2 started");
        await delay(100);
        console.log("Task 2 completed");
    },
    () => {
        console.log("Task 2 resolved");
    },
    (error) => {
        console.error("Task 2 rejected: " + error);
    },
    Math.random(),
    2
);

myQueue.add(
    async () => {
        console.log("Task 3 started");
        await delay(200);
        console.log("Task 3 completed");
    },
    () => {
        console.log("Task 3 resolved");
    },
    (error) => {
        console.error("Task 3 rejected: " + error);
    },
    Math.random(),
    3
);
// Add more tasks with onresolve and onreject as needed

myQueue.run();
