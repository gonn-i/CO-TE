[문제링크](https://www.acmicpc.net/problem/18310)

## 접근 방향 설명
> 안테나는 집에만 설치할 수 있기 때문에, 정렬 후 **가운데부터 탐색**해야 시간초과를 면할 수 있을 것 이다.
> 따라서,**이분 탐색**을 돌리면서, **최적의 값 (= 모든 집까지의 거리의 합이 가장 작은 값)을 갱신**한다 

## 풀이 코드 해석
```java script 
let fs = require('fs');
let filePath = process.platform == 'linux' ? '/dev/stdin' : '/input.txt';
let [N, ...input] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let nums = input[0].split(' ').map(Number);

nums.sort((a, b) => a - b);

let best = Infinity;
let ans = 0;
//모든 집까지의 거리가 가장 이상적인 경우를 판별하고 best를 갱신 & ans에 중간값 저장
function isBest(m) {
  let temp = 0;
  nums.map((e) => {
    temp += Math.abs(e - m);
  });
  if (best > temp) {
    best = temp;
    ans = m;
  }
  return best > temp;
}

let start = 0;
let end = nums.length - 1;
// 이분탐색 진행
while (start <= end) {
  let mid = Math.floor((start + end) / 2);
  if (isBest(nums[mid])) {
    end = mid - 1; // 탐색범위 end 수정
  } else {
    start = mid + 1; // 탐색범위 start 수정
  }
}

console.log(ans);
```
## 풀이 과정에서 새롭게 느낀점(배운점)

처음에 N 값 크기를 고려하지 않고 알고리즘 분류만을 보고 그리디니 이중반복문으로 돌려야겠다 생각한,, 
무지함을 반성했다. 담엔 N 값 고려 신경써서 하기! (누가 봐도 N이 엄청나게 큰데 왜 그랬을까..)

---
## 문제 설명
일직선 상의 마을에 여러 채의 집이 위치해 있다. 이중에서 특정 위치의 집에 특별히 한 개의 안테나를 설치하기로 결정했다. 효율성을 위해 안테나로부터 모든 집까지의 거리의 총 합이 최소가 되도록 설치하려고 한다. 이 때 안테나는 집이 위치한 곳에만 설치할 수 있고, 논리적으로 동일한 위치에 여러 개의 집이 존재하는 것이 가능하다.

집들의 위치 값이 주어질 때, 안테나를 설치할 위치를 선택하는 프로그램을 작성하시오.

예를 들어 N=4이고, 각 위치가 1, 5, 7, 9일 때를 가정하자.



이 경우 5의 위치에 설치했을 때, 안테나로부터 모든 집까지의 거리의 총 합이 (4+0+2+4)=10으로, 최소가 된다.

## 입력
첫째 줄에 집의 수 N이 자연수로 주어진다. (1≤N≤200,000) 둘째 줄에 N채의 집에 위치가 공백을 기준으로 구분되어 1이상 100,000이하의 자연수로 주어진다.

## 출력
첫째 줄에 안테나를 설치할 위치의 값을 출력한다. 단, 안테나를 설치할 수 있는 위치 값으로 여러 개의 값이 도출될 경우 가장 작은 값을 출력한다.

## 예제 입력 1 
4
5 1 7 9
## 예제 출력 1 
5