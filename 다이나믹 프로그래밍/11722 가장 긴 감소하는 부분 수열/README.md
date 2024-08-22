[문제링크](https://www.acmicpc.net/problem/11722)

## 접근 방향 설명

> 기본적인 LDS 문제! 
> 1️⃣ nums[i]를 `i ... 1 ~ A`까지 순회하되, 각 시행 안에서 nums[j] `j ... idx-1 ~ 0 ` 를 돈다.
> 2️⃣ 이때, nums[i] < nums[j] 하면서, 동시에 `dp[j]` > `max` 라면, `max` 값 갱신해준다. (여기에서 `max`는 `nums[i]`를 기준으로 여러개의 요소가 감소하는 양상을 보일 때에 가장 긴 부분 수열의 크기를 담을 수 있도록 해주는 것임.)
> 3️⃣ `dp[i]` 에 `max +1` 넣어주기. (+1 해주는 이유는 자기 자신을 더해주는 것임 )
-> 만일 `max 값`이 갱신되지 않아, 0인 경우 => 그냥 자기자신만을 갖는 부분수열이 되기에 1
-> `max 값`이 갱신 되었다면, 자기를 뺀 부분 수열의 크기이기 때문에 `max +1` 을 넣어주는 것

---


```js
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [A, nums] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

nums = nums.split(' ').map(Number);
let dp = [...new Array(+A + 1)].fill(0);

dp[0] = 1;
let ans = 0;

for (let i = 1; i < nums.length; i++) {
  let max = 0;
  for (let j = i - 1; j >= 0; j--) {
    if (nums[i] < nums[j] && dp[j] > max) {
      max = dp[j];
    }
  }
  dp[i] = max + 1;
}

console.log(Math.max(...dp));
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

LIS LDS 같은 맥락의 문제인데, 사실 이해하는데 조금 걸렸다 
현대 코테 기출이라니 열심히 체화해서 심화 버젼에서도 잘 풀어낼 수 있으면 좋겠다! 아자잣 🔥

---

## 문제
수열 A가 주어졌을 때, 가장 긴 감소하는 부분 수열을 구하는 프로그램을 작성하시오.

예를 들어, 수열 A = {10, 30, 10, 20, 20, 10} 인 경우에 가장 긴 감소하는 부분 수열은 A = {10, 30, 10, 20, 20, 10}  이고, 길이는 3이다.

## 입력
첫째 줄에 수열 A의 크기 N (1 ≤ N ≤ 1,000)이 주어진다.

둘째 줄에는 수열 A를 이루고 있는 Ai가 주어진다. (1 ≤ Ai ≤ 1,000)

## 출력
첫째 줄에 수열 A의 가장 긴 감소하는 부분 수열의 길이를 출력한다.

## 예제 입력 1 
6
10 30 10 20 20 10

## 예제 출력 1 
3