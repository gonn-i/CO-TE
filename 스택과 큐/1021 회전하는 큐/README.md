[문제링크](https://www.acmicpc.net/problem/1021)

## 접근 방향 설명

> 1) Queue 에는 1 ~ N까지의 수를 채워둔다 (첫 위치). 
> 2) 이때, target이 몇번째 인덱스인지 구해, 앞에서부터 접근하는지 빠른지 혹은 그 반대인지를 구한다.
> 3) 앞있는 수를 뒤로 넣는 2번 연산의 경우 `Queue.push(Queue.shift())`를 하고,
> 4) 뒤에 있는 수를 앞으로 넣는 3번의 연산의 경우 `Queue.unshift(Queue.pop());` 을 하면서 count++ 를 해준다!

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

const [N, M] = input.shift().split(' ').map(Number);
let target = [...input[0].split(' ').map(Number)];
let Queue = [...new Array(N)].map((_, i) => i + 1);
let count = 0;

while (target.length >= 1) {
  let targetIdx = Queue.indexOf(target[0]);

  if (targetIdx <= parseInt((Queue.length - 1) / 2)) {
    while (target[0] !== Queue[0]) {
      Queue.push(Queue.shift());
      count++;
    }
  } else {
    while (target[0] !== Queue[0]) {
      Queue.unshift(Queue.pop());
      count++;
    }
  }
  target.shift();
  Queue.shift();
}

console.log(count);
```
---

## 풀이 과정에서 새롭게 느낀점(배운점)

```js
let Queue = [...new Array(N)].map((_, i) => i + 1);
```

배열에 숫자를 넣을때 for 문으로 넣기만 했는데, array 객체 넣고, map 함수에 **첫번쨰 인자로 _를 전달하면** 
기존에 들어가던 undefined 를 제하게 되고, 두번째 인자인 index 를 기반으로 값을 넣어줄 수 있게 된다!!

---- 
## 문제 설명
지민이는 N개의 원소를 포함하고 있는 양방향 순환 큐를 가지고 있다. 지민이는 이 큐에서 몇 개의 원소를 뽑아내려고 한다.

지민이는 이 큐에서 다음과 같은 3가지 연산을 수행할 수 있다.

첫 번째 원소를 뽑아낸다. 이 연산을 수행하면, 원래 큐의 원소가 a1, ..., ak이었던 것이 a2, ..., ak와 같이 된다.
왼쪽으로 한 칸 이동시킨다. 이 연산을 수행하면, a1, ..., ak가 a2, ..., ak, a1이 된다.
오른쪽으로 한 칸 이동시킨다. 이 연산을 수행하면, a1, ..., ak가 ak, a1, ..., ak-1이 된다.
큐에 처음에 포함되어 있던 수 N이 주어진다. 그리고 지민이가 뽑아내려고 하는 원소의 위치가 주어진다. (이 위치는 가장 처음 큐에서의 위치이다.) 이때, 그 원소를 주어진 순서대로 뽑아내는데 드는 2번, 3번 연산의 최솟값을 출력하는 프로그램을 작성하시오.

## 입력
첫째 줄에 큐의 크기 N과 뽑아내려고 하는 수의 개수 M이 주어진다. N은 50보다 작거나 같은 자연수이고, M은 N보다 작거나 같은 자연수이다. 둘째 줄에는 지민이가 뽑아내려고 하는 수의 위치가 순서대로 주어진다. 위치는 1보다 크거나 같고, N보다 작거나 같은 자연수이다.

## 출력
첫째 줄에 문제의 정답을 출력한다.

## 예제 입력 1 
10 3
1 2 3

## 예제 출력 1 
0