let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .split('\n');

let Num = parseInt(input.shift());

class absoluteHeap {
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

    // 부모 노드가 존재하고, 자식 노드의 절대값이 더 작은 경우 swap
    while (this.heap[parentIdx] && Math.abs(this.heap[parentIdx]) >= Math.abs(this.heap[currentIdx])) {
      if (
        // 만약 절대값이 같은 경우에, 부모가 음수라면 break
        Math.abs(this.heap[parentIdx]) == Math.abs(this.heap[currentIdx]) &&
        this.heap[parentIdx] < this.heap[currentIdx]
      )
        break;
      this.swap(currentIdx, parentIdx);
      currentIdx = parentIdx;
      parentIdx = this.getParent(currentIdx);
    }
    // console.log('버블업 후 힙' + this.heap);
  }

  poll() {
    if (this.heap.length == 0) {
      return 0;
    }
    if (this.heap.length == 1) {
      return this.heap.pop();
    }
    let absMin = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return absMin;
  }

  bubbleDown() {
    let idx = 0;
    let leftIdx = this.getLeft(idx);
    let rightIdx = this.getRight(idx);

    while (
      // 자식 노드와 부모노드의 절댓값을 비교하여, 자식이 더 작을 경우 swap
      (this.heap[leftIdx] && Math.abs(this.heap[leftIdx]) <= Math.abs(this.heap[idx])) ||
      (this.heap[rightIdx] && Math.abs(this.heap[rightIdx]) <= Math.abs(this.heap[idx]))
    ) {
      let absSmaller = leftIdx;
      if (
        Math.abs(this.heap[leftIdx]) > Math.abs(this.heap[rightIdx]) ||
        (Math.abs(this.heap[leftIdx]) == Math.abs(this.heap[rightIdx]) && this.heap[rightIdx] < this.heap[leftIdx])
      ) {
        absSmaller = rightIdx;
      }
      if (
        // 만약 절대값이 같은 경우에, 부모가 음수라면 break
        Math.abs(this.heap[idx]) == Math.abs(this.heap[absSmaller]) &&
        this.heap[idx] < this.heap[absSmaller]
      )
        break;

      this.swap(absSmaller, idx);
      idx = absSmaller;
      leftIdx = this.getLeft(idx);
      rightIdx = this.getRight(idx);
    }
    // console.log('버블 다운 후 힙' + this.heap);
  }
}

let heap = new absoluteHeap();
let Ans = [];
for (let i = 0; i < Num; i++) {
  let value = parseInt(input[i]);
  if (value == 0) {
    let result = heap.poll();
    Ans.push(result);
  } else {
    heap.add(value);
  }
}

console.log(Ans.join('\n'));
