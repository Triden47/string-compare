function findJaroSimilarity(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;

  const matchDistance = Math.floor(Math.max(len1, len2) / 2) - 1;

  let matches = 0;
  let transpositions = 0;
  const seen = new Array(len2).fill(false);

  // Count matches
  for (let i = 0; i < len1; i++) {
    const start = Math.max(0, i - matchDistance);
    const end = Math.min(i + matchDistance + 1, len2);

    for (let j = start; j < end; j++) {
      if (!seen[j] && str1[i] === str2[j]) {
        seen[j] = true;
        matches++;
        break;
      }
    }
  }

  // Count transpositions
  let k = 0;
  for (let i = 0; i < len1; i++) {
    if (seen[k]) {
      while (!seen[k] && k < len2) {
        k++;
      }
      if (str1[i] !== str2[k]) {
        transpositions++;
      }
      k++;
    }
  }

  if (matches === 0) {
    return 0;
  }

  const jaroSimilarity = (matches / len1 + matches / len2 + (matches - transpositions / 2) / matches) / 3;

  return jaroSimilarity;
}

function jaroSimilarity(x, groupOfStrings) {
  let maxDistance = 0;
  let bestValue = '';

  for (const str of groupOfStrings) {
    const distance = findJaroSimilarity(x, str.input);
    console.log(`The Jaro distance of '${x}' in the group ${str.input} is ${distance}.`);
    if (maxDistance < distance) {
      maxDistance = distance;
      bestValue = str.input;
    }
  }
  console.log("maxDistance", maxDistance, bestValue);
  return maxDistance;
}

// Example usage:
// const string1 = "martha";
// const string2 = "marhta";
export default jaroSimilarity;
// console.log(`The Jaro similarity between '${string1}' and '${string2}' is ${similarity}.`);
