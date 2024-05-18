let fs = require('fs');
let filePath = process.platform == 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, K] = input[0].split(' ').map(Number); // 수빈위치, 언니위치

let visited = Array(100001).fill(false); // 방문 체크용
let queue = [];

let current = [N, 0]; // 수빈이의 현재 위치, t

queue.push(current);
visited[N] = true;

while (queue.length > 0) {
  let [x, t] = queue.shift();
  if (x == K) {
    console.log(t);
    break;
  }

  for (let moving of [x - 1, x + 1, x * 2]) {
    if (!visited[moving] && moving >= 0 && moving < visited.length) {
      queue.push([moving, t + 1]);
      visited[moving] = true;
    }
  }
}
