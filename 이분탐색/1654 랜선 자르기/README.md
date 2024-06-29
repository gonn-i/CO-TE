[문제링크](https://www.acmicpc.net/problem/1654)

## 접근 방향 설명

> 1️⃣ 줄의 길이를 `start(min) = 1`, `end(max) = 주어진 줄 배열중 최대 길이`로 잡고 이진 탐색을 진행한다.
> 2️⃣ 이때 `mid` 값으로 **N 개의 줄을 만들 수 있는지를 판별한 후**, 가능한 경우 `ans` 배열에 넣는다.
> 3️⃣ 이진탐색을 마친 후, `ans` 배열에서 `max` 값을 찾는다! 

## 풀이 코드 해석

```java script
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

const [K, N] = input.shift().split(' ').map(Number);
let ans = [];

function Validation(mid) {
  let count = 0;
  input.forEach((e) => {
    count += Math.floor(e / mid);
  });
  return count >= N;
}

function BinarySearch() {
  let start = 1;
  let end = Math.max(...input);

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (Validation(mid)) {
      start = mid + 1;
      ans.push(mid);
    } else {
      end = mid - 1;
    }
  }
  return Math.max(...ans);
}

console.log(BinarySearch());
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

우여곡절 1) 
영식이 가진 줄을 굳이 다 쓸 필요가 없었는데, (영식's 줄 중에 일부만을 사용해서 N을 만들 수 있으면 작은 건 버려도 됨) 그걸 간과해서 `end` 에  Math.min을 사용한 죄... (두두둥..)

우여곡절2) 
ans 배열에 가능한 줄의 길이를 넣고 max를 뽑아낼 생각을 못하고, 무조건 start와 end가 엇갈리기 전, mid가 답일 것이라 생각한 죄.. (진짜.. 이건..)

아무튼 문제를 풀다보니 점점 실수 모음집이 되어가는 것도 같지만, 오히려 좋아... 그래도 성장하고 있어 사실 이분탐색 좀 만만하게 본 것도 있었던 것 같지만,,, 전혀 
그러면 안 될 것 같다

---

## 문제
집에서 시간을 보내던 오영식은 박성원의 부름을 받고 급히 달려왔다. 박성원이 캠프 때 쓸 N개의 랜선을 만들어야 하는데 너무 바빠서 영식이에게 도움을 청했다.

이미 오영식은 자체적으로 K개의 랜선을 가지고 있다. 그러나 K개의 랜선은 길이가 제각각이다. 박성원은 랜선을 모두 N개의 같은 길이의 랜선으로 만들고 싶었기 때문에 K개의 랜선을 잘라서 만들어야 한다. 예를 들어 300cm 짜리 랜선에서 140cm 짜리 랜선을 두 개 잘라내면 20cm는 버려야 한다. (이미 자른 랜선은 붙일 수 없다.)

편의를 위해 랜선을 자르거나 만들 때 손실되는 길이는 없다고 가정하며, 기존의 K개의 랜선으로 N개의 랜선을 만들 수 없는 경우는 없다고 가정하자. 그리고 자를 때는 항상 센티미터 단위로 정수길이만큼 자른다고 가정하자. N개보다 많이 만드는 것도 N개를 만드는 것에 포함된다. 이때 만들 수 있는 최대 랜선의 길이를 구하는 프로그램을 작성하시오.

## 입력
첫째 줄에는 오영식이 이미 가지고 있는 랜선의 개수 K, 그리고 필요한 랜선의 개수 N이 입력된다. K는 1이상 10,000이하의 정수이고, N은 1이상 1,000,000이하의 정수이다. 그리고 항상 K ≦ N 이다. 그 후 K줄에 걸쳐 이미 가지고 있는 각 랜선의 길이가 센티미터 단위의 정수로 입력된다. 랜선의 길이는 231-1보다 작거나 같은 자연수이다.

## 출력
첫째 줄에 N개를 만들 수 있는 랜선의 최대 길이를 센티미터 단위의 정수로 출력한다.

## 예제 입력 1 
4 11
802
743
457
539

## 예제 출력 1 
200