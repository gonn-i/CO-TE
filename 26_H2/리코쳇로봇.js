function solution(board) {
    let map = [];
    let start_point = [];
    let goal = []
    let ans = []
    board.forEach((ln) => {
        map.push(ln.split(''))
    })
    
    
    let row = board.length
    let col = board[0].length
    
    for(let i =0; i < row; i++){
        for(let j =0; j < col; j++){
            if(map[i][j] === 'R') start_point = [i, j]
            else if (map[i][j] === 'G') goal = [i, j]
        }
    }
    
    let need_to_visite = [];
    let visited = Array.from({ length: row}, () => Array.from({length: col}).fill(false))
    let idx = 0;
    let moves = [
        [-1,0],
        [1,0],
        [0, -1],
        [0, 1]
    ]
    
    need_to_visite.push([start_point[0], start_point[1], 0])
    visited[start_point[0]][start_point[1]] = true
    
    while(need_to_visite.length > idx){
        let [x,y,cnt] = need_to_visite[idx++]
        
        if(x === goal[0] && y === goal[1]){
            return cnt
        }
        
        for(let move of moves){
            let next_x = x + move[0]
            let next_y = y + move[1]
            
            while(true){   
                if(  next_x <0 ||
                     next_x >= row ||
                     next_y < 0 || 
                     next_y >= col || 
                     map[next_x][next_y] === 'D'
                  )
                    {
                        let stop_x = next_x - move[0];
                        let stop_y = next_y - move[1];
                        
                        
                        if(visited[stop_x][stop_y] === false) {
                            need_to_visite.push([stop_x, stop_y, cnt +1])
                            visited[stop_x][stop_y] = true
                        }
                        break  
                    }
                    next_x += move[0]
                    next_y += move[1]
                        
            }
            
        }
    }
    return -1
}
