function solution(maps) {
  let n = maps.length;
  let m = maps[0].length;
  let ans = -1;

  let needToVisite = [];
  let visited = Array.from({ length: n }, () => Array(m).fill(false));
  let moves = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];

  needToVisite.push([0, 0, 1]);
  visited[0][0] = true;

  while (needToVisite.length >= 1) {
    let [x, y, time] = needToVisite.shift();
    if (x == n - 1 && y == m - 1) {
      ans = time;
      break;
    }
    for (let i = 0; i < 4; i++) {
      let next_x = x + moves[i][0];
      let next_y = y + moves[i][1];

      if (next_x >= 0 && next_x < n && next_y >= 0 && next_y < m) {
        if (maps[next_x][next_y] == 1 && !visited[next_x][next_y]) {
          needToVisite.push([next_x, next_y, time + 1]);
          visited[next_x][next_y] = true;
        }
      }
    }
  }
  return ans;
}
