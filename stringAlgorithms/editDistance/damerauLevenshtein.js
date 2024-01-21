function findDamerauLevenshteinDistance(str1, str2) {
    const lenStr1 = str1.length + 1;
    const lenStr2 = str2.length + 1;

    const matrix = new Array(lenStr1);
    for (let i = 0; i < lenStr1; i++) {
        matrix[i] = new Array(lenStr2);
    }

    for (let i = 0; i < lenStr1; i++) {
        matrix[i][0] = i;
    }
    for (let j = 0; j < lenStr2; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i < lenStr1; i++) {
        for (let j = 1; j < lenStr2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,        // Deletion
                matrix[i][j - 1] + 1,        // Insertion
                matrix[i - 1][j - 1] + cost  // Substitution
            );

            if (i > 1 && j > 1 && str1[i - 1] === str2[j - 2] && str1[i - 2] === str2[j - 1]) {
                // Transposition
                matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + cost);
            }
        }
    }

    return matrix[lenStr1 - 1][lenStr2 - 1];
}

function damerauLevenshteinDistance(x, groupOfStrings) {
    let minDistance = Number.MAX_SAFE_INTEGER;
    let bestValue = '';

    for (const str of groupOfStrings) {
        const distance = findDamerauLevenshteinDistance(x, str.input);
        console.log(`The Levenshtein distance of '${x}' in the group ${str.input} is ${distance}.`);
        if (minDistance > distance) {
            minDistance = distance;
            bestValue = str.input;
        }
    }
    console.log("minDistance", minDistance, bestValue);
    return minDistance;
}

// Example usage:
// const string1 = "kitten";
// const string2 = "sitting";
export default damerauLevenshteinDistance;
// console.log(`The Damerau-Levenshtein distance between '${string1}' and '${string2}' is ${distance}.`);
