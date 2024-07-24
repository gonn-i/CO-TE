const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
const input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

const T = input[0];
const testCases = input.slice(1);
let answer = [];

for (let i = 0; i < T; i++) {
  let temp = [];
  let pick = 1;
  let nthCase = [];

  const N = testCases[i];

  nthCase.push(
    ...testCases
      .splice(i + 1, N)
      .map((e) => e.split(' ').map(Number))
      .sort(compare)
  );

  let standard = nthCase[0][1];

  for (let i = 1; i < nthCase.length; i++) {
    if (nthCase[i][1] <= standard) {
      pick++;
      standard = nthCase[i][1];
    }
  }

  answer.push(pick);
}

console.log(answer.join('\n'));

function compare(a, b) {
  return a[0] - b[0];
}
