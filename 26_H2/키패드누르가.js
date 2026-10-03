function solution(numbers, hand) {    
    let ans = [];
    let right_thumb = '*';
    let left_thumb = '#';
    
    function getDistance (current, target) { 
        return Math.abs(pos[current][0] - pos[target][0]) + 
            Math.abs(pos[current][1] - pos[target][1])
    }
    
    let pos = {
        1: [0,0],
        2: [0,1],
        3: [0,2],
        4: [1,0],
        5: [1,1],
        6: [1,2],
        7: [2,0],
        8: [2,1],
        9: [2,2],
        '*': [3,0],
        0: [3,1],
        '#': [3,2]
    }
    
    numbers.forEach((num) => {
        if(num == 1 || num == 4 || num == 7 || num == '*'){ 
            ans.push('L')
            left_thumb = num;
        }
        else if(num == 3 || num == 6 || num == 9 || num == '#'){ 
            ans.push('R')
            right_thumb = num;
        }
        else {
            if(getDistance(left_thumb, num) > getDistance(right_thumb, num)){
                ans.push('R');
                right_thumb = num;
            } 
            else if (getDistance(right_thumb, num) > getDistance(left_thumb, num) ) {
                ans.push('L')
                left_thumb = num;
            } else {
                switch (hand) {
                    case 'right':
                        ans.push('R');
                        right_thumb = num;
                        break
                    case 'left':
                        ans.push('L');
                        left_thumb = num;
                        break
                }
            }
        }
    })
    
    console.log(getDistance('0', '0'))
    
        
    return ans.join('')
}
