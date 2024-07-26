let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : __dirname + '/input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input.shift();

// 적록색약 아닌 사람이 볼 그림
let normal = [];
for (let i = 0; i < N; i++) {
  normal[i] = input[i].split('');
}

let canNotSee = [];

// 적록색약이 볼 그림. R/G 구분이 불가능하여, 모든 R -> G로
for (let i = 0; i < N; i++) {
  canNotSee[i] = input[i].replaceAll('R', 'G').split('');
}

let needTovisite = [];
let moves = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let area = 0;
let ans = [];

// 적록색약 X
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    // 방문하지 않은 경우
    if (normal[i][j] !== 1) {
      needTovisite.push([i, j, normal[i][j]]);
      BFS(normal); // BFS 돌기
      area++;
    }
  }
}
ans.push(area);

// 적록색약 O
area = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (canNotSee[i][j] !== 1) {
      needTovisite.push([i, j, canNotSee[i][j]]);
      BFS(canNotSee);
      area++;
    }
  }
}
ans.push(area);

function BFS(space) {
  while (needTovisite.length > 0) {
    let [x, y, color] = needTovisite.shift();

    for (e of moves) {
      let next_x = x + e[0];
      let next_y = y + e[1];

      if (next_x >= 0 && next_y >= 0 && next_x < N && next_y < N && space[next_x][next_y] !== 1) {
        if (color == space[next_x][next_y]) {
          needTovisite.unshift([next_x, next_y, space[next_x][next_y]]);
          space[next_x][next_y] = 1;
        }
      }
    }
  }
}

console.log(ans.join('\n'));
