[문제링크](https://www.acmicpc.net/problem/1012)

## 접근 방향

1. 배추가 심어진 위치 이중배열로 좌표화하기 (planted 배열)
2. dfs로 인접한 배추 좌표 찾기
   2-1. 이때 상하좌우를 모두 고려하여 분기 처리 (좌우/ 상하)
   2-2. 단, if문으로 나눌 경우, 위에 조건문에서 걸려버리면 slice 당하기 때문에 아래에서 typeError 남에 주의
   2-3. 조건문에 해당하는 요소를 planted 배열에서 삭제 후, 인덱스 값 처리 (-1)
   2-4. 더 이상 인접한 값이 없다면, 흰지렁이 +1
   2-5. planted 배열이 끝날때 까지 계속 돌리기

## 풀이 코드 해석

```java script
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

const Test = +input.shift();

for (let i = 0; i < Test; i++) {
  let [M, N, K] = input.shift().split(' ').map(Number);
  let planted = [];
  let ans = 0;

  // 배추가 심어진 부분 x,y 좌표로 기록 (이중배열로)
  for (let j = 0; j < K; j++) {
    planted.push(input[j].split(' ').map(Number));
  }
  // console.log(planted);
  // console.log(planted.length);

  while (planted.length > 0) {
    let visited = [];
    let needViste = [];
    needViste.push(planted.shift());

    while (needViste.length > 0) {
      let target = needViste.shift();
      if (!visited.includes(target)) {
        visited.push(target);
        for (let j = 0; j < planted.length; j++) {
          if (
            (planted[j][0] === target[0] + 1 && planted[j][1] == target[1]) ||
            (planted[j][0] === target[0] - 1 && planted[j][1] == target[1])
          ) {
            needViste.push(planted[j]);
            // console.log('인접!');
            // console.log(needViste);
            planted.splice(j, 1);
            j--;
          } // 위에 좌우가 인접한 경우는 if, 상하가 인접한 경우는 else if에 걸림
          else if (
            (planted[j][1] == target[1] + 1 && planted[j][0] == target[0]) ||
            (planted[j][1] == target[1] - 1 && planted[j][0] == target[0])
          ) {
            needViste.push(planted[j]);
            // console.log('인접!');
            // console.log(needViste);
            planted.splice(j, 1);
            j--;
          }
        }
      }
    }
    // console.log('옹기종기스');
    // console.log(visited);
    ans++;
  }
  console.log(ans);
  input = input.slice(K);
}

```

## 풀이 과정에서 새롭게 느낀점(배운점)

이문제는 총 3번 틀렸다. 집념의 열정 코린이 답게 포기하지 않았다.
일단 첫번째

1. typeError
   DFS 내부에서 조건문 걸어줄때, if / if 로 걸어주었더니 생겨났다.
   원인: 위에 조건문에 걸려서 특정 배열 삭제해주었는데, 아래에서 그 값을 찾으니 당연히 없기 때문이었다.
   해결: if / else if 로 수정

두번째 2. 상하좌우에서 왼쪽과 위쪽 간과
참.. 배열로 돌면서, 오른쪽에 있거나 아래에 있는 친구들이 인접하겠군! 이라고 속단한 결과였다. 그래서 or 로 상하좌우를 모두 고려하도록 수정하였다.

```javascript
      if (
        (planted[j][0] === target[0] + 1 && planted[j][1] == target[1]) ||
        (planted[j][0] === target[0] - 1 && planted[j][1] == target[1])
      )
```

세번째 3. 인접한 요소 삭제 후, 인덱스 설정 간과
slice로 요소를 삭제하고, 이제 인덱스를 초기화시켜주지 않아서 (-1)
배열의 요소 마지막까지 못 도는 문제가 생겼다. 그래서 다음과 같이 수정해주었다.

```javascript
planted.splice(j, 1);
j--;
```

상당히 많이 틀렸지만, 틀리면서 얻는 것도 많은 것 같다. 어디부분을 자주 놓치고 실수하는지!
그래서 예전엔 손도 못 대고, 해설을 보기 일수였지만 그래도 나름 끝까지 내 힘으로 풀려고 노력하니 점점 미약하지만 성장하고 있는 기분이다!

---

## 문제

차세대 영농인 한나는 강원도 고랭지에서 유기농 배추를 재배하기로 하였다. 농약을 쓰지 않고 배추를 재배하려면 배추를 해충으로부터 보호하는 것이 중요하기 때문에, 한나는 해충 방지에 효과적인 배추흰지렁이를 구입하기로 결심한다. 이 지렁이는 배추근처에 서식하며 해충을 잡아 먹음으로써 배추를 보호한다. 특히, 어떤 배추에 배추흰지렁이가 한 마리라도 살고 있으면 이 지렁이는 인접한 다른 배추로 이동할 수 있어, 그 배추들 역시 해충으로부터 보호받을 수 있다. 한 배추의 상하좌우 네 방향에 다른 배추가 위치한 경우에 서로 인접해있는 것이다.

한나가 배추를 재배하는 땅은 고르지 못해서 배추를 군데군데 심어 놓았다. 배추들이 모여있는 곳에는 배추흰지렁이가 한 마리만 있으면 되므로 서로 인접해있는 배추들이 몇 군데에 퍼져있는지 조사하면 총 몇 마리의 지렁이가 필요한지 알 수 있다. 예를 들어 배추밭이 아래와 같이 구성되어 있으면 최소 5마리의 배추흰지렁이가 필요하다. 0은 배추가 심어져 있지 않은 땅이고, 1은 배추가 심어져 있는 땅을 나타낸다.

1 1 0 0 0 0 0 0 0 0
0 1 0 0 0 0 0 0 0 0
0 0 0 0 1 0 0 0 0 0
0 0 0 0 1 0 0 0 0 0
0 0 1 1 0 0 0 1 1 1
0 0 0 0 1 0 0 1 1 1

## 입력

입력의 첫 줄에는 테스트 케이스의 개수 T가 주어진다. 그 다음 줄부터 각각의 테스트 케이스에 대해 첫째 줄에는 배추를 심은 배추밭의 가로길이 M(1 ≤ M ≤ 50)과 세로길이 N(1 ≤ N ≤ 50), 그리고 배추가 심어져 있는 위치의 개수 K(1 ≤ K ≤ 2500)이 주어진다. 그 다음 K줄에는 배추의 위치 X(0 ≤ X ≤ M-1), Y(0 ≤ Y ≤ N-1)가 주어진다. 두 배추의 위치가 같은 경우는 없다.

## 출력

각 테스트 케이스에 대해 필요한 최소의 배추흰지렁이 마리 수를 출력한다.

## 예제 입력 1

2
10 8 17
0 0
1 0
1 1
4 2
4 3
4 5
2 4
3 4
7 4
8 4
9 4
7 5
8 5
9 5
7 6
8 6
9 6
10 10 1
5 5

## 예제 출력 1

5
1

## 예제 입력 2

1
5 3 6
0 2
1 2
2 2
3 2
4 2
4 0

## 예제 출력 2

2

```

```
