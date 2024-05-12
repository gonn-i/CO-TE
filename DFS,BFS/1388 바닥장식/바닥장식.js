let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .split('\n');

let [N, M] = input.shift().split(' ');
let count = 0;
let floor = [];
let flag = false; // 같은지 여부 (쓰루 or Not)

// 나무판자 이중배열로 재구성
for (let i = 0; i < N; i++) {
  floor[i] = input[i].split('');
  for (let j = 0; j < M; j++) {}
}
// let n = 1;
// console.log(floor);

// '-' 먼저 탐색
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (floor[i][j] == '-') {
      flag = true; // '-' 뒤에 또 나오면 쓰루
    }
    if (floor[i][j] == '|' && flag) {
      // '-'가 전에 나왔으나 뒤에는 다를 경우
      flag = false;
      count++;
    }
    // console.log(n, count);
    // n++;
  }
  if (flag) {
    // 만약 특정행의 마지막이 - 인 경우 뒤에 뭐가 오든 +1
    count++;
    flag = false;
  }
}

// console.log(count); // '-' 판자 수 체크
flag = false;

// '|' 탐색 이번엔 열 단위로 탐색
for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (floor[j][i] == '|') {
      flag = true;
    } else if (floor[j][i] == '-' && flag) {
      count++;
      flag = false;
    }
  }
  if (flag) {
    count++;
    flag = false;
  }
}

console.log(count); // 전체 판자 수 체크
