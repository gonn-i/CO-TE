// (1) 자연수 뒤집어 배열
function solution(n) {
  let temp, ans = [];
  
  temp = n.toString().split('').map(Number);
  temp.forEach((e)=> ans.unshift(e))
  return ans;
}

// 다른 풀이
// function solution(n) {
//   let ans = [];
  
//   const recursion = (n) => {
//       if(n <= 9) {
//           ans.push(n);
//           return
//       }
      
//       ans.push(n % 10);
//       recursion(Math.floor(n /10))
//   }
  
//   recursion(n)
//   return ans;
// }

// (2) 짝수와 홀수 
function solution(num) {
  var answer = ['Even', 'Odd'];
  
  return answer[Math.abs(num) % 2];
}

// (3) x 만큼 간격이 있는 N개의 숫자
function solution(x, n) {
  var ans = [];
  let num = x;
  
  for(n; n > 0; n--){
      ans.push(num);
      num += x
  }
  return ans
}

// (4) 평균구하기
function solution(arr) {
  let ans = 0;
  ans = arr.reduce((i,sum)=> sum += i)
  return (ans / arr.length)
}

// (5) 나머지가 1이되는 수 찾기 
function solution(n) {
  let ans = []
  for(let i =1; i <= Math.sqrt(n-1); i++){
      if( (n-1) % i === 0) {
          if(i !== 1) ans.push(i);
          ans.push((n-1) / i);
      }
  }
  
  return Math.min(...ans) 
}