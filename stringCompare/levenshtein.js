import stringComp from "string-comparison"

const childFn = (x, data, compareFn) => {
  let maxValue = 0; let bestOutput = '';
  data.forEach(element => {
    const value = compareFn.similarity(x, element.input)
    if (value > maxValue) {
      maxValue = value;
      bestOutput = element.output
    }
  });
  console.log(maxValue, bestOutput)
  return bestOutput
}

const main = (x, data) => {
  return childFn(x, data, stringComp.cosine)
}

export default main