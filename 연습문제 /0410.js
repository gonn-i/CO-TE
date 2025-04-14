// 자릿수 더하기
function solution(n)
{
    var ans = 0;
    let arr = n.toString().split('')

    arr.forEach((i) => ans += Number(i) )
    return ans;
}

// code version2
// function solution(n)
// {
//     var ans = 0;
    
//     const recursion = (n) => {
//         if(n  < 10) {
//             ans += n
//             return;
//         }
        
//         ans += n % 10;
//         recursion(Math.floor(n / 10));
//     }
    
//     recursion(n)
//     return ans;
// }


// 약수의 합 
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