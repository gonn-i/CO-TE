let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, L] = input.shift().split(' ').map(Number);
let fruits = [];

for (let i = 0; i < N; i++) {
  fruits = input[0].split(' ').map(Number);
}

fruits.sort((a, b) => a - b);

fruits.forEach((e) => {
  if (L >= e) L++;
  else return;
});

console.log(L);
