[스택 수열](https://www.acmicpc.net/problem/1316)

## 접근 방향 설명
stack 으로 중복 체크하며, 이웃하는지 확인하는 문제
나온적 없는 단어 -> 스택에 넣기 -> 나온적 있는데 연속으로 나오지 않은 경우 -> N -1 시키기

--- 

## 풀이 코드 해석
``` java script
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [N, ...arr] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .split('\n');

// 주어진 단어 배열 하나씩 수행
arr.forEach((e) => {
  let stack = [];
  let words = e.split('');

  for (let i = 0; i < words.length; i++) {
    if (!stack.includes(words[i])) { // 나온적 없는 단어는 stack에 Push
      stack.push(words[i]);
    } else if (stack[stack.length - 1] !== words[i]) { // 나온적 있으면 인접 않는 경우
      N -= 1;
      return;
    }
  }
});

console.log(N);

```
---

## 풀이 과정에서 새롭게 느낀점(배운점)
딱히 없으니 이번엔 패스!

---

## 문제
그룹 단어란 단어에 존재하는 모든 문자에 대해서, 각 문자가 연속해서 나타나는 경우만을 말한다. 예를 들면, ccazzzzbb는 c, a, z, b가 모두 연속해서 나타나고, kin도 k, i, n이 연속해서 나타나기 때문에 그룹 단어이지만, aabbbccb는 b가 떨어져서 나타나기 때문에 그룹 단어가 아니다.

단어 N개를 입력으로 받아 그룹 단어의 개수를 출력하는 프로그램을 작성하시오.

##  입력
첫째 줄에 단어의 개수 N이 들어온다. N은 100보다 작거나 같은 자연수이다. 둘째 줄부터 N개의 줄에 단어가 들어온다. 단어는 알파벳 소문자로만 되어있고 중복되지 않으며, 길이는 최대 100이다.

## 출력
첫째 줄에 그룹 단어의 개수를 출력한다.

## 예제 입력 1 
3
happy
new
year

## 예제 출력 1 
3