[문제링크](https://www.acmicpc.net/problem/1966)

## 접근 방향 설명
큐가 선입선출임을 생각하면서! 풀면 간단하게 풀리는 문제이다. 중요도가 젤 높은 놈을 뽑아내고 해당 되지 않는 index의 값이면 뒤로 보내면서, 제일 높은 중요도의 녀석을 발견하면 결국은 0번 index에 위치할 것이기 때문에 빼주면 된다. 

만일, 그게 궁금한 문서 (target)가 아니면 없애주고 나간 순서에 +1을 더해주고, 궁금한 문서이면 바로 나가는 순서를 리턴 시켜주면 쉽게 해결되는 문제이다. 
(⭐️ 문제의 관건은 중요도순으로 문서를 앞에서 빼서 뒤로 넣어주는 동시에, Idx 배열도 만들어서 같은 작업을 해주는 것이다!!) 

--- 

## 풀이 코드 해석
``` java script
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "/input.txt";
let input = fs.readFileSync(__dirname + filePath).toString().split("\n");
// 백준 제출용 코드 (주석 해제하고 윗줄 주석 처리할 것)
// let input = fs.readFileSync(filePath).toString().split("\n"); 

let testCaseN = +input[0];

for(let i = 1; i <= testCaseN; i++){
    let num_target = input[i * 2 - 1].split(' ').map((i) => +i); // 문서수와 타켓 인덱스 get   
    let prior = input[i*2].split(' ').map((i) => +i); // 중요도 배열 get 

    let doc_Num = num_target[0];
    let target = num_target[1];
    let max_Prior = Math.max(...prior); // 가장 높은 중요도 뽑아내기 
    let ans = 0; // 정답이 될 순서 
    let Idx_Arr = []; //각 문서들의 인덱스를 담을 인덱스 배열 

    for(let i=0; i < doc_Num; i++) { // 인덱스 배열 채우기 
        Idx_Arr.push(i);
    }
    
    while(prior.length !== 0){ // 모든 문서를 다 뽑아낼 때까지
        if(prior[0] < max_Prior) {  //중요도가 최상위가 아닌 경우 앞에서 뽑아서 제일 뒤에 놓기 (중요도 배열과, 인덱스 배열 모두)
            prior.push(prior.shift())
            Idx_Arr.push(Idx_Arr.shift())
        } else { //제일 높은 인덱스를 뽑게 될 경우 순서 +1 해주고, 관심있는 문서가 출력될 경우 순서 console.log 후 break
            ans +=1;
            if(Idx_Arr[0] === target) {
                console.log(ans);
                break;
            }
            // 중요도 젤 높은 문서 out (중요도 배열 + 인덱스 배열)+ 최상 중요도 다시 선정 
            prior.shift(); 
            Idx_Arr.shift();
            max_Prior = Math.max(...prior);
        }
    }
}

```
---

## 풀이 과정에서 새롭게 느낀점(배운점)
**node.js 출력**
사실 js로 백준을 풀어본 경험이 없었기 때문에 입력을 어떻게 받으면 되는지 처음 알았다..! (그래서 애먹었기도 했지만 이젠 알아냈다구! 🤩) Node.js에서 readline보다 fs모듈을 사용하는 것이 더 빠르다는 것도 알아냈다.

``` java script
// fs 모듈 가져와서 파일 처리. 
// 1) 백준 사이트 제출시 리눅스 운영체제 상에서 실행되기 때문에, 입력을 받을 수 있게 해줌  
// 2) vs code에서 돌리면 운영체제가 mas OS 라서, txt 파일에 입력값을 담아 그대로 사용 가능  
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "/input.txt";

// 1) 백준에서 돌릴 때, 그냥 path 값 넣기 
let input = fs.readFileSync(filePath).toString().split("\n"); 

// 2) vs code에서 txt 경로 설정할때, 경로 문제 때문에 애를 정말 많이 먹었는데... 
// 동일 폴더에 넣어서 그냥 상대경로 작성할때, 🔥 내가 현재 작업하고 있는 현재 디렉의 경로를 제대로 설정하지 않아서라고 한다!!! 🔥 
// 그래서 __dirname 을 붙여줘야 함!

let input = fs.readFileSync(__dirname + filePath).toString().split("\n");
```
[참고링크](https://likethefirst.tistory.com/m/entry/JavaScript-Error-ENOENT-no-such-file-or-directory)

----

## 문제
여러분도 알다시피 여러분의 프린터 기기는 여러분이 인쇄하고자 하는 문서를 인쇄 명령을 받은 ‘순서대로’, 즉 먼저 요청된 것을 먼저 인쇄한다. 여러 개의 문서가 쌓인다면 Queue 자료구조에 쌓여서 FIFO - First In First Out - 에 따라 인쇄가 되게 된다. 하지만 상근이는 새로운 프린터기 내부 소프트웨어를 개발하였는데, 이 프린터기는 다음과 같은 조건에 따라 인쇄를 하게 된다.

현재 Queue의 가장 앞에 있는 문서의 ‘중요도’를 확인한다.
나머지 문서들 중 현재 문서보다 중요도가 높은 문서가 하나라도 있다면, 이 문서를 인쇄하지 않고 Queue의 가장 뒤에 재배치 한다. 그렇지 않다면 바로 인쇄를 한다.
예를 들어 Queue에 4개의 문서(A B C D)가 있고, 중요도가 2 1 4 3 라면 C를 인쇄하고, 다음으로 D를 인쇄하고 A, B를 인쇄하게 된다.

여러분이 할 일은, 현재 Queue에 있는 문서의 수와 중요도가 주어졌을 때, 어떤 한 문서가 몇 번째로 인쇄되는지 알아내는 것이다. 예를 들어 위의 예에서 C문서는 1번째로, A문서는 3번째로 인쇄되게 된다.

## 입력
첫 줄에 테스트케이스의 수가 주어진다. 각 테스트케이스는 두 줄로 이루어져 있다.

테스트케이스의 첫 번째 줄에는 문서의 개수 N(1 ≤ N ≤ 100)과, 몇 번째로 인쇄되었는지 궁금한 문서가 현재 Queue에서 몇 번째에 놓여 있는지를 나타내는 정수 M(0 ≤ M < N)이 주어진다. 이때 맨 왼쪽은 0번째라고 하자. 두 번째 줄에는 N개 문서의 중요도가 차례대로 주어진다. 중요도는 1 이상 9 이하의 정수이고, 중요도가 같은 문서가 여러 개 있을 수도 있다.

## 출력
각 테스트 케이스에 대해 문서가 몇 번째로 인쇄되는지 출력한다.

---- 

## 예제 입력 1 
3
1 0
5
4 2
1 2 3 4
6 0
1 1 9 1 1 1

## 예제 출력 1 
1
2
5