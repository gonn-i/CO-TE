let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
let houses = [];
let dp = [...new Array(N + 1)].map((_) => []);
for (let i = 0; i < N; i++) {
  houses[i] = input[i].split(' ').map(Number);
}

dp[1][0] = houses[0][0];
dp[1][1] = houses[0][1];
dp[1][2] = houses[0][2];

for (let i = 2; i <= N; i++) {
  dp[i][0] = Math.min(dp[i - 1][1] + houses[i - 1][0], dp[i - 1][2] + houses[i - 1][0]);
  dp[i][1] = Math.min(dp[i - 1][0] + houses[i - 1][1], dp[i - 1][2] + houses[i - 1][1]);
  dp[i][2] = Math.min(dp[i - 1][0] + houses[i - 1][2], dp[i - 1][1] + houses[i - 1][2]);
}

console.log(Math.min(...dp[N]));
