[문제링크](https://www.acmicpc.net/problem/1325)

## 접근 방향

> 알고리즘 자체는 그리 어렵지 않게 떠올릴 수 있었던 문제였다.

> 1️⃣ `a`는 `b`를 신뢰하기 때문에, `b`의 바이러스 여부는 `a`를 감염시킨다. 그렇기 때문에, 그래프로서 입력값을 정리해준다
> `graph[b].push(a)` 와 같이 정리하는 식으로 말이다.
> 2️⃣ 그다음 `bfs` 나 `dfs`로 탐색을 해주면 된다. 
> 3️⃣ 나의 경우는, 시간 초과를 면하기 위해, `shift` 연산을 사용하는 대신 `idx`를 움직이는 식으로 `bfs` 탐색을 돌았다. 
> 4️⃣ `bfs` 함수의 `return`으로 감염시킨 컴퓨터 수를 던져주었으며, 이를 토대로 최대값을 구해서 `result` 배열에 넣어 출력하는 식으로 답을 구했다.

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
let graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
  let [a, b] = input[i].split(' ');
  graph[+b].push(+a);
}

let max = 0;
let result = [];

const bfs = (start) => {
  let queue = [start];
  let visited = new Array(N + 1).fill(false);
  let count = 0;
  let idx = 0;
  visited[start] = true;

  while (queue.length > idx) {
    let target = queue[idx++];
    for (let v of graph[target]) {
      if (visited[v]) continue;
      queue.push(v);
      count++;
      visited[v] = true;
    }
  }

  return count;
};

for (let i = 1; i <= N; i++) {
  let count = bfs(i);
  if (count > max) {
    max = count;
    result = [i];
  } else if (count === max) {
    result.push(i);
  }
}

console.log(result.join(' '));
```

## 풀이 과정에서 새롭게 느낀점(배운점)

9개월 전에, 틀린 문제를 이제서야 다시 풀 수 있었다. 테스트 케이스는 무난하게 돌릴 수 있었으나, 메모리 초과 부분에서 잘못된 부분을 찾지 못해 애를 먹었다.

`느낀점`

1) shift와 pop 연산을 사용하기 보다는 idx를 대신하자 
사실상 직접 사용할떄는, 메소드를 사용하면 되기에 큰 생각없이 사용하게 되는 부분 중에 하나인데 연산임을 잊지 말고 최대한 줄여보자

2) visited 체크에 있어서 무엇을 방문처리할지 잘 생각하기 
오답의 구덩텅이에서 허우적거렸던 이유가 바로 여기에 있었다. 사실상 아래 각주와 같이 방문처리를 잘못해주니 불필요한 (이미 방문한) 쪽으로도 탐색이 이어졌고 
이는 메모리를 터뜨려버리는 불상사를 불러왔다. ㅎㅎ,,, 이것도 모르고 이것저것 바꾸면서 열심히 삽질해버렸다.

```js
  while (queue.length > idx) {
    let target = queue[idx++];
    for (let v of graph[target]) {
      // if (!visited[target]) 
      if (visited[v]) continue;
      queue.push(v);
      count++;
      visited[v] = true;
    }
  }
```

---

## 문제
해커 김지민은 잘 알려진 어느 회사를 해킹하려고 한다. 이 회사는 N개의 컴퓨터로 이루어져 있다. 김지민은 귀찮기 때문에, 한 번의 해킹으로 여러 개의 컴퓨터를 해킹 할 수 있는 컴퓨터를 해킹하려고 한다.

이 회사의 컴퓨터는 신뢰하는 관계와, 신뢰하지 않는 관계로 이루어져 있는데, A가 B를 신뢰하는 경우에는 B를 해킹하면, A도 해킹할 수 있다는 소리다.

이 회사의 컴퓨터의 신뢰하는 관계가 주어졌을 때, 한 번에 가장 많은 컴퓨터를 해킹할 수 있는 컴퓨터의 번호를 출력하는 프로그램을 작성하시오.

## 입력
첫째 줄에, N과 M이 들어온다. N은 10,000보다 작거나 같은 자연수, M은 100,000보다 작거나 같은 자연수이다. 둘째 줄부터 M개의 줄에 신뢰하는 관계가 A B와 같은 형식으로 들어오며, "A가 B를 신뢰한다"를 의미한다. 컴퓨터는 1번부터 N번까지 번호가 하나씩 매겨져 있다.

## 출력
첫째 줄에, 김지민이 한 번에 가장 많은 컴퓨터를 해킹할 수 있는 컴퓨터의 번호를 오름차순으로 출력한다.

## 예제 입력 1 
5 4
3 1
3 2
4 3
5 3

## 예제 출력 1 
1 2