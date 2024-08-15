[문제링크](https://www.acmicpc.net/problem/1182)

## 접근 방향 설명

> 반복문을 돌면서, 방문 여부를 체크해주고 + sum에 해당 인덱스의 값을 넣어준다
> i 값과 sum값, count+1 을 넣어 재귀를 돌려주고 다음 합을 찾는다
> 이후, 공집합이 아닌 경우 (count =0) && sum 이 S 인 경우에 ans +1을 해준다
> 재귀를 돌고 난 후에는 방문여부를 false로 바꿔주고, sum도 이전으로 초기화해주기!!

--- 

## 풀이 코드 해석
``` java script
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, S] = input.shift().split(' ').map(Number);
input = input[0].split(' ').map(Number);
let visited = [...new Array(N)].fill(false);
let ans = 0;

function DFS(idx, sum, count) {
  if (sum === S && count > 0) {
    ans += 1;
  }

  for (let i = idx; i < N; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    sum += input[i];
    DFS(i, sum, count + 1);
    visited[i] = false;
    sum -= input[i];
  }
}

DFS(0, 0, 0);

console.log(ans);
```
---

## 풀이 과정에서 새롭게 느낀점(배운점)


```
5 0
0 0 0 0 0
```

공집합이 들어갈 수 있음을 간과하고,, 한참 틀리다가 반례 모음집을 보고 깨달았다... 이런
테스트케이스가 많지 않은 경우, 스스로 최대한 반례 생각해보면서 풀자1! (귀찮아하지말구... )

----

## 문제
N개의 정수로 이루어진 수열이 있을 때, 크기가 양수인 부분수열 중에서 그 수열의 원소를 다 더한 값이 S가 되는 경우의 수를 구하는 프로그램을 작성하시오.

## 입력
첫째 줄에 정수의 개수를 나타내는 N과 정수 S가 주어진다. (1 ≤ N ≤ 20, |S| ≤ 1,000,000) 둘째 줄에 N개의 정수가 빈 칸을 사이에 두고 주어진다. 주어지는 정수의 절댓값은 100,000을 넘지 않는다.

## 출력
첫째 줄에 합이 S가 되는 부분수열의 개수를 출력한다.

## 예제 입력 1 
5 0
-7 -3 -2 5 8

## 예제 출력 1 
1