[문제링크](https://www.acmicpc.net/problem/1789)

## 접근 방향 설명

> 최대한 많은 자연수를 쓰는게 관건인 문제이기 때문에, while 문을 통해 n을 점점 증가시켜준다. 
이떄 탈출 조건은  `S >= 0` 으로 정해두지만, 실제 탈출 조건은 `if (S <= n)` 이다. **(왜냐하면, S가 n보다  작아지면 동원되는 자연수의 증복이 발생하니까!)**
암튼 n을 뽑아내면 문제 해결!

---

```js
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let S = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

let n = 1;

while (S >= 0) {
  S -= n;
  if (S <= n) {
    break;
  }
  n++;
}

console.log(n);
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)


x

---

## 문제
서로 다른 N개의 자연수의 합이 S라고 한다. S를 알 때, 자연수 N의 최댓값은 얼마일까?

## 입력
첫째 줄에 자연수 S(1 ≤ S ≤ 4,294,967,295)가 주어진다.

## 출력
첫째 줄에 자연수 N의 최댓값을 출력한다.

**예제 입력 1** 
200

**예제 출력 1** 
19