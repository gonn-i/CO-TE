let fs = require('fs');
const { arch } = require('os');
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

let current = [R - 1, 0, 1];

for (let i = 0; i < R; i++) {
  map[i] = input[i].split('');
}

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (input[i][j] == 'T') {
      visited[i][j] = false;
    }
  }
}

needvisite.push(current);
visited[R - 1][0] = false;

while (needvisite.length > 0) {
  let [x, y, m] = needvisite.shift();
  for (let i = 0; i < 4; i++) {
    let nx = x + x_dir[i];
    let ny = y + y_dir[i];

    if (nx >= 0 && nx < R && ny >= 0 && ny < C && visited[nx][ny]) {
      if (nx == 0 && ny == C - 1 && m + 1 == K) {
        visited[nx][ny] = true;
        ans++;
      } else if (nx == 0 && ny == C - 1 && m + 1 > K) {
        continue;
      } else {
        visited[nx][ny] = false;
        needvisite.unshift([nx, ny, m + 1]);
        visited[nx][ny] = true;
      }
    }
  }
}

console.log(ans);
