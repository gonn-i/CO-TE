let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let N = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

let turn = Math.floor(N / 3);
turn += N % 3;

console.log(turn % 2 == 1 ? 'SK' : 'CY');
