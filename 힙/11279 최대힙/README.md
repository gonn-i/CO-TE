[문제링크](https://www.acmicpc.net/problem/11279)

## 접근 방향 설명

최소힙 문제와 마찬가지로 기본적인 힙의 구현문제라고 할 수 있다! 최대힙 구현해서 그대로 넣으면 되는 문제

## 풀이 코드 해석

```java script
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

```

## 풀이 과정에서 새롭게 느낀점(배운점)

최소힙과 유사한 형태의 문제였기 때문에 빠르게 손가락을 움직였던 문제였다! 그래서 느낀점은 생략

---

## 문제 설명

널리 잘 알려진 자료구조 중 최대 힙이 있다. 최대 힙을 이용하여 다음과 같은 연산을 지원하는 프로그램을 작성하시오.

배열에 자연수 x를 넣는다.
배열에서 가장 큰 값을 출력하고, 그 값을 배열에서 제거한다.
프로그램은 처음에 비어있는 배열에서 시작하게 된다.

## 입력

첫째 줄에 연산의 개수 N(1 ≤ N ≤ 100,000)이 주어진다. 다음 N개의 줄에는 연산에 대한 정보를 나타내는 정수 x가 주어진다. 만약 x가 자연수라면 배열에 x라는 값을 넣는(추가하는) 연산이고, x가 0이라면 배열에서 가장 큰 값을 출력하고 그 값을 배열에서 제거하는 경우이다. 입력되는 자연수는 231보다 작다.

## 출력

입력에서 0이 주어진 횟수만큼 답을 출력한다. 만약 배열이 비어 있는 경우인데 가장 큰 값을 출력하라고 한 경우에는 0을 출력하면 된다.

## 예제 입력 1

13
0
1
2
0
0
3
2
1
0
0
0
0
0

## 예제 출력 1

0
2
1
3
2
1
0
0
