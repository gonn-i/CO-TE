// 6m
function solution(clothes) {
    let cloth_map = new Map();
    let ans = 1;
    
    clothes.forEach(([cloth, cate]) => {
        let prev = cloth_map.get(cate) ?? 0
        
        cloth_map.set(cate, prev +1)
    })
    
    cloth_map.forEach((value, key) => {
        ans *= value +1
    })
    
    
    return ans -1
}