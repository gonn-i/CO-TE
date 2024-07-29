[문제링크](https://www.acmicpc.net/problem/18870)

## 접근 방향 설명
> 좌표 압축은 별거 없고, **정렬했을때 몇번 인덱스인지 나타내는 거라고 생각하면 될듯**
> 1️⃣ `Set 객체`를 통해 중복값 제거하고, `sort` (오름차순) 
> 2️⃣ 이때 딕셔너리로 넣어서, key 에 값을 넣고, value에 인덱스를 넣어준다 
```js
copy.map((e, i) => {
  dic[e] = i;
});
```
> 3️⃣ 이제 순회를 돌면서 해당하는 **key로 순번 (인덱스)를 꺼내준다**


## 풀이 코드 해석
```java script 
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

input.shift();
let array = input[0].split(' ').map(Number);
let copy = [...new Set(array)].sort((a, b) => a - b); // 중복 제거
let ans = '';
let dic = {};

copy.map((e, i) => {
  dic[e] = i;
});

array.forEach((e) => {
  ans += `${dic[e]} `;
});

console.log(ans);

```
## 풀이 과정에서 새롭게 느낀점(배운점)

Set 객체를 통해 중복을 없앨 수 있다

---
## 문제 설명
수직선 위에 N개의 좌표 X1, X2, ..., XN이 있다. 이 좌표에 좌표 압축을 적용하려고 한다.

Xi를 좌표 압축한 결과 X'i의 값은 Xi > Xj를 만족하는 서로 다른 좌표 Xj의 개수와 같아야 한다.

X1, X2, ..., XN에 좌표 압축을 적용한 결과 X'1, X'2, ..., X'N를 출력해보자.

## 입력
첫째 줄에 N이 주어진다.

둘째 줄에는 공백 한 칸으로 구분된 X1, X2, ..., XN이 주어진다.

## 출력
첫째 줄에 X'1, X'2, ..., X'N을 공백 한 칸으로 구분해서 출력한다.

## 제한
1 ≤ N ≤ 1,000,000
-109 ≤ Xi ≤ 109

## 예제 입력 1 
5
2 4 -10 4 -9

## 예제 출력 1 
2 3 0 3 1
