[문제링크](https://www.acmicpc.net/problem/15651)

## 접근 방향 설명

> 1부터 N까지 자연수 중에서 M개를 고른 수열 **(=> 재귀로 돌면서 count가 M가 이면 탈출)**
> 같은 수를 여러 번 골라도 된다. **(=> 방문 여부 체크할 필요없음/ 이때까지 방문한 배열은 통으로 매개변수에 전달)**

--- 

## 풀이 코드 해석
``` java script
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [N, M] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split(' ');

let ans = [];
let array = [];

function DFS(temp, count) {
  if (count == M) {
    let str = temp.join(' ');
    ans.push([str]);
    return;
  }

  for (let i = 1; i <= N; i++) {
    temp.push(i);
    DFS(temp, count + 1);
    temp.pop();
  }
}

DFS(array, 0);

console.log(ans.join('\n'));
```
---

## 풀이 과정에서 새롭게 느낀점(배운점)

문제 상황에 따라, 어떤 값들을 매개변수로 넘겨야 할지 조금씩 감이 오는 것 같다! 
계속해서 깊고잉~


----

## 문제
자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.

1부터 N까지 자연수 중에서 M개를 고른 수열
같은 수를 여러 번 골라도 된다.
입력
첫째 줄에 자연수 N과 M이 주어진다. (1 ≤ M ≤ N ≤ 7)

## 출력
한 줄에 하나씩 문제의 조건을 만족하는 수열을 출력한다. 중복되는 수열을 여러 번 출력하면 안되며, 각 수열은 공백으로 구분해서 출력해야 한다.

수열은 사전 순으로 증가하는 순서로 출력해야 한다.

## 예제 입력 1 
3 1

## 예제 출력 1 
1
2
3