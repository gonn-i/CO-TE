let fs = require('fs');
let filePath = process.platform == 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input.shift();
let nums = [];
nums = input[0].split(' ').map(Number);
let combine = [];

nums.sort((a, b) => a - b);
start = 0;
end = nums.length - 1;

while (start < end) {
  mid = nums[end] + nums[start];

  if (closer(start, end, mid)) {
    end -= 1;
  } else {
    start += 1;
  }
}

function closer(s, e, m) {
  if (combine.length == 0) {
    combine.push([s, e, Math.abs(m)]);
  } else {
    if (combine[0][2] > Math.abs(m)) {
      combine.pop();
      combine.push([s, e, Math.abs(m)]);
    }
  }

  return m > 0;
}
let [s, e, m] = combine[0];
console.log(nums[s], nums[e]);
