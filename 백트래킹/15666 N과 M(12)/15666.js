let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, M] = input.shift().split(' ').map(Number);
input = input[0]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);
let nums = [];
let array = [];

function MnN(each, cnt, idx) {
  if (cnt == M) {
    let str = each.join(' ');
    nums.push(str);
    return;
  }

  for (let i = idx; i < N; i++) {
    each.push(input[i]);
    MnN(each, cnt + 1, idx++);
    each.pop();
  }
}

MnN(array, 0, 0);

let ans = new Set(nums);
ans = [...ans];
console.log(ans.join('\n'));
