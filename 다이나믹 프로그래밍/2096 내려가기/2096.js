let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input.shift();
let board = [];
for (let i = 0; i < N; i++) {
  board[i] = input[i].split(' ').map(Number);
}

let dp_max = [...new Array(2)].map((_) => Array(3).fill(0));
let dp_min = [...new Array(2)].map((_) => Array(3).fill(0));

dp_max[0][0] = board[0][0];
dp_max[0][1] = board[0][1];
dp_max[0][2] = board[0][2];

dp_min[0][0] = board[0][0];
dp_min[0][1] = board[0][1];
dp_min[0][2] = board[0][2];

for (let i = 2; i <= N; i++) {
  dp_max[1][0] = Math.max(dp_max[0][0] + board[i - 1][0], dp_max[0][1] + board[i - 1][0]);
  dp_min[1][0] = Math.min(dp_min[0][0] + board[i - 1][0], dp_min[0][1] + board[i - 1][0]);

  dp_max[1][1] = Math.max(
    dp_max[0][0] + board[i - 1][1],
    dp_max[0][1] + board[i - 1][1],
    dp_max[0][2] + board[i - 1][1]
  );
  dp_min[1][1] = Math.min(
    dp_min[0][0] + board[i - 1][1],
    dp_min[0][1] + board[i - 1][1],
    dp_min[0][2] + board[i - 1][1]
  );

  dp_max[1][2] = Math.max(dp_max[0][1] + board[i - 1][2], dp_max[0][2] + board[i - 1][2]);
  dp_min[1][2] = Math.min(dp_min[0][1] + board[i - 1][2], dp_min[0][2] + board[i - 1][2]);

  dp_max[0][0] = dp_max[1][0];
  dp_max[0][1] = dp_max[1][1];
  dp_max[0][2] = dp_max[1][2];

  dp_min[0][0] = dp_min[1][0];
  dp_min[0][1] = dp_min[1][1];
  dp_min[0][2] = dp_min[1][2];
}

console.log(Math.max(...dp_max[1]));
console.log(Math.min(...dp_min[1]));
