[문제링크](https://www.acmicpc.net/problem/2667)

## 접근 방향 설명

1. 입력값을 이중배열로 재구성 (apt 배열)
2. apt 배열을 순회하여 1을 만난 경우, 해당 좌표 row, column을 dfs에 전달
   2-1. 이때 방문한 좌표의 값은 0으로 설정하여 중복을 피함
   2-2. 상하좌우의 값이 1인 경우에 재귀에 들어가도록 (이때 x,y값이 정사각형 안에 있는지 판별해야 함 -> 아닐 경우 typeError)
   2-3. 인접한 것들이 없으면, apt_group++ apt_count에 아파트 갯수 넣어주기

## 풀이 코드 해석

```java script
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
```

## 풀이 과정에서 새롭게 느낀점(배운점)

typeError -> dfs/bfs에서 단골손님인데 이때는 인덱스가 주어진 배열에서 벗어났는지를 중심으로 체크해보자!

dfs를 풀때, 스택을 써서 자주 풀었다. 재귀가 어려워서 피해다녔지만! 이번엔 재귀로 한번 풀어봐야겠다 다짐했는데 첫제출에 통과해서 매우 뿌듯했다. 알고리즘은 많이 풀어볼수록! 혼자 더더 생각해볼수록 많이 배우는 것 같다. 🙌

---

## 문제

<그림 1>과 같이 정사각형 모양의 지도가 있다. 1은 집이 있는 곳을, 0은 집이 없는 곳을 나타낸다. 철수는 이 지도를 가지고 연결된 집의 모임인 단지를 정의하고, 단지에 번호를 붙이려 한다. 여기서 연결되었다는 것은 어떤 집이 좌우, 혹은 아래위로 다른 집이 있는 경우를 말한다. 대각선상에 집이 있는 경우는 연결된 것이 아니다. <그림 2>는 <그림 1>을 단지별로 번호를 붙인 것이다. 지도를 입력하여 단지수를 출력하고, 각 단지에 속하는 집의 수를 오름차순으로 정렬하여 출력하는 프로그램을 작성하시오.

## 입력

첫 번째 줄에는 지도의 크기 N(정사각형이므로 가로와 세로의 크기는 같으며 5≤N≤25)이 입력되고, 그 다음 N줄에는 각각 N개의 자료(0혹은 1)가 입력된다.

## 출력

첫 번째 줄에는 총 단지수를 출력하시오. 그리고 각 단지내 집의 수를 오름차순으로 정렬하여 한 줄에 하나씩 출력하시오.

## 예제 입력 1

7
0110100
0110101
1110101
0000111
0100000
0111110
0111000

## 예제 출력 1

3
7
8
9
