let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
let Connected = +input.shift();

let visited = [];
let needVisite = [];
let computers = [];
let count = 0;
input.sort();

// 이중배열로 만들기
for (let i = 0; i < Connected; i++) {
  computers[i] = input[i].split(' ').map(Number);
}

needVisite.push(1); // 초기 감염된 컴퓨터

// BFS
while (needVisite.length !== 0) {
  let target = needVisite.shift();
  if (!visited.includes(target)) {
    visited.push(target);
    count++;
    for (let i = 0; i < computers.length; i++) {
      if (computers[i][0] == target) {
        needVisite.push(computers[i][1]);
      }
      if (computers[i][1] == target) {
        needVisite.push(computers[i][0]);
      }
    }
  }
}
console.log(count - 1);
