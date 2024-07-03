let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let N = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

let dp = [];

dp[1] = 0;
dp[2] = dp[1] + 1;
dp[3] = dp[1] + 1;
// dp[4] = dp[4-1] + 1 || dp[4/2] + 1
// dp[5] = dp[5-1] + 1
// dp[6] = dp[6-1] + 1 || dp[6/2] + 1 || dp[6/3] + 1

for (let i = 4; i <= N; i++) {
  if (i % 3 == 0) {
    dp[i] = Math.min(dp[i - 1] + 1, dp[i / 3] + 1);
  }
  if (i % 2 == 0) {
    dp[i] = Math.min(dp[i - 1] + 1, dp[i / 2] + 1);
  }
  if (i % 2 == 0 && i % 3 == 0) {
    dp[i] = Math.min(dp[i - 1] + 1, dp[i / 2] + 1, dp[i / 3] + 1);
  }
  if (i % 2 !== 0 && i % 3 !== 0) {
    dp[i] = dp[i - 1] + 1;
  }
}

console.log(dp[N]);
