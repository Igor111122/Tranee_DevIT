class Queue {
    constructor(maxRunningThreads) {
        this.maxRunningThreads = maxRunningThreads;
        this.tasks = [];
        this.status = "stopped"; // Установим начальное состояние "stopped"
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

    async add(task) {
        this.tasks.push(task);
        await this.loop(); // Дождитесь выполнения цикла перед добавлением следующей задачи
    }

    async loop() {
        if (this.status === "running" && this.runningThreads < this.maxRunningThreads) {
            const task = this.tasks.shift();
            if (task) {
                this.runningThreads++;
                try {
                    await task();
                } catch (error) {
                    console.error(error);
                } finally {
                    this.runningThreads--;
                    await this.loop(); // Запускаем следующую задачу
                }
            }
        }
    }
}

// Пример использования
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let myQueue = new Queue(3);

myQueue.run();

myQueue.add(async () => {
    console.log("Task 1 started");
    await delay(1000);
    console.log("Task 1 completed");
});

myQueue.add(async () => {
    console.log("Task 2 started");
    await delay(100);
    console.log("Task 2 completed");
});

myQueue.add(async () => {
    console.log("Task 3 started");
    await delay(200);
    console.log("Task 3 completed");
});
