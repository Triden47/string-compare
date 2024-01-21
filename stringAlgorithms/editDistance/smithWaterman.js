function smithWatermanSimilarity(str1, str2, gapPenalty = 0.5, matchScore = 2, mismatchPenalty = -1) {
  const len1 = str1.length;
  const len2 = str2.length;

  // Initialize the scoring matrix
  const matrix = new Array(len1 + 1).fill(null).map(() => new Array(len2 + 1).fill(0));

  // Fill the matrix with scores
  let maxScore = 0;
  let maxI = 0;
  let maxJ = 0;

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const match = (str1[i - 1] === str2[j - 1]) ? matchScore : mismatchPenalty;
      const scores = [
        matrix[i - 1][j] + gapPenalty,      // Deletion
        matrix[i][j - 1] + gapPenalty,      // Insertion
        matrix[i - 1][j - 1] + match,       // Match or mismatch
        0                                  // Start a new alignment
      ];
      const score = Math.max(...scores);
      matrix[i][j] = Math.max(0, score);

      if (matrix[i][j] > maxScore) {
        maxScore = matrix[i][j];
        maxI = i;
        maxJ = j;
      }
    }
  }

  // Trace back to find the aligned sequences
  let alignedStr1 = '';
  let alignedStr2 = '';
  let i = maxI;
  let j = maxJ;

  while (i > 0 && j > 0 && matrix[i][j] !== 0) {
    const currentScore = matrix[i][j];
    const diagonalScore = matrix[i - 1][j - 1];
    const leftScore = matrix[i][j - 1];
    const upScore = matrix[i - 1][j];

    if (currentScore === diagonalScore + (str1[i - 1] === str2[j - 1] ? matchScore : mismatchPenalty)) {
      alignedStr1 = str1[i - 1] + alignedStr1;
      alignedStr2 = str2[j - 1] + alignedStr2;
      i--;
      j--;
    } else if (currentScore === upScore + gapPenalty) {
      alignedStr1 = str1[i - 1] + alignedStr1;
      alignedStr2 = '-' + alignedStr2;
      i--;
    } else if (currentScore === leftScore + gapPenalty) {
      alignedStr1 = '-' + alignedStr1;
      alignedStr2 = str2[j - 1] + alignedStr2;
      j--;
    }
  }

  return {
    similarity: maxScore,
    alignedStr1,
    alignedStr2
  };
}

function smithWaterman(x, groupOfStrings) {
  let maxDistance = 0;
  let bestValue = '';

  for (const str of groupOfStrings) {
    const result = smithWatermanSimilarity(x, str.input);
    // console.log(`Smith-Waterman similarity: ${result.similarity}`);
    console.log(`Aligned String 1: ${result.alignedStr1}`);
    console.log(`Aligned String 2: ${result.alignedStr2}`);
    console.log(`The Smith-Walterman distance of '${x}' in the group ${str.input} is ${result.similarity}.`);
    if (maxDistance < result.similarity) {
      maxDistance = result.similarity;
      bestValue = str.input;
    }
  }
  console.log("maxDistance", maxDistance, bestValue);
  return maxDistance;
}

// Example usage:
// const string1 = "kitten";
// const string2 = "sitting";
export default smithWaterman;
// console.log(`Smith-Waterman similarity: ${result.similarity}`);
// console.log(`Aligned String 1: ${result.alignedStr1}`);
// console.log(`Aligned String 2: ${result.alignedStr2}`);
