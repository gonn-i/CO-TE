[문제링크](https://www.acmicpc.net/problem/1021)

## 접근 방향 설명

> 1) Minheap 을 구현한다
> 2) 주어진 카드 묶음을 차례로 heap에 넣는다.
> 3) 다 넣은 후, 카드 묶음을 2개 뽑고 이를 합친 sum을 다시 heap 에 넣는다.
> 4) 이때, total += sum 
> 5) heap 안에 남아있는 묶음이 없을때까지 반복

--- 

## 풀이 코드 해석
``` java script
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
```
---

## 풀이 과정에서 새롭게 느낀점(배운점)

힙은 이제 어느정도 다 풀 수 있을 것 같기두..?

---- 
## 문제 설명
정렬된 두 묶음의 숫자 카드가 있다고 하자. 각 묶음의 카드의 수를 A, B라 하면 보통 두 묶음을 합쳐서 하나로 만드는 데에는 A+B 번의 비교를 해야 한다. 이를테면, 20장의 숫자 카드 묶음과 30장의 숫자 카드 묶음을 합치려면 50번의 비교가 필요하다.

매우 많은 숫자 카드 묶음이 책상 위에 놓여 있다. 이들을 두 묶음씩 골라 서로 합쳐나간다면, 고르는 순서에 따라서 비교 횟수가 매우 달라진다. 예를 들어 10장, 20장, 40장의 묶음이 있다면 10장과 20장을 합친 뒤, 합친 30장 묶음과 40장을 합친다면 (10 + 20) + (30 + 40) = 100번의 비교가 필요하다. 그러나 10장과 40장을 합친 뒤, 합친 50장 묶음과 20장을 합친다면 (10 + 40) + (50 + 20) = 120 번의 비교가 필요하므로 덜 효율적인 방법이다.

N개의 숫자 카드 묶음의 각각의 크기가 주어질 때, 최소한 몇 번의 비교가 필요한지를 구하는 프로그램을 작성하시오.

## 입력
첫째 줄에 N이 주어진다. (1 ≤ N ≤ 100,000) 이어서 N개의 줄에 걸쳐 숫자 카드 묶음의 각각의 크기가 주어진다. 숫자 카드 묶음의 크기는 1,000보다 작거나 같은 양의 정수이다.

## 출력
첫째 줄에 최소 비교 횟수를 출력한다.

## 예제 입력 1 
3
10
20
40

## 예제 출력 1 
100