
[문제링크](https://www.acmicpc.net/problem/1043)

## 접근 방향 설명

> 
> 파티에서 최대한 많이 거짓말 할 수 있도록 문제를 해결하면 되는 문제였다. 
> 문제에서 가장 중요한 점은, 파티가 배열 순서대로 진행되지 않는다는 점이다. 그래서 사람간의 그래프를 그리는 것이 중요했다고 생각했다.


> 1️⃣ 파티의 순서가 보장되어 있지 않기 때문에 함께 파티에 참여하는 사람간의 간선 정보를 양방향으로 저장해야 했다.
>
> 2️⃣ 이후, 탐색을 돌면서 진실을 알고 있는 사람과 함께 파티에 간 사람을 know_Arr에 넣어주었다. (know_Arr == 진실을 아는 사람들의 집합)
  > 탐색은 스택을 이용했기에 DFS 로 돌렸다. 여기에선 탐색 순서가 중요하지 않기에 BFS도 크게 상관없을 것이다. 
  >
> 3️⃣ 다시 배열을 돌면서 진실을 아는 사람이 없는 파티라면, ans++를 해주었다.
---

```js
let fs = require('fs');
const { arrayBuffer } = require('stream/consumers');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, M] = input[0].split(' ').map(Number);
let [know_num, ...know_Arr] = input[1].split(' ').map(Number);
let ans = 0;

let graph = Array.from({ length: N + 1 }, () => []);


// 인접 리스트 방식으로 그래프 생성 (사람끼리 연결)
for (let i = 2; i < 2 + M; i++) {
  let [num, ...Arr] = input[i].split(' ').map(Number);
  for (let j = 0; j < num; j++) {
     // 현재 사람(Arr[j])과 같은 파티의 다른 사람들을 그래프에 추가
    graph[Arr[j]].push(...Arr.filter((x) => x !== Arr[j]));
  }
}

let needToVisite = [...know_Arr];
let know_Set = new Set(know_Arr);
let needToVisite_Set = new Set(needToVisite);

// DFS로 탐색 돌리면서 진실 아는 사람 배열에 저장
while (needToVisite.length >= 1) {
  let target = needToVisite.pop();
  let temp = graph[target];

  if (temp) {
    temp.forEach((e) => {
      if (!know_Set.has(e) && !needToVisite_Set.has(e)) {
        needToVisite.push(e);
        know_Arr.push(e);
        know_Set.add(e);
        needToVisite_Set.add(e);
      }
    });
  }
}

// 각 파티를 돌면서 거짓말이 가능한지 확인
for (let i = 2; i < 2 + M; i++) {
  let [num, ...Arr] = input[i].split(' ').map(Number);
  let flag = false;
  for (let j = 0; j < num; j++) {
    // 만약 파티에 진실을 아는 사람이 있으면
    if (know_Arr.includes(Arr[j])) {
      flag = true;
    }

    if (flag) break;
  }
  if (!flag) ans++;
}

console.log(ans);

```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

set 도 사용하고, 배열도 사용하기에 메모리 사용 측면에서 좋지 못한 코드라고 생각한다. 
N과 M의 크기가 50이 max였기에 백준 성능 에러를 면할 수 있었던 것 같다. 
다음엔 boolean 로 이루어진 배열을 만들어서, 체크하는 편이 더 좋을 것 같다!

그리고 중간에 needToVisite 배열 초기화해줄때, know_Arr를 복사해서 주지 않고 
그 참조 자체를 넘겨서 중간에 잠깐 삐끗했던 부분이 있었다.. 
기초적인 실수였지만 ! 앞으로는 그러지 않길 바라는 마음에 오답노트를 적어본다! 

"배열을 그래도 할당하면 참조를 넘겨주는 것과 같다!!! 조심좀 하자"


아래는 기존 코드를 개선해서 좀더 깔끔하게 작성해본 코드이다! 


```js
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs.readFileSync(__dirname + filePath).toString().trim().split('\n');

let [N, M] = input[0].split(' ').map(Number);
let [know_num, ...know_Arr] = input[1].split(' ').map(Number);
let ans = 0;

// 그래프(인접 리스트) 초기화
let graph = Array.from({ length: N + 1 }, () => []);
let parties = [];
let visited = Array(N + 1).fill(false); // 방문 여부 체크 (진실을 아는 사람)

// 파티 정보를 저장하며 인접 리스트 구성
for (let i = 2; i < 2 + M; i++) {
  let [num, ...Arr] = input[i].split(' ').map(Number);
  parties.push(Arr);
  
  for (let j = 0; j < num; j++) {
    for (let k = j + 1; k < num; k++) {
      graph[Arr[j]].push(Arr[k]);
      graph[Arr[k]].push(Arr[j]);
    }
  }
}

// BFS로 진실을 아는 사람 확장
let queue = [...know_Arr];

for (let person of know_Arr) {
  visited[person] = true; 
}

while (queue.length > 0) {
  let target = queue.pop();

  for (let next of graph[target]) {
    if (!visited[next]) {
      visited[next] = true;
      queue.push(next);
    }
  }
}

// 거짓말 가능한 파티 개수 카운트
for (let party of parties) {
  let canLie = true;

  for (let person of party) {
    if (visited[person]) { // 진실을 아는 사람이 포함되어 있으면 거짓말 불가
      canLie = false;
      break;
    }
  }

  if (canLie) ans++; // 거짓말 가능하면 카운트 증가
}

console.log(ans);
```


---

거짓말 성공
시간 제한	메모리 제한	제출	정답	맞힌 사람	정답 비율
2 초	128 MB	40174	18290	14149	45.855%

## 문제
지민이는 파티에 가서 이야기 하는 것을 좋아한다. 파티에 갈 때마다, 지민이는 지민이가 가장 좋아하는 이야기를 한다. 지민이는 그 이야기를 말할 때, 있는 그대로 진실로 말하거나 엄청나게 과장해서 말한다. 당연히 과장해서 이야기하는 것이 훨씬 더 재미있기 때문에, 되도록이면 과장해서 이야기하려고 한다. 하지만, 지민이는 거짓말쟁이로 알려지기는 싫어한다. 문제는 몇몇 사람들은 그 이야기의 진실을 안다는 것이다. 따라서 이런 사람들이 파티에 왔을 때는, 지민이는 진실을 이야기할 수 밖에 없다. 당연히, 어떤 사람이 어떤 파티에서는 진실을 듣고, 또다른 파티에서는 과장된 이야기를 들었을 때도 지민이는 거짓말쟁이로 알려지게 된다. 지민이는 이런 일을 모두 피해야 한다.

사람의 수 N이 주어진다. 그리고 그 이야기의 진실을 아는 사람이 주어진다. 그리고 각 파티에 오는 사람들의 번호가 주어진다. 지민이는 모든 파티에 참가해야 한다. 이때, 지민이가 거짓말쟁이로 알려지지 않으면서, 과장된 이야기를 할 수 있는 파티 개수의 최댓값을 구하는 프로그램을 작성하시오.

## 입력
첫째 줄에 사람의 수 N과 파티의 수 M이 주어진다.

둘째 줄에는 이야기의 진실을 아는 사람의 수와 번호가 주어진다. 진실을 아는 사람의 수가 먼저 주어지고 그 개수만큼 사람들의 번호가 주어진다. 사람들의 번호는 1부터 N까지의 수로 주어진다.

셋째 줄부터 M개의 줄에는 각 파티마다 오는 사람의 수와 번호가 같은 방식으로 주어진다.

N, M은 50 이하의 자연수이고, 진실을 아는 사람의 수는 0 이상 50 이하의 정수, 각 파티마다 오는 사람의 수는 1 이상 50 이하의 정수이다.

## 출력
첫째 줄에 문제의 정답을 출력한다.

## 예제 입력 1 
4 3
0
2 1 2
1 3
3 2 3 4

## 예제 출력 1 
3