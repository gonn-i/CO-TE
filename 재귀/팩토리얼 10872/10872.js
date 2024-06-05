let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

function factorial(num) {
  if (num == 0) {
    return 1;
  }

  return num * factorial(num - 1);
}

console.log(factorial(input));
