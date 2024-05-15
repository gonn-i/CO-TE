[문제링크](https://www.acmicpc.net/problem/16173)

## 접근 방향 설명

1. 입력값 이중배열로 만들기 (map 배열)
2. DFS (스택)
   2-1. 현위치 좌표 & 움직일 칸수 저장
   2-2. 좌표 + 칸수가 map 안에 들어있는 값만, needvisite에 저장
   2-3. 이때 현위치의 move가 -1인 경우 `HaruHaru` 출력 후 종료
   2-4. 밟은 칸이 0이면 `Hing` 출력하고, 바로 종료
   2-5. 움직일 수 있는 칸을 다 돌았는데 끝점에 도달하지 못할 경우, `Hing` 출력
3. DFS (재귀)
   3-1. 현위치 좌표 & 움직일 칸수 저장
   3-2. 좌표 + 칸수가 map 안에 들어있는 값일 경우, 좌표 + 칸수로 함수 다시 호출
   3-3. `2-3 ~ 2-5까지 동일`

## 풀이 코드 해석

```javascript
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
let map = input.map((e) => e.split(' ').map(Number)); // 이중배열 만들기
let visited = [];
let needvisite = [];

// dfs 풀이 (스택사용)
// needvisite.push([0, 0]);

// while (needvisite.length > 0) {
//   let target = needvisite.shift();
//   let [row, col] = target;
//   let move = map[row][col];

//   if (move == -1) {
//     console.log('HaruHaru');
//     return;
//   }
//   if (move == 0) {
//     console.log('Hing');
//     return;
//   }
//   if (!visited.includes(target)) {
//     if (row + move < N || col + move < N) {
//       visited.push([row, col]);
//       if (row + move < N) {
//         needvisite.unshift([row + move, col]);
//       }
//       if (col + move < N) {
//         needvisite.unshift([row, col + move]);
//       }
//     }
//   }
// }
// console.log('Hing');

// 재귀 풀이
//현재 위치 (열, 행)
let row = 0;
let col = 0;

function DFS(row, col) {
  let move = map[row][col]; // 이동해야 하는 수
  // console.log(row, col, move);
  if (move === -1) {
    return true;
  }

  if (move === 0) {
    return false;
  }

  if (row + move < N) {
    let e = DFS(row + move, col);
    if (e) {
      return true;
    }
  }

  if (col + move < N) {
    let e = DFS(row, col + move);
    if (e) {
      return true;
    }
  }
  return false;
}

console.log(DFS(row, col) ? 'HaruHaru' : 'Hing');
```

## 풀이 과정에서 새롭게 느낀점(배운점)

재귀와 스택 둘다 이용해서 풀어봤던 문제!
풀어내긴 했지만, 미로와 같이 상하좌우 이동하는 문제를 풀때 코드가 불필요하게 길어지는 것 같다.
다른 사람들 코드보면서 dir 배열 써서 반복문 돌려보는 방법도 공부해봐야겠다.

[공부할 url](https://velog.io/@tsi0521/%EB%AF%B8%EB%A1%9C-%EC%B5%9C%EB%8B%A8-%EA%B2%BD%EB%A1%9C-DFS-%EC%99%80-BFS-%EB%B9%84%EA%B5%90)

---

## 문제

‘쩰리’는 점프하는 것을 좋아하는 젤리다. 단순히 점프하는 것에 지루함을 느낀 ‘쩰리’는 새로운 점프 게임을 해보고 싶어 한다. 새로운 점프 게임의 조건은 다음과 같다.

‘쩰리’는 가로와 세로의 칸 수가 같은 정사각형의 구역 내부에서만 움직일 수 있다. ‘쩰리’가 정사각형 구역의 외부로 나가는 경우엔 바닥으로 떨어져 즉시 게임에서 패배하게 된다.
‘쩰리’의 출발점은 항상 정사각형의 가장 왼쪽, 가장 위의 칸이다. 다른 출발점에서는 출발하지 않는다.
‘쩰리’가 이동 가능한 방향은 오른쪽과 아래 뿐이다. 위쪽과 왼쪽으로는 이동할 수 없다.
‘쩰리’가 가장 오른쪽, 가장 아래 칸에 도달하는 순간, 그 즉시 ‘쩰리’의 승리로 게임은 종료된다.
‘쩰리’가 한 번에 이동할 수 있는 칸의 수는, 현재 밟고 있는 칸에 쓰여 있는 수 만큼이다. 칸에 쓰여 있는 수 초과나 그 미만으로 이동할 수 없다.
새로운 게임이 맘에 든 ‘쩰리’는, 계속 게임을 진행해 마침내 최종 단계에 도달했다. 하지만, 게임을 진행하는 구역이 너무 넓어져버린 나머지, 이 게임에서 이길 수 있는지 없는지 가늠할 수 없어졌다. ‘쩰리’는 유능한 프로그래머인 당신에게 주어진 구역에서 승리할 수 있는 지 알아봐 달라고 부탁했다. ‘쩰리’를 도와 주어진 게임 구역에서 끝 점(오른쪽 맨 아래 칸)까지 도달할 수 있는지를 알아보자!

**입력**
입력의 첫 번째 줄에는 게임 구역의 크기 N (2 ≤ N ≤ 3)이 주어진다.

입력의 두 번째 줄부터 마지막 줄까지 게임판의 구역(맵)이 주어진다.

게임판의 승리 지점(오른쪽 맨 아래 칸)에는 -1이 쓰여있고, 나머지 칸에는 0 이상 100 이하의 정수가 쓰여있다.

**출력**
‘쩰리’가 끝 점에 도달할 수 있으면 “HaruHaru”(인용부호 없이), 도달할 수 없으면 “Hing” (인용부호 없이)을 한 줄에 출력합니다.
