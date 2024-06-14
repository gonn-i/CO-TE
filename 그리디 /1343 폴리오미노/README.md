[문제링크](https://www.acmicpc.net/problem/1343)

## 접근 방향 설명

> 1. '.'을 기준으로 문자열을 각 배열요소로 나눠줌
> 2. 이때 배열의 요소가 홀수개이면 -1
> 3. 근데 이제 그 안에서 'XXXX' => 'AAAA', 'XX' => 'BB'
> 4. '.'를 기점으로 나눠주었기 때문에 다음 인덱스 넘어가기 전에 '.'도 넣어주기 (마지막만 빼주고)

```js
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

const POLYMINO = ['AAAA', 'BB'];
let ans = [];
let flag = false;
let count = 0;

const splited_Arr = input.split('.');

for (let i = 0; i < splited_Arr.length; i++) {
  if (splited_Arr[i].length % 2 !== 0) {
    console.log('-1');
    return;
  } else {
    ans.push(splited_Arr[i].replace(/XXXX/g, POLYMINO[0]).replace(/XX/g, POLYMINO[1]));
  }

  if (i !== splited_Arr.length - 1) ans.push('.');
}

console.log(ans.join(''));
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

흠냐 replace 함수를 처음 접해보았다. 그래서 시간이 정말 오래걸렸는데 문제를 많이 풀어볼수록 문제를 해결할 수 있는 도구들을 많이 알아갈 수 있을 것 같다.

---

## 문제

민식이는 다음과 같은 폴리오미노 2개를 무한개만큼 가지고 있다. AAAA와 BB

이제 '.'와 'X'로 이루어진 보드판이 주어졌을 때, 민식이는 겹침없이 'X'를 모두 폴리오미노로 덮으려고 한다. 이때, '.'는 폴리오미노로 덮으면 안 된다.

폴리오미노로 모두 덮은 보드판을 출력하는 프로그램을 작성하시오.

## 입력

첫째 줄에 보드판이 주어진다. 보드판의 크기는 최대 50이다.

## 출력

첫째 줄에 사전순으로 가장 앞서는 답을 출력한다. 만약 덮을 수 없으면 -1을 출력한다.
