let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

const [N, C] = input.shift().split(' ').map(Number);
let snack = [];
let ans = [0];

snack = input[0].split(' ').map(Number);

function IsShared(mid) {
  let given = 0;
  for (let i = 0; i < C; i++) {
    given += Math.floor(snack[i] / mid);
  }

  return given >= N;
}

function BinarySearch() {
  let start = 1;
  let end = Math.max(...snack);

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (IsShared(mid)) {
      start = mid + 1;
      ans.push(mid);
    } else {
      end = mid - 1;
    }
  }
  return Math.max(...ans);
}

console.log(BinarySearch());
