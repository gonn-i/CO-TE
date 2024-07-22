let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

const T = +input.shift();
let TESTCASE = [];
let ans = [];
TESTCASE.push(...input.map((l) => l.split(' ')));

TESTCASE.forEach((e) => {
  let times = +e[0];
  let array = e[1].split('');
  let result = '';
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < times; j++) {
      result += array[i];
    }
  }
  ans.push(result);
});

console.log(ans.join('\n'));
