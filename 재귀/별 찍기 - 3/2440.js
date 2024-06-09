let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let N = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

let ans = [...new Array(N)].map(() => Array(N));

function recursion(n) {
  if (n < 0) return;
  for (let i = 0; i <= N - n - 1; i++) ans[n][i] = '*';

  recursion(n - 1);
}

recursion(N - 1);

for (let i = 0; i < N; i++) {
  console.log(ans[i].join(''));
}
