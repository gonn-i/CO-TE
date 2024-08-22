let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [A, nums] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

nums = nums.split(' ').map(Number);
let dp = [...new Array(+A + 1)].fill(0);

dp[0] = 1;
let ans = 0;

for (let i = 1; i < nums.length; i++) {
  let max = 0;
  for (let j = i - 1; j >= 0; j--) {
    if (nums[i] < nums[j] && dp[j] > max) {
      max = dp[j];
    }
  }
  dp[i] = max + 1;
  ans = Math.max(dp[i], ans);
}

console.log(ans);
