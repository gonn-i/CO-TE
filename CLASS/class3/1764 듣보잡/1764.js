let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [F, ...input] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, M] = F.split(' ').map(Number);

let notHear = input.splice(0, N);
let notSee = input;

let names = [];
let count = 0;

let nothearMap = new Map();

notHear.map((e, i) => {
  nothearMap.set(e, i);
});

notSee.map((e) => {
  if (nothearMap.has(e)) {
    count++;
    names.push(e);
  }
});

console.log(count);
console.log(names.sort().join('\n'));
