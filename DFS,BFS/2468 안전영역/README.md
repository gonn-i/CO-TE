[문제링크](https://www.acmicpc.net/problem/2468)

## 접근 방향 설명

> 1. 건물 높이를 기준으로 max 값을 구해낸다
>    2.⭐️ 0 ~ max 까지 비가 온다고 가정하고 반복문을 돌리며 각 강수량에 따라 안전지대 수를 파악한다. ⭐️
> 2. (2번)을 토대로 flood 배열의 값을 설정하여 침수된 경우 false, 그렇지 않은 경우는 true로 설정
> 3. bfs 를 돌리며 flood가 true 이면서 상하좌우로 이동하며 조건에 맞는 값들을 카운트한다.

## 풀이 코드 해석

```java script
const { count } = require('console');
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
let max_arr = [];
let map = [];

for (let i = 0; i < N; i++) {
  map[i] = input[i].split(' ').map(Number);
  max_arr.push(Math.max(...map[i]));
}

let max = Math.max(...max_arr);

// console.log(map);

// 상하좌우 이동용
let dir_x = [-1, 1, 0, 0];
let dir_y = [0, 0, -1, 1];

let safe_area = [];

for (let i = 0; i <= max; i++) {
  let flood = [...Array(N)].map(() => Array(N).fill(true)); // 침수여부 & 방문야부 체크용
  let needvisite = [];
  let each_count = 0;
  let total_count = 0;

  // 물에 잠겼는지 여부 체크
  for (let n = 0; n < N; n++) {
    for (let m = 0; m < N; m++) {
      if (i >= map[n][m]) {
        flood[n][m] = false;
      }
    }
  }

  // console.log(i + '번째 침수');
  // console.log(flood);

  for (let n = 0; n < N; n++) {
    for (let m = 0; m < N; m++) {
      if (flood[n][m]) {
        needvisite.push([n, m]);
        flood[n][m] = false;
        each_count = 1;

        while (needvisite.length > 0) {
          let [x, y] = needvisite.shift();
          for (let d = 0; d < 4; d++) {
            let nx = x + dir_x[d];
            let ny = y + dir_y[d];

            if (nx >= 0 && nx < N && ny >= 0 && ny < N && flood[nx][ny]) {
              needvisite.push([nx, ny]);
              flood[nx][ny] = false;
            }
          }
        }
        total_count += each_count;
      }
    }
  }
  safe_area.push(total_count);
}

console.log(Math.max(...safe_area));
```

## 풀이 과정에서 새롭게 느낀점(배운점)

bfs/ dfs를 반복해서 푸니 노력하면 문제도 풀어내고!! 속도도 굉장히 빨라졌다!!
이제 dfs bfs는 하산하고 잊혀질때쯤 다시 풀어봐야겠다!

---

## 문제

재난방재청에서는 많은 비가 내리는 장마철에 대비해서 다음과 같은 일을 계획하고 있다. 먼저 어떤 지역의 높이 정보를 파악한다. 그 다음에 그 지역에 많은 비가 내렸을 때 물에 잠기지 않는 안전한 영역이 최대로 몇 개가 만들어 지는 지를 조사하려고 한다. 이때, 문제를 간단하게 하기 위하여, 장마철에 내리는 비의 양에 따라 일정한 높이 이하의 모든 지점은 물에 잠긴다고 가정한다.

어떤 지역의 높이 정보는 행과 열의 크기가 각각 N인 2차원 배열 형태로 주어지며 배열의 각 원소는 해당 지점의 높이를 표시하는 자연수이다. 예를 들어, 다음은 N=5인 지역의 높이 정보이다.

6 8 2 6 2
3 2 3 4 6
6 7 3 3 2
7 2 5 3 6
8 9 5 2 7

이제 위와 같은 지역에 많은 비가 내려서 높이가 4 이하인 모든 지점이 물에 잠겼다고 하자. 이 경우에 물에 잠기는 지점을 회색으로 표시하면 다음과 같다.

6 8 2 6 2
3 2 3 4 6
6 7 3 3 2
7 2 5 3 6
8 9 5 2 7

물에 잠기지 않는 안전한 영역이라 함은 물에 잠기지 않는 지점들이 위, 아래, 오른쪽 혹은 왼쪽으로 인접해 있으며 그 크기가 최대인 영역을 말한다. 위의 경우에서 물에 잠기지 않는 안전한 영역은 5개가 된다(꼭짓점으로만 붙어 있는 두 지점은 인접하지 않는다고 취급한다).

또한 위와 같은 지역에서 높이가 6이하인 지점을 모두 잠기게 만드는 많은 비가 내리면 물에 잠기지 않는 안전한 영역은 아래 그림에서와 같이 네 개가 됨을 확인할 수 있다.

6 8 2 6 2
3 2 3 4 6
6 7 3 3 2
7 2 5 3 6
8 9 5 2 7

이와 같이 장마철에 내리는 비의 양에 따라서 물에 잠기지 않는 안전한 영역의 개수는 다르게 된다. 위의 예와 같은 지역에서 내리는 비의 양에 따른 모든 경우를 다 조사해 보면 물에 잠기지 않는 안전한 영역의 개수 중에서 최대인 경우는 5임을 알 수 있다.

어떤 지역의 높이 정보가 주어졌을 때, 장마철에 물에 잠기지 않는 안전한 영역의 최대 개수를 계산하는 프로그램을 작성하시오.

## 입력

첫째 줄에는 어떤 지역을 나타내는 2차원 배열의 행과 열의 개수를 나타내는 수 N이 입력된다. N은 2 이상 100 이하의 정수이다. 둘째 줄부터 N개의 각 줄에는 2차원 배열의 첫 번째 행부터 N번째 행까지 순서대로 한 행씩 높이 정보가 입력된다. 각 줄에는 각 행의 첫 번째 열부터 N번째 열까지 N개의 높이 정보를 나타내는 자연수가 빈 칸을 사이에 두고 입력된다. 높이는 1이상 100 이하의 정수이다.

## 출력

첫째 줄에 장마철에 물에 잠기지 않는 안전한 영역의 최대 개수를 출력한다.

## 예제 입력 1

5
6 8 2 6 2
3 2 3 4 6
6 7 3 3 2
7 2 5 3 6
8 9 5 2 7

## 예제 출력 1

5
