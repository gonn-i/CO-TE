let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [N, ...arr] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .split('\n');

arr.forEach((e) => {
  let stack = [];
  let words = e.split('');

  for (let i = 0; i < words.length; i++) {
    if (!stack.includes(words[i])) {
      stack.push(words[i]);
    } else if (stack[stack.length - 1] !== words[i]) {
      N -= 1;
      return;
    }
  }
});

console.log(N);
