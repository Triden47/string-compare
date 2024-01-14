const data = [
  'aus',
  'axis',
  'bdnc',
  'bdnr',
  'bobc',
  'bobr',
  'boi',
  'bom',
  'cbi',
  'csb',
  'cub',
  'dbs',
  'hdfc',
  'icici',
  'idfc',
  'iob',
  'iobc',
  'jkb',
  'lvbc',
  'lvbr',
  'pnbc',
  'pnbr',
  'rbl',
  'rblc',
  'sbi',
  'sbic',
  'scb',
  'sib',
  'sur',
  'uco',
  'utk',
  'yes'
];

const newArray = [];
function recursion(str, index, char, str2 = '') {
  if (index === str.length - 1) {
    const str_ = str2 + str[index];
    if (str === str_)
      return;
    console.log("{input:'" + str_ + "',output:'" + str + "'},")
    newArray.push({ input: str_, output: str });
    return;
  }

  // recursion(str, index + 1, char, str2 + str[index]);
  recursion(str, index + 1, char, str2 + str[index] + char);
}

const chars = [' ', '-', '_', '.'];
data.forEach(element => {
  chars.forEach(char => {
    recursion(element, 0, char);
    // const characters = element.split('');

    // Join the array with the special character between each pair of characters
    // const stringWithSpecialChar = characters.join(char);
    // console.log("{input:'"+stringWithSpecialChar+"',output:'"+element+"'},")
  })
});

// console.log(newArray);