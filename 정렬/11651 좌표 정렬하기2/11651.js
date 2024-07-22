let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

const N = +input.shift();
let coordinate = [];
coordinate.push(...input.map((e) => e.split(' ').map(Number)));

coordinate.sort((a, b) => {
  if (a[1] === b[1]) {
    return a[0] - b[0];
  } else {
    return a[1] - b[1];
  }
});

let ans = [];
coordinate.forEach((e) => {
  let [x, y] = e;
  ans.push(`${x} ${y}`);
});

console.log(ans.join('\n'));
