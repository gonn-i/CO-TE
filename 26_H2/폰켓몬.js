function solution(nums) {
    let pokemon = new Set();
    
    nums.forEach((e) => {
        pokemon.add(e)
    })
    
    let half_cnt = Math.floor(nums.length /2)
    
    
    return half_cnt  > pokemon.size? pokemon.size: half_cnt 
}