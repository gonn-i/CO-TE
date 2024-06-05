[문제링크](https://www.acmicpc.net/problem/10872)

## 접근 방향 설명

> **팩토리얼의 원리**
> 팩토리얼이란 N이 주어졌을때, 1부터 N까지의 수를 곱한 수이다.

그렇기 떄문에 재귀함수를 이용해서 풀어주면 되는 문제.

---

## 풀이 코드 해석

```java script
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

function factorial(num) {
  if (num == 0) {
    return 1;
  }

  return num * factorial(num - 1); // 재귀함수 콜
}

console.log(factorial(input));
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

백트래킹을 하던 도중, 재귀함수에 대한 개념이 익숙하지 않음을 느끼고 기본부터 다져보자는 생각으로 브론즈부터 차근히 풀어봐야겠다고 생각했다.

자주 또 많이 풀어볼 수록 이해가 잘 되겠지 뭐!
아자아자

---

## 문제

0보다 크거나 같은 정수 N이 주어진다. 이때, N!을 출력하는 프로그램을 작성하시오.

## 입력

첫째 줄에 정수 N(0 ≤ N ≤ 12)이 주어진다.

## 출력

첫째 줄에 N!을 출력한다.

**예제 입력 1**
10

**예제 출력 1**
3628800

**예제 입력 2**
0

**예제 출력 2**
1
