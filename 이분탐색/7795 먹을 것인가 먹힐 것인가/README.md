[문제링크](https://www.acmicpc.net/problem/7795)

## 접근 방향 설명
> 1️⃣ A 배열 내림차순으로 순환을 돌면서, B 배열에 대한 이분탐색을 행한다.
> 2️⃣ 이때 A가 B를 먹을 수 있는 경우 `A_array[i] > B_array[midIdx]` B의 인덱스를 저장해주고, 
최선의 값을 위하여 더 높은 값으로 탐색을 돌린다. 
**(인덱스를 저장하는 이유? -> 인덱스 +1 은 말그대로 먹을 수 있는 물고기 수)**
> 3️⃣ 이때 인덱스가 0 이상일 경우, +1 한 값을 count 에 넣어주고 다음 A 배열의 순환으로 넘어간다

## 풀이 코드 해석

```java script
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let T = +input.shift();
let ans = [];
while (T > 0) {
  let [N, M] = input.shift().split(' ').map(Number);
  let count = 0;
  let A_array = [
    ...input
      .shift()
      .split(' ')
      .sort((a, b) => b - a)
      .map(Number),
  ];
  let B_array = [
    ...input
      .shift()
      .split(' ')
      .sort((a, b) => a - b)
      .map(Number),
  ];

  for (let i = 0; i < N; i++) {
    let start = 0;
    let end = B_array.length - 1;
    let temp = -Infinity;
    while (start <= end) {
      let midIdx = Math.floor((start + end) / 2);

      if (A_array[i] > B_array[midIdx]) {
        // 먹을 수 있는 경우 (A 가 더 큰 경우)
        if (midIdx > temp) temp = midIdx;
        start = midIdx + 1;
      } else {
        // 먹을 수 없는 경우 (A 가 더 작은 경우)
        end = midIdx - 1;
      }
    }
    if (temp >= 0) {
      count += temp + 1;
    } else {
      break;
    }
  }

  ans.push(count);
  T--;
}

console.log(ans.join('\n'));
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

잠이 안 와서 풀어봤던 문제, 어떻게 하면 효율적으로 시간을 절약해서 풀 수 있을까 고민이 조금 길었던 문제였다.
하지만 해냈죠?

---

## 문제
심해에는 두 종류의 생명체 A와 B가 존재한다. A는 B를 먹는다. A는 자기보다 크기가 작은 먹이만 먹을 수 있다. 예를 들어, A의 크기가 {8, 1, 7, 3, 1}이고, B의 크기가 {3, 6, 1}인 경우에 A가 B를 먹을 수 있는 쌍의 개수는 7가지가 있다. 8-3, 8-6, 8-1, 7-3, 7-6, 7-1, 3-1.

두 생명체 A와 B의 크기가 주어졌을 때, A의 크기가 B보다 큰 쌍이 몇 개나 있는지 구하는 프로그램을 작성하시오.

## 입력
첫째 줄에 테스트 케이스의 개수 T가 주어진다. 각 테스트 케이스의 첫째 줄에는 A의 수 N과 B의 수 M이 주어진다. 둘째 줄에는 A의 크기가 모두 주어지며, 셋째 줄에는 B의 크기가 모두 주어진다. 크기는 양의 정수이다. (1 ≤ N, M ≤ 20,000) 

## 출력
각 테스트 케이스마다, A가 B보다 큰 쌍의 개수를 출력한다.

## 예제 입력 1 
2
5 3
8 1 7 3 1
3 6 1
3 4
2 13 7
103 11 290 215

## 예제 출력 1 
7
1