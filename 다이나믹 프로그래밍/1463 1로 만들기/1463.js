let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let N = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

let turns = [];
let turn = 0;

function recursion(n) {
  if (n == 1) {
    turns.push(turn);
    return;
  }

  if (n % 3 == 0 && n % 2 == 0) {
    recursion(n / 3, turn++);
    recursion(n / 2, turn++);
  }
  if (n % 3 == 1 && n % 2 == 1) {
    recursion((n - 1) / 3, (turn += 2));
    recursion((n - 1) / 2, (turn += 2));
  }
  if (n % 3 == 0) recursion(n / 3, turn++);
  if (n % 2 == 0) recursion(n / 2, turn++);
  if (n % 3 == 1) {
    recursion((n - 1) / 3, (turn += 2));
  }
  if (n % 2 == 1) {
    recursion((n - 1) / 2, (turn += 2));
  }
}

recursion(N);
console.log(turns);
