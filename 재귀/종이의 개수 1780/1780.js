let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
let paper_Arr = [];
let paper_Num = [0, 0, 0]; // 순서대로 -1 0 1 의 종이 갯수

for (let i = 0; i < N; i++) {
  paper_Arr[i] = input[i].split(' ').map(Number);
}

function recursion(x, y, S) {
  let target = paper_Arr[x][y];
  let OnePiece = true;

  for (let i = 0; i < S; i++) {
    for (let j = 0; j < S; j++) {
      if (target !== paper_Arr[x + i][y + j]) {
        OnePiece = false; // 하나의 종이가 될 수 없을때
        break;
      }
    }
  }
  if (OnePiece) {
    // 1장 카운트
    // console.log(x, y);
    // console.log(S);
    paper_Num[target + 1] += 1;
  } else {
    let mini = S / 3; // 종이 분할해줄때는 원래 N을 건들이면 X
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // console.log('재귀!!');
        // console.log([x + i * mini, y + j * mini], mini);
        recursion(x + i * mini, y + j * mini, mini);
      }
    }
  }

  return paper_Num;
}

console.log(recursion(0, 0, N).join('\n'));
