let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split(' ');

let [A, B] = input.map(Number);
let ans = 1;

while (B !== A && A <= B) {
  let splitedB = B.toString().split('');

  if (splitedB[splitedB.length - 1] == 1) {
    splitedB.pop();
    B = Number(splitedB.join(''));
    ans++;
  } else {
    B /= 2;
    ans++;
  }
}

console.log(A == B ? ans : -1);
