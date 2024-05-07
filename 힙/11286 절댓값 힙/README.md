[문제링크](https://www.acmicpc.net/problem/11286)

## 접근 방향 설명

절대값을 기준으로, 최소힙 정렬을 하되 이제 절댓값이 같은 경우 예외처리를 해주면 간단하게 풀리는 문제이다. 1927 최소힙과 11279 최대힙 문제에서 아주 살짝만 더 생각하는 버전같았다.

> 사고과정
>
> 1. 값 추가 후, 버블업 진행시 부모 노드와 절댓값 비교 + 절댓값이 같은 경우에 예외처리
> 2. 최상위 노드 (절댓값이 가장 작고 값이 작은 수)를 뽑아내는 경우, 버블 다운 진행시 부모노드와 자식노드 (좌우노드) 중 더 절댓값이 작은 값과의 비교 + 절댓값이 같은 경우에 예외처리
>    (이때, 오른쪽과 왼쪽 자식 중 더 작은 값을 구할때 역시 절댓값이 같은 경우를 고려해줘야 한다.)

## 풀이 코드 해석

```java script
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

```

## 풀이 과정에서 새롭게 느낀점(배운점)

1. 오타는 항상 조심하자!
   생각보다 빠르게 풀어냈지만.. 예상치도 못한 referenceError가 떴다. 그 이유는 break를 brek로 적어서였는데, 알고리즘을 몰라서도 아니고 자잘한 실수로 인해서 오류를 찾으려고 20분은 썼던게 조금은 분했다. 간단한 문법에 있어서 오타 조심하자! 😵‍💫

---

## 문제

절댓값 힙은 다음과 같은 연산을 지원하는 자료구조이다.

배열에 정수 x (x ≠ 0)를 넣는다.
배열에서 절댓값이 가장 작은 값을 출력하고, 그 값을 배열에서 제거한다. 절댓값이 가장 작은 값이 여러개일 때는, 가장 작은 수를 출력하고, 그 값을 배열에서 제거한다.
프로그램은 처음에 비어있는 배열에서 시작하게 된다.

## 입력

첫째 줄에 연산의 개수 N(1≤N≤100,000)이 주어진다. 다음 N개의 줄에는 연산에 대한 정보를 나타내는 정수 x가 주어진다. 만약 x가 0이 아니라면 배열에 x라는 값을 넣는(추가하는) 연산이고, x가 0이라면 배열에서 절댓값이 가장 작은 값을 출력하고 그 값을 배열에서 제거하는 경우이다. 입력되는 정수는 -231보다 크고, 231보다 작다.

## 출력

입력에서 0이 주어진 회수만큼 답을 출력한다. 만약 배열이 비어 있는 경우인데 절댓값이 가장 작은 값을 출력하라고 한 경우에는 0을 출력하면 된다.

## 예제 입력 1

18
1
-1
0
0
0
1
1
-1
-1
2
-2
0
0
0
0
0
0
0

## 예제 출력 1

-1
1
0
-1
-1
1
1
-2
2
0
