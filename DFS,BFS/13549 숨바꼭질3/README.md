[문제링크](https://www.acmicpc.net/problem/2667)

## 접근 방향 설명

> 숨바꼭질 1을 풀어봤기 때문에 bfs로서의 해결을 안다는 가정하에!
> 1과의 차이점은 바로 순간이동시, 시간 카운트를 하지 않는다는 것이다.
> 그렇기 때문에, 최대한 순간이동을 많이 사용하여 (높은 우선순위에 두고),
> bfs를 통해 경로를 탐색하면 된다.

## 풀이 코드 해석

```java script
let fs = require('fs');
let filePath = process.platform == 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, K] = input[0].split(' ').map(Number);

let queue = []; //bfs
let visited = new Array(100001).fill(0); // 방문여부 체크용

let current = [N, 0]; //수빈위치, 시간

queue.push(current);
visited[N] = true;

// 최단시간 계산용
while (queue.length > 0) {
  // console.log(queue);
  let [x, t] = queue.shift();

  let choice = [x * 2, x - 1, x + 1]; // 순간이동/ 뒤로 / 앞으로 (순서중요 )
  if (x == K) {
    console.log(t);
    break;
  }
  for (let i = 0; i < 3; i++) {
    if (choice[i] >= 0 && choice[i] < 100001 && !visited[choice[i]]) {
      if (i == 0) {
        // 순간이동의 경우, 시간 동결
        queue.push([choice[i], t]);
        visited[choice[i]] = true;
      } else {
        // 나머지의 경우, 시간 +1
        queue.push([choice[i], t + 1]);
        visited[choice[i]] = true;
      }
    }
  }
}

```

## 풀이 과정에서 새롭게 느낀점(배운점)

순간이동을 우선으로 탐섹하는 것은 알고 있었으나, 오답이었다

```
4 6
정답 코드의 출력: 1 ( 4->3->6 )
오답 코드의 출력: 2 ( 4->5->6 )
```

위와 같이 \*2를 사용할 수 있도록, 배열의 순서를 조정하였더니 문제가 해결되었다.

---

## 문제

수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 0초 후에 2\*X의 위치로 이동하게 된다.

수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오.

**입력**
첫 번째 줄에 수빈이가 있는 위치 N과 동생이 있는 위치 K가 주어진다. N과 K는 정수이다.

**출력**
수빈이가 동생을 찾는 가장 빠른 시간을 출력한다.

**예제 입력 1**
5 17

**예제 출력 1**
2
