let input = '';

process.stdin.on('data', chunk => input += chunk);

process.stdin.on('end', () => {
  console.log(getCommonLettersOfCorrectBoxes(input));
});

function getCommonLettersOfCorrectBoxes(input) {
  const ids = input.split(/\r?\n/);

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

