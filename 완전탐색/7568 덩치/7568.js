let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift(); // 사람수
let people = new Array(N);
let rank = []; // 등수 저장용 배열

for (let i = 0; i < N; i++) {
  // 입력값 이중배열로 저장
  people[i] = input[i].split(' ').map(Number);
}

// 이중 for문을 통해 비교대상과 나머지와의 몸무게와, 키 비교 후 덩치가 있는 경우 count++
for (let i = 0; i < N; i++) {
  let count = 0;
  for (let j = 0; j < N; j++) {
    if (i == j) continue;
    else if (people[i][0] < people[j][0] && people[i][1] < people[j][1]) {
      count++;
    }
  }
  rank.push(count + 1); // 나보다 덩치 +1 이 순위 (공동순위 가능)
}

console.log(rank.join(' '));
