function solution(p, l) {
    let answer = 0;
    let  max_prior = Math.max(...p)
    const idx = []
    
    for (let i =0; i < p.length; i++) {
        idx.push(i)
    }

    while(p.length !== 0) {
        if(p[0] < max_prior) {
            p.push(p.shift())
            idx.push(idx.shift())
        } else {
            answer += 1
            if(idx[0] ===l) return answer
            p.shift()
            idx.shift()
            max_prior = Math.max(...p)
        }  
    }  
}