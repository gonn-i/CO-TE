let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, M] = input.shift().split(' ').map(Number);

let map = [];
for (let i = 0; i < N; i++) {
  map[i] = input[i].split('');
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M - 1; j++) {
    let prev = map[i][j];
    let next = map[i][j + 1];
  }
}
