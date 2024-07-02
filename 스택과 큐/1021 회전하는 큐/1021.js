let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

const [N, M] = input.shift().split(' ').map(Number);
let target = [...input[0].split(' ').map(Number)];
let Queue = [...new Array(N)].map((_, i) => i + 1);
let count = 0;

while (target.length >= 1) {
  let targetIdx = Queue.indexOf(target[0]);

  if (targetIdx <= parseInt((Queue.length - 1) / 2)) {
    while (target[0] !== Queue[0]) {
      Queue.push(Queue.shift());
      count++;
    }
  } else {
    while (target[0] !== Queue[0]) {
      Queue.unshift(Queue.pop());
      count++;
    }
  }
  target.shift();
  Queue.shift();
}

console.log(count);
