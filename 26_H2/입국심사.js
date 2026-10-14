// 27m
function solution(n, times) {
    let min = 1
    let max = Math.max(...times) * n
    let ans = Infinity
    
    while(min <= max){
        let mid = Math.floor((max + min) /2)
        
        let count = 0;
        for(let time of times){
            count += Math.floor(mid / time)
        }
        
        if(count >= n) {
            max = mid -1
            ans = Math.min(mid, ans)
        }
        else min = mid +1
        
    }
    
    return ans
}