let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [M, N, H] = input.shift().split(' ').map(Number);
let container = [...input.map((e) => e.split(' ').map(Number))];

let containers = [];

for (let i = 0; i < H; i++) {
  containers.push(container.splice(0, N));
}

let needToVisit = [];
let moves = [
  // 윗상자, 아랫상자, 상, 하, 좌,우
  [-1, 0, 0],
  [1, 0, 0],
  [0, -1, 0],
  [0, 1, 0],
  [0, 0, -1],
  [0, 0, 1],
];
let ans = 0;

for (let h = 0; h < H; h++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (containers[h][i][j] == 1) {
        needToVisit.push([h, i, j, 0]);
      }
    }
  }
}
let idx = 0;

while (needToVisit.length > idx) {
  let [h, x, y, n] = needToVisit[idx++];
  for (let i = 0; i < 6; i++) {
    let n_h = h + moves[i][0];
    let n_x = x + moves[i][1];
    let n_y = y + moves[i][2];
    ans = n;
    if (n_x >= 0 && n_y >= 0 && n_x < N && n_y < M && n_h >= 0 && n_h < H && containers[n_h][n_x][n_y] == 0) {
      containers[n_h][n_x][n_y] = 1;
      needToVisit.push([n_h, n_x, n_y, n + 1]);
    }
  }
}

let flag = false;

for (let h = 0; h < H; h++) {
  for (let i = 0; i < N; i++) {
    if (containers[h][i].includes(0)) {
      flag = true;
    }
  }
}

console.log(flag ? '-1' : ans);
