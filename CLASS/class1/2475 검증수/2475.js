let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

let power_sum = 0;
input.forEach((e) => (power_sum += e * e));
console.log(power_sum % 10);
