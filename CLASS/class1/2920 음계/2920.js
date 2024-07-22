let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

let ans = ['ascending', 'descending', 'mixed'];
let flag = 0;

for (let i = 0; i < 8; i++) {
  if (i == 0) continue;
  else {
    if (input[i] - input[i - 1] == 1) flag = 0;
    else if (input[i] - input[i - 1] == -1) flag = 1;
    else {
      flag = 2;
      break;
    }
  }
}

console.log(ans[flag]);
