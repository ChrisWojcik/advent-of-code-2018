const readline = require('readline');

const frequencies = [];
let STARTING_FREQUENCY = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', line => {
  if (line) {
    frequencies.push(parseInt(line, 10));
  }
});

rl.on('close', () => {
  console.log(getResult(frequencies));
});

function getResult(frequencies) {
  return frequencies.reduce((sum, frequency) => sum + frequency, STARTING_FREQUENCY)
}
