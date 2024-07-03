let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let N = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

// 1 -> 1
// 2 -> 10
// 3 -> 101 100
// 4 -> 1010 1001 1000
// 5 -> 10101 10100 10010 10001 10000
// 6 -> 101010 101001 101000 100101 100100 100010 100001 100000

let dp = [...new Array(N + 1)].map(() => [...new Array(2)]);
dp[1][0] = 0; // 0으로 끝나는 이친수
dp[1][1] = 1; // 1로 끝나는 이친수

for (let n = 2; n <= N; n++) {
  dp[n][0] = BigInt(dp[n - 1][0]) + BigInt(dp[n - 1][1]); // 0과 1 구분없이, +'0' 가능
  dp[n][1] = BigInt(dp[n - 1][0]); // 11 이 반복될 수 없기 때문에, 0 뒤에만 + '1'
}

console.log(BigInt(dp[N][0] + dp[N][1]).toString());
