[문제링크](https://www.acmicpc.net/problem/11047)

## 접근 방향 설명

> **최소한의 동전 갯수로 K 만큼의 금액을 만들어내면** 되는 문제 
주어진 배열을 역순으로 반복문을 돌리되, `금액 / 배열의 금액` 이 1 이상이면 
`Math.floor(K / input[i])` 을 `count` 에 넣어주고, 구해낸 금액은 `K % input[i]` 하면 거스름 돈이 나온다

ex. 
4200 
1000원 -> 4개 
4200 % 1000  = 4... 나머지 200


---
## 풀이코드

```js
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, K] = input.shift().split(' ').map(Number);

input = input.map(Number);

let count = 0;

for (let i = N - 1; i >= 0; i--) {
  if (K / input[i] !== 0) {
    count += Math.floor(K / input[i]);
    K = K % input[i];
  }
}

console.log(count);
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

사실 그리디 알고리즘을 풀떄, 힙과 dfs처럼 문제 풀이 방식이 있는게 아니라 해답을 찾기 위한 방법을 어떻게 최적으로 구할까 이런 느낌이라 아직까지는 아리까리한 느낌이다.

비록 쉽게쉽게 그리디 문제를 해결하고 있지만, '필승! 방법' 혹은 '자신감 넘치는 경지' 는 잘 모르겠다.. 일단 킾고잉!


---

## 문제
준규가 가지고 있는 동전은 총 N종류이고, 각각의 동전을 매우 많이 가지고 있다.

동전을 적절히 사용해서 그 가치의 합을 K로 만들려고 한다. 이때 필요한 동전 개수의 최솟값을 구하는 프로그램을 작성하시오.

입력
첫째 줄에 N과 K가 주어진다. (1 ≤ N ≤ 10, 1 ≤ K ≤ 100,000,000)

둘째 줄부터 N개의 줄에 동전의 가치 Ai가 오름차순으로 주어진다. (1 ≤ Ai ≤ 1,000,000, A1 = 1, i ≥ 2인 경우에 Ai는 Ai-1의 배수)

출력
첫째 줄에 K원을 만드는데 필요한 동전 개수의 최솟값을 출력한다.

예제 입력 1 
10 4200
1
5
10
50
100
500
1000
5000
10000
50000
예제 출력 1 
6