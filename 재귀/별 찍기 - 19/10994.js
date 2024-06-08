let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let N = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

let ans = [...new Array(4 * N - 3)].map(() => new Array(4 * N - 3));

function recursion(N, R) {
  if (N == 0) {
    return;
  }

  let repeat = 4 * N - 3;
  for (let i = R; i < repeat + R; i++) {
    for (let j = R; j < repeat + R; j++) {
      if (i == R || j == R || i == repeat + R - 1 || j == repeat + R - 1) {
        ans[i][j] = '*';
      } else ans[i][j] = ' ';
    }
  }
  recursion(N - 1, R + 2);
}

recursion(N, 0);

for (let i = 0; i < 4 * N - 3; i++) {
  console.log(ans[i].join(''));
}
