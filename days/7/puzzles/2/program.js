const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const NUM_WORKERS = 5;
const COMPLETION_TIME_OFFSET_FROM_CHAR_CODE = 4;
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
  for (let i = 65; i < 91; i++) {
    const step = String.fromCharCode(i);

    if (graph[step]) {
      graph[step].completionTime = i - COMPLETION_TIME_OFFSET_FROM_CHAR_CODE;
    }
  }

  console.log(getTimeToComplete());
});

function getTimeToComplete() {
  const numberOfSteps = Object.keys(graph).length;
  const stepsAvailableForWork = [];
  const stepsCompleted = [];
  const stepsCompleteAtSecond = {};
  let availableWorkers = NUM_WORKERS;
  let secondsElapsed = 0;

  // find steps which have no dependencies
  Object.keys(graph).forEach(step => {
    if (Object.keys(graph[step].in).length == 0) {
      stepsAvailableForWork.push(step);
    }
  });

  stepsAvailableForWork.sort();

  while (stepsCompleted.length < numberOfSteps) {

    // were any steps completed at the current timestamp?
    const stepsCompletedNow = stepsCompleteAtSecond[secondsElapsed] || [];

    // loop through steps that were completed "now" and free up their workers
    for (let i = 0; i < stepsCompletedNow.length; i++) {
      const step = stepsCompletedNow[i];

      availableWorkers++;

      // add any steps which had this step as their last dependency to the queue
      Object.keys(graph[step].out).forEach(childStep => {
        delete graph[step].out[childStep];
        delete graph[childStep].in[step];

        if (Object.keys(graph[childStep].in).length === 0) {
          stepsAvailableForWork.push(childStep);
        }
      });

      stepsCompleted.push(step);
    }

    // no longer need to keep track of tasks completed at this timestamp
    delete stepsCompleteAtSecond[secondsElapsed];

    // assign available workers to available work
    stepsAvailableForWork.sort();

    while (availableWorkers > 0 && stepsAvailableForWork.length > 0) {
      const nextStep = stepsAvailableForWork.shift();
      const timeToCompleteStep = graph[nextStep].completionTime;
      const timeOfCompletion = timeToCompleteStep + secondsElapsed;

      // maintain a lookup table of what steps will be completed at a given timestamp
      stepsCompleteAtSecond[timeOfCompletion] = stepsCompleteAtSecond[timeOfCompletion] || [];
      stepsCompleteAtSecond[timeOfCompletion].push(nextStep);

      availableWorkers--;
    }

    // progress to the next time at which a step will be completed
    if (stepsCompleted.length < numberOfSteps) {
      secondsElapsed = Object.keys(stepsCompleteAtSecond)
        .map(time => parseInt(time, 10))
        .sort((a, b) => a - b)[0];
    }
  }

  return secondsElapsed;
}
