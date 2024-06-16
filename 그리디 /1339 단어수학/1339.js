let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
let Arr = [];
let num = 9;
let each_value = {};
let ans = 0;

for (let i = 0; i < N; i++) {
  Arr[i] = input[i].split('');
  let next = 0;
  for (let j = 0; j < Arr[i].length; j++) {
    if (each_value[Arr[i][j]] == undefined) {
      each_value[Arr[i][j]] = 10 ** (Arr[i].length - 1 - next);
    } else {
      each_value[Arr[i][j]] += 10 ** (Arr[i].length - 1 - next);
    }
    next++;
  }
}

// console.log(each_value);

each_value = Object.entries(each_value).sort(([, a], [, b]) => b - a);

each_value.forEach((e) => {
  e[1] = num;
  num--;
});
// [[ 'A', 9 ],[ 'C', 8 ],[ 'D', 7 ],[ 'G', 6 ],[ 'E', 5 ],[ 'F', 4 ],[ 'B', 3 ]]

each_value = each_value.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
// { A: 9, C: 8, D: 7, G: 6, E: 5, F: 4, B: 3 }

for (let i = 0; i < N; i++) {
  next = 0;
  for (let j = 0; j < Arr[i].length; j++) {
    let unit = 10 ** (Arr[i].length - 1 - next);
    ans += unit * each_value[Arr[i][j]];
    next++;
  }
}

console.log(ans);
