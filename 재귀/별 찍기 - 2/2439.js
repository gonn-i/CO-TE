let fs = require('fs');
const { arch } = require('os');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let N = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

let ans = Array.from({ length: N }, () => Array(N).fill(' '));

function recursion(n) {
  if (n < 0) return;
  for (let i = N - 1; i >= N - 1 - n; i--) ans[n][i] = '*';
  recursion(n - 1);
}

recursion(N - 1);

for (let i = 0; i < N; i++) {
  console.log(ans[i].join(''));
}
