let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n')
  .map(Number);

let ans = [];

input.forEach((e) => {
  if (!ans.includes(e % 42)) {
    ans.push(e % 42);
  }
});

console.log(ans.length);
