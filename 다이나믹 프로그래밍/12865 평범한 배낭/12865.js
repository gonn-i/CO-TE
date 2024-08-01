let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let things = [];
const [N, K] = input.shift().split(' ').map(Number);
for (let i = 0; i < N; i++) {
  things[i] = input[i].split(' ').map(Number);
}

let dp = [...new Array(K + 1)].map((_) => 0);

for (let i = 0; i < N; i++) {
  let weight = things[i][0];
  if (weight <= K) {
    dp[weight] = things[i][1];
  }
}

console.log(dp);
