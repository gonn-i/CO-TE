let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
let arr_N = input.shift().split(' ').map(Number);
let M = +input.shift();
let arr_M = input.shift().split(' ').map(Number);

let ans = [];

arr_N.sort((a, b) => a - b);

function BinarySearch(num) {
  let start = 0;
  let end = N - 1;

  while (start <= end) {
    let mid = parseInt((start + end) / 2);

    if (arr_N[mid] == num) {
      ans.push(1);
      return;
    } else if (arr_N[mid] < num) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  ans.push(0);
}

arr_M.forEach((e) => {
  BinarySearch(e);
});

console.log(ans.join(' '));
