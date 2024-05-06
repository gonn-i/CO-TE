[문제링크](https://www.acmicpc.net/problem/1927)

## 접근 방향 설명

힙의 아주 기초적인 문제라고 할 수 있다. 최소값을 찾는 문제이니 만큼 최소힙을 구현하면 되는문제!

## 풀이 코드 해석

```java script
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

```

## 풀이 과정에서 새롭게 느낀점(배운점)

1. 버블업 작성할때 왜 값 비교가 제대로 작동 안되지 콘솔로 찍어보면서 조금 시간을 썼다. 입력값이 숫자가 아닐 수 있음에 항상 조심하자! 🚨

2. 그리고 최소힙 나름 잘 구현한거 같은데, 시간 초과가 떠서 검색해보니 console.log가 느리다는 것을 알게 되었고, 시간 단축을 위해서는 애초에 처음부터 배열에 넣어서 한번에 출력하는게 더 나은 방법이라는 것을 알았다.

---

## 문제 설명

널리 잘 알려진 자료구조 중 최소 힙이 있다. 최소 힙을 이용하여 다음과 같은 연산을 지원하는 프로그램을 작성하시오.

배열에 자연수 x를 넣는다.
배열에서 가장 작은 값을 출력하고, 그 값을 배열에서 제거한다.
프로그램은 처음에 비어있는 배열에서 시작하게 된다.

## 입력

첫째 줄에 연산의 개수 N(1 ≤ N ≤ 100,000)이 주어진다. 다음 N개의 줄에는 연산에 대한 정보를 나타내는 정수 x가 주어진다. 만약 x가 자연수라면 배열에 x라는 값을 넣는(추가하는) 연산이고, x가 0이라면 배열에서 가장 작은 값을 출력하고 그 값을 배열에서 제거하는 경우이다. x는 231보다 작은 자연수 또는 0이고, 음의 정수는 입력으로 주어지지 않는다.

## 출력

입력에서 0이 주어진 횟수만큼 답을 출력한다. 만약 배열이 비어 있는 경우인데 가장 작은 값을 출력하라고 한 경우에는 0을 출력하면 된다.

### 예제 입력 1

9
0
12345678
1
2
0
0
0
0
32

### 예제 출력 1

0
1
2
12345678
0
