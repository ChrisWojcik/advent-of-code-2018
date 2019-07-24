let input = '';
const CHARACTER_DIFFERENCE = 32;
const unitTypes = [];

for (let i = 65; i < 91; i++) {
  unitTypes.push(i);
}

process.stdin.on('data', chunk => input += chunk);

process.stdin.on('end', () => {
  input = input.trim();
  console.log(getLengthOfShortestPossiblePolymer(input));
});

function getLengthOfShortestPossiblePolymer(input) {
  let shortestLength;
  input = toCharCodes(input);

  for (let i = 0; i < unitTypes.length; i++) {
    const unit = unitTypes[i];
    const polymerWithUnitTypeRemoved = removeUnitType(input, unit);
    const length = getResultingPolymerChainLength(polymerWithUnitTypeRemoved);

    if (!shortestLength || length < shortestLength) {
      shortestLength = length;
    }
  }

  return shortestLength;
}

function getResultingPolymerChainLength(input) {
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

function removeUnitType(polymer, unitType) {
  return polymer.filter(unit =>
    unit !== unitType && unit !== unitType + CHARACTER_DIFFERENCE
  );
}
