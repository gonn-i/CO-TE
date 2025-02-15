function solution(brown, yellow) {
  var answer = [];
  for (let x = 1; x <= Math.sqrt(yellow); x++) {
    let y = yellow / x;
    if (Number.isInteger(y) && (y + 2) * (x + 2) === brown + yellow) {
      answer.push(y + 2, x + 2);
    }
  }
  return answer;
}
