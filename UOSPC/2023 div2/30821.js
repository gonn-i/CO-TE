// 별자리가 될 수 있다면
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

let ans = 1;
for (i = input[0]; i > input[0] - 5; i--) {
  ans *= i;
}

for (i = 6; i >= 4; i--) {
  ans /= i;
}

console.log(ans);
