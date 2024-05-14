let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
let apt = [];

// 아파트 모습 이중배열로 넣어주기
for (let i = 0; i < N; i++) {
  apt[i] = input[i].split('').map(Number);
}

let visited = [];
let needVisite = [];

let apt_group = 0; // 아파트 단지수
let apt_count = []; // 단지별 아파트 수를 넣을 배열

// 재귀함수를 통한 dfs 구현
function dfs(r, l) {
  needVisite.unshift([r, l]);
  apt[r][l] = 0; // 방문 표시용 1-> 0
  visited.push([r, l]);

  while (needVisite.length > 0) {
    [r, l] = needVisite.shift();

    // 순서대로 오른쪽, 왼쪽, 아래, 위
    if (r + 1 < N && apt[r + 1][l] == 1) {
      dfs(r + 1, l);
    }
    if (r - 1 >= 0 && apt[r - 1][l] == 1) {
      dfs(r - 1, l);
    }
    if (l + 1 < N && apt[r][l + 1] == 1) {
      dfs(r, l + 1);
    }
    if (l - 1 >= 0 && apt[r][l - 1] == 1) {
      dfs(r, l - 1);
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (apt[i][j] === 1) {
      dfs(i, j);
      apt_group++;
      apt_count.push(visited.length); // 인접한 아파트를 모아둔 배열
      visited = []; // 다음 단지를 살펴보기 위해 배열 초기화
      needVisite = [];
    }
  }
}

console.log(apt_group);
console.log(apt_count.sort((a, b) => a - b).join('\n'));
