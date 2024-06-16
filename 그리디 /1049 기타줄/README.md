[문제링크](https://www.acmicpc.net/problem/1049)

## 접근 방향 설명

> 주어진 가격은 많지만, 우리가 쓸 가격은 최고 가격! => 패키지의 최소가격, 낱개의 최소 가격 뽑아내기
> **고려애햐 하는 가격 경우의 수**
1) 낱개로만 사는 경우 `each_min * N`
2) 6의 배수일떄
3) 6의 배수 아님 + 패키지 1개 더 구매
3) 6의 배수 아님 + 남은거 낱개로 구매
> 위에 값중 Math.min 구하면 됨
---

```js
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, M] = input.shift().split(' ').map(Number);
let price = 0;
let ways = [];

let each_price = [];
let package_price = [];

for (let i = 0; i < M; i++) {
  [package_price[i], each_price[i]] = input[i].split(' ').map(Number);
}

let package_min = Math.min(...package_price);
let each_min = Math.min(...each_price);

ways.push(each_min * N); // 낱개로만 해결

if (N >= 6) {
  price += package_min * Math.floor(N / 6);
  N %= 6;
}

if (N > 0) {
  ways.push(price + package_min); // 6의 배수가 아닌 경우, 패키지 추가 구입
  ways.push(price + each_min * N); // 6의 배수가 아닌 경우, 낱개 추가 구입
} else {
  ways.push(price); // 6의 배수일 경우, 패키지로만 해결
}

console.log(Math.min(...ways));
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

이번 문제는 경우의 수 모두 고려해서, 최소값 구하는 유형이었는데 
처음에 생각하지 못한 경우의 수를 찾으나 좀 초반에 좀 틀렸던거 같다. 

앞으론 반례도 혼자 힘으로 더 생각해보는 힘을 길러봐야겠다!

---

## 문제
Day Of Mourning의 기타리스트 강토가 사용하는 기타에서 N개의 줄이 끊어졌다. 따라서 새로운 줄을 사거나 교체해야 한다. 강토는 되도록이면 돈을 적게 쓰려고 한다. 6줄 패키지를 살 수도 있고, 1개 또는 그 이상의 줄을 낱개로 살 수도 있다.

끊어진 기타줄의 개수 N과 기타줄 브랜드 M개가 주어지고, 각각의 브랜드에서 파는 기타줄 6개가 들어있는 패키지의 가격, 낱개로 살 때의 가격이 주어질 때, 적어도 N개를 사기 위해 필요한 돈의 수를 최소로 하는 프로그램을 작성하시오.

## 입력
첫째 줄에 N과 M이 주어진다. N은 100보다 작거나 같은 자연수이고, M은 50보다 작거나 같은 자연수이다. 둘째 줄부터 M개의 줄에는 각 브랜드의 패키지 가격과 낱개의 가격이 공백으로 구분하여 주어진다. 가격은 0보다 크거나 같고, 1,000보다 작거나 같은 정수이다.

## 출력
첫째 줄에 기타줄을 적어도 N개 사기 위해 필요한 돈의 최솟값을 출력한다.

**예제 입력 1**
4 2
12 3
15 4

**예제 출력 1** 
12