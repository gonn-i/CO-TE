let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, M] = input.shift().split(' ').map(Number);

let memo = new Map();
let ans = [];

for (let i = 0; i < N; i++) {
  let [url, pwd] = input[i].split(' ');
  memo.set(url, pwd);
}

for (let i = N; i < N + M; i++) {
  ans.push(memo.get(input[i]));
}

console.log(ans.join('\n'));
