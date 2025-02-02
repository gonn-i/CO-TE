let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, K] = input[0].split(' ').map(Number);
let S = input[1].split('');

// 브루투포스 시간초과
// function reverse(i) {
//   for (j = 0; j < Math.floor(K / 2); j++) {
//     let tail = i + j;
//     let head = i - j - (K - 1);
//     if (tail > head) {
//       [S[tail], S[head]] = [S[head], S[tail]];
//     }
//   }
// }

const ans = S.slice(K - 1, N);
const front = S.slice(0, K - 1);

if (K == 1) {
  console.log(S.join(''));
} else if ((N - K + 1) % 2 == 1) {
  ans.push(...front.reverse());
  console.log(ans.join(''));
} else {
  ans.push(...front);
  console.log(ans.join(''));
}
