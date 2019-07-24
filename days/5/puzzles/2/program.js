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

function getResultingPolymerChainLength(chain) {
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

function removeUnitType(polymer, unitType) {
  return polymer.filter(unit =>
    unit !== unitType && unit !== unitType + CHARACTER_DIFFERENCE
  );
}
