[문제링크](https://www.acmicpc.net/problem/2512)

## 접근 방향 설명

> 조건 1️⃣ 상한액(limit) 그 이상인 예산요청에는 모두 상한액(limit)을 배정한다.  
`if (arr[i] > limit) sum += limit;`
> 조건 2️⃣ 상한액(limit) 이하의 예산요청에 대해서는 요청한 금액을 그대로 배정한다. 
`else sum += arr[i];`
이 조건에 따라, sum이 TOTAL 보다 작거나 같은 상황만이 적합한 limit가 되겠다! 

> 위의 조건에 적합한 limit이 나온 경우에만, `limit`을 `result`에 넣어주고 `start` 에 `mid +1` 을 해준다. 그렇지 않은 경우엔, `end`에 `mid -1` 을 주어 **이분 탐색을 실시한다!**

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
let TOTAL = +input.pop();
let arr = [];

arr = input[0].split(' ').map(Number);

arr.sort((a, b) => a - b);

function IsOverLimit(limit) {
  let sum = 0;
  for (let i = 0; i < N; i++) {
    if (arr[i] > limit) sum += limit;
    else sum += arr[i];
  }
  return sum <= TOTAL;
}

function binarySearch() {
  start = 0;
  end = arr[N - 1];
  let result = 0;

  while (start <= end) {
    mid = parseInt((start + end) / 2);
    if (IsOverLimit(mid)) {
      result = mid;
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return result;
}
console.log(binarySearch());
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

이분탐색 예전에 python으로 풀어보고, 아 그 mid를 상황에 따라 start 에 +1 해서 넘겨주거나, end에 -1 해서 넘겨줘야지 하고 머리에 넣은지 벌써 1년이 지났다..  오랜만에 풀어보니 mid를 꼭 idx에만 국한하지 말았어야 했는데 틀에 박힌 생각 때문에 조금 오래 걸렸지만 이해했다! 

이분탐색으로 또 한주를 보내봐야겠다!

---

## 문제
국가의 역할 중 하나는 여러 지방의 예산요청을 심사하여 국가의 예산을 분배하는 것이다. 국가예산의 총액은 미리 정해져 있어서 모든 예산요청을 배정해 주기는 어려울 수도 있다. 그래서 정해진 총액 이하에서 가능한 한 최대의 총 예산을 다음과 같은 방법으로 배정한다.

모든 요청이 배정될 수 있는 경우에는 요청한 금액을 그대로 배정한다.
모든 요청이 배정될 수 없는 경우에는 특정한 정수 상한액을 계산하여 그 이상인 예산요청에는 모두 상한액을 배정한다. 상한액 이하의 예산요청에 대해서는 요청한 금액을 그대로 배정한다. 
예를 들어, 전체 국가예산이 485이고 4개 지방의 예산요청이 각각 120, 110, 140, 150이라고 하자. 이 경우, 상한액을 127로 잡으면, 위의 요청들에 대해서 각각 120, 110, 127, 127을 배정하고 그 합이 484로 가능한 최대가 된다. 

여러 지방의 예산요청과 국가예산의 총액이 주어졌을 때, 위의 조건을 모두 만족하도록 예산을 배정하는 프로그램을 작성하시오.

## 입력
첫째 줄에는 지방의 수를 의미하는 정수 N이 주어진다. N은 3 이상 10,000 이하이다. 다음 줄에는 각 지방의 예산요청을 표현하는 N개의 정수가 빈칸을 사이에 두고 주어진다. 이 값들은 모두 1 이상 100,000 이하이다. 그 다음 줄에는 총 예산을 나타내는 정수 M이 주어진다. M은 N 이상 1,000,000,000 이하이다. 

## 출력
첫째 줄에는 배정된 예산들 중 최댓값인 정수를 출력한다. 

**예제 입력 1**
4
120 110 140 150
485

**예제 출력 1** 
127

**예제 입력 2** 
5
70 80 30 40 100
450

**예제 출력 2** 
100