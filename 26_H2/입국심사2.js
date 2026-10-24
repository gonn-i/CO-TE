function solution(n, times) {
    let start = 1
    let end = Math.max(...times) * n // 젤 오래 * 명수 -> 최장 t
    let ans = Infinity
    
    function simulation (total_t) {
        let done_cnt = 0
        
        times.forEach((t) => {
             done_cnt += Math.floor(total_t / t)
        })
        
        return done_cnt
    }
    
    while(end >= start){
        let mid = Math.floor((start + end) / 2)
        
        if(simulation(mid) >= n){
            end = mid - 1
            ans = Math.min(ans, mid)
        } else {
            start = mid + 1
        }
    }
    
    return ans
}