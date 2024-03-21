[문제링크](https://school.programmers.co.kr/learn/courses/30/lessons/42746)

## 접근 방향 설명
처음 봤을땐, sort() 써서 사전식으로 정렬하면 최대값을 구할 줄 알았다. 그치만 테스트를 통과하지 못했다. 30과 3 의 정렬에 있어서 문제가 있었기 때문이었다. 해서 좀 고민하다가 MDN 들어가서 공식 문서 읽다가 compare 함수 형식을 보고 힌트를 얻었다! 

compare 함수를 통해서 합이 최대가 되도록 정렬하는 식으로 처리를 했고, 정답 리턴시 join('')으로 붙여서 내보내면 문풀 완료다.

## 풀이 코드 해석
```java script 
function solution(numbers) {
    // 숫자 -> 문자열 형식으로
    const string_arr = numbers.map(item => item.toString())
    const sorted_arr = string_arr.sort(compare)
    // 000 인 경우 -> 0 으로 출력될 수 있도록 삼항연산 
    return sorted_arr.join('') == 0 ? "0": sorted_arr.join('');
}
// 가장 큰 수의 조합을 만들 수 있도록 정렬 (단, 내림차순으로 )
function compare(a, b) {
    if (a + b > b + a ) return -1;
    if (a + b < b + a ) return 1;
    return 0;
}
```
## 풀이 과정에서 새롭게 느낀점(배운점)
1) 솔직히 말하면 테케 11번 왜 틀린지 모르겠어서 질문하기 봤다...
11번 해결하려고 20분은 붙잡고 있었는데, 사실 000 == 0 이 될지 몰랐다...! 

2) 공식 문서를 보고 힌트를 얻었던 만큼 앞으로도 공식문서를 종종 보면서 메소드의 정확한 개념이나 사용방법을 찾아서 공부해야 겠다는 생각이 들었다 🔥
(MDN_ sort)[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort]


---
## 문제 설명
0 또는 양의 정수가 주어졌을 때, 정수를 이어 붙여 만들 수 있는 가장 큰 수를 알아내 주세요.

예를 들어, 주어진 정수가 [6, 10, 2]라면 [6102, 6210, 1062, 1026, 2610, 2106]를 만들 수 있고, 이중 가장 큰 수는 6210입니다.

0 또는 양의 정수가 담긴 배열 numbers가 매개변수로 주어질 때, 순서를 재배치하여 만들 수 있는 가장 큰 수를 문자열로 바꾸어 return 하도록 solution 함수를 작성해주세요.

## 제한 사항
numbers의 길이는 1 이상 100,000 이하입니다.
numbers의 원소는 0 이상 1,000 이하입니다.
정답이 너무 클 수 있으니 문자열로 바꾸어 return 합니다.

## 입출력 예
numbers	return
[6, 10, 2]	"6210"
[3, 30, 34, 5, 9]	"9534330"