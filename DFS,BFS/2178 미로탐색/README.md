[문제링크](https://www.acmicpc.net/problem/2606)

## 접근 방향 설명

> 1. 입력값으로 주어진 미로 이중배열화 (map)
> 2. bfs를 이용할 큐 선언 + 방문여부 체크용 visited 배열 선언
> 3. 미로에서 상하좌우 이동할 수 있으므로, x축기준으로 움직일 수 있는 방향과 y축을 기준으로 움직일 수 있는 방향의 배열 선언
> 4. bfs에서 상하좌우 움직이면서 주어진 map안에 위치하고, 바닥이 1이며, 방문하지 않은 곳을 needvisited에 넣어주기 [x,y,move]
> 5. 이때 넣은 값의 x y 값이 N M이면 move 출력!

## 풀이 코드 해석

```java script
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .split('\n');

let [N, M] = input.shift().split(' ').map(Number);

let visitied = [...new Array(N)].map(() => Array(M).fill(false)); // 방문 체크용
let needvisite = [];
let map = [];
let ans = [];

//미로모양 이중배열로 만들기
for (let i = 0; i < N; i++) {
  map[i] = input[i].split('').map(Number);
}

let current = [0, 0, 1]; // 열, 행, 움직인칸수
let next_x = [-1, 1, 0, 0]; // 상 하 좌 우
let next_y = [0, 0, -1, 1]; // 상 하 좌 우

needvisite.push(current);
visitied[0][0] = true; // 방문표시

while (needvisite.length > 0) {
  // console.log(needvisite);
  let [x, y, move] = needvisite.shift();
  if (x == N - 1 && y == M - 1) {
    ans.push(move); //(N,M)에 도달한 경우
    break;
  }

  for (let i = 0; i < 4; i++) {
    let nx = x + next_x[i];
    let ny = y + next_y[i];
    let nm = move + 1;
    // 주어진 map안에 들어가고 && 1인 곳이며 && 아직 방문 안 한 곳
    if (nx >= 0 && nx < N && ny >= 0 && ny < M && map[nx][ny] == 1 && !visitied[nx][ny]) {
      current = [nx, ny, nm]; // 방문가능한 곳 초기화
      // console.log(current);
      needvisite.push(current); // 큐에 넣어줌
      visitied[nx][ny] = true; // 방문표시
    }
  }
}

// console.log(ans);
console.log(Math.min(ans));
```

## 풀이 과정에서 새롭게 느낀점(배운점)

이제 dfs/bfs 문제가 대강 어떤 패턴으로 풀어야할지 이해가 되는 것 같다.
재귀나 여타 다른 방식으로 해결하지 말고.

N의 크기를 보고, dfs/bfs 를 택한 후 그에 따라 스택이나 큐를 선언해주고 방문 처리를 해주면서 문제에 따라 주어진 답을 내면 되지 않을까! 라는 생각
dfs/bfs에 자신감을 가지자!💪

---

## 문제

N×M크기의 배열로 표현되는 미로가 있다.

1 0 1 1 1 1
1 0 1 0 1 0
1 0 1 0 1 1
1 1 1 0 1 1
미로에서 1은 이동할 수 있는 칸을 나타내고, 0은 이동할 수 없는 칸을 나타낸다. 이러한 미로가 주어졌을 때, (1, 1)에서 출발하여 (N, M)의 위치로 이동할 때 지나야 하는 최소의 칸 수를 구하는 프로그램을 작성하시오. 한 칸에서 다른 칸으로 이동할 때, 서로 인접한 칸으로만 이동할 수 있다.

위의 예에서는 15칸을 지나야 (N, M)의 위치로 이동할 수 있다. 칸을 셀 때에는 시작 위치와 도착 위치도 포함한다.

**입력**
첫째 줄에 두 정수 N, M(2 ≤ N, M ≤ 100)이 주어진다. 다음 N개의 줄에는 M개의 정수로 미로가 주어진다. 각각의 수들은 붙어서 입력으로 주어진다.

**출력**
첫째 줄에 지나야 하는 최소의 칸 수를 출력한다. 항상 도착위치로 이동할 수 있는 경우만 입력으로 주어진다.

**예제 입력 1**
4 6
101111
101010
101011
111011

**예제 출력 1**
15

**예제 입력 2**
4 6
110110
110110
111111
111101

**예제 출력 2**
9

**예제 입력 3**
2 25
1011101110111011101110111
1110111011101110111011101

**예제 출력 3**
38

**예제 입력 4**
7 7
1011111
1110001
1000001
1000001
1000001
1000001
1111111

**예제 출력 4**
13
