let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let T = +input.shift();
let ans = [];

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  insert(v) {
    this.heap.push(v);
    this.bubbleUp();
  }

  // Max 가 젤 위로
  bubbleUp() {
    let currentIdx = this.heap.length - 1;
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (this.heap[parentIdx] && this.heap[parentIdx] < this.heap[currentIdx]) {
      this.swap(currentIdx, parentIdx);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  pollMax() {
    if (this.heap.length == 0) return -1;
    else if (this.heap.length == 1) return this.heap.pop();
    else {
      let max = this.heap[0];
      this.deleteMax();
      return max;
    }
  }

  deleteMax() {
    this.heap[0] = this.heap.pop();
    let currentIdx = 0;
    let rightIdx = currentIdx * 2 + 2;
    let leftIdx = currentIdx * 2 + 1;
    while (
      (this.heap[rightIdx] && this.heap[rightIdx] > this.heap[currentIdx]) ||
      (this.heap[leftIdx] && this.heap[leftIdx] > this.heap[currentIdx])
    ) {
      let biggerIdx = rightIdx;
      if (this.heap[rightIdx] < this.heap[leftIdx]) biggerIdx = leftIdx;
      this.swap(biggerIdx, currentIdx);
      currentIdx = biggerIdx;
      rightIdx = currentIdx * 2 + 2;
      leftIdx = currentIdx * 2 + 1;
    }
  }
}
class MinHeap {
  constructor() {
    this.heap = [];
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  insert(v) {
    this.heap.push(v);
    this.bubbleUp();
  }

  // Min 젤 위로
  bubbleUp() {
    let currentIdx = this.heap.length - 1;
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (this.heap[parentIdx] && this.heap[parentIdx] > this.heap[currentIdx]) {
      this.swap(currentIdx, parentIdx);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  pollMin() {
    if (this.heap.length == 0) return -1;
    else if (this.heap.length == 1) return this.heap.pop();
    else {
      let min = this.heap[0];
      this.deleteMin();
      return min;
    }
  }

  deleteMin() {
    this.heap[0] = this.heap.pop();
    let currentIdx = 0;
    let rightIdx = currentIdx * 2 + 2;
    let leftIdx = currentIdx * 2 + 1;
    while (
      (this.heap[rightIdx] && this.heap[rightIdx] < this.heap[currentIdx]) ||
      (this.heap[leftIdx] && this.heap[leftIdx] < this.heap[currentIdx])
    ) {
      let smallerIdx = rightIdx;
      if (this.heap[rightIdx] > this.heap[leftIdx]) smallerIdx = leftIdx;
      this.swap(smallerIdx, currentIdx);
      currentIdx = smallerIdx;
      rightIdx = currentIdx * 2 + 2;
      leftIdx = currentIdx * 2 + 1;
    }
  }
}

while (T > 0) {
  let Q = +input.shift();
  let array = [];
  for (let i = 0; i < Q; i++) {
    array[i] = input[i].split(' ');
    array[i][1] = parseInt(array[i][1]);
  }
  let Maxheap = new MaxHeap();
  let Minheap = new MinHeap();
  let deleted = [];
  array.forEach((l) => {
    if (l[0] == 'I') {
      Maxheap.insert(l[1]);
      Minheap.insert(l[1]);
    } else {
      if (l[1] == -1) {
        let e = Minheap.pollMin();
        if (deleted.includes(e)) {
          e = Minheap.pollMin();
        }
        deleted.push(e);
      } else {
        let o = Maxheap.pollMax();
        if (deleted.includes(o)) {
          o = Maxheap.pollMax();
        }
        deleted.push(o);
      }
    }
  });
  let min = Minheap.pollMin();
  let max = Maxheap.pollMax();
  if (deleted.includes(min) || deleted.includes(max)) ans.push('EMPTY');
  else {
    ans.push([max, min]);
  }
  input.splice(0, Q);
  T--;
}

console.log(ans.join('\n'));
