let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [N, M] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split(' ');

let ans = [];
let array = [];

function DFS(temp, count) {
  if (count == M) {
    let str = temp.join(' ');
    ans.push([str]);
    return;
  }

  for (let i = 1; i <= N; i++) {
    temp.push(i);
    DFS(temp, count + 1);
    temp.pop();
  }
}

DFS(array, 0);

console.log(ans.join('\n'));
