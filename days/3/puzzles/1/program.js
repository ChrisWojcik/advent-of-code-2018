let input = '';

process.stdin.on('data', chunk => input += chunk);

process.stdin.on('end', () => {
  const claims = input.trim().split(/\r?\n/);
  console.log(getSquareInchesOfFabricSharedByTwoOrMoreClaims(claims));
});

function getSquareInchesOfFabricSharedByTwoOrMoreClaims(claims) {
  const gridSquares = {};

  for (let i = 0; i < claims.length; i++) {
    const parts = claims[i].split(' ');

    const fromLeft = parseInt(parts[2].split(',')[0], 10);
    const fromTop = parseInt(parts[2].split(',')[1].slice(0, -1), 10);
    const width = parseInt(parts[3].split('x')[0], 10);
    const height = parseInt(parts[3].split('x')[1], 10);

    for (let j = fromLeft; j < fromLeft + width; j++) {
      for (let k = fromTop; k < fromTop + height; k++) {
        const square = `${j},${k}`;
        gridSquares[square] = gridSquares[square] ? gridSquares[square] + 1 : 1;
      }
    }
  }

  return Object.keys(gridSquares).reduce((sum, gridSquare) => {
    if (gridSquares[gridSquare] >= 2) {
      sum += 1;
    }

    return sum;
  }, 0);
}
