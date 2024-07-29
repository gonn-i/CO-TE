let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let T = +input.shift();
let ans = [];
while (T > 0) {
  let [N, M] = input.shift().split(' ').map(Number);
  let count = 0;
  let A_array = [
    ...input
      .shift()
      .split(' ')
      .sort((a, b) => b - a)
      .map(Number),
  ];
  let B_array = [
    ...input
      .shift()
      .split(' ')
      .sort((a, b) => a - b)
      .map(Number),
  ];

  for (let i = 0; i < N; i++) {
    let start = 0;
    let end = B_array.length - 1;
    let temp = -Infinity;
    while (start <= end) {
      let midIdx = Math.floor((start + end) / 2);

      if (A_array[i] > B_array[midIdx]) {
        // 먹을 수 있는 경우 (A 가 더 큰 경우)
        if (midIdx > temp) temp = midIdx;
        start = midIdx + 1;
      } else {
        // 먹을 수 없는 경우 (A 가 더 작은 경우)
        end = midIdx - 1;
      }
    }
    if (temp >= 0) {
      count += temp + 1;
    } else {
      break;
    }
  }

  ans.push(count);
  T--;
}

console.log(ans.join('\n'));
