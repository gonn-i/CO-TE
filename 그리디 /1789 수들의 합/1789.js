let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let S = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

let n = 1;

while (S >= 0) {
  S -= n;
  if (S <= n) {
    break;
  }
  n++;
}

console.log(n);
