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

    async add(task, priority, numTusk = 0) {
        if(Math.random() < priority ? 0 : 1){
            this.tasks.unshift( task );
            priority=1
        }
        else{this.tasks.push( task );
            priority =0
        }
        console.log(`Task №${numTusk} has priority ${priority}`);
         // Добавляем задачу и её приоритет в очередь
        //this.tasks.sort((a, b) => b.priority - a.priority); // Сортируем задачи по убыванию приоритета
        await this.loop();
    }

    onFinish(){
        console.log("Все задачи выполнены");
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
                    if(this.runningThreads == 0 && this.tasks.length === 0){
                        this.onFinish();// Call function after all tasks have finished
                    }
                    await this.loop(); // Start the next task in the queue
                }
            }
        }
    }
}
// Пример использования
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let myQueue = new Queue(2);

myQueue.add(async () => {
    console.log("Task 1 started");
    await delay(1000);
    console.log("Task 1 completed");
}, Math.random(), 1);

myQueue.add(async () => {
    console.log("Task 2 started");
    await delay(100);
    console.log("Task 2 completed");
}, Math.random(), 2);

myQueue.add(async () => {
    console.log("Task 3 started");
    await delay(200);
    console.log("Task 3 completed");
}, Math.random(), 3);

myQueue.run();