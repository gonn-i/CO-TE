[문제링크](https://www.acmicpc.net/problem/10994)

## 접근 방향 설명

> 1. 일단 N이 1씩 증가함에 따라, 0행의 별의 갯수가 몇개인지 파악 (등차수열)
> 2. 테두리만 출력되기 때문에, 0행거나, 0열이거나, 마지막행, 마지막열에 해당하는 곳에만 '\*' 출력
> 3. 내부에 그려지는 N-1 번째 별 세트들은 N 번째 세트보다, 2칸씩 안으로 들어가 있음
>    따라서, 재귀함수로 `recursion(N - 1, R + 2)`; 전달해줌

## 풀이 코드 해석

```java script
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let N = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

let ans = [...new Array(4 * N - 3)].map(() => new Array(4 * N - 3));

function recursion(N, R) {
  if (N == 0) {
    return;
  }

  let repeat = 4 * N - 3;
  for (let i = R; i < repeat + R; i++) {
    for (let j = R; j < repeat + R; j++) {
      if (i == R || j == R || i == repeat + R - 1 || j == repeat + R - 1) {
        ans[i][j] = '*';
      } else ans[i][j] = ' ';
    }
  }
  recursion(N - 1, R + 2);
}

recursion(N, 0);

for (let i = 0; i < 4 * N - 3; i++) {
  console.log(ans[i].join(''));
}
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

재귀함수의 근본 별찍기를 처음 풀어보았다!
재귀의 기본이라고 할 수 있는 다음 인자를 뭘로 넘겨줄지, 어디에서 함수를 끝낼지 등을 생각해보면서 재귀와 친해질 수 있었던 좋은 기회였던거 같다!

---

## 문제

예제를 보고 규칙을 유추한 뒤에 별을 찍어 보세요.

## 입력

첫째 줄에 N(1 ≤ N ≤ 100)이 주어진다.

## 출력

첫째 줄부터 차례대로 별을 출력한다.

## 예제 입력 1

1

## 예제 출력 1

```
*
```

## 예제 입력 2

2

## 예제 출력 2

```
*****
*   *
* * *
*   *
*****
```

## 예제 입력 3

3

## 예제 출력 3

```
*********
*       *
* ***** *
* *   * *
* * * * *
* *   * *
* ***** *
*       *
*********
```
