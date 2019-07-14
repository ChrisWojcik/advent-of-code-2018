let input = '';
let STARTING_FREQUENCY = 0;

process.stdin.on('data', chunk => input += chunk);

process.stdin.on('end', () => {
  console.log(getResult(input));
});

function getResult(input) {
  return (
    input.split(/\r?\n/)
      .map(text => parseInt(text, 10))
      .filter(frequency => frequency) // NaN is falsy
      .reduce((sum, frequency) => sum + frequency, STARTING_FREQUENCY)
  );
}
