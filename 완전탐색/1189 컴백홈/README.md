[문제링크](https://www.acmicpc.net/problem/1189)

## 접근 방향 설명

> 1️⃣현 좌표 (x.y)와 움직인수 (m)를 토대로 DFS 를 이용하여 상하좌우 순환을 돈다.
> 2️⃣ 주어진 R X C 안에서 위치하면서, 방문 이력이 없으면서, T 표시가 안된 곳을 순환하다,
> 3️⃣더 이상 갈 곳이 없으면 (= 해를 찾을 수 없는 상황이면) 백트래킹을 이용하여 이전으로 돌아가 다시 순환을 거친다.
> 4️⃣이때, 좌표가 (0,C-1) 에 있고 m이 K인 경우에 ans++를 해준다.

## 풀이 코드 해석

```java script
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [R, C, K] = input.shift().split(' ').map(Number);
let visited = [...Array(R)].map(() => Array(C).fill(true));
let needvisite = [];
let map = [];
let x_dir = [-1, 1, 0, 0]; //상하좌우
let y_dir = [0, 0, -1, 1];
let ans = 0;

for (let i = 0; i < R; i++) {
  map[i] = input[i].split('');
}

visited[R - 1][0] = false;

function DFS(x, y, m) {
  // console.log(x, y, m);
  if (x == 0 && y == C - 1) {
    if (m == K) {
      ans++;
      return;
    }
  }
  for (let i = 0; i < 4; i++) {
    let nx = x + x_dir[i];
    let ny = y + y_dir[i];

    if (nx >= 0 && nx < R && ny >= 0 && ny < C && visited[nx][ny] && map[nx][ny] !== 'T') {
      visited[nx][ny] = false;
      DFS(nx, ny, m + 1);
      // console.log(nx, ny, m + 1);
      visited[nx][ny] = true;
      // console.log('백트래킹');
    }
  }
}

DFS(R - 1, 0, 1);
console.log(ans);

```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

솔직히 문제 대강 보고, 오! DFS로 걍 풀면 될 것 같은데 왜 실버1이지 하고 좋아했던 문제였다. 맞다 백트래킹이 뭔지도 모르고 들어갔던 문제였다. 처음엔 접근이 너무 어려워서 알고리즘 분류를 봤고, 백트래킹이 있는것을 확인하고는 해당 알고리즘을 공부했다.

> 백트래킹 알고리즘: 해를 찾는 도중 해가 절대 될 수 없다고 판단되면, **되돌아가서 해를 다시 찾아가는 기법**을 말한다

> DFS에서 모든 경우의 수를 쭉 탐색하다가, 해가 되지 못할 경우 뒤로 물러설 수 있다.
> 재귀함수를 써서 많이 구현함.

`다음주는 백트래킹을 더 해봐야겠다. ~~백트래킹만 패고..  재귀함수 잘알해야지~~`

---

## 문제

한수는 캠프를 마치고 집에 돌아가려 한다. 한수는 현재 왼쪽 아래점에 있고 집은 오른쪽 위에 있다. 그리고 한수는 집에 돌아가는 방법이 다양하다. 단, 한수는 똑똑하여 한번 지나친 곳을 다시 방문하지는 않는다.

      cdef  ...f  ..ef  ..gh  cdeh  cdej  ...f
      bT..  .T.e  .Td.  .Tfe  bTfg  bTfi  .Tde
      a...  abcd  abc.  abcd  a...  a.gh  abc.

거리 : 6 6 6 8 8 10 6
위 예제는 한수가 집에 돌아갈 수 있는 모든 경우를 나타낸 것이다. T로 표시된 부분은 가지 못하는 부분이다. 문제는 R x C 맵에 못가는 부분이 주어지고 거리 K가 주어지면 한수가 집까지도 도착하는 경우 중 거리가 K인 가짓수를 구하는 것이다.

## 입력

첫 줄에 정수 R(1 ≤ R ≤ 5), C(1 ≤ C ≤ 5), K(1 ≤ K ≤ R×C)가 공백으로 구분되어 주어진다. 두 번째부터 R+1번째 줄까지는 R×C 맵의 정보를 나타내는 '.'과 'T'로 구성된 길이가 C인 문자열이 주어진다.

## 출력

첫 줄에 거리가 K인 가짓수를 출력한다.

**예제 입력 1**
3 4 6
....
.T..
....

**예제 출력 1**
4
