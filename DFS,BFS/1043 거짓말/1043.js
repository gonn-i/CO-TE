let fs = require('fs');
const { arrayBuffer } = require('stream/consumers');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let [N, M] = input[0].split(' ').map(Number);
let [know_num, ...know_Arr] = input[1].split(' ').map(Number);
let ans = 0;

let graph = Array.from({ length: N + 1 }, () => []);

for (let i = 2; i < 2 + M; i++) {
  let [num, ...Arr] = input[i].split(' ').map(Number);
  for (let j = 0; j < num; j++) {
    graph[Arr[j]].push(...Arr.filter((x) => x !== Arr[j]));
  }
}

let needToVisite = [...know_Arr];
let know_Set = new Set(know_Arr);
let needToVisite_Set = new Set(needToVisite);

while (needToVisite.length >= 1) {
  let target = needToVisite.pop();
  let temp = graph[target];

  if (temp) {
    temp.forEach((e) => {
      if (!know_Set.has(e) && !needToVisite_Set.has(e)) {
        needToVisite.push(e);
        know_Arr.push(e);
        know_Set.add(e);
        needToVisite_Set.add(e);
      }
    });
  }
}

for (let i = 2; i < 2 + M; i++) {
  let [num, ...Arr] = input[i].split(' ').map(Number);
  let flag = false;
  for (let j = 0; j < num; j++) {
    if (know_Arr.includes(Arr[j])) {
      flag = true;
    }

    if (flag) break;
  }
  if (!flag) ans++;
}

console.log(ans);
