[스택 수열](https://www.acmicpc.net/problem/1874)

## 접근 방향 설명
 1에서 n까지의 수를 차례로 새로운 배열(new_Arr)에 push 해주면서, 값들을 pop한걸 모아서 입력값과 일치하는 배열을 만들 수 있는지 묻는 문제였다! 
  (사실 문제 이해가 어려워서 대체 입력된 수열이 뭔지를 파악하는게 좀 오래걸렸다..)
 
 
 사실 new_Arr에 마지막으로 들어간 수가, 입력된 수열에서 요소이면(먼저 넣은 순서로!) 밖으로 pop해주면 되는 문제 

--- 

## 풀이 코드 해석
``` java script
const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "/input.txt";
let input = fs.readFileSync(__dirname + filePath).toString().split("\n");
// let input = fs.readFileSync(filePath).toString().split("\n");

const num = +input[0];
input.shift();
input.map((i)=> +i)
const new_Arr = [];
const ans = [];
let i =1;
let l = 0;
let success = true;

while(l < num) { // 입력된 배열의 인덱스를 끝까지 돌 때까지,
    if ( new_Arr[new_Arr.length-1] == input[l]) { 
        // 1 .. n으로 넣은 배열의 마지막 요소를 pop하여, 원하는 값을 뽑아낼 수 있는 경우 
        // pop으로 뽑아내고, 출력될 요소에 '-'추가 
        // 입력된 배열(만들어내고자 하는 pop 배열)의 인덱스 +1 
        new_Arr.pop(i)
        ans.push('-')
        l += 1;
    }

    else if (i <= input[l]) { // 원하는 값보다, 집어넣을 값이 작거나 같은 경우
    // 원하는 값과, 집어넣을 값이 같을 경우를 포함하는 이유 => 
    // 배열에 우선 들어있어야 pop해서 빼줄 수 있기 때문에 넣어주는 작업이 선행되어야 함
    // 일단 넣어주고, 출력될 요소에 '+' 추가 .. 넣어줄 값 +1 
    new_Arr.push(i)
    ans.push('+')
    i += 1
    }

    else { // 만약 원하는 값이 마지막 요소보다 작게 된다면, Pop으로 꺼내는 것이 불가능 하기 때문에, false 처리 해주고 반복문 탈출 
        success = false;
        break;
    }
}

if (!success) {
    console.log('NO')
} 
else {
    console.log(ans.join('\n'));
}

```
---

## 풀이 과정에서 새롭게 느낀점(배운점)
**덜렁거리다가 좀 허덕였던 문제**
접근 방법 파악하고 코드 작성한 이후, 대충 머리로 돌려보다가 여기저기에서 실수를 많이 했다 (조건문 안에 넣어야 할 걸.. 밖으로 빼기.../ 인덱스 올려주는거 까먹기 등...  )
console.log로 값들 중간중간에 찍어보는걸 좀 습관화 해보는 게 좋겠다 라는 생각이 들었다 
(콘솔 살인마... 가 되어 보아야 겠다 👿)

---

## 문제
스택 (stack)은 기본적인 자료구조 중 하나로, 컴퓨터 프로그램을 작성할 때 자주 이용되는 개념이다. 스택은 자료를 넣는 (push) 입구와 자료를 뽑는 (pop) 입구가 같아 제일 나중에 들어간 자료가 제일 먼저 나오는 (LIFO, Last in First out) 특성을 가지고 있다.

1부터 n까지의 수를 스택에 넣었다가 뽑아 늘어놓음으로써, 하나의 수열을 만들 수 있다. 이때, 스택에 push하는 순서는 반드시 오름차순을 지키도록 한다고 하자. 임의의 수열이 주어졌을 때 스택을 이용해 그 수열을 만들 수 있는지 없는지, 있다면 어떤 순서로 push와 pop 연산을 수행해야 하는지를 알아낼 수 있다. 이를 계산하는 프로그램을 작성하라.

## 입력
첫 줄에 n (1 ≤ n ≤ 100,000)이 주어진다. 둘째 줄부터 n개의 줄에는 수열을 이루는 1이상 n이하의 정수가 하나씩 순서대로 주어진다. 물론 같은 정수가 두 번 나오는 일은 없다.

## 출력
입력된 수열을 만들기 위해 필요한 연산을 한 줄에 한 개씩 출력한다. push연산은 +로, pop 연산은 -로 표현하도록 한다. 불가능한 경우 NO를 출력한다.

--- 

## 예제 입력 1 
8
4
3
6
8
7
5
2
1

## 예제 출력 1 
<p>
+
+
+
+
-
-
+
+
-
+
+
-
-
-
-
-
</p>

## 예제 입력 2 
5
1
2
5
3
4
## 예제 출력 2 
NO