let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n')
  .map(Number);

let count = 0;
const N = +input.shift();

for (let i = N - 1; i >= 0; i--) {
  if (i == 0) break;
  while (input[i] <= input[i - 1]) {
    input[i - 1] -= 1;
    count += 1;
  }
}

console.log(count);
