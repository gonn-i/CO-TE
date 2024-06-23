[문제링크](https://www.acmicpc.net/problem/2512)

## 접근 방향 설명

> 1️⃣ 갯수가 M인 카드를 기준으로, 하나씩 BinarySearcy 함수에 인자로 넣어주어, 상근이가 해당 카드를 가졌는지 확인해준다.
> 2️⃣ 이때, 이진탐색을 돌면서 있으면 ans 배열에 1을 넣어주고, 탐색을 마쳤는데에도 없었으면 0을 넣어준다

## 풀이 코드 해석

```java script
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
let arr_N = input.shift().split(' ').map(Number);
let M = +input.shift();
let arr_M = input.shift().split(' ').map(Number);

let ans = [];

arr_N.sort((a, b) => a - b);

function BinarySearch(num) {
  let start = 0;
  let end = N - 1;

  while (start <= end) {
    let mid = parseInt((start + end) / 2);

    if (arr_N[mid] == num) {
      ans.push(1);
      return;
    } else if (arr_N[mid] < num) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  ans.push(0);
}

arr_M.forEach((e) => {
  BinarySearch(e);
});

console.log(ans.join(' '));

```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

알고리즘 카테고리별로 문제를 풀고 있다. 나중에 딱 문제만 읽고도 "!! 이건 이분탐색" 생각할 수 있을 정도로 잘하고 싶다!!

---

## 문제
숫자 카드는 정수 하나가 적혀져 있는 카드이다. 상근이는 숫자 카드 N개를 가지고 있다. 정수 M개가 주어졌을 때, 이 수가 적혀있는 숫자 카드를 상근이가 가지고 있는지 아닌지를 구하는 프로그램을 작성하시오.

## 입력
첫째 줄에 상근이가 가지고 있는 숫자 카드의 개수 N(1 ≤ N ≤ 500,000)이 주어진다. 둘째 줄에는 숫자 카드에 적혀있는 정수가 주어진다. 숫자 카드에 적혀있는 수는 -10,000,000보다 크거나 같고, 10,000,000보다 작거나 같다. 두 숫자 카드에 같은 수가 적혀있는 경우는 없다.

셋째 줄에는 M(1 ≤ M ≤ 500,000)이 주어진다. 넷째 줄에는 상근이가 가지고 있는 숫자 카드인지 아닌지를 구해야 할 M개의 정수가 주어지며, 이 수는 공백으로 구분되어져 있다. 이 수도 -10,000,000보다 크거나 같고, 10,000,000보다 작거나 같다

## 출력
첫째 줄에 입력으로 주어진 M개의 수에 대해서, 각 수가 적힌 숫자 카드를 상근이가 가지고 있으면 1을, 아니면 0을 공백으로 구분해 출력한다.

## 예제 입력 1 
5
6 3 2 10 -10
8
10 9 -5 2 3 4 5 -10

## 예제 출력 1 
1 0 0 1 1 0 0 1