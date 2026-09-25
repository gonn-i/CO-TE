function solution(n, computers) {

    let network = Array.from({length: n}).map(() => []);
    
    for(let i = 0; i < computers.length; i++){
        computers[i].forEach((e, idx) => {
            if(i !== idx && e == 1) network[i].push(idx);
        })
    }
    
    let visited = Array.from({length: n}).fill(false);
    let network_cnt = 0;
    
    for(let i =0; i < network.length; i++){
        
        if(visited[i]) continue;
        
        network_cnt+=1;
        visited[i] = true;
        let need_to_visite = [i];
        let idx = 0;
        
        while(need_to_visite.length > idx){
            let from = need_to_visite[idx++];
            
            network[from].forEach((to) => {
                if(!visited[to]) {
                    need_to_visite.push(to);
                    visited[to] = true;
                }
            })
            
        }     
    }
    
    return network_cnt
}