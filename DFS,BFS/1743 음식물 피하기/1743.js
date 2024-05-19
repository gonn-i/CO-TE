let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, M, K] = input.shift().split(' ').map(Number);
let map = [];
let visited = [...new Array(N)].map(() => Array(M).fill(false));
let needvisite = [];
let count = 1;

for (let i = 0; i < input.length; i++) {
  map[i] = input[i].split(' ').map(Number);
}

for (let i = 0; i < input.length; i++) {
  // 쓰레기가 있는 곳 체크 + 방문 기록용
  let [r, c] = input[i].split(' ').map(Number);
  visited[r - 1][c - 1] = true;
}
map.sort();

let dir_x = [-1, 1, 0, 0]; //상하좌우
let dir_y = [0, 0, -1, 1]; // 상하좌우
let near = []; // 모여있는 쓰레기의 갯수를 담을 배열

// bfs
for (let k = 0; k < map.length; k++) {
  needvisite.push(map.shift());
  k--;

  while (needvisite.length > 0) {
    let [x, y] = needvisite.shift();
    visited[x - 1][y - 1] = false;
    for (let i = 0; i < 4; i++) {
      let nx = x + dir_x[i];
      let ny = y + dir_y[i];

      for (let j = 0; j < map.length; j++) {
        let [gx, gy] = map[j];
        // x,y 에서 상하좌우로 이동하여, map에 있는 배열에 있으면서 아직 방문하지 않은 곳
        if (nx == gx && gy == ny && visited[nx - 1][ny - 1]) {
          if (near.length == 0) near.push([x, y]);
          count++;
          needvisite.push([nx, ny]);
          j--;
          visited[nx - 1][ny - 1] = false;
        }
      }
    }
  }
  near.push(count);
  count = 1;
}

console.log(near);
console.log(Math.max(...near));
