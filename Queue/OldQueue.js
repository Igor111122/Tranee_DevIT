class Queue {
    constructor(maxRunningThreads) {
        this.maxRunningThreads = maxRunningThreads; // Maximum number of tasks that can run simultaneously
        this.tasks = []; // Queue for storing tasks
        this.status = "stopped"; // Set the initial state to "stopped"
        this.runningThreads = 0; // Number of currently running tasks
    }
    
    run() {
        this.status = "running"; // Change the state to "running"
        this.loop(); // Start processing tasks
    }

    stop() {
        this.status = "stopped"; // Change the state to "stopped"
        this.tasks = []; // Clear the task queue
    }

    pause() {
        this.status = "paused"; // Change the state to "paused"
    }

    async add(task, priority, numTask = 0) {
        // Determine the task's position in the queue based on its priority
        if (Math.random() < priority ? 0 : 1) {
            this.tasks.unshift(task); // Add the task to the front of the queue
            priority = 1; // Update the priority value for logging
        } else {
            this.tasks.push(task); // Add the task to the end of the queue
            priority = 0; // Update the priority value for logging
        }
        console.log(`Task №${numTask} has priority ${priority}`);

        await this.loop(); // Wait for the current loop to complete before adding more tasks
    }

    onFinish() {
        console.log("All tasks are completed"); // Function to be called when all tasks have finished
    }

    async loop() {
        if (this.status === "running" && this.runningThreads < this.maxRunningThreads) {
            const task = this.tasks.shift(); // Get the next task from the queue
            if (task) {
                this.runningThreads++; // Increment the count of running tasks
                try {
                    await task(); // Execute the task (it's assumed to be an asynchronous function)
                } catch (error) {
                    console.error(error); // Log any errors that occur during task execution
                } finally {
                    this.runningThreads--; // Decrement the count of running tasks
                    // Check if all tasks have finished, then call the onFinish function
                    if (this.runningThreads === 0 && this.tasks.length === 0) {
                        this.onFinish();
                    }
                    await this.loop(); // Start the next task in the queue
                }
            }
        }
    }
}

// Example usage
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let myQueue = new Queue(2); // Create a Queue instance with a maximum of 2 concurrent tasks

myQueue.add(async () => {
    console.log("Task 1 started");
    await delay(1000); // Simulate a delay of 1000ms
    console.log("Task 1 completed");
}, Math.random(), 1);

myQueue.add(async () => {
    console.log("Task 2 started");
    await delay(100); // Simulate a delay of 100ms
    console.log("Task 2 completed");
}, Math.random(), 2);

myQueue.add(async () => {
    console.log("Task 3 started");
    await delay(200); // Simulate a delay of 200ms
    console.log("Task 3 completed");
}, Math.random(), 3);

myQueue.run(); // Start processing the tasks
