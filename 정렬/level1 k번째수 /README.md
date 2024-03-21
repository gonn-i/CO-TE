[문제링크](https://school.programmers.co.kr/learn/courses/30/lessons/42748)

## 접근 방향 설명
가장 먼저 해야 할 일은 i번째부터 j번째까지 배열을 잘라서, 오름차순으로 정렬 후 k번째 수를 구하면 되는 아주 간단한 문제! 사실 해결이라고 할게 없어 말을 줄인다! 

## 풀이 코드 해석
```java script 
function solution(array, commands) {
    const answer = []
    commands.forEach(item => {
        const slice_array = array.slice(item[0]-1, item[1]) //i번째부터, j까지 담는 배열 생성
        slice_array.sort((a,b) => a-b)  // 생성된 배열 오름차순으로 정렬 
        answer.push(slice_array[item[2]-1]) // k번째 수 answer 배열에 push
    })
    return answer
}
```
## 풀이 과정에서 새롭게 느낀점(배운점)
1) slice 메서드 범위 사용하는게 헷갈려서 검색해봤는데, 
    `slice(begin, end)` 의 형식으로 사용하는데 이때 end는 미포함이다!! (플젝하고 오랜만에 사용하니 가물가물해서 다시 머릿속에 각인하기 😑)  
    [공식문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

2) `const [sPosition, ePosition, position] = command` 다른 사람 풀이를 보다가 구조분해 할당을 해주는걸 봤는데, 나도 나중엔 저런 직관적인 코드를 생각해봐야겠다 다짐했다!! 



---
## 문제 설명
배열 array의 i번째 숫자부터 j번째 숫자까지 자르고 정렬했을 때, k번째에 있는 수를 구하려 합니다.

예를 들어 array가 [1, 5, 2, 6, 3, 7, 4], i = 2, j = 5, k = 3이라면

array의 2번째부터 5번째까지 자르면 [5, 2, 6, 3]입니다.
1에서 나온 배열을 정렬하면 [2, 3, 5, 6]입니다.
2에서 나온 배열의 3번째 숫자는 5입니다.
배열 array, [i, j, k]를 원소로 가진 2차원 배열 commands가 매개변수로 주어질 때, commands의 모든 원소에 대해 앞서 설명한 연산을 적용했을 때 나온 결과를 배열에 담아 return 하도록 solution 함수를 작성해주세요.

## 제한사항
array의 길이는 1 이상 100 이하입니다.
array의 각 원소는 1 이상 100 이하입니다.
commands의 길이는 1 이상 50 이하입니다.
commands의 각 원소는 길이가 3입니다.

## 입출력 예
array	commands	return
[1, 5, 2, 6, 3, 7, 4]	[[2, 5, 3], [4, 4, 1], [1, 7, 3]]	[5, 6, 3]

## 입출력 예 설명
[1, 5, 2, 6, 3, 7, 4]를 2번째부터 5번째까지 자른 후 정렬합니다. [2, 3, 5, 6]의 세 번째 숫자는 5입니다.
[1, 5, 2, 6, 3, 7, 4]를 4번째부터 4번째까지 자른 후 정렬합니다. [6]의 첫 번째 숫자는 6입니다.
[1, 5, 2, 6, 3, 7, 4]를 1번째부터 7번째까지 자릅니다. [1, 2, 3, 4, 5, 6, 7]의 세 번째 숫자는 3입니다.