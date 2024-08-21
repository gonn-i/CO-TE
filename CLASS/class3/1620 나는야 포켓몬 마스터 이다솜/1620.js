let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [F, ...input] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, M] = F.split(' ').map(Number);

let memo = input.splice(0, N);
let ans = [];

let numMap = new Map();
let nameMap = new Map();

for (let i = 0; i < N; i++) {
  numMap.set(i + 1, memo[i]);
  nameMap.set(memo[i], i + 1);
}

for (let i = 0; i < M; i++) {
  if (numMap.has(Number(input[i]))) {
    ans.push(numMap.get(Number(input[i])));
  } else {
    ans.push(nameMap.get(input[i]));
  }
}

console.log(ans.join('\n'));
