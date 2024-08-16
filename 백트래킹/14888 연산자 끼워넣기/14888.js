let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [N, Nums, ...array] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

Nums = Nums.split(' ').map(Number);
array = array[0].split(' ').map(Number);

let sums = [];

function calculate(idx, sum) {
  if (idx == N) {
    sums.push(Object.is(sum, -0) ? 0 : sum);
    return;
  }

  for (let j = 0; j < 4; j++) {
    if (array[j] > 0) {
      array[j] -= 1;
      switch (j) {
        case 0:
          calculate(idx + 1, sum + Nums[idx]);
          break;
        case 1:
          calculate(idx + 1, sum - Nums[idx]);
          break;
        case 2:
          calculate(idx + 1, sum * Nums[idx]);
          break;
        case 3:
          calculate(idx + 1, Math.trunc(sum / Nums[idx]));
          break;
      }
      array[j] += 1;
    }
  }
}

calculate(1, Nums[0]);
console.log(Math.max(...sums));
console.log(Math.min(...sums));
