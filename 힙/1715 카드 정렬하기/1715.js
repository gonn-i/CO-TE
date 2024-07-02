let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

class MinHeap {
  constructor() {
    this.heap = [];
  }

  length() {
    return this.heap.length;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  insert(e) {
    this.heap.push(e);
    this.bubbleup();
  }

  bubbleup() {
    let currentIdx = this.heap.length - 1;
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (this.heap[parentIdx] && this.heap[parentIdx] > this.heap[currentIdx]) {
      this.swap(parentIdx, currentIdx);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  poll() {
    if (this.heap.length == 1) {
      return this.heap.pop();
    } else if (this.heap.length == 0) {
      return 0;
    }
    let MIN = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbledown();
    return MIN;
  }

  bubbledown() {
    let root = 0;
    let rightchildIdx = root * 2 + 2;
    let leftchildIdx = root * 2 + 1;
    while (
      (this.heap[rightchildIdx] && this.heap[rightchildIdx] < this.heap[root]) ||
      (this.heap[leftchildIdx] && this.heap[leftchildIdx] < this.heap[root])
    ) {
      let smallerIdx = leftchildIdx;
      if (this.heap[leftchildIdx] > this.heap[rightchildIdx]) {
        smallerIdx = rightchildIdx;
      }
      this.swap(root, smallerIdx);
      root = smallerIdx;
      rightchildIdx = root * 2 + 2;
      leftchildIdx = root * 2 + 1;
    }
  }
}

let heap = new MinHeap();
let total = 0;

let N = +input.shift();

for (let i = 0; i < N; i++) {
  heap.insert(+input[i]);
}

while (heap.length() > 1) {
  let deck1 = heap.poll();
  let deck2 = heap.poll();
  let sum = deck1 + deck2;
  total += sum;
  heap.insert(sum);
}

console.log(total);
