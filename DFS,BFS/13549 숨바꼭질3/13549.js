let fs = require('fs');
let filePath = process.platform == 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, K] = input[0].split(' ').map(Number);

let queue = []; //bfs
let visited = new Array(100001).fill(0); // 방문여부 체크용

let current = [N, 0]; //수빈위치, 시간

queue.push(current);
visited[N] = true;

// 최단시간 계산용
while (queue.length > 0) {
  // console.log(queue);
  let [x, t] = queue.shift();

  let choice = [x * 2, x - 1, x + 1]; // 순간이동/ 뒤로 / 앞으로 (순서중요 )
  if (x == K) {
    console.log(t);
    break;
  }
  for (let i = 0; i < 3; i++) {
    if (choice[i] >= 0 && choice[i] < 100001 && !visited[choice[i]]) {
      if (i == 0) {
        // 순간이동의 경우, 시간 동결
        queue.push([choice[i], t]);
        visited[choice[i]] = true;
      } else {
        // 나머지의 경우, 시간 +1
        queue.push([choice[i], t + 1]);
        visited[choice[i]] = true;
      }
    }
  }
}
