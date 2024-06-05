let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
let map = [];
let sum_Arr = [];

let dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]; // 상하좌우

for (let i = 0; i < N; i++) {
  map[i] = input[i].split(' ').map(Number);
}
let combination = [];

function dfs(x, y, sum, cnt) {
  if (cnt == 3)
    dir.forEach((d) => {
      let nx = i + d[0];
      let ny = j + d[1];

      if (nx > 0 && nx < N && ny > 0 && ny < N) {
        sum += map[nx][ny];
      }
    });
  sum_Arr.push([i, j, sum]);
}

dfs(1, 1, map[1][1], 0);

// for (let i = 1; i < N - 1; i++) {
//   for (let j = 1; j < N - 1; j++) {
//     sum = map[i][j];
//     dir.forEach((d) => {
//       let nx = i + d[0];
//       let ny = j + d[1];

//       sum += map[nx][ny];
//     });
//     sum_Arr.push([i, j, sum]);
//   }
// }

// for (let i = 0; i < sum_Arr.length; i++) {
//   for (let j = i + 1; j < sum_Arr.length; j++) {
//     if (
//       (sum_Arr[j][0] !== sum_Arr[i][0] && sum_Arr[j][1] !== sum_Arr[i][1]) ||
//       Math.abs(sum_Arr[j][0] - sum_Arr[i][0]) > 2 ||
//       Math.abs(sum_Arr[j][1] - sum_Arr[i][1]) > 2
//     ) {
//       for (let k = j + 1; k < sum_Arr.length; k++) {
//         sum = sum_Arr[j][2] + sum_Arr[i][2];
//         if (
//           (sum_Arr[j][0] !== sum_Arr[k][0] && sum_Arr[j][1] !== sum_Arr[k][1]) ||
//           Math.abs(sum_Arr[k][0] - sum_Arr[j][0]) > 2 ||
//           Math.abs(sum_Arr[k][1] - sum_Arr[j][1]) > 2
//         ) {
//           if (
//             (sum_Arr[k][0] !== sum_Arr[i][0] && sum_Arr[k][1] !== sum_Arr[i][1]) ||
//             Math.abs(sum_Arr[k][0] - sum_Arr[i][0]) > 2 ||
//             Math.abs(sum_Arr[k][1] - sum_Arr[i][1]) > 2
//           ) {
//             sum += sum_Arr[k][2];
//             combination.push(sum);
//           }
//         }
//       }
//     }
//   }
// }

// console.log(Math.min(...combination));
