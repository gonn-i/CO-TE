[문제링크](https://www.acmicpc.net/problem/14888)

## 접근 방향 설명

> 1) **`calculate(1, Nums[0]);` `idx`와 `초기 sum 값`을 전달**해준다. (이때, sum의 초기값은 Num[i] 이기 때문에, idx로 1을 전달)
> 2) 연산자의 각 갯수가 담긴 배열을 돌며, 재귀를 돌려주면 되는데
**switch case 문**을 통해, **다음인덱스인 idx +1 와 새로운 sum값을 전달**한다.
> (나눗셈의 경우 `Math.trunc` 를 통해 소숫점을 제거)
> 4) 재귀를 돌면서 idx가 N이 되면 sum 값을 `sums 배열`에 넣는다 (이때, -0을 대비하여 삼항연산자로 처리한다.)
--- 

## 풀이 코드 해석
``` java script
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [N, Nums, ...array] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

Nums = Nums.split(' ').map(Number);
array = array[0].split(' ').map(Number);

let sums = [];

function calculate(idx, sum) {
  if (idx == N) {
    sums.push(Object.is(sum, -0) ? 0 : sum);
    return;
  }

  for (let j = 0; j < 4; j++) {
    if (array[j] > 0) {
      array[j] -= 1;
      switch (j) {
        case 0:
          calculate(idx + 1, sum + Nums[idx]);
          break;
        case 1:
          calculate(idx + 1, sum - Nums[idx]);
          break;
        case 2:
          calculate(idx + 1, sum * Nums[idx]);
          break;
        case 3:
          calculate(idx + 1, Math.trunc(sum / Nums[idx]));
          break;
      }
      array[j] += 1;
    }
  }
}

calculate(1, Nums[0]);
console.log(Math.max(...sums));
console.log(Math.min(...sums));
```
---

## 풀이 과정에서 새롭게 느낀점(배운점)

js에서는 -0과 +0 를 구분해서 출력한다는 사실을 전혀 몰랐다..

해결방법
```js
    sums.push(Object.is(sum, -0) ? 0 : sum);
```


----

## 문제
자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.

1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열

## 입력
첫째 줄에 자연수 N과 M이 주어진다. (1 ≤ M ≤ N ≤ 8)

## 출력
한 줄에 하나씩 문제의 조건을 만족하는 수열을 출력한다. 중복되는 수열을 여러 번 출력하면 안되며, 각 수열은 공백으로 구분해서 출력해야 한다.

수열은 사전 순으로 증가하는 순서로 출력해야 한다.

## 예제 입력 1 
3 1

## 예제 출력 1 
1
2
3