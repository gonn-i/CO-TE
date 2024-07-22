let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let N = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

let ans = [];
for (let i = 1; i <= N; i++) {
  ans.push(i);
}

console.log(ans.join('\n'));
