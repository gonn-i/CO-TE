let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
let expect_same = [];
let l = 0;

for (let i = 0; i < N; i++) {
  if (!expect_same.includes(input[i])) {
    expect_same[l] = input[i];
    l++;
  }
}

expect_same.sort((a, b) => {
  if (a.length === b.length) {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return parseInt(a[i].charCodeAt(0)) - parseInt(b[i].charCodeAt(0));
      }
    }
  }
  return a.length - b.length;
});

console.log(expect_same.join('\n'));
