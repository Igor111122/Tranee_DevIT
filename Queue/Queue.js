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
        this.tasks = [];
    }

    pause() {
        this.status = "paused";
    }

    async add(task, onresolve, onreject, priority, numTask = 0) {
        // Create an object that includes the task function, onresolve, onreject, and a randomly generated priority
        const taskObject = { task, onresolve, onreject, priority};
        this.tasks.push(taskObject);
        console.log(`Task №${numTask} has priority ${taskObject.priority}`);

        await this.loop();
    }

    onFinish() {
        console.log("All tasks are completed");
    }

    async loop() {
        if (this.status === "running" && this.runningThreads < this.maxRunningThreads) {
            // Find the first task that meets the condition based on priority and a random number
            let taskIndex = this.tasks.findIndex(taskObj => Math.random() * 100 < taskObj.priority);
            if(taskIndex === -1 ){ taskIndex = this.tasks.findIndex(taskObj => Math.random() * 100 > taskObj.priority);}

            if (taskIndex !== -1) {
                this.runningThreads++;
                const taskObject = this.tasks[taskIndex];
                const { task, onresolve, onreject } = taskObject;

                try {
                    await task();
                    if (onresolve) {
                        onresolve(()=>{console.log("Run callback")});
                    }
                } catch (error) {
                    console.error(error);
                    if (onreject) {
                        onreject(error);
                    }
                } finally {
                    this.runningThreads--;
                    this.tasks.splice(taskIndex, 1);

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
    (fn) => {
        fn();
    },
    (error) => {
        console.error("Task 1 rejected: " + error);
    },
    Math.floor(Math.random() * 101),1
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
    Math.floor(Math.random() * 101),2
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
    Math.floor(Math.random() * 101),3
);

myQueue.run();
