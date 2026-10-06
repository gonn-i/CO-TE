// 1h 
function solution(places) {
    let ans = [];
    
    places.forEach((pl) => {
        if(check(pl)) ans.push(1) // 거리두기가 잘 된 경우 
        else ans.push(0) // 그렇지 않는 경우 
    })
    
    return ans 
    
    function check (pl) {
        let office = []; 
        
        pl.forEach((ln) => {
            office.push(ln.split(''))
        })
        
        for(let i=0; i < 5; i++){
            for(let j=0; j <5; j++){
                if(office[i][j] === 'P') {
                    // 거리두기가 제대로 되지 않는 경우 
                    if(recursion(office, i, j)) return false 
                }
            }
        }
        return true
    }
    
    function recursion (office, r, c) {
        let needToVisite = [];
        let visited = Array.from({length : 5}, () => Array.from({length: 5}).fill(false))
        let moves = [
            [0, -1],
            [0, 1],
            [-1, 0],
            [1,0]
        ]
        
        let idx = 0;
        needToVisite.push([r,c]);
        visited[r][c] = true;
        
        while(needToVisite.length > idx){
            let [x,y] = needToVisite[idx++];
            
            let distance = Math.abs(x-r) + Math.abs(y-c)
            
            if(distance >= 2) continue;
            
            for(let move of moves){
                let next_x = x + move[0]
                let next_y = y + move[1]
                
                if(next_x >=0 && next_x < 5 && next_y >= 0 && next_y < 5){
                        if(visited[next_x][next_y]) continue;
                        
                        if(office[next_x][next_y] === 'X') continue;
                        
                        if(office[next_x][next_y] === 'P') return true
                        
                        needToVisite.push([next_x, next_y])
                        visited[next_x][next_y] = true;
            
                }
            }
        }
        return false 
    }
}
