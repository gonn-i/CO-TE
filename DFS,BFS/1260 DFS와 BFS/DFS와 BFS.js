let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .split('\n');

let [N, M, V] = input.shift().split(' ');

// console.log(N, M, V);
let bfs = [];
let dfs = [];
let needVisite = []; //방문해야 할 수
let visited = []; //이미 방문한 수
let linked = [];

needVisite.push(V); // 가장 먼저 방문해야 할 값 삽입

// 입력값 이중배열로 만들어주기
for (let i = 0; i < M; i++) {
  let [dot1, dot2] = input[i].split(' ');
  bfs.push([dot1, dot2]);
}

bfs.sort();

dfs = bfs.slice();

//DFS -> 깊이 우선 탐색
while (needVisite.length !== 0) {
  target = needVisite.shift();
  if (!visited.includes(target)) {
    visited.push(target);
    for (let i = 0; i < M; i++) {
      if (dfs[i][0] == target) {
        linked.push(dfs[i][1]);
      }
      if (dfs[i][1] == target) {
        linked.push(dfs[i][0]);
      }
    }
    // console.log('같은 값', linked);
    needVisite = [...linked, ...needVisite];
    linked = [];
    // console.log(needVisite);
  }
}

// console.log(bfs);
// console.log(dfs);
console.log(visited.join(' '));

needVisite = []; //방문해야 할 수
visited = []; //이미 방문한 수

needVisite.push(V);

// BFS -> 너비 우선 탐색
while (needVisite.length !== 0) {
  let target = needVisite.shift();
  if (!visited.includes(target)) {
    visited.push(target);
    for (let i = 0; i < M; i++) {
      if (bfs[i][0] == target) {
        needVisite.push(bfs[i][1]);
      }

      if (bfs[i][1] == target) {
        needVisite.push(bfs[i][0]);
      }
    }
  }
}

console.log(visited.join(' '));
