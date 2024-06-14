let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim();

const POLYMINO = ['AAAA', 'BB'];
let ans = [];
let flag = false;
let count = 0;

const splited_Arr = input.split('.');

for (let i = 0; i < splited_Arr.length; i++) {
  if (splited_Arr[i].length % 2 !== 0) {
    console.log('-1');
    return;
  } else {
    ans.push(splited_Arr[i].replace(/XXXX/g, POLYMINO[0]).replace(/XX/g, POLYMINO[1]));
  }

  if (i !== splited_Arr.length - 1) ans.push('.');
}

console.log(ans.join(''));
