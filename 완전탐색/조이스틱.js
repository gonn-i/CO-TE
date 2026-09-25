function solution(name) {
    let name_Arr = name.split('');
    let ans = 0;
    let continuous_A = 0;
    
    // 알파벳 위아래 이동
    for(let i =0; i < name_Arr.length; i++) {
        let from_A = name_Arr[i].charCodeAt() - 'A'.charCodeAt();
        let from_Z = 'Z'.charCodeAt() - name_Arr[i].charCodeAt(); 
        
        let min = Math.min(from_A, from_Z +1);
        
        ans += min;
    }
    
    let move = name_Arr.length -1;

    
    for(let i =0; i < name_Arr.length; i++) {
        let next = i + 1;
        
        while(name_Arr[next] === 'A' && name_Arr.length > next){
            next++;
        }
        
        move = Math.min(
            move,
            i * 2 + name_Arr.length - next,
            i + ((name_Arr.length - next) * 2),
        )
    }
    
    return ans + move;
}