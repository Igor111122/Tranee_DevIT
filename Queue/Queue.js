// Define a class called Queue to manage asynchronous tasks with a limited number of running threads.
class Queue {
    constructor(maxRunningThreads) {
        this.maxRunningThreads = maxRunningThreads; // Maximum number of concurrently running threads.
        this.tasks = []; // An array to store tasks.
        this.status = "stopped"; // The status of the queue.
        this.runningThreads = 0; // Number of currently running threads.
    }

    // Method to start the queue and begin processing tasks.
    run() {
        this.status = "running"; // Set the status to "running".
        this.loop(); // Start the task processing loop.
    }

    // Method to stop the queue and clear all tasks.
    stop() {
        this.status = "stopped"; // Set the status to "stopped".
        this.tasks = []; // Clear the task queue.
    }

    // Method to pause the queue.
    pause() {
        this.status = "paused"; // Set the status to "paused".
    }

    // Method to add a new task to the queue.
    async add(task, onresolve, onreject, priority, numTask = 0) {
        // Create an object that includes the task function, onresolve, onreject, and a randomly generated priority.
        const taskObject = { task, onresolve, onreject, priority };
        this.tasks.push(taskObject); // Add the task to the task queue.
        console.log(`Task №${numTask} has priority ${taskObject.priority}`);

        await this.loop(); // Start processing the task queue.
    }

    // Method to handle the completion of all tasks.
    onFinish() {
        console.log("All tasks are completed");
    }

    // Method to process tasks from the queue.
    async loop() {
        if (this.status === "running" && this.runningThreads < this.maxRunningThreads) {
            // Find the first task that meets the condition based on priority and a random number.
            let taskIndex = this.tasks.findIndex(taskObj => Math.random() * 100 < taskObj.priority);
            if (taskIndex === -1) {
                taskIndex = this.tasks.findIndex(taskObj => Math.random() * 100 > taskObj.priority);
            }

            if (taskIndex !== -1) {
                this.runningThreads++; // Increment the count of running threads.
                const taskObject = this.tasks[taskIndex];
                const { task, onresolve, onreject } = taskObject;

                try {
                    await task(); // Execute the task asynchronously.
                    if (onresolve) {
                        onresolve(() => {
                            console.log("Run callback");
                        });
                    }
                } catch (error) {
                    console.error(error);
                    if (onreject) {
                        onreject(error);
                    }
                } finally {
                    this.runningThreads--; // Decrement the count of running threads.
                    this.tasks.splice(taskIndex, 1); // Remove the completed task from the queue.

                    if (this.runningThreads === 0 && this.tasks.length === 0) {
                        this.onFinish(); // If there are no running threads and no tasks left, call onFinish.
                    }
                    await this.loop(); // Continue processing tasks.
                }
            }
        }
    }
}

// Example usage of the Queue class.
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let myQueue = new Queue(2); // Create a queue with a maximum of 2 running threads.

// Add three tasks to the queue with different priorities and callbacks.
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
    Math.floor(Math.random() * 101),
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
    Math.floor(Math.random() * 101),
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
    Math.floor(Math.random() * 101),
    3
);

myQueue.run(); // Start processing tasks in the queue.
