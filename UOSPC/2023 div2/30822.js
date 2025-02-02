let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let [n, S] = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let countArr = [...new Array(5)].fill(0);

for (i = 0; i < +n; i++) {
  let letter = S[i];

  switch (letter) {
    case 'u':
      countArr[0]++;
      break;
    case 'o':
      countArr[1]++;
      break;
    case 's':
      countArr[2]++;
      break;
    case 'p':
      countArr[3]++;
      break;
    case 'c':
      countArr[4]++;
      break;
  }
}

console.log(Math.min(...countArr));
