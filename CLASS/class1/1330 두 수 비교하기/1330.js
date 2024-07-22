let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

const [A, B] = input.split(' ').map(Number);

console.log(A == B ? '==' : A > B ? '>' : '<');
