[문제링크](https://www.acmicpc.net/problem/1743)

## 접근 방향 설명

> 모여있는 쓰레기의 갯수를 count 하고, 배열에 담아 max 값을 뽑아내면 되는 문제이다.

1. 쓰레기가 위치한 좌표를 map배열에 담아둠
2. 방문여부를 확인할 수 있도록 visited 배열을 만들고, 쓰레기가 위치한 좌표에 true 표시 (방문한 경우 -> false/ bfs 내부 조건문에서 방문 X, 쓰레기 O 인 경우 사용)
3. 상하좌우 이동 표시용 dir_x 와 dir_y 선언
4. bfs를 돌리면서 needvisited의 첫번째 요소를 기준으로, 상하좌우로 이동한 값이 map에 있으면서 방문 하지 않은 경우 count++ (이때 쓰레기는 1개 이상이므로, 1로 선언함)

## 풀이 코드 해석

```java script
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, M, K] = input.shift().split(' ').map(Number);
let map = [];
let visited = [...new Array(N)].map(() => Array(M).fill(false));
let needvisite = [];
let count = 1;

for (let i = 0; i < input.length; i++) {
  map[i] = input[i].split(' ').map(Number);
}

for (let i = 0; i < input.length; i++) {
  // 쓰레기가 있는 곳 체크 + 방문 기록용
  let [r, c] = input[i].split(' ').map(Number);
  visited[r - 1][c - 1] = true;
}
map.sort();

let dir_x = [-1, 1, 0, 0]; //상하좌우
let dir_y = [0, 0, -1, 1]; // 상하좌우
let near = []; // 모여있는 쓰레기의 갯수를 담을 배열

// bfs
for (let k = 0; k < map.length; k++) {
  needvisite.push(map.shift());
  k--;

  while (needvisite.length > 0) {
    let [x, y] = needvisite.shift();
    visited[x - 1][y - 1] = false;
    for (let i = 0; i < 4; i++) {
      let nx = x + dir_x[i];
      let ny = y + dir_y[i];

      for (let j = 0; j < map.length; j++) {
        let [gx, gy] = map[j];
        // x,y 에서 상하좌우로 이동하여, map에 있는 배열에 있으면서 아직 방문하지 않은 곳
        if (nx == gx && gy == ny && visited[nx - 1][ny - 1]) {
          if (near.length == 0) near.push([x, y]);
          count++;
          needvisite.push([nx, ny]);
          j--;
          visited[nx - 1][ny - 1] = false;
        }
      }
    }
  }
  near.push(count);
  count = 1;
}

console.log(Math.max(...near));
```

## 풀이 과정에서 새롭게 느낀점(배운점)

- 12퍼에서 나는 오류
  사실 문제의 핀트를 잘못 잡아서 초반에 틀림을 많이 경험했으나(문제를 제발 잘 좀 읽어보자 \_ 끝끝내 내가 구해내야 할 값이 무엇인지를 확실하게 캐치하고 넘어갈것!), 반례를 찾아보려고 노력했다.`음식물 중에 가장 큰 음식물의 크기를 구해라` 가 문제였으니, 음식물의 크기 중에서 max 값을 뽑아내야 하기에 배열에 count 값을 담아주고, Math.max에 넣어주었다.

  (사용한 반례)

  ```
  3 4 7
  3 2
  2 2
  3 1
  1 1
  1 4
  2 4
  3 4
  ```

  - 배열에서 max 값을 구하기 위해서는 Spread Operator 사용하기!
    `Math.max(...near)`

---

## 문제

코레스코 콘도미니엄 8층은 학생들이 3끼의 식사를 해결하는 공간이다. 그러나 몇몇 비양심적인 학생들의 만행으로 음식물이 통로 중간 중간에 떨어져 있다. 이러한 음식물들은 근처에 있는 것끼리 뭉치게 돼서 큰 음식물 쓰레기가 된다.

이 문제를 출제한 선생님은 개인적으로 이러한 음식물을 실내화에 묻히는 것을 정말 진정으로 싫어한다. 참고로 우리가 구해야 할 답은 이 문제를 낸 조교를 맞추는 것이 아니다.

통로에 떨어진 음식물을 피해가기란 쉬운 일이 아니다. 따라서 선생님은 떨어진 음식물 중에 제일 큰 음식물만은 피해 가려고 한다.

선생님을 도와 제일 큰 음식물의 크기를 구해서 “10ra"를 외치지 않게 도와주자.

## 입력

첫째 줄에 통로의 세로 길이 N(1 ≤ N ≤ 100)과 가로 길이 M(1 ≤ M ≤ 100) 그리고 음식물 쓰레기의 개수 K(1 ≤ K ≤ N×M)이 주어진다. 그리고 다음 K개의 줄에 음식물이 떨어진 좌표 (r, c)가 주어진다.

좌표 (r, c)의 r은 위에서부터, c는 왼쪽에서부터가 기준이다. 입력으로 주어지는 좌표는 중복되지 않는다.

## 출력

첫째 줄에 음식물 중 가장 큰 음식물의 크기를 출력하라.

**예제 입력 1**

```
3 4 5
3 2
2 2
3 1
2 3
1 1
```

**예제 출력 1**
4
