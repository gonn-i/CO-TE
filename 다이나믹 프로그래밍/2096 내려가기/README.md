[문제링크](https://www.acmicpc.net/problem/2096)

## 접근 방향 설명

> 2 * 3 dp 배열 2개를 만들어주어 max / min 담아주기 
> 이때 dp에는 누적합을 더하며, 각각 최대값 최소값을 넣어주는데 
> 첫번째 칸의 경우, prev 누적합 중에 1 , 2 번째 칸에서 온 경우에만 올 수 있고 (최대값인지 최소값인지만 다름)
```js
dp_max[1][0] = Math.max(dp_max[0][0] + board[i - 1][0], dp_max[0][1] + board[i - 1][0]);
```
> 두번째 칸의 경우, 모든 경우에 다 가능하며,
```js
  dp_max[1][1] = Math.max(
    dp_max[0][0] + board[i - 1][1],
    dp_max[0][1] + board[i - 1][1],
    dp_max[0][2] + board[i - 1][1]
  );
```
> 세번째 칸의 경우, prev 누적합 중에 2 , 3 번째 칸에서 온 경우 중에 최대/ 최소가 해당된다.
```js
  dp_max[1][2] = Math.max(dp_max[0][1] + board[i - 1][2], dp_max[0][2] + board[i - 1][2]);
```

---
// js 
```js
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input.shift();
let board = [];
for (let i = 0; i < N; i++) {
  board[i] = input[i].split(' ').map(Number);
}

let dp_max = [...new Array(2)].map((_) => Array(3).fill(0));
let dp_min = [...new Array(2)].map((_) => Array(3).fill(0));

dp_max[0][0] = board[0][0];
dp_max[0][1] = board[0][1];
dp_max[0][2] = board[0][2];

dp_min[0][0] = board[0][0];
dp_min[0][1] = board[0][1];
dp_min[0][2] = board[0][2];

for (let i = 2; i <= N; i++) {
  dp_max[1][0] = Math.max(dp_max[0][0] + board[i - 1][0], dp_max[0][1] + board[i - 1][0]);
  dp_min[1][0] = Math.min(dp_min[0][0] + board[i - 1][0], dp_min[0][1] + board[i - 1][0]);

  dp_max[1][1] = Math.max(
    dp_max[0][0] + board[i - 1][1],
    dp_max[0][1] + board[i - 1][1],
    dp_max[0][2] + board[i - 1][1]
  );
  dp_min[1][1] = Math.min(
    dp_min[0][0] + board[i - 1][1],
    dp_min[0][1] + board[i - 1][1],
    dp_min[0][2] + board[i - 1][1]
  );

  dp_max[1][2] = Math.max(dp_max[0][1] + board[i - 1][2], dp_max[0][2] + board[i - 1][2]);
  dp_min[1][2] = Math.min(dp_min[0][1] + board[i - 1][2], dp_min[0][2] + board[i - 1][2]);

  dp_max[0][0] = dp_max[1][0];
  dp_max[0][1] = dp_max[1][1];
  dp_max[0][2] = dp_max[1][2];

  dp_min[0][0] = dp_min[1][0];
  dp_min[0][1] = dp_min[1][1];
  dp_min[0][2] = dp_min[1][2];
}

console.log(Math.max(...dp_max[1]));
console.log(Math.min(...dp_min[1]));
```

// python
```python
import sys

input = sys.stdin.readline

N = int(input())

dp_max = [[0] * 3 for _ in range(2)]
dp_min = [[0] * 3 for _ in range(2)]

for i in range(N):
    a, b, c = map(int, input().split())
    
    if i == 0:
        dp_max[0][0], dp_max[0][1], dp_max[0][2] = a, b, c
        dp_min[0][0], dp_min[0][1], dp_min[0][2] = a, b, c
    else:
        dp_max[1][0] = max(dp_max[0][0] + a, dp_max[0][1] + a)
        dp_min[1][0] = min(dp_min[0][0] + a, dp_min[0][1] + a)

        dp_max[1][1] = max(dp_max[0][0] + b, dp_max[0][1] + b, dp_max[0][2] + b)
        dp_min[1][1] = min(dp_min[0][0] + b, dp_min[0][1] + b, dp_min[0][2] + b)

        dp_max[1][2] = max(dp_max[0][1] + c, dp_max[0][2] + c)
        dp_min[1][2] = min(dp_min[0][1] + c, dp_min[0][2] + c)

        dp_max[0][0], dp_max[0][1], dp_max[0][2] = dp_max[1][0], dp_max[1][1], dp_max[1][2]
        dp_min[0][0], dp_min[0][1], dp_min[0][2] = dp_min[1][0], dp_min[1][1], dp_min[1][2]

print(max(dp_max[0]))
print(min(dp_min[0]))
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

js로는 메모리 문제로 풀 수 없었다고 한다..
그래서 파이썬으로 풀어낸 문제
입력을 받을때 배열의 크기가 너무 커질 것 같다 싶으면, 몽땅 저장하지 말고 한줄씩 입력 받는 방법 염두에 두기!!! 🔥

---

## 문제
N줄에 0 이상 9 이하의 숫자가 세 개씩 적혀 있다. 내려가기 게임을 하고 있는데, 이 게임은 첫 줄에서 시작해서 마지막 줄에서 끝나게 되는 놀이이다.

먼저 처음에 적혀 있는 세 개의 숫자 중에서 하나를 골라서 시작하게 된다. 그리고 다음 줄로 내려가는데, 다음 줄로 내려갈 때에는 다음과 같은 제약 조건이 있다. 바로 아래의 수로 넘어가거나, 아니면 바로 아래의 수와 붙어 있는 수로만 이동할 수 있다는 것이다. 이 제약 조건을 그림으로 나타내어 보면 다음과 같다.



별표는 현재 위치이고, 그 아랫 줄의 파란 동그라미는 원룡이가 다음 줄로 내려갈 수 있는 위치이며, 빨간 가위표는 원룡이가 내려갈 수 없는 위치가 된다. 숫자표가 주어져 있을 때, 얻을 수 있는 최대 점수, 최소 점수를 구하는 프로그램을 작성하시오. 점수는 원룡이가 위치한 곳의 수의 합이다.

## 입력
첫째 줄에 N(1 ≤ N ≤ 100,000)이 주어진다. 다음 N개의 줄에는 숫자가 세 개씩 주어진다. 숫자는 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 중의 하나가 된다.

## 출력
첫째 줄에 얻을 수 있는 최대 점수와 최소 점수를 띄어서 출력한다.

## 예제 입력 1 
3
1 2 3
4 5 6
4 9 0

## 예제 출력 1 
18 6