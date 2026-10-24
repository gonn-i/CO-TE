// 14m 5s
function solution(n, edge) {
    let arr = Array.from({length: n}, () => []);
    let visited = Array.from({length: n}).fill(false);
    let needTovisite = [[0,0]]
    let idx = 0
    let max_far = 0;
    let ans = 0
    
    edge.forEach((ln) => {
        let [v1, v2] = ln.map(Number)
        
        arr[v1-1].push(v2-1)
        arr[v2-1].push(v1-1)
    })
    
    visited[0] = true;
    
    while(needTovisite.length > idx){
        let [from, cnt] = needTovisite[idx++];
        
        max_far = Math.max(max_far, cnt)
        
        for(let i =0; i < arr[from].length; i++){
            let to = arr[from][i]
            if(visited[to]) continue
            
            needTovisite.push([to, cnt+1])
            visited[to] = true;
        }
    }
    
    needTovisite.forEach((node) => {
        if(node[1] === max_far) ans++
    })
    
    return ans
}