[문제링크](https://www.acmicpc.net/problem/2606)

## 접근 방향 설명

1번(최상위 노드와)과 연결된 노드들을 찾아서 count 해주면 되는 문제!
DFS/BFS 모두 사용해도 되지만 이번엔 BFS를 선택했다.
단순 BFS 구현해주면서 visited.length를 구하거나, visited에 값을 추가할때 count++를 해주면 된다.

## 풀이 코드 해석

```java script
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
let Connected = +input.shift();

let visited = [];
let needVisite = [];
let computers = [];
let count = 0;
input.sort();

// 이중배열로 만들기
for (let i = 0; i < Connected; i++) {
  computers[i] = input[i].split(' ').map(Number);
}

needVisite.push(1); // 초기 감염된 컴퓨터

// BFS
while (needVisite.length !== 0) {
  let target = needVisite.shift();
  if (!visited.includes(target)) {
    visited.push(target);
    count++;
    for (let i = 0; i < computers.length; i++) {
      if (computers[i][0] == target) {
        needVisite.push(computers[i][1]);
      }
      if (computers[i][1] == target) {
        needVisite.push(computers[i][0]);
      }
    }
  }
}
console.log(count - 1);
```

## 풀이 과정에서 새롭게 느낀점(배운점)

사실 bfs 문제 굉장히 빨리 풀어서 기분이 좋았으나 원인모르게 자꾸 16퍼에서 틀려서... 한참을 찾다가 게시판에 질문을 올렸다..
원인은 input으로 개행문자나, 공백이 포함될 수 있기 때문이란다.
그래서 `.trim()` 을 추가해줬더니 해결!
(왜 틀렸지 하면서,, 2시간 쏟았지만 나중엔 금방 해결할 수 있으니 오히려 좋아!)

---

## 문제

신종 바이러스인 웜 바이러스는 네트워크를 통해 전파된다. 한 컴퓨터가 웜 바이러스에 걸리면 그 컴퓨터와 네트워크 상에서 연결되어 있는 모든 컴퓨터는 웜 바이러스에 걸리게 된다.

예를 들어 7대의 컴퓨터가 <그림 1>과 같이 네트워크 상에서 연결되어 있다고 하자. 1번 컴퓨터가 웜 바이러스에 걸리면 웜 바이러스는 2번과 5번 컴퓨터를 거쳐 3번과 6번 컴퓨터까지 전파되어 2, 3, 5, 6 네 대의 컴퓨터는 웜 바이러스에 걸리게 된다. 하지만 4번과 7번 컴퓨터는 1번 컴퓨터와 네트워크상에서 연결되어 있지 않기 때문에 영향을 받지 않는다.

어느 날 1번 컴퓨터가 웜 바이러스에 걸렸다. 컴퓨터의 수와 네트워크 상에서 서로 연결되어 있는 정보가 주어질 때, 1번 컴퓨터를 통해 웜 바이러스에 걸리게 되는 컴퓨터의 수를 출력하는 프로그램을 작성하시오.

## 입력

첫째 줄에는 컴퓨터의 수가 주어진다. 컴퓨터의 수는 100 이하인 양의 정수이고 각 컴퓨터에는 1번 부터 차례대로 번호가 매겨진다. 둘째 줄에는 네트워크 상에서 직접 연결되어 있는 컴퓨터 쌍의 수가 주어진다. 이어서 그 수만큼 한 줄에 한 쌍씩 네트워크 상에서 직접 연결되어 있는 컴퓨터의 번호 쌍이 주어진다.

## 출력

1번 컴퓨터가 웜 바이러스에 걸렸을 때, 1번 컴퓨터를 통해 웜 바이러스에 걸리게 되는 컴퓨터의 수를 첫째 줄에 출력한다.

## 예제 입력 1

7
6
1 2
2 3
1 5
5 2
5 6
4 7

## 예제 출력 1

4
