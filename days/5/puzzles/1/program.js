let input = '';
const CHARACTER_DIFFERENCE = 32;

process.stdin.on('data', chunk => input += chunk);

process.stdin.on('end', () => {
  input = input.trim();
  console.log(getResultingPolymerChainLength(input));
});

function getResultingPolymerChainLength(input) {
  input = toCharCodes(input);
  let canReact = true;
  let resultOfReaction;
  let resultOfLastReaction = input;

  while (canReact) {
    resultOfReaction = react(resultOfLastReaction);

    if (resultOfReaction.length === resultOfLastReaction.length) {
      canReact = false;
    }

    resultOfLastReaction = resultOfReaction;
  }

  return resultOfLastReaction.length;
}

function react(chain) {
  let previousUnit;

  for (let i = 0; i < chain.length; i++) {
    const unit = chain[i];

    if (previousUnit && Math.abs(unit - previousUnit) === CHARACTER_DIFFERENCE) {
      if (i === 1) {
        return chain.slice(2);
      } else {
        return chain.slice(0, i - 1).concat((i === chain.length - 1) ? [] : chain.slice(i + 1));
      }
    }

    previousUnit = unit;
  }

  return chain;
}

function toCharCodes(input) {
  let result = [];

  for (let i = 0; i < input.length; i++) {
    result.push(input.charCodeAt(i));
  }

  return result;
}
