[문제링크](https://www.acmicpc.net/problem/10026)

## 접근 방향 설명

> 1️⃣ 적록색약은 빨강과 초록을 구분하지 못하기 떄문에, **R -> G로 바뀌줌 `canNotSee`**
> 2️⃣ 최대 100 * 100 크기의 그림을 순회하면서, **방문하지 않은 곳의 주변을 탐색하여 같은 색상의 영역을 BFS 로 탐색. 탐색이 끝난 후엔 area ++**
> 3️⃣ 적록색약과 아닌 사람의 차이는, 볼 그림 배열을 다르게 전달해주면 됨 
**적록색약 X -> `normal`**
**적록색약 O -> `canNotSee`**

## 풀이 코드 해석

```java script
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
```

## 풀이 과정에서 새롭게 느낀점(배운점)

BFS를 fucntion으로 만들어서 풀 생각을 못해서 시간이 좀 걸렸던 문제. 
맨날 풀던 버릇대로만 하지말고 좀 유연하게 생각해보자🧐💭

---

## 문제

적록색약은 빨간색과 초록색의 차이를 거의 느끼지 못한다. 따라서, 적록색약인 사람이 보는 그림은 아닌 사람이 보는 그림과는 좀 다를 수 있다.

크기가 N×N인 그리드의 각 칸에 R(빨강), G(초록), B(파랑) 중 하나를 색칠한 그림이 있다. 그림은 몇 개의 구역으로 나뉘어져 있는데, 구역은 같은 색으로 이루어져 있다. 또, 같은 색상이 상하좌우로 인접해 있는 경우에 두 글자는 같은 구역에 속한다. (색상의 차이를 거의 느끼지 못하는 경우도 같은 색상이라 한다)

예를 들어, 그림이 아래와 같은 경우에

RRRBB
GGBBB
BBBRR
BBRRR
RRRRR
적록색약이 아닌 사람이 봤을 때 구역의 수는 총 4개이다. (빨강 2, 파랑 1, 초록 1) 하지만, 적록색약인 사람은 구역을 3개 볼 수 있다. (빨강-초록 2, 파랑 1)

그림이 입력으로 주어졌을 때, 적록색약인 사람이 봤을 때와 아닌 사람이 봤을 때 구역의 수를 구하는 프로그램을 작성하시오.

## 입력
첫째 줄에 N이 주어진다. (1 ≤ N ≤ 100)

둘째 줄부터 N개 줄에는 그림이 주어진다.

## 출력
적록색약이 아닌 사람이 봤을 때의 구역의 개수와 적록색약인 사람이 봤을 때의 구역의 수를 공백으로 구분해 출력한다.

## 예제 입력 1 
5
RRRBB
GGBBB
BBBRR
BBRRR
RRRRR

## 예제 출력 1 
4 3