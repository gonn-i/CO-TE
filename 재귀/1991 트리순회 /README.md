[문제링크](https://www.acmicpc.net/problem/1991)

## 접근 방향 설명
> 재귀를 통한 순회! : 재귀 특성상 말로 설명이 어렵지만 각 순회에 대해서 설명해보겠다.
> **전위 순회)** 루트 -> 왼쪽 -> 오른쪽
```js
function preorder(r) {
  if (r === '.') return;

  let [left, right] = tree[r];
  ans += r; // 1) 루트 먼저 넣기 
  preorder(left);  // 2) left 선순회
  preorder(right);  // 3) 이후 right 순회
}
```
> **중위순회)** 왼쪽 -> 루트 -> 오른쪽 
```js
// 중위순회
function inorder(r) {
  if (r == '.') {
    return;
  }
  let [left, right] = tree[r];
  inorder(left);  // 1) left 선순회
  ans += r; // 2) left -> root 
  inorder(right); // 3) 이후 right 순회
}
```
> **후위 순회)** 왼쪽 -> 오른쪽 -> 루트
```js
function postorder(r) {
  if (r == '.') {
    return;
  }

  let [left, right] = tree[r];
  postorder(left); 
  postorder(right);
  ans += r;
}
```


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

let tree = {};

for (let i = 0; i < N; i++) {
  let [root, left, right] = input[i].split(' ');
  tree[root] = [left, right];
}

let ans = '';

// 전위순회
function preorder(r) {
  if (r === '.') return;

  let [left, right] = tree[r];
  ans += r;
  preorder(left);
  preorder(right);
}

// 중위순회
function inorder(r) {
  if (r == '.') {
    return;
  }
  let [left, right] = tree[r];
  inorder(left);
  ans += r;
  inorder(right);
}

// 후위순회
function postorder(r) {
  if (r == '.') {
    return;
  }

  let [left, right] = tree[r];
  postorder(left);
  postorder(right);
  ans += r;
}

preorder('A');
ans += '\n';
inorder('A');
ans += '\n';
postorder('A');

console.log(ans);
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

재귀는 언제 풀어도 어려운 것 같다. (연습과 반복만이 살길 이라는 뜻...~)
그래도 백트래킹 문풀을 좀 하다보니 나름 괜찮아진 것도 같아 앞으로도 백트래킹으로 단련해봐야겠다. 아자잣

---

## 문제

이진 트리를 입력받아 전위 순회(preorder traversal), 중위 순회(inorder traversal), 후위 순회(postorder traversal)한 결과를 출력하는 프로그램을 작성하시오.



예를 들어 위와 같은 이진 트리가 입력되면,

전위 순회한 결과 : ABDCEFG // (루트) (왼쪽 자식) (오른쪽 자식)
중위 순회한 결과 : DBAECFG // (왼쪽 자식) (루트) (오른쪽 자식)
후위 순회한 결과 : DBEGFCA // (왼쪽 자식) (오른쪽 자식) (루트)
가 된다.

## 입력
첫째 줄에는 이진 트리의 노드의 개수 N(1 ≤ N ≤ 26)이 주어진다. 둘째 줄부터 N개의 줄에 걸쳐 각 노드와 그의 왼쪽 자식 노드, 오른쪽 자식 노드가 주어진다. 노드의 이름은 A부터 차례대로 알파벳 대문자로 매겨지며, 항상 A가 루트 노드가 된다. 자식 노드가 없는 경우에는 .으로 표현한다.

## 출력
첫째 줄에 전위 순회, 둘째 줄에 중위 순회, 셋째 줄에 후위 순회한 결과를 출력한다. 각 줄에 N개의 알파벳을 공백 없이 출력하면 된다.

## 예제 입력 1 
7
A B C
B D .
C E F
E . .
F . G
D . .
G . .

## 예제 출력 1 
ABDCEFG
DBAECFG
DBEGFCA
