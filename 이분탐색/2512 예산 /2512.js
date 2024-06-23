let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
let TOTAL = +input.pop();
let arr = [];

arr = input[0].split(' ').map(Number);

arr.sort((a, b) => a - b);

function IsOverLimit(limit) {
  let sum = 0;
  for (let i = 0; i < N; i++) {
    if (arr[i] > limit) sum += limit;
    else sum += arr[i];
  }
  return sum <= TOTAL;
}

function binarySearch() {
  start = 0;
  end = arr[N - 1];
  let result = 0;

  while (start <= end) {
    mid = parseInt((start + end) / 2);
    if (IsOverLimit(mid)) {
      result = mid;
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return result;
}
console.log(binarySearch());
