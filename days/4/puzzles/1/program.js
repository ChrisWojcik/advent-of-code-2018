const readline = require('readline');

const records = [];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', line => {
  if (line) {
    const captures = line.match(/^\[(.*)\] (.*)$/);
    const timestamp = new Date(captures[1]);
    const message = captures[2];

    records.push({ timestamp, message });
  }
});

rl.on('close', () => {
  console.log(getGuardIdMultipliedByMinute(records));
});

function getGuardIdMultipliedByMinute(records) {
  const data = records.sort((a, b) => {
    return a.timestamp - b.timestamp;
  });

  const guardMinutesAsleep = {};
  let currentGuardId;
  let minuteStartedAsleep;

  for (let i = 0; i < data.length; i++) {
    const message = data[i].message;
    const minute = data[i].timestamp.getMinutes();
    const newGuardStarting = message.match(/^Guard #([0-9]+) begins shift$/);

    if (newGuardStarting) {
      const guardId = newGuardStarting[1];
      currentGuardId = guardId;
      guardMinutesAsleep[guardId] = guardMinutesAsleep[guardId] || [];
    } else if (message === 'falls asleep') {
      minuteStartedAsleep = minute;
    } else if (message === 'wakes up') {
      for (let j = minuteStartedAsleep; j < minute; j++) {
        guardMinutesAsleep[currentGuardId].push(j);
      }
    }
  }

  let sleepiestGuard;
  let mostMinutesAsleep = 0;
  let minuteAsleepMost;

  Object.keys(guardMinutesAsleep).forEach(guardId => {
    const minutesAsleep = guardMinutesAsleep[guardId].length;

    if (minutesAsleep > mostMinutesAsleep) {
      mostMinutesAsleep = minutesAsleep;
      sleepiestGuard = guardId;
      minuteAsleepMost = findMode(guardMinutesAsleep[guardId]);
    }
  });

  return parseInt(sleepiestGuard, 10) * minuteAsleepMost;
}

function findMode(array) {
  if (!array || !array.length) {
    return undefined;
  }

  let maxOccurances = 1;
  let mode = array[0];
  const countOccurances = {};

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    countOccurances[item] = (countOccurances[item]) ? ++countOccurances[item] : 1;

    if (countOccurances[item] > maxOccurances) {
      maxOccurances = countOccurances[item];
      mode = item;
    }
  }

  return mode;
}
