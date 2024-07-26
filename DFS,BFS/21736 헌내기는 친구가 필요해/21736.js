let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
// let input = fs.readFileSync(0, 'utf-8').toString().trim().split('\n');
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, M] = input.shift().split(' ').map(Number);
let campus = [];
for (let i = 0; i < N; i++) {
  campus[i] = input[i].split('');
}

let needToVisit = [];
let moves = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

let ans = 0;
let front = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (campus[i][j] == 'I') {
      needToVisit.push([i, j]);
      campus[i][j] = 'X';
      while (front < needToVisit.length) {
        let [x, y] = needToVisit[front++];

        for (m of moves) {
          let nx = x + m[0];
          let ny = y + m[1];

          if (nx >= 0 && nx < N && ny >= 0 && ny < M && campus[nx][ny] !== 'X') {
            if (campus[nx][ny] === 'P') ans++;
            needToVisit.push([nx, ny]);
            campus[nx][ny] = 'X';
          }
        }
      }
    }
  }
}

console.log(ans == 0 ? 'TT' : ans);
