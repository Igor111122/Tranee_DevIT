class Queue {
    constructor(maxRunningThreads) {
        this.maxRunningThreads = maxRunningThreads;
        this.tasks = [];
        this.status = "stopped";
        this.runningThreads = 0;
    }

    async run() {
        if (this.status === "stopped") {
            this.status = "running";
            await this.loop();
        }
    }

    stop() {
        this.status = "stopped";
    }

    pause() {
        this.status = "paused";
    }

    async add(task) {
        this.tasks.push(task);
        if (this.status === "running") {
            await this.loop();
        }
    }

    async loop() {
        while (this.status === "running" && this.tasks.length > 0 && this.runningThreads < this.maxRunningThreads) {
            const task = this.tasks.shift();
            this.runningThreads++;

            try {
                if (typeof task === "function") {
                    await task();
                } else if (task instanceof Promise) {
                    await task;
                } else if (typeof task === "object" && typeof task.then === "function") {
                    await task;
                }
            } catch (error) {
                console.error("Task execution error:", error);
            } finally {
                this.runningThreads--;
            }
        }
    }
}

// Пример использования
const myQueue = new Queue(2);

async function asyncTask1() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Async Task 1 completed.");
}

function syncTask2() {
    console.log("Sync Task 2 completed.");
}

const promiseTask3 = new Promise(resolve => {
    setTimeout(() => {
        console.log("Promise Task 3 completed.");
        resolve();
    }, 1500);
});

myQueue.run();

myQueue.add(asyncTask1);
myQueue.add(syncTask2);
myQueue.add(promiseTask3);
