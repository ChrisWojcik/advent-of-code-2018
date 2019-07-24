let input = '';
const CHARACTER_DIFFERENCE = 32;

process.stdin.on('data', chunk => input += chunk);

process.stdin.on('end', () => {
  input = input.trim();
  console.log(getResultingPolymerChainLength(input));
});

function getResultingPolymerChainLength(input) {
  chain = toCharCodes(input);
  let resultingChain = [];

  for (let i = 0; i < chain.length; i++) {
    const unit = chain[i];
    const previousUnit = resultingChain[resultingChain.length - 1];

    if (previousUnit && Math.abs(unit - previousUnit) === CHARACTER_DIFFERENCE) {
      resultingChain.pop();
    } else {
      resultingChain.push(unit);
    }
  }

  return resultingChain.length;
}

function toCharCodes(input) {
  let result = [];

  for (let i = 0; i < input.length; i++) {
    result.push(input.charCodeAt(i));
  }

  return result;
}
