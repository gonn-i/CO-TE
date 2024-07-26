[문제링크](https://www.acmicpc.net/problem/21736)

## 접근 방향 설명

> 단순 BFS 문제!
> 1️⃣ 도연이가 서있는 좌표부터 `needToVisit` 에 넣고 BFS 돌리기
> 2️⃣ 시간 제한이 좀 타이트 하니, **방문할 배열에서 꺼내쓸때는 shift 말고 ❌ idx 로 꺼내쓰기** ⭐️
> 3️⃣ BFS 탐색시, 이동 좌표가 캠퍼스 내에 위치하는지 검증 ( `N * M` ) &&  벽인지 분별 (`'X'`)
> 4️⃣ `P`를 만나면 ans ++



## 풀이 코드 해석

```javascript
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
```

## 풀이 과정에서 새롭게 느낀점(배운점)

시간 제한에 계속 걸리길래 node로는 못 푸나 싶었지만... shift 로 needToVisit 에서 좌표 꺼내쓰려 하니... 났던 시간 초과였다

BFS DFS shift 사용시, 시간 초과가 날 수 있음을 꼭 생각하면서 풀자


---

## 문제
2020년에 입학한 헌내기 도연이가 있다. 도연이는 비대면 수업 때문에 학교에 가지 못해 학교에 아는 친구가 없었다. 드디어 대면 수업을 하게 된 도연이는 어서 캠퍼스 내의 사람들과 친해지고 싶다. 

도연이가 다니는 대학의 캠퍼스는 
$N \times M$ 크기이며 캠퍼스에서 이동하는 방법은 벽이 아닌 상하좌우로 이동하는 것이다. 예를 들어, 도연이가 (
$x$, 
$y$)에 있다면 이동할 수 있는 곳은 (
$x+1$, 
$y$), (
$x$, 
$y+1$), (
$x-1$, 
$y$), (
$x$, 
$y-1$)이다. 단, 캠퍼스의 밖으로 이동할 수는 없다.

불쌍한 도연이를 위하여 캠퍼스에서 도연이가 만날 수 있는 사람의 수를 출력하는 프로그램을 작성해보자.

## 입력
첫째 줄에는 캠퍼스의 크기를 나타내는 두 정수 
$N$ (
$ 1 \leq N \leq 600$), 
$M$ (
$ 1 \leq M \leq 600$)이 주어진다.

둘째 줄부터 
$N$개의 줄에는 캠퍼스의 정보들이 주어진다. O는 빈 공간, X는 벽, I는 도연이, P는 사람이다. I가 한 번만 주어짐이 보장된다.

## 출력
첫째 줄에 도연이가 만날 수 있는 사람의 수를 출력한다. 단, 아무도 만나지 못한 경우 TT를 출력한다.

## 예제 입력 1 
3 5
OOOPO
OIOOX
OOOXP

## 예제 출력 1 
1