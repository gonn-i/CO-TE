let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
let paper_Arr = [];
let paper_Num = [0, 0]; // 0인 종이 1인 종이 갯수

for (let i = 0; i < N; i++) {
  paper_Arr[i] = input[i].split(' ').map(Number);
}

function recursion(x, y, S) {
  let target = paper_Arr[x][y];
  let same = true;

  for (let i = 0; i < S; i++) {
    for (let j = 0; j < S; j++) {
      if (target !== paper_Arr[x + i][y + j]) {
        same = false;
        break;
      }
    }
  }

  if (same) {
    paper_Num[target] += 1;
    return paper_Num;
  }

  let divison = Math.floor(S / 2);
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      recursion(x + i * divison, y + j * divison, divison);
    }
  }
  return paper_Num;
}

recursion(0, 0, N);
console.log(paper_Num.join('\n'));
