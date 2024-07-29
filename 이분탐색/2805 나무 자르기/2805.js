let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, M] = input.shift().split(' ').map(Number);
let sum = 1000000;
let ans = 0;
input = [...input[0].split(' ').map(Number)];

input.sort((a, b) => b - a);

function IsClose(m) {
  let temp = 0;
  for (let i = 0; i < N; i++) {
    if (input[i] - m > 0) temp += input[i] - m;
    else break;
  }
  if (Math.abs(M - temp) >= Math.abs(M - temp)) {
    if (temp - M >= 0) {
      sum = temp;
      ans = m;
    }
  }
  return temp - M >= 0 ? true : false;
}
let end = input[0];
let start = 0;

while (end >= start) {
  let mid = Math.floor((start + end) / 2);
  if (IsClose(mid)) {
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}

console.log(ans);
