let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [E, S, M] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);
let i = 0;

// 1 ≤ E ≤ 15, 1 ≤ S ≤ 28, 1 ≤ M ≤ 19
while (1) {
  let year = 28 * i + S; // 주기가 가장 큰 태양을 이용하면 반복문을 덜 돌 수 있음
  if ((year - E) % 15 == 0 && (year - M) % 19 == 0) {
    // E S M 은 나머지와 마찬가지. (주기 * 몫 + 나머지는 년도 임을 기반으로, 역산을 생각하면 된다.)
    console.log(year);
    break;
  }
  i++;
}

// # import sys
// # E,S,M = map(int,sys.stdin.readline().split(' '))

// # i = 0

// # while (1) :
// #   year = 28 * i + S
// #   if ((year- E) % 15 == 0 and (year- M) % 19 == 0) :
// #     print(year)
// #     break

// #   i+=1
