let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
let map = [];

// 이중배열로 지도 만들어주기
for (let i = 0; i < N; i++) {
  let column = input[i].split(' ').map(Number);
  map.push(column);
}
//현재 위치 (열, 행)
let row = 0;
let col = 0;

// function DFS(row, col) {
//   let move = map[row][col]; // 이동해야 하는 수
//   console.log(row, col, move);
//   if (move === -1) {
//     return true;
//   }

//   if (move === 0) {
//     return false;
//   }

//   if (row + move < N) {
//     let e = DFS(row + move, col);
//     if (e) {
//       return true;
//     }
//   }

//   if (col + move < N) {
//     let e = DFS(row, col + move);
//     if (e) {
//       return true;
//     }
//   }
//   return false;
// }

console.log(DFS(row, col) ? 'HaruHaru' : 'Hing');
