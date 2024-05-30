let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let NUM = +input.shift();
let input_Arr = [];
let strike = [];
let ball = [];

for (let i = 0; i < NUM; i++) {
  input_Arr[i] = input[i].split(' ');
}

console.log(input_Arr);

// for (let i = 0; i < NUM; i++) {
//   let [qes, S, B] = input[i].split(' ');
//   let [n1, n2, n3] = qes.split('');
//   if (i !== NUM - 1) {
//     let next_qes = input[i].split(' ')[0];
//   }
// }
