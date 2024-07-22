let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

const T = +input.shift();
let ans = [];

for (let i = 0; i < T; i++) {
  let quiz = [];
  quiz.push(...input[i].split(''));
  let [score, point] = [0, 0];
  quiz.forEach((e) => {
    if (e == 'O') {
      point += 1;
      score += point;
    } else {
      point = 0;
    }
  });
  ans.push(score);
}

console.log(ans.join('\n'));
