let fs = require('fs');
const { dirname } = require('path');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const K = +input.shift();
let rightNum = [];
let ans = 0;

for (let i = 0; i < K; i++) {
  if (input[i] == 0) {
    rightNum.pop();
  } else {
    rightNum.push(input[i]);
  }
}

rightNum.forEach((e) => (ans += e));
console.log(ans);
