// Define an array of allowed characters for the password.
const allowedChars = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
// Calculate the length of the allowed characters array.
const allowedCharslength = allowedChars.length;

// Function to create a mask of zeros with a specified length.
function createMask(length = 1) {
    return new Array(length).fill(0);
}

// Function to generate a password using an index array. [9,0] -> [0,1]
function generatePassword(indexes) {
    indexes[0]++;
    return recursiveIncrement(indexes, 0);// We need second function because we need to increment indexes only 1 time
}

// Recursively increment the indexes and generate the password. 
function recursiveIncrement(indexes, currentIndex) {
    if (indexes[currentIndex] === allowedCharslength) {
        if (currentIndex + 1 >= indexes.length) {
            return false; // Return false if all combinations have been exhausted.
        }
        indexes[currentIndex] = 0;
        indexes[currentIndex + 1]++;
        return recursiveIncrement(indexes, currentIndex + 1);//Call recursive function with next argument
    }

    return indexes; // Return the updated index array.
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
    if (password === "qrQOT") {
        return true; // Return true if the password matches the predefined value.
    }
    return false; // Return false otherwise.
}

// Brute force function to find the password within the specified length.
function bruteRecursive(currentLength = 1, endLength = 15, indexes = createMask(currentLength)) {
    if (currentLength > endLength) {
        return "Unable to find"; // Return a message if the password is not found within the specified length.
    }

    while (indexes != false) {
        const passwordTry = generateStringfromIndex(indexes, allowedChars);// Generate string based on value of indexes

        if (login(passwordTry)) {
            return passwordTry; // Return password if a match is found.
        }

        indexes = generatePassword(indexes);// Generate next indexes

    }
    return bruteRecursive(currentLength + 1, endLength, createMask(currentLength + 1));
}

console.log(bruteRecursive()); // Call the brute force function and print the result to the console.
