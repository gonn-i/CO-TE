function solution(n) {
  let temp, ans = [];
  
  temp = n.toString().split('').map(Number);
  temp.forEach((e)=> ans.unshift(e))
  return ans;
}

// 다른 풀이
function solution(n) {
  let ans = [];
  
  const recursion = (n) => {
      if(n <= 9) {
          ans.push(n);
          return
      }
      
      ans.push(n % 10);
      recursion(Math.floor(n /10))
  }
  
  recursion(n)
  return ans;
}