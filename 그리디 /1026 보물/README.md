[문제링크](https://www.acmicpc.net/problem/1026)

## 접근 방향 설명

> 결과는 i: 0 ~ N-1 까지의 A[i] * B[i] 의 총합이기 때문에 사실상 정렬을 하던 아니던 정답과 오답의 차이를 가르진 못한다.
그래서 **B를 오름차순으로, A를 내림차순**으로 정렬해주어 문제를 해결했다.

```js
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let ans = 0;
const N = +input.shift();
const A = input.shift().split(' ').map(Number);
const B = input.shift().split(' ').map(Number);

const sorted_B = B.sort((a, b) => a - b);
const sorted_A = A.sort((a, b) => b - a);

for (let i = 0; i < N; i++) {
  let sum = A[i] * B[i];
  ans += sum;
}

console.log(ans);
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

이번 문제는 이지피지레몬시퀴지였다~ 

---

## 문제
옛날 옛적에 수학이 항상 큰 골칫거리였던 나라가 있었다. 이 나라의 국왕 김지민은 다음과 같은 문제를 내고 큰 상금을 걸었다.

길이가 N인 정수 배열 A와 B가 있다. 다음과 같이 함수 S를 정의하자.

S = A[0] × B[0] + ... + A[N-1] × B[N-1]

S의 값을 가장 작게 만들기 위해 A의 수를 재배열하자. 단, B에 있는 수는 재배열하면 안 된다.

S의 최솟값을 출력하는 프로그램을 작성하시오.

## 입력
첫째 줄에 N이 주어진다. 둘째 줄에는 A에 있는 N개의 수가 순서대로 주어지고, 셋째 줄에는 B에 있는 수가 순서대로 주어진다. N은 50보다 작거나 같은 자연수이고, A와 B의 각 원소는 100보다 작거나 같은 음이 아닌 정수이다.

## 출력
첫째 줄에 S의 최솟값을 출력한다.