const { createDiffieHellmanGroup } = require('crypto');
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = +fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

function pibo(n) {
  if (n == 0) {
    return 0;
  }
  if (n == 1) {
    return 1;
  }
  return pibo(n - 1) + pibo(n - 2);
}
console.log(pibo(input));
