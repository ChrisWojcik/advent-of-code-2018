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
  console.log(getCommonLettersOfCorrectBoxes(ids));
});

function getCommonLettersOfCorrectBoxes(ids) {
  for (let i = 0; i < ids.length; i++) {
    const idA = ids[i];

    for (let j = 0; j < ids.length; j++) {
      if (i !== j) {
        const idB = ids[j];
        const commonLettersOfCorrectBoxes = checkIdPair(idA, idB);

        if (commonLettersOfCorrectBoxes) {
          return commonLettersOfCorrectBoxes.join('');
        }
      }
    }
  }
}

function checkIdPair(idA, idB) {
  const idALetters = idA.split('');
  const idBLetters = idB.split('');
  const commonLetters = [];
  let countDifferences = 0;

  for (let i = 0; i < idALetters.length; i++) {
    if (idALetters[i] !== idBLetters[i]) {
      countDifferences++;
    } else {
      commonLetters.push(idALetters[i]);
    }

    if (countDifferences > 1) {
      return false;
    }
  }

  return (countDifferences === 1) ? commonLetters : false;
}

