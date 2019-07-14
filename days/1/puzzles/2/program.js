let input = '';
let STARTING_FREQUENCY = 0;

process.stdin.on('data', chunk => input += chunk);

process.stdin.on('end', () => {
  console.log(getResult(input));
});

function getResult(input) {
  const frequencies = input.split(/\r?\n/)
    .map(text => parseInt(text, 10))
    .filter(frequency => frequency); // NaN is falsy

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
