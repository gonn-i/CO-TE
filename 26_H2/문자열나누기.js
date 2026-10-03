// 10m
function solution(s) {
    let str_Arr = s.split('')
    let temp = [];
    let ans = 0;
    
    for(let i =0; i < str_Arr.length; i++){
        if(temp.length == 0){
            temp.push(str_Arr[i]);
            ans +=1;
        } else {
            if(temp[0] !== str_Arr[i]) temp.pop()
            else temp.push(str_Arr[i]);
        }
    }
    
    return ans
}