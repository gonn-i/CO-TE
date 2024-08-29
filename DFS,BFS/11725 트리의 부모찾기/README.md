[문제링크](https://www.acmicpc.net/problem/11725)

## 접근 방향 설명
> 1) **부모 자식 구분 없이, 연견된 노드를 배열**에 넣어준다 
```js
  let [N1, N2] = input[i].split(' ').map(Number);
  tree[N2].push(N1);
  tree[N1].push(N2);
```
```js
// 배열에 저장된 연결 노드 (자식 부모 구분 x)
[
  [],          [ 6, 4 ],
  [ 4 ],       [ 6, 5 ],
  [ 1, 2, 7 ], [ 3 ],
  [ 1, 3 ],    [ 4 ]
]
```
> 2) 1번 노드에 대한 연결 노드부터 시작하여 BFS 을 돈다
```js
tree[1].map((e) => {
  needTovisit.push([1, e]); // BFS 을 위한 배열 
  ans_tree[1].push(e); // 부모 - 자식 계층트리
});
```
> 3) BFS  탐색시, **부모 노드를 제외한 나머지를 방문 예정 배열에 넣는다**
```js
    tree[node].forEach((e) => {
      if (e !== from) {
        needTovisit.push([node, e]);
      }
    });
```


## 풀이 코드 해석

 ```js
let fs = require('fs');
let filePath = process.platform == 'linux' ? '/dev/stdin' : '/input.txt';
let [N, ...input] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let ans_tree = [...new Array(+N + 1)].map(() => []);
let needTovisit = [];
let tree = [...new Array(+N + 1)].map(() => []);

// from(부모) <-> to(자식) 양방향으로 배열에 넣기
for (let i = 0; i < input.length; i++) {
  let [N1, N2] = input[i].split(' ').map(Number);
  tree[N2].push(N1);
  tree[N1].push(N2);
}

// 초기 방문 예정 노드 넣기 (start from 1 )
tree[1].map((e) => {
  needTovisit.push([1, e]);
  ans_tree[1].push(e);
});

// bfs
let idx = 0;
while (needTovisit.length > idx) { 
  // 시간 초과 방지를 위해 unshift 대신 idx로 접근
  let [from, node] = needTovisit[idx++];
  if (ans_tree[node].length < 1) { // 방문 여부 체크용 조건문
    ans_tree[node].push(from);
    tree[node].forEach((e) => {
      if (e !== from) {
        needTovisit.push([node, e]);
      }
    });
  }
}

let ans = [];

for (let i = 2; i < ans_tree.length; i++) {
  ans[i - 2] = ans_tree[i];
}

console.log(ans.join('\n'));
 ```

---

 ## 풀이 과정에서 새롭게 느낀점(배운점)

내가 아는 트리라곤 힙에서 쓰는 완전 이진트리뿐 
그치만 트리를 잘모른다고 못푸는 문제는 아니었다 (그래도 나름 시간 좀 들여서 풀어야했지만 )
아무튼 잘 모르는 개념이라도 1시간정도는 최대한 아는 선에서 풀어보려고 노력하면 대개는 풀린다는 것! 
그러니까 고민하는 시간을 아까워하지 말고 계속해서 끄적여보고 생각하고 풀어보려 노력해보자

---

## 문제
루트 없는 트리가 주어진다. 이때, 트리의 루트를 1이라고 정했을 때, 각 노드의 부모를 구하는 프로그램을 작성하시오.

## 입력
첫째 줄에 노드의 개수 N (2 ≤ N ≤ 100,000)이 주어진다. 둘째 줄부터 N-1개의 줄에 트리 상에서 연결된 두 정점이 주어진다.

## 출력
첫째 줄부터 N-1개의 줄에 각 노드의 부모 노드 번호를 2번 노드부터 순서대로 출력한다.

## 예제 입력 1 
7
1 6
6 3
3 5
4 1
2 4
4 7

## 예제 출력 1 
4
6
1
3
1
4