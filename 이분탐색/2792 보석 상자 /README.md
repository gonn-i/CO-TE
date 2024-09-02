[문제링크](https://www.acmicpc.net/problem/2792)

## 접근 방향 설명
> 이분탐색을 활용한 문제로, 문제 안에서 크리티컬한 조건은 다음과 같았다고 생각한다.
> - 같은 색상의 보석만을 줄 수 있다 
> - 보석을 받지 못하는 아이가 있을 수 있다.
> - 보석을 남김 없이 나눠주어야 한다.

> 1️⃣ `start=1`, `end=보석의 max 개수` 로 이분탐색한다. 
> 2️⃣ 계산된 **max 보석의 개수 (= max 징투지수)** `Math.floor((start + end) / 2)`가 최대로 나눠줄 수 있는 수이면서, 보석이 남김없이 나눠질 수 있는 경우이면 ans에 갱신한다
```js
  for (let i = 0; i < M; i++) {
    children += Math.floor(input[i] / m);
    if (input[i] % m > 0) children += 1;
  }

  if (children <= N && ans > m) {
    ans = m;
  }
```
> 3️⃣ 이때, 나눠줄 수 있는 아이의 수가 N보다 작은 경우는 end 를 조정하며, 그 반대의 경우 start를 조정하여 탐색  (start가 end보다 커질때까지 )


## 풀이 코드 해석

```java script
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, M] = input.shift().split(' ').map(Number);

input = input.map(Number);

let end = Math.max(...input);
let start = 0;
let ans = Infinity;

function validation(m) {
  let children = 0;
  for (let i = 0; i < M; i++) {
    children += Math.floor(input[i] / m);
    if (input[i] % m > 0) children += 1;
  }

  if (children <= N && ans > m) {
    ans = m;
  }
  return children <= N;
}

while (start <= end) {
  let mid = Math.floor((start + end) / 2);

  if (validation(mid)) {
    end = mid - 1;
  } else {
    start = mid + 1;
  }
}

console.log(ans);
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

1) 96% 에서 시간초과 발생
-> 각 mid 값에 대해서 children 값을 구할때, 몫의 수만큼 더해주고 나머지가 0보다 크면 +1 해주는 형태로 써야 했는데.. 어리석게도 while 문으로 빼는 형태로 생각했다.. (왜그랬지)
금방 문제를 찾아냈지만 암튼 효율적인 생각이 부족했던 것 같다.
결론) 효율적으로 좀 생각하자!!
---

## 문제
보석 공장에서 보석 상자를 유치원에 기증했다. 각각의 보석은 M가지 서로 다른 색상 중 한 색상이다. 원장 선생님은 모든 보석을 N명의 학생들에게 나누어 주려고 한다. 이때, 보석을 받지 못하는 학생이 있어도 된다. 하지만, 학생은 항상 같은 색상의 보석만 가져간다.

한 아이가 너무 많은 보석을 가져가게 되면, 다른 아이들이 질투를 한다. 원장 선생님은 이런 질투심을 수치화하는데 성공했는데, 질투심은 가장 많은 보석을 가져간 학생이 가지고 있는 보석의 개수이다. 원장 선생님은 질투심이 최소가 되게 보석을 나누어 주려고 한다.

상자에 빨간 보석이 4개 (RRRR), 파란 보석이 7개 (BBBBBBB) 있었고, 이 보석을 5명의 아이들에게 나누어 주는 경우를 생각해보자. RR, RR, BB, BB, BBB로 보석을 나누어주면 질투심은 3이 되고, 이 값보다 작게 나누어 줄 수 없다.

상자 안의 보석 정보와 학생의 수가 주어졌을 때, 질투심이 최소가 되게 보석을 나누어주는 방법을 알아내는 프로그램을 작성하시오.

## 입력
첫째 줄에 아이들의 수 N과 색상의 수 M이 주어진다. (1 ≤ N ≤ 109, 1 ≤ M ≤ 300,000, M ≤ N)

다음 M개 줄에는 구간 [1, 109]에 포함되는 양의 정수가 하나씩 주어진다. K번째 줄에 주어지는 숫자는 K번 색상 보석의 개수이다.

## 출력
첫째 줄에 질투심의 최솟값을 출력한다.

## 예제 입력 1 
5 2
7
4

## 예제 출력 1 
3