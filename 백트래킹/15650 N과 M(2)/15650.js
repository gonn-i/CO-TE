const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [N, M] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

let each = [];
let ans = [];
let visited = [...new Array(N + 1)].fill(false);

function NnM(idx, count) {
  if (count == M) {
    let str = each.join(' ');
    ans.push([str]);
  }

  for (let i = idx; i <= N; i++) {
    if (visited[i]) {
      continue;
    }
    each.push(i);
    visited[i] = true;
    NnM(i, count + 1);
    each.pop();
    visited[i] = false;
  }
}

NnM(1, 0);

console.log(ans.join('\n'));
