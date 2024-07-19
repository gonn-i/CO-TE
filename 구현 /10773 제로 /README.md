
[문제링크](https://www.acmicpc.net/problem/7576)

## 접근 방향 설명

> 옳게 부른 숫자는 스택에 넣고, 0 이 불린 경우 최근에 넣은 숫자를 pop 으로 지워준다.
> ans 에 `rightNum` 에 담긴 숫자의 합을 구해주면 끝

---

```js
let fs = require('fs');
const { dirname } = require('path');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const K = +input.shift();
let rightNum = [];
let ans = 0;

for (let i = 0; i < K; i++) {
  if (input[i] == 0) {
    rightNum.pop();
  } else {
    rightNum.push(input[i]);
  }
}

rightNum.forEach((e) => (ans += e));
console.log(ans);
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

실버에서만 머무르지말고! 골드까지 더 나아가보자

---

## 문제
나코더 기장 재민이는 동아리 회식을 준비하기 위해서 장부를 관리하는 중이다.

재현이는 재민이를 도와서 돈을 관리하는 중인데, 애석하게도 항상 정신없는 재현이는 돈을 실수로 잘못 부르는 사고를 치기 일쑤였다.

재현이는 잘못된 수를 부를 때마다 0을 외쳐서, 가장 최근에 재민이가 쓴 수를 지우게 시킨다.

재민이는 이렇게 모든 수를 받아 적은 후 그 수의 합을 알고 싶어 한다. 재민이를 도와주자!

## 입력
첫 번째 줄에 정수 K가 주어진다. (1 ≤ K ≤ 100,000)

이후 K개의 줄에 정수가 1개씩 주어진다. 정수는 0에서 1,000,000 사이의 값을 가지며, 정수가 "0" 일 경우에는 가장 최근에 쓴 수를 지우고, 아닐 경우 해당 수를 쓴다.

정수가 "0"일 경우에 지울 수 있는 수가 있음을 보장할 수 있다.

## 출력
재민이가 최종적으로 적어 낸 수의 합을 출력한다. 최종적으로 적어낸 수의 합은 231-1보다 작거나 같은 정수이다.

## 예제 입력 1 
4
3
0
4
0
## 예제 출력 1 
0