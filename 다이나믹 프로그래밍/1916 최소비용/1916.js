let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [N, M, ...input] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [S, E] = input[input.length - 1].split(' ').map(Number);
let path = [];

let dp = new Array(+N + 1).fill(Infinity);

for (let i = 0; i < +M; i++) {
  path.push(input[i].split(' ').map(Number));
}

path.sort();

dp[S] = 0;

// dp 첫 시작점 세팅
for (let i = 0; i < +M; i++) {
  if (path[i] && path[i][0] === S) {
    let end = path[i][1];
    let cost = path[i][2];
    dp[end] = Math.min(cost, dp[end]);
    path[i][1] = 0;
  }
}

for (let n = 0; n < +M; n++) {
  let [start, end, cost] = path[n];
  dp[end] = Math.min(dp[end], dp[start] + cost);
}

console.log(dp);
console.log(dp[E]);
