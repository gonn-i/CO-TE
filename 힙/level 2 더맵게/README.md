[문제링크](https://school.programmers.co.kr/learn/courses/30/lessons/42626#)

## 접근 방향 설명

> 1) MinHeap 구현 
> 2) 최소값 `Heap.pick` 까봐서, k 보다 작고 Heap 에 2개 이상 남아있으면 mix 진행
> 3) poll 로 각각 최소값 2개 써내서, mixed 값 Heap에 insert 해주기
> 4) 2번 조건을 while 문의 조건으로 반복하기 
> 5) while 문이 끝나고, 남은 값이 K 보다 작으면 -1 출력, 아니면 count 출력

## 풀이 코드 해석

```java script
function solution(scoville, K) {
  let count = 0;
  let flag = true;

  let Heap = new MinHeap();
  for (let i = 0; i < scoville.length; i++) {
    Heap.insert(scoville[i]);
  }
  while (Heap.pick() < K && Heap.length() > 1) {
    let min = Heap.poll();
    let second = Heap.poll();
    let mixed = min + second * 2;
    Heap.insert(mixed);
    count++;
  }
  return Heap.pick() < K ? -1 : count;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  length() {
    return this.heap.length;
  }

  pick() {
    if (this.length == 0) return -1;
    return this.heap[0];
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.length() - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (this.heap[parentIdx] && this.heap[parentIdx] > this.heap[idx]) {
      this.swap(idx, parentIdx);
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
  }

  poll() {
    if (this.heap.length == 1) return this.heap.pop();
    else {
      let min = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.bubbleDown();
      return min;
    }
  }

  bubbleDown() {
    let idx = 0;
    let rightIdx = idx * 2 + 2;
    let leftIdx = idx * 2 + 1;
    while (
      (this.heap[rightIdx] && this.heap[rightIdx] < this.heap[idx]) ||
      (this.heap[leftIdx] && this.heap[leftIdx] < this.heap[idx])
    ) {
      let smallerIdx = rightIdx;
      if (!this.heap[rightIdx]) {
        smallerIdx = leftIdx;
      }
      if (this.heap[rightIdx] > this.heap[leftIdx] && this.heap[leftIdx]) {
        smallerIdx = leftIdx;
      }
      this.swap(smallerIdx, idx);
      idx = smallerIdx;
      rightIdx = idx * 2 + 2;
      leftIdx = idx * 2 + 1;
    }
  }
}
```

## 풀이 과정에서 새롭게 느낀점(배운점)

BubbleDown 해줄때, or 로 묶어줬기 때문에 둘중 하나가 비어있는 경우가 있을 수 있음을 꼭 염두에 두고!!! 
확인해주기

---

## 문제 설명
문제 설명
매운 것을 좋아하는 Leo는 모든 음식의 스코빌 지수를 K 이상으로 만들고 싶습니다. 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 Leo는 스코빌 지수가 가장 낮은 두 개의 음식을 아래와 같이 특별한 방법으로 섞어 새로운 음식을 만듭니다.

섞은 음식의 스코빌 지수 = 가장 맵지 않은 음식의 스코빌 지수 + (두 번째로 맵지 않은 음식의 스코빌 지수 * 2)
Leo는 모든 음식의 스코빌 지수가 K 이상이 될 때까지 반복하여 섞습니다.
Leo가 가진 음식의 스코빌 지수를 담은 배열 scoville과 원하는 스코빌 지수 K가 주어질 때, 모든 음식의 스코빌 지수를 K 이상으로 만들기 위해 섞어야 하는 최소 횟수를 return 하도록 solution 함수를 작성해주세요.

## 제한 사항
scoville의 길이는 2 이상 1,000,000 이하입니다.
K는 0 이상 1,000,000,000 이하입니다.
scoville의 원소는 각각 0 이상 1,000,000 이하입니다.
모든 음식의 스코빌 지수를 K 이상으로 만들 수 없는 경우에는 -1을 return 합니다.

## 입출력 예
scoville	K	return
[1, 2, 3, 9, 10, 12]	7	2

## 입출력 예 설명
스코빌 지수가 1인 음식과 2인 음식을 섞으면 음식의 스코빌 지수가 아래와 같이 됩니다.
새로운 음식의 스코빌 지수 = 1 + (2 * 2) = 5
가진 음식의 스코빌 지수 = [5, 3, 9, 10, 12]

스코빌 지수가 3인 음식과 5인 음식을 섞으면 음식의 스코빌 지수가 아래와 같이 됩니다.
새로운 음식의 스코빌 지수 = 3 + (5 * 2) = 13
가진 음식의 스코빌 지수 = [13, 9, 10, 12]

모든 음식의 스코빌 지수가 7 이상이 되었고 이때 섞은 횟수는 2회입니다.