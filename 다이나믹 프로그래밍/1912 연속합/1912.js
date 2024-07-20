let fs = require('fs');
let filePath = process.platform == 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let n = +input.shift();
let N_array = [];
N_array = input[0].split(' ').map(Number);

let dp = [...new Array(n + 1)].map((_) => -Infinity);

dp[1] = N_array[0];

for (let i = 2; i <= n; i++) {
  dp[i] = Math.max(N_array[i - 1], dp[i - 1] + N_array[i - 1]);
}

console.log(Math.max(...dp));
