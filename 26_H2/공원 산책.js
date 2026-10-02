function solution(park, routes) {
    let start_point = [];
    let park_arr = [];
    
    // 공원 좌표화 
    park.forEach((line) => {
        park_arr.push(line.split(''))
    })
    
    let row = park_arr.length
    let col = park_arr[0].length
    
    // 시작 좌표 잡기
    for(let i =0; i < row; i++){
        for(let j =0; j < col; j++){
            if(park_arr[i][j] === 'S') start_point = [i, j]
        }
    }
    
    let next_x = start_point[0]
    let next_y = start_point[1]
    
    routes.forEach((route) => {
        let [dic, times] = route.split(' ');
        
        let temp_point = [next_x, next_y] 
        for(let i =0; i < times; i++){
            switch (dic){
                case 'N':
                    next_x -= 1
                    break
                case 'S':
                   next_x += 1
                    break
                case 'W':
                   next_y -= 1
                    break
                case 'E':
                   next_y += 1
                    break
            }
            if(next_x >= 0 && next_x < row && next_y >= 0 && next_y < col && park_arr[next_x][next_y] !== 'X'){}
            else {
                next_x = temp_point[0];
                next_y = temp_point[1];
                break;
            }
        }
    })
    return [next_x, next_y]
}