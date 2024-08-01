let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
input = input[0].split(' ').map(Number);
let dp = [...new Array(N + 1)].fill(0);

dp[1] = input[0]; // 1
// dp[2] = // Math.max(dp[2-1] + dp[1] , input[2-1])
// dp[3] = //  Math.max(dp[3-1] + dp[1], dp[3-2] + dp[2], input[3-1])
// dp[4] = Math.max(dp[4-1] + dp[1], dp[4-2] + dp[2], dp[4-3] + dp[3],  input[4-1]) //
for (let i = 2; i <= N; i++) {
  dp[i] = input[i - 1];
  for (let j = i - 1; j >= 1; j--) {
    dp[i] = Math.max(dp[i - j] + dp[j], dp[i]);
  }
}

console.log(dp[N]);
