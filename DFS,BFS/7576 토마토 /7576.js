let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : __dirname + '/input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [M, N] = input.shift().split(' ').map(Number);

let tomato = [];
let needToVisit = [];
let ans = 0;
let moves = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// 토마토 상태 초기화
for (let i = 0; i < N; i++) {
  tomato[i] = input[i].split(' ').map(Number);
}

// 익은 토마토의 위치를 큐에 추가
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (tomato[i][j] === 1) {
      needToVisit.push([i, j, 0]);
    }
  }
}

let front = 0;
// BFS
while (front < needToVisit.length) {
  let [x, y, n] = needToVisit[front++]; // shif 대신 인덱스로 뽑아내기
  ans = n;
  for (let [dx, dy] of moves) {
    let next_x = x + dx;
    let next_y = y + dy;
    if (next_x >= 0 && next_x < N && next_y >= 0 && next_y < M && tomato[next_x][next_y] === 0) {
      needToVisit.push([next_x, next_y, n + 1]);
      tomato[next_x][next_y] = 1;
    }
  }
}

// 익지 않은 토마토가 있는지 확인
for (let i = 0; i < N; i++) {
  if (tomato[i].includes(0)) {
    console.log(-1);
    return;
  }
}

console.log(ans);
