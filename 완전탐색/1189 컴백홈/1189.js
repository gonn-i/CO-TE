let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [R, C, K] = input.shift().split(' ').map(Number);
let visited = [...Array(R)].map(() => Array(C).fill(true));
let needvisite = [];
let map = [];
let x_dir = [-1, 1, 0, 0]; //상하좌우
let y_dir = [0, 0, -1, 1];
let ans = 0;

for (let i = 0; i < R; i++) {
  map[i] = input[i].split('');
}

visited[R - 1][0] = false;

function DFS(x, y, m) {
  console.log(x, y, m);
  if (x == 0 && y == C - 1) {
    if (m == K) {
      ans++;
      console.log('증가!');
      return;
    }
  }
  for (let i = 0; i < 4; i++) {
    let nx = x + x_dir[i];
    let ny = y + y_dir[i];

    if (nx >= 0 && nx < R && ny >= 0 && ny < C && visited[nx][ny] && map[nx][ny] !== 'T') {
      visited[nx][ny] = false;
      DFS(nx, ny, m + 1);
      console.log(nx, ny, m + 1);
      visited[nx][ny] = true;
      console.log('백트래킹');
    }
  }
}

DFS(R - 1, 0, 1);
console.log(ans);
