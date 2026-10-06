function solution(maps) {
    let moves = [
        [0,-1],
        [0,1],
        [-1,0],
        [1,0]
    ]
    
    let ans = -1;
    let row = maps[0].length
    let col = maps.length
    let need_to_visite = [];
    let visited = Array.from({length: col}, () => Array.from({length: row}).fill(false))
    
    // 시작점 
    let idx = 0;
    need_to_visite.push([0,0,0]);
    visited[0][0] = true;
    
    while(need_to_visite.length > idx){
        let [x,y,cnt] = need_to_visite[idx++];
        
        if(x === col-1 && y === row-1) return cnt+1
        
        for(let move of moves ){
            let next_x = x + move[0];
            let next_y = y + move[1];
            
            if(next_x >=0 && next_x < col && next_y >=0 && next_y < row){
                if(!visited[next_x][next_y] && maps[next_x][next_y] == 1){
                    need_to_visite.push([next_x, next_y, cnt+1]);
                    visited[next_x][next_y] = true;
                }
            }
            
        }
    }
    
    return -1;
}