let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input[0];
let M = +input[1];
let S = [...input[2].split('')];
let Pn = [];
let ans = 0;
let idx = 0;

function initPn() {
  let Pn = [];
  for (let i = 0; i < N * 2 + 1; i++) {
    i % 2 == 0 ? Pn.push('I') : Pn.push('O');
  }
  return Pn;
}

Pn = initPn();

while (idx < M) {
  if (S[idx] == Pn.pop()) {
    if (Pn.length == 0) {
      ans++;
      Pn = initPn();
      idx -= 2 * (N - 1);
      continue;
    }
    idx++;
  } else {
    Pn = initPn();
    if (S[idx] !== 'I') idx++;
  }
}

console.log(ans);
