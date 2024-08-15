[문제링크](https://www.acmicpc.net/problem/15651)

## 접근 방향 설명

> 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열 **(=> 재귀로 돌면서 count가 M가 이면 탈출 + 반복문 범위 N까지)**
> 고른 수열은 오름차순이어야 한다. **(=> 이전에 넣은 수보다 커야하기 때문에 반복문의 시작점 idx를 매개변수로 전달)**⭐️

--- 

## 풀이 코드 해석
``` java script
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [N, M] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

let each = [];
let ans = [];
let visited = [...new Array(N + 1)].fill(false);

function NnM(idx, count) {
  if (count == M) {
    let str = each.join(' ');
    ans.push([str]);
  }

  for (let i = idx; i <= N; i++) {
    if (visited[i]) {
      continue;
    }
    each.push(i);
    visited[i] = true;
    NnM(i, count + 1);
    each.pop();
    visited[i] = false;
  }
}

NnM(1, 0);

console.log(ans.join('\n'));
```
---

## 풀이 과정에서 새롭게 느낀점(배운점)

x


----

## 문제
자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.

1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열
고른 수열은 오름차순이어야 한다.

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