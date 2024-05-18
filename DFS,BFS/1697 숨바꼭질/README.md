[문제링크](https://www.acmicpc.net/problem/2667)

## 접근 방향 설명

> 1. N의 크기가 10만이기 때문에 bfs 를 선택
> 2. 방문여부 체크용 배열 생성 + queue 도 같이
> 3. 앞 / 뒤 / 순간이동을 반복문으로 돌리면서 이동할 위치가 직선상의 범위에 있는지, 방문하지 않았는지 체크
> 4. `수빈이의 위치 == 동생위치`이면 `break`

## 풀이 코드 해석

```java script
let fs = require('fs');
let filePath = process.platform == 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, K] = input[0].split(' ').map(Number); // 수빈위치, 언니위치

let visited = Array(100001).fill(false); // 방문 체크용
let queue = [];

let current = [N, 0]; // 수빈이의 현재 위치, t

queue.push(current);
visited[N] = true;

while (queue.length > 0) {
  let [x, t] = queue.shift();
  if (x == K) {
    console.log(t);
    break;
  }

  for (let moving of [x - 1, x + 1, x * 2]) {
    if (!visited[moving] && moving >= 0 && moving < visited.length) {
      queue.push([moving, t + 1]);
      visited[moving] = true;
    }
  }
}

```

## 풀이 과정에서 새롭게 느낀점(배운점)

반복적인 연습은 자신감을 키워준다!!
dfs/bfs 를 반복해서 풀어보니 점점 푸는 속도가 빨라지는 듯하다 😛

---

## 문제

수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 1초 후에 2\*X의 위치로 이동하게 된다.

수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오.

**입력**
첫 번째 줄에 수빈이가 있는 위치 N과 동생이 있는 위치 K가 주어진다. N과 K는 정수이다.

**출력**
수빈이가 동생을 찾는 가장 빠른 시간을 출력한다.

**예제 입력 1**
5 17

**예제 출력 1**
4
