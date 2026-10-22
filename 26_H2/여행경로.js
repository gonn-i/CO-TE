// 43m
function solution(tickets) {
    let tickets_len = tickets.length
    let visited = Array.from({length: tickets_len }).fill(false)
    let needTovisite = ["ICN"];
    let ans = []
    
    tickets.sort((a,b) =>{
        if(a[0] === b[0]) return a[1].localeCompare(b[1])
        return a[0].localeCompare(b[0])
    })
    
    function DFS (from, num) {
        if(num === tickets_len) {
            ans = [...needTovisite];
            return;
        }
        
        if(ans.length > 0 ) return
        
        for(let i =0; i < tickets_len; i++){
            let [start, end] = tickets[i] 
            
            if(visited[i]) continue
            if(from !== start) continue
            
            needTovisite.push(end)
            visited[i] = true
            DFS(end, num+1)
                        
            needTovisite.pop()
            visited[i] = false
        }
    }
    
    DFS("ICN", 0)
    
    return ans
}