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

for (let i = 0; i < +M; i++) {
  const [start, end, cost] = input[i].split(' ').map(Number);
  graph[start].push([end, cost]);
}

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

  if (costs[to] < cost) continue;

  for (const v of graph[to]) {
    const node = v[0];
    const d = cost + v[1];

    if (d < costs[node]) {
      heap.push(node, d);
      costs[node] = d;
    }
  }
}

console.log(costs[E]);
