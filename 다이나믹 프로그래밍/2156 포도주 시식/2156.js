let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [n, ...input] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n')
  .map(Number);

dp = [...new Array(n + 1)].map((_) => Array(3).fill(0));

// 연속 3 불가
// 현재 안마심 / 마심 / 연속 2번 마심
dp[1][0] = 0;
dp[1][1] = input[0];
dp[1][2] = 0;

for (let i = 1; i <= n; i++) {
  dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1], dp[i - 1][2]);
  dp[i][1] = dp[i - 1][0] + input[i - 1];
  dp[i][2] = dp[i - 1][1] + input[i - 1];
}

console.log(Math.max(...dp[n]));
