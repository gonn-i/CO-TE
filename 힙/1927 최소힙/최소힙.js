const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .split('\n');

let ANS = [];
let NUM = input.shift();

class MinHeap {
  constructor() {
    this.heap = [];
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  add(input) {
    this.heap.push(input);
    this.bubbleUp();
  }

  bubbleUp() {
    let currentIdx = this.heap.length - 1;
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (this.heap[parentIdx] && this.heap[parentIdx] > this.heap[currentIdx]) {
      this.swap(currentIdx, parentIdx);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  delete() {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    if (this.heap.length == '0') {
      return -1;
    }

    let root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return root;
  }

  bubbleDown() {
    let idx = 0;
    let left = idx * 2 + 1;
    let right = idx * 2 + 2;
    while (
      (this.heap[left] && this.heap[left] < this.heap[idx]) ||
      (this.heap[right] && this.heap[right] < this.heap[idx])
    ) {
      let smallerIdx = left;
      if (this.heap[right] && this.heap[left] > this.heap[right]) {
        smallerIdx = right;
      }
      this.swap(smallerIdx, idx);
      // console.log('버블다운하고 스왑 후' + this.heap);
      idx = smallerIdx;
      left = idx * 2 + 1;
      right = idx * 2 + 2;
    }
  }
}

let Heap = new MinHeap();

for (let i = 0; i < NUM; i++) {
  let value = parseInt(input[i]);
  if (value == '0') {
    // 0으로 인한, 최소값 출력 및 삭제
    let min = Heap.delete();
    min == -1 ? ANS.push(0) : ANS.push(min);
  } else {
    // 자연수 입력으로, 배열에 추가될 경우
    Heap.add(value);
  }
}

console.log(ANS.join('\n'));
