let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let ans = 0;
const N = +input.shift();
const A = input.shift().split(' ').map(Number);
const B = input.shift().split(' ').map(Number);

const sorted_B = B.sort((a, b) => a - b);
const sorted_A = A.sort((a, b) => b - a);

for (let i = 0; i < N; i++) {
  let sum = A[i] * B[i];
  ans += sum;
}

console.log(ans);
