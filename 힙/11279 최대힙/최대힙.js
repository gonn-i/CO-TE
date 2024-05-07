const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .split('\n');

let NUM = parseInt(input.shift());

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  getParent(i) {
    return Math.floor((i - 1) / 2);
  }

  getLeft(i) {
    return i * 2 + 1;
  }
  getRight(i) {
    return i * 2 + 2;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  add(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let currentIdx = this.heap.length - 1;
    let parentIdx = this.getParent(currentIdx);

    while (this.heap[parentIdx] && this.heap[parentIdx] < this.heap[currentIdx]) {
      this.swap(currentIdx, parentIdx);
      currentIdx = parentIdx;
      parentIdx = this.getParent(currentIdx);
    }
  }

  poll() {
    if (this.heap.length == 0) {
      return -1;
    }
    if (this.heap.length == 1) {
      let Max = this.heap.pop();
      return Max;
    }
    let Max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return Max;
  }

  bubbleDown() {
    let idx = 0;
    let leftIdx = this.getLeft(idx);
    let rightIdx = this.getRight(idx);

    while (
      (this.heap[leftIdx] && this.heap[idx] < this.heap[leftIdx]) ||
      (this.heap[rightIdx] && this.heap[idx] < this.heap[rightIdx])
    ) {
      let bigger = leftIdx;

      if (this.heap[leftIdx] < this.heap[rightIdx]) {
        bigger = rightIdx;
      }
      this.swap(bigger, idx);
      idx = bigger;
      leftIdx = this.getLeft(idx);
      rightIdx = this.getRight(idx);
    }
  }
}

let Ans = [];

let heap = new MaxHeap();

for (let i = 0; i < NUM; i++) {
  let value = parseInt(input[i]); // 입력값, 정수변환
  if (value == 0) {
    // 입력값 0 인 경우, max값 출력 or 배열인 빈 경우 0 출력
    let result = heap.poll();
    result == -1 ? Ans.push(0) : Ans.push(result);
  } else {
    // 입력값 자연수인 경우, 배열에 추가
    heap.add(value);
  }
}

console.log(Ans.join('\n'));
