let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

const [K, N] = input.shift().split(' ').map(Number);
let ans = [];

function Validation(mid) {
  let count = 0;
  input.forEach((e) => {
    count += Math.floor(e / mid);
  });
  return count >= N;
}

function BinarySearch() {
  let start = 1;
  let end = Math.max(...input);

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (Validation(mid)) {
      start = mid + 1;
      ans.push(mid);
    } else {
      end = mid - 1;
    }
  }
  return Math.max(...ans);
}

console.log(BinarySearch());
