let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let N = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

let ans = [...new Array(N)].map(() => Array(N).fill('*'));

function recursion(n, x, y) {
  if (n == 1) return;

  let r = n / 3;
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < r; j++) {
      ans[x + r + i][y + r + j] = ' ';
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      recursion(r, x + i * r, y + j * r);
    }
  }
}

recursion(N, 0, 0);
for (let i = 0; i < N; i++) {
  console.log(ans[i].join(''));
}
