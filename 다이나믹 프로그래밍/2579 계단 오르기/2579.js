let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n')
  .map(Number);

let T = input[0];
let dp = [...new Array(T + 1)];

dp[1] = input[1];
dp[2] = dp[1] + input[2];
dp[3] = Math.max(input[2], input[1]) + input[3];
// dp[4] = Math.max(dp[4 - 2] + input[3], dp[4 - 3] + dp[4 - 1] + input[3]);

for (let i = 4; i <= T; i++) {
  dp[i] = Math.max(dp[i - 2] + input[i], dp[i - 3] + input[i - 1] + input[i]);
}

console.log(dp[T]);
