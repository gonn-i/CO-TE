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

for (let i = 0; i < input.length; i++) {
  map[i] = input[i].split(' ').map(Number);
}

for (let i = 0; i < input.length; i++) {
  let [r, c] = input[i].split(' ').map(Number);
  visited[r - 1][c - 1] = true;
}
map.sort();

// console.log(map);

let dir_x = [-1, 1, 0, 0]; //상하좌우
let dir_y = [0, 0, -1, 1]; // 상하좌우
let near = [];

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

        if (nx == gx && gy == ny && visited[nx - 1][ny - 1]) {
          if (near.length == 0) near.push([x, y]);
          near.push([nx, ny]);
          needvisite.push([nx, ny]);
          j--;
          visited[nx - 1][ny - 1] = false;
          // console.log(map);
        }
      }
    }
  }
}

console.log(near.length);
