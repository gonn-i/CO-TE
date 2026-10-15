// BFS 를 돌리고, 해당하는 col Array 에 석유량 넣어주기 
// 53m
function solution(land) {
    let row = land.length 
    let col = land[0].length
    let ans = 0
    let need_to_visite = [];
    let visited = Array.from({length: row}, () => Array.from({length: col}).fill(false))
    let idx = 0;
    let oils = 0;
    
    let moves = [
        [-1,0],
        [1,0],
        [0,1],
        [0, -1]
    ]
    
    let cols_oil = Array.from({length: col}).fill(0)
    
    
    for(let i =0; i < row; i++){
        for(let j =0; j < col; j++){
            if(visited[i][j] || land[i][j] === 0) continue
            need_to_visite.push([i, j])
            visited[i][j] = true;
            let cnt = 1
            
            let visited_cols = new Set();
            visited_cols.add(j)
            
            while(need_to_visite.length > idx){
                let [x,y, oil] = need_to_visite[idx++];
            
                for(let move of moves){
                    let next_x = x + move[0]
                    let next_y = y + move[1]
                    
                    if( next_x >=0 && next_x < row &&
                        next_y >=0 && next_y < col && 
                        !visited[next_x][next_y] && 
                        land[next_x][next_y] === 1)
                    {
                        visited[next_x][next_y] = true;
                        need_to_visite.push([next_x, next_y])
                        cnt +=1 
                        visited_cols.add(next_y)
                    }
                    
                }
                
            }
            visited_cols.forEach((col) => {
                cols_oil[col-1] += cnt
            })
        }
    }
    
    return Math.max(...cols_oil)
}