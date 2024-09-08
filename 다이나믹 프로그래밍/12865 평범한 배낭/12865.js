let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let things = [];
const [N, K] = input.shift().split(' ').map(Number);

for (let i = 0; i < N; i++) {
  things[i] = input[i].split(' ').map(Number);
}

let dp = [...new Array(N + 1)].map((_) => new Array(K + 1).fill(0));

for (let i = 1; i <= N; i++) {
  let [weight, value] = things[i - 1];
  for (let j = 1; j <= K; j++) {
    // if 최대하중 7 & weight: 6 이라면  => 6, 7 넣을 수 있음
    if (j - weight >= 0) {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight] + value); // 이전 값 or 하나 더 넣기
    } else {
      dp[i][j] = dp[i - 1][j]; // 넣을 수 없다면, 이전 값 유지
    }
  }
}

console.log(Math.max(...dp[N]));
