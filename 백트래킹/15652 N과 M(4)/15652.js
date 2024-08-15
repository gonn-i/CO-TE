let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [N, M] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split(' ');

let ans = [];
let array = [];

function DFS(temp, idx, count) {
  if (count == M) {
    let str = temp.join(' ');
    ans.push([str]);
    return;
  }

  for (let i = idx; i <= N; i++) {
    temp.push(i);
    DFS(temp, i, count + 1);
    temp.pop();
  }
}

DFS(array, 1, 0);

console.log(ans.join('\n'));
