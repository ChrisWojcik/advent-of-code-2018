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
  const intermediateFrequencies = { [STARTING_FREQUENCY]: true };
  let solutionFound = false;
  let i = 0;
  let frequency = STARTING_FREQUENCY;

  while (!solutionFound) {
    frequency += frequencies[i];

    if (intermediateFrequencies[frequency]) {
      solutionFound = true;
    } else {
      intermediateFrequencies[frequency] = true;
      i = (i === frequencies.length - 1) ? 0 : i + 1;
    }
  }

  return frequency;
}
