function solution(n) {
  var ans = 0;
  let idx = 1;
  while(idx <= n){
      if(n % idx === 0) ans += idx
      idx++;
  }
  return ans;
}

// code version2 
function solution(n) {
  var ans = 0;
  for(let i =1; i <= Math.sqrt(n); i++){
      if(n % i === 0){ 
          ans += n/i + i;
      }
  }
  return ans;
}