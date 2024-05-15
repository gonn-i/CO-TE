let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .split('\n');

let [N, M] = input.shift().split(' ');

console.log(N, M);

let visitied = [];
let needvisite = [];
let map = [];

// 미로모양 이중배열로 만들기
for (let i = 0; i < N; i++) {
  map[i] = input[i].split('').map(Number);
}

needvisite.push([0, 0]);
map[0][0] = 0;

//dfs로 풀어야겠다
while (needvisite.length > 0) {
  let target = needvisite.shift();
  if (!visitied.includes(target)) {
    visitied.push(target);
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (
          map[i][j] == 1 &&
          ((target[0] + 1 == i && target[1] == j) ||
            (target[0] - 1 == i && target[1] == j) ||
            (target[0] == i && target[1] - 1 == j) ||
            (target[0] == i && target[1] + 1 == j))
        ) {
          if (i == N - 1 && j == M - 1) {
            console.log(visitied.length + 1);
          }
          map[i][j] = 0;
          needvisite.unshift([i, j]);
        }
      }
    }
  }
}
// console.log(map);
// console.log(visitied);
