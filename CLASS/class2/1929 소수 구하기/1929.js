let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [M, N] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

let ans = [];
let isPrime = [...new Array(N + 1).fill(true)];
isPrime[0] = isPrime[1] = false;
for (let i = 2; i * i <= N; i++) {
  if (isPrime[i]) {
    for (let p = i * i; p <= N; p += i) {
      isPrime[p] = false;
    }
  }
}

for (let i = M; i <= N; i++) {
  if (isPrime[i]) {
    ans.push(i);
  }
}

console.log(ans.join('\n'));
