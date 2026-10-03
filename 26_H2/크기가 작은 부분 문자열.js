// 6m
function solution(t, p) {
    let len = p.length
    let str_arr = t.split('')
    let ans = 0;
    
    for(let i =0; i <= str_arr.length - len; i++){
        let temp = '';
        for(let j =i; j < i+len; j++){
            temp += str_arr[j]
        }
        if(p >=Number(temp)) ans++
    }
    
    return ans
}