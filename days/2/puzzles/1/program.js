const readline = require('readline');

const ids = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', line => {
  if (line) {
    ids.push(line);
  }
});

rl.on('close', () => {
  console.log(getChecksum(ids));
});

function getChecksum(ids) {
  let countHaveTwoOfSame = 0;
  let countHaveThreeOfSame = 0;

  ids.forEach(id => {
    const letters = id.split('');
    const letterCounts = {};

    letters.forEach(letter => {
      letterCounts[letter] = (letterCounts[letter]) ? letterCounts[letter] + 1 : 1;
    });

    let uniqueLetters = Object.keys(letterCounts);
    let didFindTwoOfSame = false;
    let didFindThreeOfSame = false;

    for (let i = 0; i < uniqueLetters.length; i++) {
      if (didFindTwoOfSame && didFindThreeOfSame) {
        break;
      }

      const letter = uniqueLetters[i];

      if (!didFindTwoOfSame && letterCounts[letter] === 2) {
        didFindTwoOfSame = true;
        countHaveTwoOfSame++;
      }

      if (!didFindThreeOfSame && letterCounts[letter] === 3) {
        didFindThreeOfSame = true;
        countHaveThreeOfSame++;
      }
    }
  });

  return countHaveTwoOfSame * countHaveThreeOfSame;
}
