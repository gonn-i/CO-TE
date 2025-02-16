function solution(number, k) {
  let nums = number.split('');
  let stack_arr = [];

  // nums 배열을 하나씩 돌며 진행
  for (let num of nums) {
    // stack이 텅빈 경우 / 제거해야 하는 횟수 k가 양수 / 스택 안보다 더큰 수 num을 만난 경우 => 스택.pop
    while (k > 0 && stack_arr.length > 0 && stack_arr[stack_arr.length - 1] < num) {
      stack_arr.pop();
      k--;
    }
    stack_arr.push(num);
  }

  //nums 는 다 돌았지만, k가 0이 아닐 경우 처리
  while (k > 0) {
    stack_arr.pop();
    k--;
  }

  return stack_arr.join('');
}
