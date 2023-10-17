// Define an array of allowed characters for the password.
const allowedChars = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
// Calculate the length of the allowed characters array.
const allowedChars_length = allowedChars.length;

// Function to create a mask of zeros with a specified length.
function createMask(length = 1) {
    let mask = [];
    for (let i = 0; i < length; i++) {
        mask.push(0);
    }
    return mask;
}

// Function to generate a password using an index array.
function generatePassword(indexes) {
    indexes[0]++;
    for (let i = 0; i < indexes.length; i++) {
        if (indexes[i] == allowedChars_length) {
            if (i + 1 == indexes.length) {
                return false; // Return false if all combinations have been exhausted.
            }
            indexes[i] = 0;
            indexes[i + 1]++;
        }
    }
    return indexes; // Return the updated index array.
}

// Function to generate a string from an index array using the allowed characters array.
function generateStringFromIndex(IndexArray, allowedCharsArray) {
    let result = '';
    for (let i = 0; i < IndexArray.length; i++) {
        const index = IndexArray[i];
        if (index >= 0 && index < allowedChars_length) {
            result += allowedCharsArray[index];
        }
    }
    return result; // Return the generated string.
}

// Function to check if a provided password matches a predefined value.
function login(password) {
    if (password === "PPPPPP") {
        return true; // Return true if the password matches the predefined value.
    }
    return false; // Return false otherwise.
}

// Function to check if the current length is less than or equal to the specified end length.
function canIncrementIndexes(current_Length, endLength) {
    if (current_Length <= endLength) {
        return true; // Return true if the current length is less than or equal to the end length.
    }
    return false; // Return false otherwise.
}

// Brute force function to find the password within the specified length.
function bruteRecursive(current_Length = 1, endLength = 15, indexes = createMask(current_Length)) {
    if (current_Length > endLength) {
        return "Unable to find"; // Вернуть сообщение, если пароль не найден в пределах указанной длины.
    }

    while (true) {
        const passwordTry = generateStringFromIndex(indexes, allowedChars);

        if (login(passwordTry)) {
            return passwordTry; // Вернуть пароль, если совпадение найдено.
        }

        indexes = generatePassword(indexes, allowedChars_length);

        if (indexes === false) {
            return bruteRecursive(current_Length + 1, endLength, createMask(current_Length + 1));
        }
    }
}

console.log(bruteRecursive()); // Call the brute force function and print the result to the console.
