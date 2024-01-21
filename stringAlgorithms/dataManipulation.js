const dataManipulation = (data) => {
  let outputData = data.map(element => {
    let updatedElement = specialCharacters(element);
    updatedElement = removeBank(updatedElement);
    return updatedElement
  });
  return outputData;
}

const removeLastSpecialChar = (data) => {
  if (data.slice(-1) === ' ')
    return data.slice(0, -1);
  return data;
}

const isCharLetter = (char) => {
  return /^[a-z]$/i.test(char);
}

const specialCharacters = (element) => {
  let updatedElement = '';
  let lastSpecialChar = -1;
  [...element].forEach((value, index) => {
    if (!isCharLetter(value)) {
      if (index - lastSpecialChar !== 1) {
        updatedElement += ' ';
      }
      lastSpecialChar = index;
    } else {
      updatedElement += value;
    }
  })
  return removeLastSpecialChar(updatedElement);
}

const removeBank = (element) => {
  if (element.length > 4 && element.slice(-4) === 'bank') {
    let updatedElement = element.slice(0, -4);
    if (updatedElement.slice(-1) === ' ')
      return updatedElement.slice(0, -1);
    return updatedElement;
  }
  return element;
}

export default dataManipulation;