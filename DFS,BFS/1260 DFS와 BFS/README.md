[문제링크](https://www.acmicpc.net/problem/1260)

## 접근 방향

1. 입력값을 받아서 그래프로 만들어줌 (이차원배열)
2. DFS (타켓인덱스에 해당하는 값들 존재하면 탐색필요배열 앞에 넣어주고, shift하면서 방문여부 체크)
3. BFS (타켓인덱스에 해당하는 값들 존재하면 탐색필요배열 뒤에 넣어주고, shift하면서 방문여부 체크)

## 풀이 코드 해석

```java script
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, M, V] = input.shift().split(' ').map(Number);

let graph = [...new Array(N + 1)].map((e) => []);
let needVisite = []; //방문해야 할 수
let visited = []; //이미 방문한 수

//그래프로 만들어주기
for (let i = 0; i < M; i++) {
  let [dot1, dot2] = input[i].split(' ').map(Number);
  graph[dot1].push(dot2);
  graph[dot2].push(dot1);
}

needVisite.push(V); // 가장 먼저 방문해야 할 값 삽입

// sort하면 안됨 -> 빈배열에서 sort 돌리면 typeError
// console.log(graph);

//DFS -> 깊이 우선 탐색
while (needVisite.length !== 0) {
  target = needVisite.shift();
  if (!visited.includes(target)) {
    visited.push(target);
    if (graph[target]) {
      let insert = graph[target].sort((a, b) => a - b); // 걍 sort하면 안됨
      needVisite = [...insert, ...needVisite];
    }
  }
}

console.log(visited.join(' '));

needVisite = []; //방문해야 할 수
visited = []; //이미 방문한 수

needVisite.push(V);

// BFS -> 너비 우선 탐색
while (needVisite.length !== 0) {
  let target = needVisite.shift();
  if (!visited.includes(target)) {
    visited.push(target);
    if (graph[target]) {
      let insert = graph[target].sort((a, b) => a - b);
      needVisite = [...needVisite, ...insert];
    }
  }
}

console.log(visited.join(' '));
```

## 풀이 과정에서 새롭게 느낀점(배운점)

처음엔 dfs bfs 감도 못 잡았었지만 이제는 단계를 생각해서 차근히 풀어낼 수 있을정도로 이해가 된 것 같다! (근데 이 문제는 이래저래 다른 개념에서.. 내가 놓친 부분이 많아서 조금 걸렸다.. )

1. 5퍼에서 틀렸습니다
   이건 정렬 방식의 문제였다. 정점의 개수 N(1 ≤ N ≤ 1,000)를 보고 단순 sort를 해버려서 사전식 정렬이 되어버려서 오답이 되었다.

   반례

   ```
   10 10 4
   5 4
   6 4
   6 8
   8 9
   1 10
   2 10
   10 3
   8 2
   1 7
   4 10

   ```

2. typeError의 늪
   처음엔 정렬을 젤 처음 이중배열을 통한 그래프 생성 시에 해주었는데 이게 엄청난 실수였다. TypeError가 떴는데, 런타임에러가 생기고 어디에서 인덱스가 나갔지 헤메다가(입력할때 공백이 있나..까지 갔지만 ) 결국 빈배열에서 sort((a,b)=> a-b)를 돌리니까 typeError가 났던 것이었다.
   (이런 실수 다시는 ... 하지 말아야겠다)

---

## 문제

그래프를 DFS로 탐색한 결과와 BFS로 탐색한 결과를 출력하는 프로그램을 작성하시오. 단, 방문할 수 있는 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문하고, 더 이상 방문할 수 있는 점이 없는 경우 종료한다. 정점 번호는 1번부터 N번까지이다.

## 입력

첫째 줄에 정점의 개수 N(1 ≤ N ≤ 1,000), 간선의 개수 M(1 ≤ M ≤ 10,000), 탐색을 시작할 정점의 번호 V가 주어진다. 다음 M개의 줄에는 간선이 연결하는 두 정점의 번호가 주어진다. 어떤 두 정점 사이에 여러 개의 간선이 있을 수 있다. 입력으로 주어지는 간선은 양방향이다.

## 출력

첫째 줄에 DFS를 수행한 결과를, 그 다음 줄에는 BFS를 수행한 결과를 출력한다. V부터 방문된 점을 순서대로 출력하면 된다.

## 예제 입력 1

4 5 1
1 2
1 3
1 4
2 4
3 4

## 예제 출력 1

1 2 4 3
1 2 3 4

## 예제 입력 2

5 5 3
5 4
5 2
1 2
3 4
3 1

## 예제 출력 2

3 1 2 5 4
3 1 4 2 5

## 예제 입력 3

1000 1 1000
999 1000

## 예제 출력 3

1000 999
1000 999
