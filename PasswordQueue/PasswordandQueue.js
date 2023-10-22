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

    async add(task) {
        this.tasks.push(task); // Add a new task to the queue
        await this.loop(); // Wait for the current loop to complete before adding more tasks
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
                    await this.loop(); // Start the next task in the queue
                }
            }
        }
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

// Define an array of allowed characters for the password.
const allowedChars = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
// Calculate the length of the allowed characters array.
const allowedCharslength = allowedChars.length;

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
async function login(password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (password === "Que") {
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

                // Use the Queue to manage parallel login attempts
                const task = async () => {
                    const result = await login(passwordTry);
                    if (result) {
                        console.log(`Password found: ${passwordTry}`);
                        queue.stop(); // Stop the queue when a match is found.
                    }
                };

                if (queue.status === "running") {
                    await queue.add(task);
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