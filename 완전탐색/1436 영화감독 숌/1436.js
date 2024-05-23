let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

let order = 1;
let serise = '666';

function Naming(end) {
  while (1) {
    if (serise.toString().includes('666')) {
      if (order == end) {
        return serise;
      }
      order++;
    }
    serise++;
  }
}

console.log(Naming(input));
