
// import * as tf from '@tensorflow/tfjs';
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const use = require('@tensorflow-models/universal-sentence-encoder');

const banks = [
  'aus',
  'axis',
  'axisc',
  'bdnc',
  'bdnr',
  'bobc',
  'bobr',
  'boi',
  'bom',
  'canara',
  'cbi',
  'csb',
  'cub',
  'dbs',
  'deutsche',
  'dhanlakshmi',
  'equitas',
  'federal',
  'hdfc',
  'icici',
  'idfc',
  'indian',
  'indusind',
  'iob',
  'iobc',
  'jkb',
  'karnatka',
  'karur',
  'kotak',
  'lvbc',
  'lvbr',
  'pnbc',
  'pnbr',
  'rbl',
  'rblc',
  'saraswat',
  'sbi',
  'sbic',
  'scb',
  'shivalik',
  'sib',
  'sur',
  'tamcop',
  'tammerc',
  'uco',
  'union',
  'utk',
  'yes',
]

// Encoding
const encodeData = data => {
  const sentences = data.map(element => element.toLowerCase());

  const trainingData = use.load().then(model => {
    const embeddings = model.embed(sentences);
    return embeddings;
  }).catch(err => console.error('Fit Error:', err));

  return trainingData
};

async function processModel() {
  const model = await tf.loadLayersModel('file:///WEB/ml model/ml-model/model.json');

  const input = [
    'digi', 'standard', 'axis', 'bandhan', 'ratnr'
  ];
  Promise.resolve(encodeData(input)).then(data => {
    const prediction = model.predict(data);
    const predictedClassIndices = prediction.argMax(1).dataSync();
    console.log('Predicted Class Indices:', predictedClassIndices);

    for (let i = 0; i < input.length; i += 1) {
      console.log(banks[predictedClassIndices[i]])
    }
    // console.log("prediction", prediction);
  });
}

module.exports = processModel();