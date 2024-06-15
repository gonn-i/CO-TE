[문제링크](https://www.acmicpc.net/problem/1439)

## 접근 방향 설명

> 연속적된 숫자만을 한번에 뒤집을 수 있다는게 중요 포인트이다.
그래서 0으로 뒤집을지, 1로 뒤집을지를 생각하면 된다! 

ex. 11001100110011000001  (ans: 4)
```js
//1로 split -> 4번
[
  '',      '',
  '00',    '',
  '00',    '',
  '00',    '',
  '00000', ''
]
```

```js
//0로 split -> 5번
[
  '11', '', '11', '',
  '11', '', '11', '',
  '',   '', '',   '1'
]
```

따라서 0을 4번만 뒤집는게 이득

```js
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

let split_by_zero = [];
let split_by_one = [];

split_by_zero = input.split('0');
split_by_one = input.split('1');

let count_zero = 0;
let count_one = 0;

for (let i = 0; i < split_by_one.length; i++) {
  if (split_by_one[i].includes('0')) count_zero += 1;
}

for (let i = 0; i < split_by_zero.length; i++) {
  if (split_by_zero[i].includes('1')) count_one += 1;
}

console.log(Math.min(count_one, count_zero));
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

이번 문제는 아이디어가 빨리 떠올라 생각보다 쉽게 해결되었다! 
기분 아주 굿!

---

## 문제
다솜이는 0과 1로만 이루어진 문자열 S를 가지고 있다. 다솜이는 이 문자열 S에 있는 모든 숫자를 전부 같게 만들려고 한다. 다솜이가 할 수 있는 행동은 S에서 연속된 하나 이상의 숫자를 잡고 모두 뒤집는 것이다. 뒤집는 것은 1을 0으로, 0을 1로 바꾸는 것을 의미한다.

예를 들어 S=0001100 일 때,

전체를 뒤집으면 1110011이 된다.
4번째 문자부터 5번째 문자까지 뒤집으면 1111111이 되어서 2번 만에 모두 같은 숫자로 만들 수 있다.
하지만, 처음부터 4번째 문자부터 5번째 문자까지 문자를 뒤집으면 한 번에 0000000이 되어서 1번 만에 모두 같은 숫자로 만들 수 있다.

문자열 S가 주어졌을 때, 다솜이가 해야하는 행동의 최소 횟수를 출력하시오.

## 입력
첫째 줄에 문자열 S가 주어진다. S의 길이는 100만보다 작다.

## 출력
첫째 줄에 다솜이가 해야하는 행동의 최소 횟수를 출력한다.

**예제 입력 1**
0001100

**예제 출력 1** 
1

**예제 입력 2**
11111

**예제 출력 2** 
0