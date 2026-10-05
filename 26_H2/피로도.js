// 35m
function solution(k, dungeons) {
    let result_arr = []
    let visited = Array.from({length: dungeons.length}).fill(false)
    
    function dfs (k, cnt) {
        result_arr.push(cnt)
        
        for(let i = 0; i< dungeons.length; i++){
            if(k >= dungeons[i][0] && !visited[i]){
                visited[i] = true;
                
                dfs(k-dungeons[i][1], cnt+1)
                visited[i] = false 
            }  
        }
    }
    
    
    dfs(k, 0, 0)
    
    return (Math.max(...result_arr))
}