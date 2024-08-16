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
let visited = Array(N).fill(false);
let ans = [];
let each = [];

function NnM(count) {
  if (count == M) {
    ans.push(each.join(' '));
    return;
  }

  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    each.push(input[i]);
    NnM(count + 1);
    each.pop();
    visited[i] = false;
  }
}

NnM(0);

ans = [...new Set(ans)];
// 문자열 오름차순으로 정렬
ans.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

console.log(ans.join('\n'));
