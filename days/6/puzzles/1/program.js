const readline = require('readline');

const coordinates = [];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

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

    coordinates.push({ x, y, closestLocations: [], infinite: false });
  }
});

rl.on('close', () => {
  console.log(getLargestArea(coordinates));
});

function getLargestArea(coordinates) {
  coordinates = coordinates.slice(0);

  for (let i = x0; i <= x1; i++) {
    for (let j = y0; j <= y1; j++) {
      const location = { x: i, y: j };
      const distancesByCoordinate = [];

      for (let k = 0; k < coordinates.length; k++) {
        const coordinate = coordinates[k];
        const manhattanDistance = findManhattanDistance(coordinate, location);

        distancesByCoordinate.push({ coordinateIndex: k, manhattanDistance });
      }

      distancesByCoordinate.sort((a, b) => a.manhattanDistance - b.manhattanDistance);

      // if no tie
      if (distancesByCoordinate[0].manhattanDistance !== distancesByCoordinate[1].manhattanDistance) {
        const indexOfClosestCoordinate = distancesByCoordinate[0].coordinateIndex;
        const closestCoordinate = coordinates[indexOfClosestCoordinate];

        closestCoordinate.closestLocations.push(location);

        // if this location is on a boundary and there is no tie, the closest coordinate's area
        // must extend infinitely
        if (isOnBoundary(location)) {
          closestCoordinate.infinite = true;
        }
      }
    }
  }

  // first coordinate with the largest area that is not infinite
  return coordinates.filter(coordinate => !coordinate.infinite)
    .sort((a, b) => b.closestLocations.length - a.closestLocations.length)[0].closestLocations.length;
}

function findManhattanDistance(pointA, pointB) {
  return (Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y));
}

function isOnBoundary(point) {
  return (
    point.x === x0 ||
    point.x === x1 ||
    point.y === y0 ||
    point.y === y1
  );
}
