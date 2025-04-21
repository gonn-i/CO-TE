function solution(N, stages) {
  let sorted_stages = stages.sort((a, b) => a - b);
  let challenging_user = sorted_stages.length;

  let cmp = 1;
  let failure_rate = [];
  let count = 0;
  let ans = [];
  let idx = 0;

  while (challenging_user >= 1) {
    if (cmp == sorted_stages[idx]) {
      count += 1;
      idx++;
    }

    if (cmp !== sorted_stages[idx]) {
      console.log(cmp, sorted_stages[idx], count, challenging_user);
      if (N + 1 === cmp) break;
      failure_rate.push([count / challenging_user, cmp]);
      challenging_user -= count;
      count = 0;
      cmp++;
    }
  }

  for (let i = cmp; i <= N; i++) {
    failure_rate.push([0, i]);
  }

  failure_rate
    .sort((a, b) => {
      if (b[0] === a[0]) return a[1] - b[1];
      return b[0] - a[0];
    })
    .forEach((e) => ans.push(e[1]));
  return ans;
}
