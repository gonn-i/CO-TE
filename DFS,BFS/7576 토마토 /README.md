[문제링크](https://www.acmicpc.net/problem/7576)

## 접근 방향 설명

> 1. 토마토 밭을 초기화 후, 1 (익은 토마토)의 **위치 마킹**하기, 이떄 토마토의 위치와 더불어 몇번째로 익혀진 토마토인지를 나타내는 n (=0)을 함께 넣어준다. (원래 익어있기 때문에 일단 0)
> 2. 익은 토마토 **상하좌우로 아직 익지 않은 토마토 (0)가 존재하는 경우를 BFS 로 탐색하여, 탐색해야할 배열 안에 넣어준다.** 
> 3. 이때 needToVisite 에 넣을때는, 옆에 있어서 **익어지게 했던 토마토의 n에 +1 을 한 값을 함께 넣어준다.**
> 4. BFS 탐색을 마친 후, 익지 않는 토마토가 있는지 확인하여 있다면 -1을 찍고 return 한다
> 5. 만약 모든 토마토가 다 읽었다면 마지막으로 저장된 n을 담은 ans 를 출력한다.

## 풀이 코드 해석

```java script
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : __dirname + '/input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const [M, N] = input.shift().split(' ').map(Number);

let tomato = [];
let needToVisit = [];
let ans = 0;
let moves = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// 토마토 상태 초기화
for (let i = 0; i < N; i++) {
  tomato[i] = input[i].split(' ').map(Number);
}

// 익은 토마토의 위치를 큐에 추가
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (tomato[i][j] === 1) {
      needToVisit.push([i, j, 0]);
    }
  }
}

let front = 0;
// BFS
while (front < needToVisit.length) {
  let [x, y, n] = needToVisit[front++]; // shif 대신 인덱스로 뽑아내기
  ans = n;
  for (let [dx, dy] of moves) {
    let next_x = x + dx;
    let next_y = y + dy;
    if (next_x >= 0 && next_x < N && next_y >= 0 && next_y < M && tomato[next_x][next_y] === 0) {
      needToVisit.push([next_x, next_y, n + 1]);
      tomato[next_x][next_y] = 1;
    }
  }
}

// 익지 않은 토마토가 있는지 확인
for (let i = 0; i < N; i++) {
  if (tomato[i].includes(0)) {
    console.log(-1);
    return;
  }
}

console.log(ans);
```

## 풀이 과정에서 새롭게 느낀점(배운점)

 2 ≤ M,N ≤ 1,000 이었기 떄문에, 시간 초과를 피할 수 없었다.. 
 처음에 shift()로 bfs 탐색을 돌렸는데, 그게 화근이었다
 
 **대신 인덱스 조정하여 탐색을 하니 해결 완이 되었다!**
 **shift 를 아무 생각없이 사용하면 안되겠다는 교훈을 얻은 문제!**

 ```js
// BFS
while (front < needToVisit.length) {
  let [x, y, n] = needToVisit[front++]; // shif 대신 인덱스로 뽑아내기
  ans = n;
  for (let [dx, dy] of moves) {
    let next_x = x + dx;
    let next_y = y + dy;
    if (next_x >= 0 && next_x < N && next_y >= 0 && next_y < M && tomato[next_x][next_y] === 0) {
      needToVisit.push([next_x, next_y, n + 1]);
      tomato[next_x][next_y] = 1;
    }
  }
}
 ```

---

## 문제
철수의 토마토 농장에서는 토마토를 보관하는 큰 창고를 가지고 있다. 토마토는 아래의 그림과 같이 격자 모양 상자의 칸에 하나씩 넣어서 창고에 보관한다.



창고에 보관되는 토마토들 중에는 잘 익은 것도 있지만, 아직 익지 않은 토마토들도 있을 수 있다. 보관 후 하루가 지나면, 익은 토마토들의 인접한 곳에 있는 익지 않은 토마토들은 익은 토마토의 영향을 받아 익게 된다. 하나의 토마토의 인접한 곳은 왼쪽, 오른쪽, 앞, 뒤 네 방향에 있는 토마토를 의미한다. 대각선 방향에 있는 토마토들에게는 영향을 주지 못하며, 토마토가 혼자 저절로 익는 경우는 없다고 가정한다. 철수는 창고에 보관된 토마토들이 며칠이 지나면 다 익게 되는지, 그 최소 일수를 알고 싶어 한다.

토마토를 창고에 보관하는 격자모양의 상자들의 크기와 익은 토마토들과 익지 않은 토마토들의 정보가 주어졌을 때, 며칠이 지나면 토마토들이 모두 익는지, 그 최소 일수를 구하는 프로그램을 작성하라. 단, 상자의 일부 칸에는 토마토가 들어있지 않을 수도 있다.

## 입력
첫 줄에는 상자의 크기를 나타내는 두 정수 M,N이 주어진다. M은 상자의 가로 칸의 수, N은 상자의 세로 칸의 수를 나타낸다. 단, 2 ≤ M,N ≤ 1,000 이다. 둘째 줄부터는 하나의 상자에 저장된 토마토들의 정보가 주어진다. 즉, 둘째 줄부터 N개의 줄에는 상자에 담긴 토마토의 정보가 주어진다. 하나의 줄에는 상자 가로줄에 들어있는 토마토의 상태가 M개의 정수로 주어진다. 정수 1은 익은 토마토, 정수 0은 익지 않은 토마토, 정수 -1은 토마토가 들어있지 않은 칸을 나타낸다.

토마토가 하나 이상 있는 경우만 입력으로 주어진다.

## 출력
여러분은 토마토가 모두 익을 때까지의 최소 날짜를 출력해야 한다. 만약, 저장될 때부터 모든 토마토가 익어있는 상태이면 0을 출력해야 하고, 토마토가 모두 익지는 못하는 상황이면 -1을 출력해야 한다.

## 예제 입력 1 
6 4
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 1

## 예제 출력 1 
8