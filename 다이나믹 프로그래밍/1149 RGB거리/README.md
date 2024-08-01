[문제링크](https://www.acmicpc.net/problem/1149)

## 접근 방향 설명

> **DP는 규칙을 얼마나 잘 발견해서, 메모리에 어떤식으로 저장하는지가 제일 중요한 것 같다**

> dp 안에 **deps 를 3씩 주면서 순서대로 R, G, B 를 선택했을때의 누적합을 저장**해준다,
> 이때, 누적합의 최소를 저장해야 함으로, **색이 겹치지 않는 앞전의 2개의 값 중에서 최소**를 선택한다.
```js
  dp[i][0] = Math.min(dp[i - 1][1] + houses[i - 1][0], dp[i - 1][2] + houses[i - 1][0]);
  dp[i][1] = Math.min(dp[i - 1][0] + houses[i - 1][1], dp[i - 1][2] + houses[i - 1][1]);
  dp[i][2] = Math.min(dp[i - 1][0] + houses[i - 1][2], dp[i - 1][1] + houses[i - 1][2]);
```

---


```js
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
let houses = [];
let dp = [...new Array(N + 1)].map((_) => []);
for (let i = 0; i < N; i++) {
  houses[i] = input[i].split(' ').map(Number);
}

dp[1][0] = houses[0][0];
dp[1][1] = houses[0][1];
dp[1][2] = houses[0][2];

for (let i = 2; i <= N; i++) {
  dp[i][0] = Math.min(dp[i - 1][1] + houses[i - 1][0], dp[i - 1][2] + houses[i - 1][0]);
  dp[i][1] = Math.min(dp[i - 1][0] + houses[i - 1][1], dp[i - 1][2] + houses[i - 1][1]);
  dp[i][2] = Math.min(dp[i - 1][0] + houses[i - 1][2], dp[i - 1][1] + houses[i - 1][2]);
}

console.log(Math.min(...dp[N]));
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

> 잘못 생각한 접근 😵


```js
dp[1][0] = Math.min(...houses[0]);
dp[1][1] = houses[0].indexOf(dp[1][0]);
let ans = dp[1][0];

for (let i = 2; i <= N; i++) {
  let min = Math.min(...houses[i - 1]);
  let idx = houses[i - 1].indexOf(min);
  if (dp[i - 1][1] == idx) {
    houses[i - 1][idx] = Infinity;
  }
  dp[i][0] = Math.min(...houses[i - 1]);
  dp[i][1] = houses[i - 1].indexOf(dp[i][0]);
  ans += dp[i][0];
}
```


이렇게 되면, **각 선택에서의 최소를 구하는 거지 전체적으로는 최소가 되지 않을 수 있다.**
그렇기 때문에, 각 집에서의 최소값이 아니라, 다 더 했을때인 누적합이 최소가 되는 결과를 선택해야 한다.


---

## 문제
RGB거리에는 집이 N개 있다. 거리는 선분으로 나타낼 수 있고, 1번 집부터 N번 집이 순서대로 있다.

집은 빨강, 초록, 파랑 중 하나의 색으로 칠해야 한다. 각각의 집을 빨강, 초록, 파랑으로 칠하는 비용이 주어졌을 때, 아래 규칙을 만족하면서 모든 집을 칠하는 비용의 최솟값을 구해보자.

1번 집의 색은 2번 집의 색과 같지 않아야 한다.
N번 집의 색은 N-1번 집의 색과 같지 않아야 한다.
i(2 ≤ i ≤ N-1)번 집의 색은 i-1번, i+1번 집의 색과 같지 않아야 한다.
입력
첫째 줄에 집의 수 N(2 ≤ N ≤ 1,000)이 주어진다. 둘째 줄부터 N개의 줄에는 각 집을 빨강, 초록, 파랑으로 칠하는 비용이 1번 집부터 한 줄에 하나씩 주어진다. 집을 칠하는 비용은 1,000보다 작거나 같은 자연수이다.

## 출력
첫째 줄에 모든 집을 칠하는 비용의 최솟값을 출력한다.

## 예제 입력 1 
3
26 40 83
49 60 57
13 89 99

## 예제 출력 1 
96