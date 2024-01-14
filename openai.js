var fs = require('fs');
var util = require('util');
const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: "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" });

var log_file = fs.createWriteStream(__dirname + '/debug.log', { flags: 'w' });
var log_stdout = process.stdout;

console.log = function (d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

const data = {
  sbi: [
    { input: 'sbi', output: 'sbi' },
    { input: 'state bank of india', output: 'sbi' },
    { input: 'sbinr', output: 'sbi' }
  ],
};
let resultantArray = [];

async function getData(element) {
  // console.log(element);
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          "role": "system",
          "content": "i am training a model, use user data to create synthetic dataset by generating slightly different inputs also use special one of the special characters in each input '-','_','.',' ' inputs should never repeat, output should be the same. Return 40 such datasets, only code in array"
        },
        {
          "role": "user",
          "content": JSON.stringify(element)
        },
      ],
      temperature: 1,
      max_tokens: 4095,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const responseContent = response.choices[0].message.content;
    // const withoutFirstAndLast = responseContent.substring(7, responseContent.length - 3);
    const indexOfOpeningBracket = responseContent.indexOf('[');
    const lastIndexOfClosingBracket = responseContent.lastIndexOf(']');

    if (indexOfOpeningBracket !== -1 && lastIndexOfClosingBracket !== -1) {
      const withoutFirstAndLast = responseContent.slice(indexOfOpeningBracket, lastIndexOfClosingBracket + 1);

      const formattedResponse = JSON.parse(withoutFirstAndLast);
      formattedResponse.forEach(element => {
        console.log(element);
        console.log(",")
      });
      resultantArray = [...formattedResponse];
    }
  } catch (err) {
    throw err;
  }
}

let errCount = 0;
const keysArray = Object.keys(data);
// console.log(data[keysArray[0]]);
async function main(index) {
  if (index === keysArray.length)
    return;

  try {
    errCount = 0;
    await getData(data[keysArray[index]]);
    main(index + 1);
  } catch (err) {
    errCount += 1;
    if (errCount === 3)
      throw err;
    main(index);
  }
}

main(0);