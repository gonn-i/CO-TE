const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, S] = input.shift().split(' ').map(Number);
input = input[0].split(' ').map(Number);
let visited = [...new Array(N)].fill(false);
let ans = 0;

function DFS(idx, sum, count) {
  if (sum === S && count > 0) {
    ans += 1;
  }

  for (let i = idx; i < N; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    sum += input[i];
    DFS(i, sum, count + 1);
    visited[i] = false;
    sum -= input[i];
  }
}

DFS(0, 0, 0);

console.log(ans);
