[문제링크](https://www.acmicpc.net/problem/1541)

## 접근 방향 설명

> 괄호를 어디에 둘지가 중요한 만큼 본 문제에선 `-` 부호가 좀 중요하다! 
그래서 `.split('-')` 을 통해 먼저 문자열을 나눠주고, 각 배열 내부의 값들을 최대한 크게 만들어줘서 크게 빼주면 해결된다.

ex -> 
`55-50+40`   -> `'55-50+40'.split('-')`  -> [[55], [50+40]] 

여기에서 55 - (50+40) 해주면 -35 


---

```js
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let split_by_minus = input[0].split('-');
let split_by_plus = [];
let result = 0;

for (let i = 0; i < split_by_minus.length; i++) {
  split_by_plus[i] = split_by_minus[i].split('+').map(Number);
}

for (let i = 0; i < split_by_minus.length; i++) {
  let sum = 0;
  split_by_plus[i].forEach((e) => {
    sum += e;
  });
  if (i == 0) result += sum;
  else {
    result -= sum;
  }
}

console.log(result);
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

split()이 핵심이었던 문제! 그리디 풀다 보니 느낌점이 `sort` 하거나 `split` 하는게 7할인 느낌..?


---

## 문제
세준이는 양수와 +, -, 그리고 괄호를 가지고 식을 만들었다. 그리고 나서 세준이는 괄호를 모두 지웠다.

그리고 나서 세준이는 괄호를 적절히 쳐서 이 식의 값을 최소로 만들려고 한다.

괄호를 적절히 쳐서 이 식의 값을 최소로 만드는 프로그램을 작성하시오.

## 입력
첫째 줄에 식이 주어진다. 식은 ‘0’~‘9’, ‘+’, 그리고 ‘-’만으로 이루어져 있고, 가장 처음과 마지막 문자는 숫자이다. 그리고 연속해서 두 개 이상의 연산자가 나타나지 않고, 5자리보다 많이 연속되는 숫자는 없다. 수는 0으로 시작할 수 있다. 입력으로 주어지는 식의 길이는 50보다 작거나 같다.

## 출력
첫째 줄에 정답을 출력한다.

**예제 입력 1**
55-50+40

**예제 출력 1**
-35