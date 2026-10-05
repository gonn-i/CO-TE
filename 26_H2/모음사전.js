function solution(word) {
    let vowels = ['A', 'E', 'I', 'O', 'U'];
    let count = 0
    let ans = 0;
    
    function dfs (current){
        if(current === word) {
            ans =  count;
        }
        
         if(current.length === 5) return;
        for(vowel of vowels){
            count++;
            
            dfs(current + vowel);
            
            if(current.length === 5) return;
        }
        
    }
    
    
    dfs('')
    
    return ans
}