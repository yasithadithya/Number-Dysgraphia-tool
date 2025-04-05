// mlModel.js
const tf = require('@tensorflow/tfjs-node');
const Jimp = require('jimp');

let model;

/**
 * Load the pre-trained MNIST model.
 */
const loadModel = async () => {
  if (!model) {
    // You can load the model from a URL or a local file path.
    model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mnist/model.json');
    console.log('Pre-trained MNIST model loaded successfully.');
  }
};

/**
 * Preprocess the base64 image to a tensor suitable for MNIST model.
 * Assumes the input is a base64 string.
 */
const processImage = async (base64Image) => {
  // Remove header if present
  const base64Data = base64Image.split(',')[1];
  const buffer = Buffer.from(base64Data, 'base64');
  const image = await Jimp.read(buffer);
  
  // Resize the image to 28x28 pixels and convert to grayscale
  image.resize(28, 28);
  image.grayscale();
  
  const { data, width, height } = image.bitmap;
  
  // Create a Float32Array with normalized pixel values (0 to 1)
  const values = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    // Each pixel has 4 values (RGBA). We take the red channel as it's grayscale.
    values[i] = data[i * 4] / 255.0;
  }
  
  // Create a tensor with shape [1, 28, 28, 1] (batch, height, width, channels)
  const tensor = tf.tensor4d(values, [1, width, height, 1]);
  return tensor;
};

/**
 * Evaluate the image using the pre-trained MNIST model.
 * Returns an object with the predicted digit and a flag for correctness.
 */
const evaluateSubmission = async (base64Image, expectedDigit) => {
  await loadModel();
  const tensor = await processImage(base64Image);
  const prediction = model.predict(tensor);
  
  // Get the predicted digit (the index with the highest probability)
  const predictedDigit = prediction.argMax(-1).dataSync()[0];
  const isCorrect = predictedDigit.toString() === expectedDigit;
  
  // Dispose tensors after prediction to free up memory
  tf.dispose([tensor, prediction]);
  
  return { predictedDigit: predictedDigit.toString(), isCorrect };
};

module.exports = { evaluateSubmission, loadModel };
