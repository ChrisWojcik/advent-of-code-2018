const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const prerequisitiesForStep = {};

rl.on('line', line => {
  if (line) {
    const matches = line.match(/^Step ([A-Z]{1}) must be finished before step ([A-Z]{1}) can begin\.$/);
    const step = matches[2];
    const requiredStep = matches[1];

    prerequisitiesForStep[step] = prerequisitiesForStep[step] || [];
    prerequisitiesForStep[requiredStep] = prerequisitiesForStep[requiredStep] || [];
    prerequisitiesForStep[step].push(requiredStep);
  }
});

rl.on('close', () => {
  console.log(getStepsInOrder());
});

function getStepsInOrder() {
  const availableSteps = [];
  const stepsInOrder = [];
  const numberOfSteps = Object.keys(prerequisitiesForStep).length;

  for (let i = 0; i < numberOfSteps; i++) {
    Object.keys(prerequisitiesForStep).forEach(step => {
      const prerequisites = prerequisitiesForStep[step];

      for (let i = 0; i < prerequisites.length; i++) {
        const prerequisite = prerequisites[i];

        if (stepsInOrder.indexOf(prerequisite) === -1) {
          return;
        }
      }

      availableSteps.push(step);
      delete prerequisitiesForStep[step];
    });

    availableSteps.sort();
    stepsInOrder.push(availableSteps.shift());
  }

  return stepsInOrder.join('');
}
