let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, M] = input.shift().split(' ').map(Number);

input = input.map(Number);

let end = Math.max(...input);
let start = 0;
let ans = Infinity;

function validation(m) {
  let children = 0;
  for (let i = 0; i < M; i++) {
    children += Math.floor(input[i] / m);
    if (input[i] % m > 0) children += 1;
  }

  if (children <= N && ans > m) {
    ans = m;
  }
  return children <= N;
}

while (start <= end) {
  let mid = Math.floor((start + end) / 2);

  if (validation(mid)) {
    end = mid - 1;
  } else {
    start = mid + 1;
  }
}

console.log(ans);
