const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const graph = {};

rl.on('line', line => {
  if (line) {
    const matches = line.match(/^Step ([A-Z]{1}) must be finished before step ([A-Z]{1}) can begin\.$/);
    const step = matches[2];
    const requiredStep = matches[1];

    graph[requiredStep] = graph[requiredStep] || { in: {}, out: {} };
    graph[requiredStep].out[step] = true;
    graph[step] = graph[step] || { in: {}, out: {} };
    graph[step].in[requiredStep] = true;
  }
});

rl.on('close', () => {
  console.log(getStepsInOrder());
});

function getStepsInOrder() {
  const availableSteps = [];
  const stepsInOrder = [];

  Object.keys(graph).forEach(step => {
    if (Object.keys(graph[step].in).length == 0) {
      availableSteps.push(step);
    }
  });

  availableSteps.sort();

  while (availableSteps.length > 0) {
    const nextStep = availableSteps.shift();
    stepsInOrder.push(nextStep);

    Object.keys(graph[nextStep].out).forEach(step => {
      delete graph[nextStep].out[step];
      delete graph[step].in[nextStep];

      if (Object.keys(graph[step].in).length === 0) {
        availableSteps.push(step);
      }
    });

    availableSteps.sort();
  }

  return stepsInOrder.join('');
}
