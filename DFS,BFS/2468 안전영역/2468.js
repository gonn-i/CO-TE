const { count } = require('console');
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
let max_arr = [];
let map = [];

for (let i = 0; i < N; i++) {
  map[i] = input[i].split(' ').map(Number);
  max_arr.push(Math.max(...map[i]));
}

let max = Math.max(...max_arr);

// console.log(map);

// 상하좌우 이동용
let dir_x = [-1, 1, 0, 0];
let dir_y = [0, 0, -1, 1];

let safe_area = [];

for (let i = 0; i <= max; i++) {
  let flood = [...Array(N)].map(() => Array(N).fill(true)); // 침수여부 & 방문야부 체크용
  let needvisite = [];
  let each_count = 0;
  let total_count = 0;

  // 물에 잠겼는지 여부 체크
  for (let n = 0; n < N; n++) {
    for (let m = 0; m < N; m++) {
      if (i >= map[n][m]) {
        flood[n][m] = false;
      }
    }
  }

  // console.log(i + '번째 침수');
  // console.log(flood);

  for (let n = 0; n < N; n++) {
    for (let m = 0; m < N; m++) {
      if (flood[n][m]) {
        needvisite.push([n, m]);
        flood[n][m] = false;
        each_count = 1;

        while (needvisite.length > 0) {
          let [x, y] = needvisite.shift();
          for (let d = 0; d < 4; d++) {
            let nx = x + dir_x[d];
            let ny = y + dir_y[d];

            if (nx >= 0 && nx < N && ny >= 0 && ny < N && flood[nx][ny]) {
              needvisite.push([nx, ny]);
              flood[nx][ny] = false;
            }
          }
        }
        total_count += each_count;
      }
    }
  }
  safe_area.push(total_count);
}

console.log(Math.max(...safe_area));
