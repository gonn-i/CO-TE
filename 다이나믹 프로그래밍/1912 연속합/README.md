[문제링크](https://www.acmicpc.net/problem/1932)

## 접근 방향 설명

> 1️⃣ 연속된 합 중 최대를 구하는 문제이기 때문에, dp 배열에 특정 인덱스까지의 최대 연속합을 넣어준다
> 2️⃣ `dp[i] = Math.max(N_array[i - 1], dp[i - 1] + N_array[i - 1]);` 을 통해 최대값을 판별한다.
> 3️⃣ dp 안에서의 최댓값을 출력하면 끝!

```js
// 10, -4, 3, 1, 5, 6, -35, 12, 21, -1
dp[1] = 10
dp[2] = Math.max(dp[1] -4, -4) // 6
dp[3] = Math.max(dp[2] +3, 3) // 9
dp[4] = Math.max(dp[3] +1, 1)  // 10
dp[5] = Math.max(dp[4] +5, 5) // 15
dp[6] = Math.max(dp[5] +6, 6) // 21
dp[7] = Math.max(dp[6] -35, -35) // -14
dp[8] = Math.max(dp[7] +12, 12) // 12 ... 이거 보여주려고 여기까지 썼다..
```


---

```js
let fs = require('fs');
let filePath = process.platform == 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let n = +input.shift();
let N_array = [];
N_array = input[0].split(' ').map(Number);

// dp 기본 설정
let dp = [...new Array(n + 1)].map((_) => -Infinity);

dp[1] = N_array[0];

for (let i = 2; i <= n; i++) {
  // prev + currnent 와 current 중에 최대값을 dp에 넣음
  dp[i] = Math.max(N_array[i - 1], dp[i - 1] + N_array[i - 1]);
}

console.log(Math.max(...dp));
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

dp도 자주 보면 쑥쑥 큰다! 굉장히 쉬운 문제였지만 그래도 그만큼 빠르게 풀어내서 아주 만족!
(3분컷!) 코테는 자꾸 풀어볼 수록 쑥쑥 느는거 같다! 🔥

---


시간 제한	메모리 제한	제출	정답	맞힌 사람	정답 비율
1 초 (추가 시간 없음)	128 MB	147737	56681	40411	36.942%

## 문제
n개의 정수로 이루어진 임의의 수열이 주어진다. 우리는 이 중 연속된 몇 개의 수를 선택해서 구할 수 있는 합 중 가장 큰 합을 구하려고 한다. 단, 수는 한 개 이상 선택해야 한다.

예를 들어서 10, -4, 3, 1, 5, 6, -35, 12, 21, -1 이라는 수열이 주어졌다고 하자. 여기서 정답은 12+21인 33이 정답이 된다.

## 입력
첫째 줄에 정수 n(1 ≤ n ≤ 100,000)이 주어지고 둘째 줄에는 n개의 정수로 이루어진 수열이 주어진다. 수는 -1,000보다 크거나 같고, 1,000보다 작거나 같은 정수이다.

## 출력
첫째 줄에 답을 출력한다.

## 예제 입력 1 
10
10 -4 3 1 5 6 -35 12 21 -1

## 예제 출력 1 
33