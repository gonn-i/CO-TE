let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const T = input.shift();
const dp = [...new Array(12)].map((_) => 0);
let ans = [];

dp[1] = 1;
dp[2] = 2;
dp[3] = 4;

for (let i = 4; i <= 11; i++) {
  dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
}
for (let i = 0; i < T; i++) {
  ans.push(dp[input[i]]);
}

console.log(ans.join('\n'));
