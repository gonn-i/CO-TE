[문제링크](https://www.acmicpc.net/problem/2630)

## 접근 방향 설명

[종이의개수](https://www.acmicpc.net/problem/1780) 와 매우 흡사한 문제!

> 1. 색종이 (Size \* Size) 가 모두 같은 숫자의 종이로 이뤄져있는지 확인
> 2. -> if O (모두 같음) 그숫자종이 + 1
> 3. -> else (다름) 분할 Size /2, 새로운 탐색 좌표 recursion에 넣어주기

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
let paper_Num = [0, 0]; // 0인 종이 1인 종이 갯수

for (let i = 0; i < N; i++) {
  paper_Arr[i] = input[i].split(' ').map(Number);
}

function recursion(x, y, S) {
  let target = paper_Arr[x][y];
  let same = true;

  for (let i = 0; i < S; i++) {
    for (let j = 0; j < S; j++) {
      if (target !== paper_Arr[x + i][y + j]) {
        same = false;
        break;
      }
    }
  }

  if (same) {
    paper_Num[target] += 1;
    return paper_Num;
  }

  let divison = Math.floor(S / 2);
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      recursion(x + i * divison, y + j * divison, divison);
    }
  }
  return paper_Num;
}

recursion(0, 0, N);
console.log(paper_Num.join('\n'));

```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

종이 개수를 풀고 풀어서 그런가 그냥 숫자만 조금 바꿔서 풀었다,
근데 애상치 못하게 70퍼에서 타입에러가 자꾸만 나왔는데 알고보니

`console.log(recursion(0, 0, N).join('\n'));` 을 해주었는데
recursion에 대한 return이 항상 paper_Num이라는 보장이 없어서 그렇다고 한다.

`고친부분`

```js
recursion(0, 0, N);
console.log(paper_Num.join('\n'));
```

호출한 함수의 반환값이 undefined가 될 수 있으니, paper_Num 값을 출력해주니 타입에러없이 해결되었다.
(타입에러 만날때마다, 배열에서 인덱스를 벗어났는지를 확인했는데 함수의 return 값도 확인해야겠다.)

---

## 문제

아래 <그림 1>과 같이 여러개의 정사각형칸들로 이루어진 정사각형 모양의 종이가 주어져 있고, 각 정사각형들은 하얀색으로 칠해져 있거나 파란색으로 칠해져 있다. 주어진 종이를 일정한 규칙에 따라 잘라서 다양한 크기를 가진 정사각형 모양의 하얀색 또는 파란색 색종이를 만들려고 한다.

전체 종이의 크기가 N×N(N=2k, k는 1 이상 7 이하의 자연수) 이라면 종이를 자르는 규칙은 다음과 같다.

전체 종이가 모두 같은 색으로 칠해져 있지 않으면 가로와 세로로 중간 부분을 잘라서 <그림 2>의 I, II, III, IV와 같이 똑같은 크기의 네 개의 N/2 × N/2색종이로 나눈다. 나누어진 종이 I, II, III, IV 각각에 대해서도 앞에서와 마찬가지로 모두 같은 색으로 칠해져 있지 않으면 같은 방법으로 똑같은 크기의 네 개의 색종이로 나눈다. 이와 같은 과정을 잘라진 종이가 모두 하얀색 또는 모두 파란색으로 칠해져 있거나, 하나의 정사각형 칸이 되어 더 이상 자를 수 없을 때까지 반복한다.

위와 같은 규칙에 따라 잘랐을 때 <그림 3>은 <그림 1>의 종이를 처음 나눈 후의 상태를, <그림 4>는 두 번째 나눈 후의 상태를, <그림 5>는 최종적으로 만들어진 다양한 크기의 9장의 하얀색 색종이와 7장의 파란색 색종이를 보여주고 있다.

입력으로 주어진 종이의 한 변의 길이 N과 각 정사각형칸의 색(하얀색 또는 파란색)이 주어질 때 잘라진 하얀색 색종이와 파란색 색종이의 개수를 구하는 프로그램을 작성하시오.

## 입력

첫째 줄에는 전체 종이의 한 변의 길이 N이 주어져 있다. N은 2, 4, 8, 16, 32, 64, 128 중 하나이다. 색종이의 각 가로줄의 정사각형칸들의 색이 윗줄부터 차례로 둘째 줄부터 마지막 줄까지 주어진다. 하얀색으로 칠해진 칸은 0, 파란색으로 칠해진 칸은 1로 주어지며, 각 숫자 사이에는 빈칸이 하나씩 있다.

## 출력

첫째 줄에는 잘라진 햐얀색 색종이의 개수를 출력하고, 둘째 줄에는 파란색 색종이의 개수를 출력한다.

## 예제 입력 1

8
1 1 0 0 0 0 1 1
1 1 0 0 0 0 1 1
0 0 0 0 1 1 0 0
0 0 0 0 1 1 0 0
1 0 0 0 1 1 1 1
0 1 0 0 1 1 1 1
0 0 1 1 1 1 1 1
0 0 1 1 1 1 1 1

## 예제 출력 1

9
7
