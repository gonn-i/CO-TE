let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let split_by_minus = input[0].split('-');
let split_by_plus = [];
let result = 0;

for (let i = 0; i < split_by_minus.length; i++) {
  split_by_plus[i] = split_by_minus[i].split('+').map(Number);
}

for (let i = 0; i < split_by_minus.length; i++) {
  let sum = 0;
  split_by_plus[i].forEach((e) => {
    sum += e;
  });
  if (i == 0) result += sum;
  else {
    result -= sum;
  }
}

console.log(result);
