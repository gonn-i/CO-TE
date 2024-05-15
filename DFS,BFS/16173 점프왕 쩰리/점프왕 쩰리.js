let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
let map = input.map((e) => e.split(' ').map(Number)); // 이중배열 만들기
let visited = [];
let needvisite = [];

// dfs 풀이 (스택사용)
// needvisite.push([0, 0]);

// while (needvisite.length > 0) {
//   let target = needvisite.shift();
//   let [row, col] = target;
//   let move = map[row][col];

//   if (move == -1) {
//     console.log('HaruHaru');
//     return;
//   }
//   if (move == 0) {
//     console.log('Hing');
//     return;
//   }
//   if (!visited.includes(target)) {
//     if (row + move < N || col + move < N) {
//       visited.push([row, col]);
//       if (row + move < N) {
//         needvisite.unshift([row + move, col]);
//       }
//       if (col + move < N) {
//         needvisite.unshift([row, col + move]);
//       }
//     }
//   }
// }
// console.log('Hing');

// 재귀 풀이
//현재 위치 (열, 행)
let row = 0;
let col = 0;

function DFS(row, col) {
  let move = map[row][col]; // 이동해야 하는 수
  // console.log(row, col, move);
  if (move === -1) {
    return true;
  }

  if (move === 0) {
    return false;
  }

  if (row + move < N) {
    let e = DFS(row + move, col);
    if (e) {
      return true;
    }
  }

  if (col + move < N) {
    let e = DFS(row, col + move);
    if (e) {
      return true;
    }
  }
  return false;
}

console.log(DFS(row, col) ? 'HaruHaru' : 'Hing');
