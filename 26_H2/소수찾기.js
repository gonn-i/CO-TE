// 29m
function solution(numbers) {
    let num = numbers.split('')
    let com_arr = new Set();
    let visited = Array.from({length: num.length}).fill(false);
    let ans = 0;
    
    function getCombination (temp) {
        if(temp.length > 0){
            com_arr.add(Number(temp.join('')))
        }
        
        for(let i =0; i < num.length; i++){
            if(!visited[i]){
                visited[i] = true;
                temp.push(num[i])
                
                getCombination(temp)
                
                temp.pop()
                visited[i] = false
            }
        }
    }
    getCombination([])
    console.log(com_arr)
    
    com_arr.forEach((e) => {
        if(IsPrim(e)) ans+=1;
    })
    
    return ans
    
    function IsPrim (num) {
        if(num < 2) return false 
        let sqrt_num = Math.floor(Math.sqrt(num))
        
        for(let i =2; i <= sqrt_num; i++){
            if(num % i === 0) return false 
        }
        return true;
    }
}