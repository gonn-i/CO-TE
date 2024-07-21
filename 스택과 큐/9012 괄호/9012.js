let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let T = +input.shift();
let cases = [];
let ans = [];

for (let i = 0; i < T; i++) {
  cases[i] = input[i].split('');
}

for (let i = 0; i < T; i++) {
  let temp = [];
  for (let j = 0; j < cases[i].length; j++) {
    if (cases[i][j] == '(') temp.push(cases[i][j]);
    else {
      if (temp.pop() !== '(') {
        temp.push(cases[i][j]);
        break;
      }
    }
  }
  temp.length !== 0 ? ans.push('NO') : ans.push('YES');
}

console.log(ans.join('\n'));
