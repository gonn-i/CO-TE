let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let N = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

// 상 창 상 창 상
// 상상상 창 상
// 상 창창창 상

let turn = Math.floor(N / 3); // turn이 홀수면 SK, 짝수이면 CY
turn += N % 3;

console.log(turn % 2 == 1 ? 'SK' : 'CY');
