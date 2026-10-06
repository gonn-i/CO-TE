function solution(maps) {
    let map_arr = [];
    let moves = [
        [-1,0],
        [1,0],
        [0,-1],
        [0,1]
    ]
    
    let lever_pos = []
    
    maps.forEach((ln) => {
        map_arr.push(ln.split(''))
    })
    
    let row = map_arr.length
    let col = map_arr[0].length
    
    // 시작점 찾기 
    for(let i =0; i< row; i++){
        for(let j =0; j < col; j++){
            if(map_arr[i][j] === 'S') {
                let toLeverCnt = findTarget(i,j, 'L')
                if(toLeverCnt === -1) return -1;
                let toExitCnt = findTarget (lever_pos[0], lever_pos[1], 'E') 
                if( toExitCnt === -1) return -1
                return toExitCnt + toLeverCnt
            }
        }
    }
    
    // 레버까지 찾기 
    function findTarget(i, j, target) {
        
        let count = 0;
        let needToVisite = [];
        let visited = Array.from({length: row}, () => Array.from({length: col}).fill(false))
        
        let idx = 0;
        needToVisite.push([i,j,0])
        visited[i][j] = true;
        
        while(needToVisite.length > idx){
            let [x,y,cnt] = needToVisite[idx++];
            
            
            for(let move of moves) {
                let next_x = x + move[0]
                let next_y = y + move[1]
                
                
                if(next_x >= 0 && next_x < row && next_y >=0 && next_y < col){
                
                    if(visited[next_x][next_y]) continue;
                    
                    if(map_arr[next_x][next_y] == 'X') continue;
                    
                    if(map_arr[next_x][next_y] == target){ 
                        lever_pos = [next_x, next_y]
                        return cnt+1;
                    }
            
                    needToVisite.push([next_x, next_y, cnt+1])
                    visited[next_x][next_y] = true;
                }
                
            }
        }
        return -1                         
    }
    
}