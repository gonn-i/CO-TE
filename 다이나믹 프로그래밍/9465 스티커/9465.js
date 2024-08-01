let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let T = +input.shift();
let ans = '';

while (T > 0) {
  let n = +input.shift();
  let line1 = input.shift().split(' ').map(Number);
  let line2 = input.shift().split(' ').map(Number);

  let dp = [...new Array(n + 1)].map((_) => []);

  dp[1][0] = line1[0];
  dp[1][1] = line2[0];
  dp[1][2] = 0;

  for (let i = 2; i <= n; i++) {
    dp[i][0] = Math.max(dp[i - 1][1] + line1[i - 1], dp[i - 1][2] + line1[i - 1]); // 윗줄 스티커를 뜯는 경우
    dp[i][1] = Math.max(dp[i - 1][0] + line2[i - 1], dp[i - 1][2] + line2[i - 1]); // 아랫줄 스티커를 뜯는 경우
    dp[i][2] = Math.max(dp[i - 1][0], dp[i - 1][1]); // 스티커 안 뜯고 throw , so + 0
  }

  ans += `${Math.max(...dp[n])}\n`;
  T--;
}

console.log(ans);
