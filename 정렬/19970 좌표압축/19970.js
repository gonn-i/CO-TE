let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

input.shift();
let array = input[0].split(' ').map(Number);
let copy = [...new Set(array)].sort((a, b) => a - b); // 중복 제거
let ans = '';
let dic = {};

copy.map((e, i) => {
  dic[e] = i;
});

array.forEach((e) => {
  ans += `${dic[e]} `;
});

console.log(ans);
