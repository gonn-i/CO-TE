[문제링크](https://www.acmicpc.net/problem/1780)

## 접근 방향 설명

> 1.  (S\*S 안에 ) 모든 값이 다 같은지 확인
> 2.  -> 같다면 해당 종이에 +1
> 3.  아니면 9등분 -> 가로 3등분, 세로 3등분 (S/3)한걸로 다시 재귀함수 호출 (이때 좌표로 움직여주기, 기준점 + 3분할했을때 첫점 )
> 4.  - > (1)로 다시 돌아감

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
let paper_Arr = [];
let paper_Num = [0, 0, 0]; // 순서대로 -1 0 1 의 종이 갯수

for (let i = 0; i < N; i++) {
  paper_Arr[i] = input[i].split(' ').map(Number);
}

function recursion(x, y, S) {
  let target = paper_Arr[x][y];
  let OnePiece = true;

  for (let i = 0; i < S; i++) {
    for (let j = 0; j < S; j++) {
      if (target !== paper_Arr[x + i][y + j]) {
        OnePiece = false; // 하나의 종이가 될 수 없을때
        break;
      }
    }
  }
  if (OnePiece) {
    // 1장 카운트
    // console.log(x, y);
    // console.log(S);
    paper_Num[target + 1] += 1;
  } else {
    let mini = S / 3; // 종이 분할해줄때는 원래 N을 건들이면 X
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // console.log('재귀!!');
        // console.log([x + i * mini, y + j * mini], mini);
        recursion(x + i * mini, y + j * mini, mini);
      }
    }
  }

  return paper_Num;
}

console.log(recursion(0, 0, N).join('\n'));
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

재귀함수 너무 어렵당 그치만 해야해.
머리로 어떻게 돌려야 할지는 생각이 났는데, 막상 돌려보니 자잘한 실수가 많았다.
(실수1)
배열의 전체 크기인 N을 직접 건들여서 바꿔버리기
(실수2)
재귀로 넘긴 좌표를 찝어놓고 움직여야 하는데, 그냥 퉁쳐서 재귀가 순서대로 돌아가지 않았다

보아하니 비슷한 재귀가 많은 것 같은데 더더 많이 해봐야겠다.

---

## 문제

N×N크기의 행렬로 표현되는 종이가 있다. 종이의 각 칸에는 -1, 0, 1 중 하나가 저장되어 있다. 우리는 이 행렬을 다음과 같은 규칙에 따라 적절한 크기로 자르려고 한다.

만약 종이가 모두 같은 수로 되어 있다면 이 종이를 그대로 사용한다.
(1)이 아닌 경우에는 종이를 같은 크기의 종이 9개로 자르고, 각각의 잘린 종이에 대해서 (1)의 과정을 반복한다.
이와 같이 종이를 잘랐을 때, -1로만 채워진 종이의 개수, 0으로만 채워진 종이의 개수, 1로만 채워진 종이의 개수를 구해내는 프로그램을 작성하시오.

## 입력

첫째 줄에 N(1 ≤ N ≤ 37, N은 3k 꼴)이 주어진다. 다음 N개의 줄에는 N개의 정수로 행렬이 주어진다.

## 출력

첫째 줄에 -1로만 채워진 종이의 개수를, 둘째 줄에 0으로만 채워진 종이의 개수를, 셋째 줄에 1로만 채워진 종이의 개수를 출력한다.

## 예제 입력 1

9
0 0 0 1 1 1 -1 -1 -1
0 0 0 1 1 1 -1 -1 -1
0 0 0 1 1 1 -1 -1 -1
1 1 1 0 0 0 0 0 0
1 1 1 0 0 0 0 0 0
1 1 1 0 0 0 0 0 0
0 1 -1 0 1 -1 0 1 -1
0 -1 1 0 1 -1 0 1 -1
0 1 -1 1 0 -1 0 1 -1

## 예제 출력 1

10
12
11
