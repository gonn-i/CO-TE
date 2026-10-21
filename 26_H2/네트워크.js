// 19m 40s
function solution(n, computers) {
    let arr = Array.from({length: n}, () => []);
    let visited = Array.from({length: n}).fill(false)
    let ans = 0;
    
    for(let i = 0; i < n; i++){
        for(let j =0; j < n; j++){
            if(computers[i][j] === 1 && i !== j){
                arr[i] = [...arr[i], j]
            }
        }
    }
    
    for(let i =0; i < n; i++){
        if(visited[i]) continue
        let needToVisite = [i];
        let idx = 0;
        visited[i] = true;
        
        while(needToVisite.length > idx){
            let from = needToVisite[idx++];
            arr[from].forEach((com) => {
                if(visited[com] === false) {
                    needToVisite.push(com)
                    visited[com] = true;
                } 
            })
        }
        ans++
        
    }
    
    
    return (ans)
}