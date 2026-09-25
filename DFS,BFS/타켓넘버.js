function solution(numbers, target) {
    let count =0;
    
    function dfs (sum, idx) {
        if(idx == numbers.length){
            if(sum == target) count +=1;
            return;
        }
        dfs(sum + numbers[idx], idx+1);
        dfs(sum - numbers[idx], idx+1);
    }
    
    dfs(0,0);
    
    return count
}
