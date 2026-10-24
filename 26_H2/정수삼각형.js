// 15m 23s
function solution(triangle) {
    let h = triangle.length
    let dp = Array.from({length: h+1}, () => [])
    
    for(let i=0; i < triangle[h-1].length; i++){
        dp[h].push(triangle[h-1][i])
    }
    
    for(let i = h-1; i > 0; i--){
        for(let j=0; j < triangle[i-1].length; j++){
            dp[i][j] = triangle[i-1][j] + Math.max(dp[i+1][j], dp[i+1][j+1])
        }
    }
    return (dp[1][0])
}