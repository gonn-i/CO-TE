[문제링크](https://www.acmicpc.net/problem/1932)

## 접근 방향 설명

> 각 층별로 dp 배열에 최대값을 저장하면서 내려간다! 
1️⃣ `dp[1] = tri[1]` 
2️⃣ `dp[2][0] = dp[1] + tri[2][0]` ,  `dp[2][1] = dp[1] + tri[2][1]`
이런식으로 1층 -> 2층 -> 3층으로 각 값의 최대값을 넣어준다.
3️⃣ 이때, 각층의 0번째와 마지막 칸의 경우의 수는 1개이지만, 그외는 위층의 왼쪽() 혹은 오른쪽 둘의 최댓값 하나를 저장한다. 
`dp[i][j] = Math.max(dp[i - 1][j] + tri[i][j], dp[i - 1][j - 1] + tri[i][j]);`


---

```js
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

const n = +input.shift();
let tri = [];
let dp = [...new Array(n + 1)].map(() => new Array(n + 1).fill(0));

for (let i = 0; i < n; i++) {
  tri[i + 1] = input[i].split(' ').map(Number);
}

dp[1] = tri[1];

for (let i = 2; i <= n; i++) {
  for (let j = 0; j < i; j++) {
    if (j == 0) {
      dp[i][j] = dp[i - 1][j] + tri[i][j];
    } else if (j == i - 1) {
      dp[i][j] = dp[i - 1][j - 1] + tri[i][j];
    } else {
      dp[i][j] = Math.max(dp[i - 1][j] + tri[i][j], dp[i - 1][j - 1] + tri[i][j]);
    }
  }
}

console.log(Math.max(...dp[n]));
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

dp 걸음마 차근차근! 

---

## 문제
```
        7
      3   8
    8   1   0
  2   7   4   4
4   5   2   6   5
```

위 그림은 크기가 5인 정수 삼각형의 한 모습이다.

맨 위층 7부터 시작해서 아래에 있는 수 중 하나를 선택하여 아래층으로 내려올 때, 이제까지 선택된 수의 합이 최대가 되는 경로를 구하는 프로그램을 작성하라. 아래층에 있는 수는 현재 층에서 선택된 수의 대각선 왼쪽 또는 대각선 오른쪽에 있는 것 중에서만 선택할 수 있다.

삼각형의 크기는 1 이상 500 이하이다. 삼각형을 이루고 있는 각 수는 모두 정수이며, 범위는 0 이상 9999 이하이다.

## 입력
첫째 줄에 삼각형의 크기 n(1 ≤ n ≤ 500)이 주어지고, 둘째 줄부터 n+1번째 줄까지 정수 삼각형이 주어진다.

## 출력
첫째 줄에 합이 최대가 되는 경로에 있는 수의 합을 출력한다.

## 예제 입력 1 
5
7
3 8
8 1 0
2 7 4 4
4 5 2 6 5

## 예제 출력 1 
30