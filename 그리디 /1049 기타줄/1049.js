let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, M] = input.shift().split(' ').map(Number);
let price = 0;
let ways = [];

let each_price = [];
let package_price = [];

for (let i = 0; i < M; i++) {
  [package_price[i], each_price[i]] = input[i].split(' ').map(Number);
}

let package_min = Math.min(...package_price);
let each_min = Math.min(...each_price);

ways.push(each_min * N); // 낱개로만 해결

if (N >= 6) {
  price += package_min * Math.floor(N / 6);
  N %= 6;
}

if (N > 0) {
  ways.push(price + package_min); // 6의 배수가 아닌 경우, 패키지 추가 구입
  ways.push(price + each_min * N); // 6의 배수가 아닌 경우, 낱개 추가 구입
} else {
  ways.push(price); // 6의 배수일 경우, 패키지로만 해결
}

console.log(Math.min(...ways));
