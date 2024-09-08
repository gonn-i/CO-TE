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

function preorder(r) {
  if (r === '.') return;

  let [left, right] = tree[r];
  ans += r;
  preorder(left);
  preorder(right);
}

function inorder(r) {
  if (r == '.') {
    return;
  }
  let [left, right] = tree[r];
  inorder(left);
  ans += r;
  inorder(right);
}

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
