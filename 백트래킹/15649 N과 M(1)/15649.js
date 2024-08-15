const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [N, M] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

let ans = [];
let each = [];
let visited = [...new Array(N + 1)].fill(false);

function DFS(count) {
  if (count == M) {
    // 재귀탈출 조건
    let str = each.join(' ');
    ans.push([str]);
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (visited[i]) {
      continue;
    }
    each.push(i);
    visited[i] = true;
    DFS(count + 1);
    each.pop();
    visited[i] = false;
  }
}

DFS(0);

console.log(ans.join('\n'));
