let input = '';

process.stdin.on('data', chunk => input += chunk);

process.stdin.on('end', () => {
  const claims = input.trim().split(/\r?\n/);
  console.log(getIdOfNonOverlappingClaim(claims));
});

function getIdOfNonOverlappingClaim(claims) {
  const gridSquares = {};

  for (let i = 0; i < claims.length; i++) {
    const parts = claims[i].split(' ');

    const id = parseInt(parts[0].slice(1));
    const fromLeft = parseInt(parts[2].split(',')[0], 10);
    const fromTop = parseInt(parts[2].split(',')[1].slice(0, -1), 10);
    const width = parseInt(parts[3].split('x')[0], 10);
    const height = parseInt(parts[3].split('x')[1], 10);

    for (let j = fromLeft; j < fromLeft + width; j++) {
      for (let k = fromTop; k < fromTop + height; k++) {
        const square = `${j},${k}`;
        gridSquares[square] = gridSquares[square] || [];
        gridSquares[square].push(id);
      }
    }
  }

  const candidateIds = {};
  const eliminatedIds = {};

  Object.keys(gridSquares).forEach(square => {
    if (gridSquares[square].length === 1) {
      const id = gridSquares[square][0];
      if (!eliminatedIds[id]) {
        candidateIds[id] = true;
      }
    } else {
      const ids = gridSquares[square];
      ids.forEach(id => {
        delete candidateIds[id];
        eliminatedIds[id] = true;
      });
    }
  });

  return Object.keys(candidateIds)[0];
}
