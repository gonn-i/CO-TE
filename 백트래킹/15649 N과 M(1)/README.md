[문제링크](https://www.acmicpc.net/problem/15649)

## 접근 방향 설명

> 백트래킹 (퇴각검색 알고리즘)
> DFS 탐색 과정에서 되돌아가면서 해를 찾아가는 기법
> 방문 여부를 재귀 돌리고 나서 **방문 여부를 풀어주면서 재탐색이 가능하도록 해줘야 한다.**
> 또한, **재귀 탈출 조건이 무엇인지 파악하는 것도 중요** 

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

let ans = [];
let each = [];
let visited = [...new Array(N + 1)].fill(false);

function DFS(count) {
  if (count == M) {
    // 재귀탈출 조건
    let str = each.join(' ');
    ans.push([str]);
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (visited[i]) {
      continue;
    }
    each.push(i);
    visited[i] = true;
    DFS(count + 1);
    each.pop();
    visited[i] = false;
  }
}

DFS(0);

console.log(ans.join('\n'));
```
---

## 풀이 과정에서 새롭게 느낀점(배운점)

백트래킹 보면 사실 도망치기 급급했다.. (백준 뒤로가기..)
그치만 언제까지 도망갈 수는 없는 법...
백트래링 한우물 파기 시작! 


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