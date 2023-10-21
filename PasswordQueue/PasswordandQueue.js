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

// Function to check if a provided password matches a predefined value.
function login(password) {
    if (password === "Quiet") {
        return true; // Return true if the password matches the predefined value.
    }
    return false; // Return false otherwise.
}

// Brute force function to find the password within the specified length.
function brute(endLength = 15) {

    for(let currentLength = 1; currentLength <= endLength; currentLength++) {

        let indexesGenerator = generatePassword([...createMaskGenerator(currentLength)]);// Create a generator for generating password indexes using the createMaskGenerator function.

        for (const indexes of indexesGenerator) {
            const passwordTry = generateStringfromIndex(indexes); // Generate string based on value of indexes

            if (login(passwordTry)) {
                return passwordTry; // Return the password if a match is found.
            }
        }
    }
    return "Unable to find"; // Return this message if the password is not found within the specified length.
}

console.log(brute()); // Call the brute force function and print the result to the console.
