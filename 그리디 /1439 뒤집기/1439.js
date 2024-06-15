let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

let split_by_zero = [];
let split_by_one = [];

split_by_zero = input.split('0');
split_by_one = input.split('1');

let count_zero = 0;
let count_one = 0;

for (let i = 0; i < split_by_one.length; i++) {
  if (split_by_one[i].includes('0')) count_zero += 1;
}

for (let i = 0; i < split_by_zero.length; i++) {
  if (split_by_zero[i].includes('1')) count_one += 1;
}

console.log(Math.min(count_one, count_zero));
