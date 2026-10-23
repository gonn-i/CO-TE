// MST
function solution(n, costs) {
    let parent = Array.from({length: n}, (_,i) => i)
    
    costs.sort((a,b) => a[2] - b[2])
    
    // 부모 찾기
    function find (x){
        if(parent[x] === x) return x;
        
        parent[x] = find(parent[x])
        return parent[x]
    }
    
    // 사이클 확인
    function union (a,b) {
        let parentA = find(a)
        let parentB = find(b)
        
        if(parentA == parentB) return false
        
        parent[parentB] = parentA
        return true
    }
    let cnt = 0;
    let total_cost = 0;
    
    for(let i = 0; i < costs.length; i++){
        let [a,b,cost] = costs[i]
        if(union(a,b)){
            cnt +=1
            total_cost += cost
        }
        
        if(cnt === n-1) return total_cost
    }
}