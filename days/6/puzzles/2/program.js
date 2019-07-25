const readline = require('readline');

const coordinates = [];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const MAX_DISTANCE = 10000;

let x0;
let x1;
let y0;
let y1;

rl.on('line', line => {
  if (line) {
    let [x, y] = line.split(', ');
    x = parseInt(x, 10);
    y = parseInt(y, 10);

    if (!x0 || x < x0) {
      x0 = x;
    }

    if (!x1 || x > x1) {
      x1 = x;
    }

    if (!y0 || y < y0) {
      y0 = y;
    }

    if (!y1 || y > y1) {
      y1 = y;
    }

    coordinates.push({ x, y });
  }
});

rl.on('close', () => {
  console.log(getRegionSize(coordinates));
});

function getRegionSize(coordinates) {
  coordinates = coordinates.slice(0);

  region = [];

  for (let i = x0; i <= x1; i++) {
    for (let j = y0; j <= y1; j++) {
      const location = { x: i, y: j };
      let totalDistanceToAllCoordinates = 0;

      for (let k = 0; k < coordinates.length; k++) {
        const coordinate = coordinates[k];
        const manhattanDistance = findManhattanDistance(coordinate, location);

        totalDistanceToAllCoordinates += manhattanDistance;
      }

      if (totalDistanceToAllCoordinates < MAX_DISTANCE) {
        region.push(location);
      }
    }
  }

  return region.length;
}

function findManhattanDistance(pointA, pointB) {
  return (Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y));
}
