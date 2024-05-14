let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

const Test = +input.shift();

for (let i = 0; i < Test; i++) {
  let [M, N, K] = input.shift().split(' ').map(Number);
  let planted = [];
  let ans = 0;

  // 배추가 심어진 부분 x,y 좌표로 기록 (이중배열로)
  for (let j = 0; j < K; j++) {
    planted.push(input[j].split(' ').map(Number));
  }
  // console.log(planted);
  // console.log(planted.length);

  while (planted.length > 0) {
    let visited = [];
    let needViste = [];
    needViste.push(planted.shift());

    while (needViste.length > 0) {
      let target = needViste.shift();
      if (!visited.includes(target)) {
        visited.push(target);
        for (let j = 0; j < planted.length; j++) {
          if (
            (planted[j][0] === target[0] + 1 && planted[j][1] == target[1]) ||
            (planted[j][0] === target[0] - 1 && planted[j][1] == target[1])
          ) {
            needViste.push(planted[j]);
            // console.log('인접!');
            // console.log(needViste);
            planted.splice(j, 1);
            j--;
          } // 위에 행끼리 인접한 경우는 if, 열끼리 인접한 경우는 else if에 걸림
          else if (
            (planted[j][1] == target[1] + 1 && planted[j][0] == target[0]) ||
            (planted[j][1] == target[1] - 1 && planted[j][0] == target[0])
          ) {
            needViste.push(planted[j]);
            // console.log('인접!');
            // console.log(needViste);
            planted.splice(j, 1);
            j--;
          }
        }
      }
    }
    // console.log('옹기종기스');
    // console.log(visited);
    ans++;
  }
  console.log(ans);
  input = input.slice(K);
}
