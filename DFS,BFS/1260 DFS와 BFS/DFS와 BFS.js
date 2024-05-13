let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, M, V] = input.shift().split(' ').map(Number);

let graph = [...new Array(N + 1)].map((e) => []);
let needVisite = []; //방문해야 할 수
let visited = []; //이미 방문한 수

//그래프로 만들어주기
for (let i = 0; i < M; i++) {
  let [dot1, dot2] = input[i].split(' ').map(Number);
  graph[dot1].push(dot2);
  graph[dot2].push(dot1);
}

needVisite.push(V); // 가장 먼저 방문해야 할 값 삽입

// sort하면 안됨 -> 빈배열에서 sort 돌리면 typeError
// console.log(graph);

//DFS -> 깊이 우선 탐색
while (needVisite.length !== 0) {
  target = needVisite.shift();
  if (!visited.includes(target)) {
    visited.push(target);
    if (graph[target]) {
      let insert = graph[target].sort((a, b) => a - b); // 걍 sort하면 안됨
      needVisite = [...insert, ...needVisite];
    }
  }
}

console.log(visited.join(' '));

needVisite = []; //방문해야 할 수
visited = []; //이미 방문한 수

needVisite.push(V);

// BFS -> 너비 우선 탐색
while (needVisite.length !== 0) {
  let target = needVisite.shift();
  if (!visited.includes(target)) {
    visited.push(target);
    if (graph[target]) {
      let insert = graph[target].sort((a, b) => a - b);
      needVisite = [...needVisite, ...insert];
    }
  }
}

console.log(visited.join(' '));
