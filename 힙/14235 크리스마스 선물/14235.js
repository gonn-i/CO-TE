let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim());

let ans = [];
let n = +input.shift();

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  swap(idx1, idx2) {
    [this.heap[idx2], this.heap[idx1]] = [this.heap[idx1], this.heap[idx2]];
  }

  insert(e) {
    this.heap.push(e);
    this.bubbleup();
  }

  bubbleup() {
    let currentIdx = this.heap.length - 1;
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (this.heap[parentIdx] && this.heap[parentIdx] < this.heap[currentIdx]) {
      this.swap(parentIdx, currentIdx);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  poll() {
    if (this.heap.length == 0) return -1;
    else if (this.heap.length == 1) return this.heap.pop();
    else {
      let max = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.bubbledown();

      return max;
    }
  }

  bubbledown() {
    let parentIdx = 0;
    let leftchildIdx = parentIdx * 2 + 1;
    let rightchildIdx = parentIdx * 2 + 2;
    while (
      (this.heap[leftchildIdx] && this.heap[leftchildIdx] >= this.heap[parentIdx]) ||
      (this.heap[rightchildIdx] && this.heap[rightchildIdx] >= this.heap[parentIdx])
    ) {
      let largerone = leftchildIdx;
      if (this.heap[leftchildIdx] < this.heap[rightchildIdx]) largerone = rightchildIdx;
      this.swap(largerone, parentIdx);
      parentIdx = largerone;
      leftchildIdx = parentIdx * 2 + 1;
      rightchildIdx = parentIdx * 2 + 2;
    }
  }
}

let heap = new MaxHeap();

for (each of input) {
  if (each == 0) {
    ans.push(heap.poll());
  } else {
    let temp = each.split(' ').map(Number);
    temp.shift();

    temp.forEach((e) => {
      heap.insert(e);
    });
  }
}

console.log(ans.join('\n'));
