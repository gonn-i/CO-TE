let fs = require('fs');
let filePath = process.platform == 'linux' ? '/dev/stdin' : '/input.txt';
let [N, ...input] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let nums = input[0].split(' ').map(Number);

nums.sort((a, b) => a - b);

let best = Infinity;
let ans = 0;
//모든 집까지의 거리가 가장 이상적인 경우를 판별하고 best를 갱신 & ans에 중간값 저장
function isBest(m) {
  let temp = 0;
  nums.map((e) => {
    temp += Math.abs(e - m);
  });
  if (best > temp) {
    best = temp;
    ans = m;
  }
  return best > temp;
}

let start = 0;
let end = nums.length - 1;
// 이분탐색 진행
while (start <= end) {
  let mid = Math.floor((start + end) / 2);
  if (isBest(nums[mid])) {
    end = mid - 1; // 탐색범위 end 수정
  } else {
    start = mid + 1; // 탐색범위 start 수정
  }
}

console.log(ans);
