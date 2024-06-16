let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, K] = input.shift().split(' ').map(Number);

input = input.map(Number);

let count = 0;

for (let i = N - 1; i >= 0; i--) {
  if (K / input[i] !== 0) {
    count += Math.floor(K / input[i]);
    K = K % input[i];
  }
}

console.log(count);
