let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .split('\n');

let [N, M] = input.shift().split(' ').map(Number);

let visitied = [...new Array(N)].map(() => Array(M).fill(false)); // 방문 체크용
let needvisite = [];
let map = [];
let ans = [];

//미로모양 이중배열로 만들기
for (let i = 0; i < N; i++) {
  map[i] = input[i].split('').map(Number);
}

let current = [0, 0, 1]; // 열, 행, 움직인칸수
let next_x = [-1, 1, 0, 0]; // 상 하 좌 우
let next_y = [0, 0, -1, 1]; // 상 하 좌 우

needvisite.push(current);
visitied[0][0] = true; // 방문표시

while (needvisite.length > 0) {
  // console.log(needvisite);
  let [x, y, move] = needvisite.shift();
  if (x == N - 1 && y == M - 1) {
    ans.push(move); //(N,M)에 도달한 경우
    break;
  }

  for (let i = 0; i < 4; i++) {
    let nx = x + next_x[i];
    let ny = y + next_y[i];
    let nm = move + 1;
    // 주어진 map안에 들어가고 && 1인 곳이며 && 아직 방문 안 한 곳
    if (nx >= 0 && nx < N && ny >= 0 && ny < M && map[nx][ny] == 1 && !visitied[nx][ny]) {
      current = [nx, ny, nm]; // 방문가능한 곳 초기화
      // console.log(current);
      needvisite.push(current); // 큐에 넣어줌
      visitied[nx][ny] = true; // 방문표시
    }
  }
}

// console.log(ans);
console.log(Math.min(ans));
