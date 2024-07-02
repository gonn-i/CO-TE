[문제링크](https://www.acmicpc.net/problem/14235)

## 접근 방향 설명

> 1) Maxheap 을 구현한다.
> 2) for 문으로 요소를 돌되, 0이면 poll 을 통해서 최댓값을 뽑아내고 heap이 빈 경우 -1을 뽑아낸다.
> 3) 0이 아닌 경우, 첫번째 요소를 제외하고 나머지 값을 차례로 insert 해준다 (bubbleup까지)

## 풀이 코드 해석

```java script
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
```

## 풀이 과정에서 새롭게 느낀점(배운점)

입력값에 대해서 전체적으로 trim을 해주는 것외에, 라인별로 trim 해줘야 하는 경우도 있구나..!

---

## 문제 설명
크리스마스에는 산타가 착한 아이들에게 선물을 나눠준다. 올해도 산타는 선물을 나눠주기 위해 많은 노력을 하고 있는데, 전세계를 돌아댕기며 착한 아이들에게 선물을 나눠줄 것이다. 하지만 산타의 썰매는 그렇게 크지 않기 때문에, 세계 곳곳에 거점들을 세워 그 곳을 방문하며 선물을 충전해 나갈 것이다. 또한, 착한 아이들을 만날 때마다 자신이 들고있는 가장 가치가 큰 선물 하나를 선물해 줄 것이다.

이제 산타가 선물을 나눠줄 것이다. 차례대로 방문한 아이들과 거점지의 정보들이 주어졌을 때, 아이들이 준 선물들의 가치들을 출력하시오. 만약 아이들에게 줄 선물이 없다면 -1을 출력하시오.

입력
첫 번째 줄에서는 아이들과 거점지를 방문한 횟수 n이 주어진다.(1≤n≤5,000)

다음 n줄에는 a가 들어오고, 그 다음 a개의 숫자가 들어온다. 이는 거점지에서 a개의 선물을 충전하는 것이고, 그 숫자들이 선물의 가치이다. 만약 a가 0이라면 거점지가 아닌 아이들을 만난 것이다. 선물의 가치는 100,000보다 작은 양의 정수이다.(1≤a≤100)

## 출력
a가 0일 때마다, 아이들에게 준 선물의 가치를 출력하시오. 만약 줄 선물이 없다면 -1을 출력하라. 적어도 하나의 출력이 있음을 보장한다.

## 예제 입력 1 
5
0
2 3 2
0
0
0

## 예제 출력 1 
-1
3
2
-1