const { hasSubscribers } = require('diagnostics_channel');
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let L = input.length;
let graph = [...new Array(L + 1)].map(() => []);

for (let i = 0; i < L; i++) {
  let [N, M] = input[i].split(' ').map(Number);
  graph[M].push(N);
}

let haked = 0;
let haked_Arr = [];

// dfs
for (let i = 1; i < L + 1; i++) {
  let needvisite = [];
  let visited = [];

  needvisite.push(i);
  while (needvisite.length > 0) {
    let target = needvisite.shift();
    if (!visited.includes(target)) {
      visited.push(target);
      needvisite = [...needvisite, ...graph[target].sort((a, b) => a - b)];
    }
  }
  haked_Arr.push(visited.length);
}

let max = Math.max(...haked_Arr);
let ans = [];

for (let i = 0; i < haked_Arr.length; i++) {
  if (haked_Arr[i] == max) {
    ans.push(i + 1);
  }
}

console.log(ans.join(' '));
