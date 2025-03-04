[문제링크](https://www.acmicpc.net/problem/1916)

## 접근 방향 설명

> 1경로와 관련하여, 최소비용을 구해내는 문제였기 떄문에 가중치 그래프를 이용해야 하는 문제였다. 
> 단, 이때 sort로 정렬하여 최소 비용의 경로를 탐색할 경우, 메모리 & 시간 초과를 면할 수 없기 때문에 우선 순위 큐를 이용했다.


> 1️⃣ 그래프로 `start`, `end` , `cost` 를 기준으로 `graph[start].push([end, cost])`를 넣어줬다.
> 2️⃣ 최소힙에, 초기값으로 처음 선택할 경우 S와 비용인 0을 넣어주고 while문을 돌려준다
> 3️⃣ 이때 `while`문은 하나씩 최적의 경로(비용이 적은 순)를 꺼내며, 다음 최적의 경로가 heap 의 제일 앞에 갈 수 있도록 삽입해주며 돌게된다.
> 4️⃣ 최적의 경로가 나온 다면,  `costs` 배열에 비용을 넣어준다

```js
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [N, M, ...input] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [S, E] = input[input.length - 1].split(' ').map(Number);

let graph = Array.from({ length: +N + 1 }, () => []);
let costs = new Array(+N + 1).fill(Infinity);

// 그래프 만들기 (start 을 기준으로, 가능한 경로 [end, cost] 넣기)
for (let i = 0; i < +M; i++) {
  const [start, end, cost] = input[i].split(' ').map(Number);
  graph[start].push([end, cost]);
}

// 메모리 초과 + 시간 초과 방지를 위한 우선 순위 큐 
class MinHeap {
  constructor() {
    this.heap = [];
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  push(v1, v2) {
    this.heap.push([v1, v2]);
    this.bubbleUp();
  }

  bubbleUp() {
    let current_idx = this.heap.length - 1;
    let parent_idx = Math.floor((current_idx - 1) / 2);

    while (this.heap[parent_idx] && this.heap[parent_idx][1] > this.heap[current_idx][1]) {
      this.swap(parent_idx, current_idx);
      current_idx = parent_idx;
      parent_idx = Math.floor((current_idx - 1) / 2);
    }
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();
    let min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  }

  bubbleDown() {
    let idx = 0;
    let rightIdx = idx * 2 + 2;
    let leftIdx = idx * 2 + 1;

    while (
      (this.heap[rightIdx] && this.heap[rightIdx][1] < this.heap[idx][1]) ||
      (this.heap[leftIdx] && this.heap[leftIdx][1] < this.heap[idx][1])
    ) {
      let minIdx = leftIdx;
      if (this.heap[rightIdx] && this.heap[rightIdx][1] < this.heap[leftIdx][1]) minIdx = leftIdx;
      this.swap(minIdx, idx);
      idx = minIdx;
      rightIdx = idx * 2 + 2;
      leftIdx = idx * 2 + 1;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

costs[S] = 0;
let heap = new MinHeap();
heap.push(S, 0); 

while (!heap.isEmpty()) {
  const [to, cost] = heap.pop();

  if (costs[to] < cost) continue; // 갈 수 있는 경로 중, `cost`가 기존에 가능한 경로의 비용보다 크면 걍 쓰루

  // 갈 수 있는 경로 하나씩 순회하며 우선 순위 큐에 넣어주기
  for (const v of graph[to]) {
    const node = v[0]; // to (도착지)
    const d = cost + v[1]; // cost (비용)

    if (d < costs[node]) { // 비용이, 기존에 가능한 경로의 비용보다 작은 경우에만 유의미하기에 분기처리
      heap.push(node, d);
      costs[node] = d;
    }
  }
}

console.log(costs[E]);
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

푸는데 이틀 걸렸던 문제, 호기롭게 이건 무조건 dp지~ 하며 대단히 착각한 탓에 많이 헤맸다.
`from -> to` 가 나온 순간부터 그래프를 떠올렸어야 했고, 최소비용을 구하는 것이 목표였기에 가중치 그래프로 접근했으면 좋았을 걸... 
쩝 아쉬운대로 알고리즘 분류 보고 풀었다 효오 ~.. 

그리고 다익스트라 구할때, sort로 정렬하는 것보다 우선 순위큐로 삽입해주고, 빼주면서 하는게 메모리와 시간초과를 면하는 방법이라는 것도 알게 되었다! 
좋았어.. 이제 다익스트라 다 들어와.... 🔥

---



## 문제
N개의 도시가 있다. 그리고 한 도시에서 출발하여 다른 도시에 도착하는 M개의 버스가 있다. 우리는 A번째 도시에서 B번째 도시까지 가는데 드는 버스 비용을 최소화 시키려고 한다. A번째 도시에서 B번째 도시까지 가는데 드는 최소비용을 출력하여라. 도시의 번호는 1부터 N까지이다.

## 입력
첫째 줄에 도시의 개수 N(1 ≤ N ≤ 1,000)이 주어지고 둘째 줄에는 버스의 개수 M(1 ≤ M ≤ 100,000)이 주어진다. 그리고 셋째 줄부터 M+2줄까지 다음과 같은 버스의 정보가 주어진다. 먼저 처음에는 그 버스의 출발 도시의 번호가 주어진다. 그리고 그 다음에는 도착지의 도시 번호가 주어지고 또 그 버스 비용이 주어진다. 버스 비용은 0보다 크거나 같고, 100,000보다 작은 정수이다.

그리고 M+3째 줄에는 우리가 구하고자 하는 구간 출발점의 도시번호와 도착점의 도시번호가 주어진다. 출발점에서 도착점을 갈 수 있는 경우만 입력으로 주어진다.

## 출력
첫째 줄에 출발 도시에서 도착 도시까지 가는데 드는 최소 비용을 출력한다.

## 예제 입력 1 
5
8
1 2 2
1 3 3
1 4 1
1 5 10
2 4 2
3 4 1
3 5 1
4 5 3
1 5

## 예제 출력 1 
4
