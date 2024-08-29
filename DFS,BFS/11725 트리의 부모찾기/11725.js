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
  let [from, node] = needTovisit[idx++];
  if (ans_tree[node].length < 1) {
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
