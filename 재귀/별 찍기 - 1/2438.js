let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let N = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();
let ans = [...new Array(N)].map(() => Array(N));
function recursion(N) {
  // 탈출조건
  if (N == 0) {
    return;
  }
  for (let i = N - 1; i >= 0; i--) ans[N - 1][i] = '*';
  recursion(N - 1);
}

recursion(N);

for (let i = 0; i < N; i++) {
  console.log(ans[i].join(''));
}
