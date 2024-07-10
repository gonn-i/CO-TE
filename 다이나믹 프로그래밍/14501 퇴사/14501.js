let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');
let date = [];
const N = +input.shift();
let dp = [...new Array(N + 1)].map((_) => 0);

input.map((e) => date.push(e.split(' ').map(Number)));

for (let i = 0; i < N; i++) {
  let day = i + 1;
  let prev = 0;
  if (i + date[i][0] <= N) {
    dp[day] = Math.max(date[day - 1][1] + prev, dp[day]);
    prev = dp[day];
    day += date[day - 1][0];
    for (let j = day; j <= N; j++) {
      if (j + date[j - 1][0] <= N + 1) {
        dp[j] = Math.max(date[j - 1][1] + prev, dp[j]);
      }
    }
  }
}

console.log(Math.max(...dp));
