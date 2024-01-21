function jaroSimilarityCalculation(str1, str2) {
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

function jaroWinklerSimilarity(str1, str2, prefixScaleFactor = 0.1) {
  const jaroSimilarity = jaroSimilarityCalculation(str1, str2);

  // Calculate common prefix length (l)
  let commonPrefix = 0;
  const minLength = Math.min(str1.length, str2.length);
  for (let i = 0; i < minLength && str1[i] === str2[i]; i++) {
    commonPrefix++;
  }

  // Apply the Jaro-Winkler adjustment
  const jaroWinklerSimilarity = jaroSimilarity + commonPrefix * prefixScaleFactor * (1 - jaroSimilarity);

  return jaroWinklerSimilarity;
}

function jaroWinkler(x, groupOfStrings) {
  let maxDistance = 0;
  let bestValue = '';

  for (const str of groupOfStrings) {
    const distance = jaroWinklerSimilarity(x, str.input);
    console.log(`The Jaro distance of '${x}' in the group ${str.input} is ${distance}.`);
    if (maxDistance < distance) {
      maxDistance = distance;
      bestValue = str.input;
    }
  }
  console.log("maxDistance", maxDistance, bestValue);
  return maxDistance;
}

export default jaroWinkler;
// console.log(`The Jaro-Winkler similarity between '${string1}' and '${string2}' is ${similarity}.`);
