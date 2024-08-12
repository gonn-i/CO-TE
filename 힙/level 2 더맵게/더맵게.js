function solution(scoville, K) {
  let count = 0;
  let flag = true;

  let Heap = new MinHeap();
  for (let i = 0; i < scoville.length; i++) {
    Heap.insert(scoville[i]);
  }
  while (Heap.pick() < K && Heap.length() > 1) {
    let min = Heap.poll();
    let second = Heap.poll();
    let mixed = min + second * 2;
    Heap.insert(mixed);
    count++;
  }
  return Heap.pick() < K ? -1 : count;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  length() {
    return this.heap.length;
  }

  pick() {
    if (this.length == 0) return -1;
    return this.heap[0];
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.length() - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (this.heap[parentIdx] && this.heap[parentIdx] > this.heap[idx]) {
      this.swap(idx, parentIdx);
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
  }

  poll() {
    if (this.heap.length == 1) return this.heap.pop();
    else {
      let min = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.bubbleDown();
      return min;
    }
  }

  bubbleDown() {
    let idx = 0;
    let rightIdx = idx * 2 + 2;
    let leftIdx = idx * 2 + 1;
    while (
      (this.heap[rightIdx] && this.heap[rightIdx] < this.heap[idx]) ||
      (this.heap[leftIdx] && this.heap[leftIdx] < this.heap[idx])
    ) {
      let smallerIdx = rightIdx;
      if (!this.heap[rightIdx]) {
        smallerIdx = leftIdx;
      }
      if (this.heap[rightIdx] > this.heap[leftIdx] && this.heap[leftIdx]) {
        smallerIdx = leftIdx;
      }
      this.swap(smallerIdx, idx);
      idx = smallerIdx;
      rightIdx = idx * 2 + 2;
      leftIdx = idx * 2 + 1;
    }
  }
}
