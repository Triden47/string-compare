// const run = require('./tensors/tensorflow');
// const processModel = require('./tensors/loadTensor')

import dataManipulation from "./stringAlgorithms/dataManipulation.js";

import { initialData } from './data.js';
import levenshteinDistance from "./stringAlgorithms/editDistance/levenshtein.js";
import damerauLevenshteinDistance from "./stringAlgorithms/editDistance/damerauLevenshtein.js";
import jaroSimilarity from "./stringAlgorithms/editDistance/jaroSimilarity.js";
import jaroWinkler from "./stringAlgorithms/editDistance/jaroWinkler.js";
import smithWaterman from "./stringAlgorithms/editDistance/smithWaterman.js";

const input = dataManipulation(["bob bank"]);
console.log("input", input)
levenshteinDistance(input[0], initialData);
// damerauLevenshteinDistance(input[0], initialData);
// jaroSimilarity(input[0], initialData);
// jaroWinkler(input[0], initialData)
// smithWaterman(input[0], initialData)