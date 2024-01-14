// Find the position of '[' and ']'

const inputString = "```jsx[fegrthj67]```";
const indexOfOpeningBracket = inputString.indexOf('[');
const lastIndexOfClosingBracket = inputString.lastIndexOf(']');

// Check if '[' and ']' are both found
if (indexOfOpeningBracket !== -1 && lastIndexOfClosingBracket !== -1) {
  // Extract the substring between '[' and ']'
  const resultString = inputString.slice(indexOfOpeningBracket, lastIndexOfClosingBracket + 1);
  console.log(resultString)
}
