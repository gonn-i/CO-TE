let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, M] = input.shift().split(' ').map(Number);
input = input[0]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

let ans = [];
let each = [];
let visited = [...new Array(N)].fill(false);

function DFS(count) {
  if (count == M) {
    let str = each.join(' ');
    ans.push([str]);
    return;
  }

  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    each.push(input[i]);
    DFS(count + 1);
    visited[i] = false;
    each.pop();
  }
}

DFS(0);

console.log(ans.join('\n'));
