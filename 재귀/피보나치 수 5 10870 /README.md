[문제링크](https://www.acmicpc.net/problem/10870)

## 접근 방향 설명

> **피보나치의 원리**
> 0과 1로 시작해서, 앞의 두수를 더해 뒤에 수를 구하는 수열
> `Fn = Fn-1 + Fn-2 (n ≥ 2)`

---

## 풀이 코드 해석

```java script
const { createDiffieHellmanGroup } = require('crypto');
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

function pibo(n) {
  if (n == 0) {
    return 0;
  }
  if (n == 1) {
    return 1;
  }
  return pibo(n - 1) + pibo(n - 2);
}
console.log(pibo(input));

```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

브론즈부터 재귀만 흔들기 2문제째, 브론즈 문제이다 보니 크게 어려움 없이 풀고 있다!
조금더 난이도를 올려봐야겠다 👀

---

## 문제

피보나치 수는 0과 1로 시작한다. 0번째 피보나치 수는 0이고, 1번째 피보나치 수는 1이다. 그 다음 2번째 부터는 바로 앞 두 피보나치 수의 합이 된다.

이를 식으로 써보면 Fn = Fn-1 + Fn-2 (n ≥ 2)가 된다.

n=17일때 까지 피보나치 수를 써보면 다음과 같다.

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597

n이 주어졌을 때, n번째 피보나치 수를 구하는 프로그램을 작성하시오.

## 입력

첫째 줄에 n이 주어진다. n은 20보다 작거나 같은 자연수 또는 0이다.

## 출력

첫째 줄에 n번째 피보나치 수를 출력한다.

## 예제 입력 1

10

## 예제 출력 1

55
