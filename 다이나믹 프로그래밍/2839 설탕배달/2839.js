let fs = require('fs');
let filePath = process.platform == 'linux' ? '/dev/stdin' : '/input.txt';
let N = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

// dp 초기세팅
let dp = [...new Array(N + 1)].map((_) => 5000);

// 설탕 무게 디폴트는 3, 5 (3kg / 5kg 봉지 1개)
dp[3] = 1;
dp[5] = 1;

// dp 6 ~ N까지
for (let i = 6; i <= N; i++) {
  for (let j = 1; j <= Math.floor(i / 3); j++) {
    // i가 3의 배수 이거나 혹은 3의 배수로 뺀 수가 5의 배수일 경우
    if (i % 3 == 0 || (i - 3 * j) % 5 == 0) {
      dp[i] = Math.min(dp[i - 3] + 1, dp[i]);
    }
  }

  for (let j = 1; j <= Math.floor(i / 5); j++) {
    // i가 5의 배수 이거나 혹은 5의 배수로 뺀 수가 3의 배수일 경우
    if (i % 5 == 0 || (i - 5 * j) % 3 == 0) {
      dp[i] = Math.min(dp[i - 5] + 1, dp[i]);
    }
  }
}

// 초기세팅 5000 인 수는 배달 불가로 -1 출력 아니면 원래값 출력
console.log(dp[N] == 5000 ? -1 : dp[N]);
