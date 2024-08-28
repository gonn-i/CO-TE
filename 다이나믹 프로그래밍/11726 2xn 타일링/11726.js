let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let n = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

dp = [...new Array(n + 1)].fill(0);

dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= n; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
}

console.log(dp[n]);
