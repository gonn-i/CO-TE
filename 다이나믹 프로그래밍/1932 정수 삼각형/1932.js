let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

const n = +input.shift();
let tri = [];
let dp = [...new Array(n + 1)].map(() => new Array(n + 1).fill(0));

for (let i = 0; i < n; i++) {
  tri[i + 1] = input[i].split(' ').map(Number);
}

dp[1] = tri[1];

for (let i = 2; i <= n; i++) {
  for (let j = 0; j < i; j++) {
    if (j == 0) {
      dp[i][j] = dp[i - 1][j] + tri[i][j];
    } else if (j == i - 1) {
      dp[i][j] = dp[i - 1][j - 1] + tri[i][j];
    } else {
      dp[i][j] = Math.max(dp[i - 1][j] + tri[i][j], dp[i - 1][j - 1] + tri[i][j]);
    }
  }
}

console.log(Math.max(...dp[n]));
