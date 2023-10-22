// Define an array of allowed characters for the password.
const allowedChars = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
// Calculate the length of the allowed characters array.
const allowedCharslength = allowedChars.length;
const password = "qU";
const passwordArray = password.split("");


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
    async add(task, onresolve, onreject, priority,) {
        // Create an object that includes the task function, onresolve, onreject, and a randomly generated priority.
        const taskObject = { task, onresolve, onreject, priority };
        this.tasks.push(taskObject); // Add the task to the task queue.
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

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

// Function to create a mask of zeros with a specified length.
function* createMaskGenerator(length = 1) {
    yield* new Array(length).fill(0);
}

// Generator function to generate the next password based on the given indexes. [9,0] -> [0,1]
function* generatePassword(indexes) {
    yield indexes;
    while (true) {
        indexes[0]++;  // Increment the first index by 1.
        // Iterate through the indexes array.
        for (let i = 0; i < indexes.length; i++) {
            if (indexes[i] == allowedCharslength) {
                // If an index reaches the length of allowed characters, reset it to 0 and increment the next index.
                if (i + 1 == indexes.length) {
                    return false; // Return false if all combinations have been exhausted.
                }
                indexes[i] = 0;
                indexes[i + 1]++;
            }
        }
        yield indexes; // Yield the updated index array.
    }
}

// Function to generate a string from an index array using the allowed characters array.
function generateStringfromIndex(indexArray) {
    const result = indexArray
        .map(index => {
            if (index >= 0 && index < allowedCharslength) {
                return allowedChars[index];
            } else {
                return ''; // Handle out-of-bounds indices with an empty string.
            }
        })
        .join(''); // Join the characters to form the result string.

    return result; // Return the generated string.
}

// Function to check if a provided password matches a predefined value with a timeout.
async function login(passwordTry) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (passwordTry === password) {
                resolve(true); // Return true if the password matches the predefined value.
            } else {
                resolve(false); // Return false otherwise.
            }
        }, 10); // Set a timeout of 1000 milliseconds (1 second).
    });
}

(async () => {

    const queue = new Queue(3); // Maximum number of login attempts to run in parallel

    const brute = async (endLength = 15) => {
        for (let currentLength = 1; currentLength <= endLength; currentLength++) {
            let indexesGenerator = generatePassword([...createMaskGenerator(currentLength)]);

            for (const indexArray of indexesGenerator) {
                const passwordTry = generateStringfromIndex(indexArray);
                let arrayOfpasswordTry = passwordTry.split("");
                let matched = arrayOfpasswordTry.filter( el => passwordArray.indexOf( el ) > -1 );
                let priority = Math.floor(matched.length/passwordArray.length*100);
                
                // Use the Queue to manage parallel login attempts
                const task = async () => {
                    const result = await login(passwordTry);
                    if (result) {
                        console.log(`Password found: ${passwordTry}`);
                        queue.stop(); // Stop the queue when a match is found.
                    }
                };

                if (queue.status === "running") {

                    await queue.add(task,
                        (fn) => {
                            fn();
                        },
                        (error) => {
                            console.error("Task 1 rejected: " + error);
                        },
                        priority);
                }

                if (queue.status === "stopped") {
                    return;
                }
            }
        }

        console.log("Unable to find");
    };

    queue.run(); // Start processing login attempts

    await brute();
})();