let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

const T = +input.shift();

for (let i = 0; i < T; i++) {
  let freshMan = [];

  const N = +input[0];

  for (let n = 1; n <= N; n++) {
    freshMan[n - 1] = input[n].split(' ').map(Number);
  }
  freshMan.sort();

  let min = 100001;
  let passCount = 0;

  for (let j = 0; j < N; j++) {
    if (freshMan[j][1] < min) {
      min = freshMan[j][1];
      passCount++;
    }
  }

  console.log(passCount);
  input = input.slice(N + 1);
}
