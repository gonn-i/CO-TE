function solution(c) {
    const sort_arr = c.sort((a,b) => a-b); 
    let h_idx = c.length; 

    
    while (h_idx > 0 ) {
        let up_to_hIdx =  sort_arr.filter((e) => e >= h_idx);
        let c_count = up_to_hIdx.length; //h_idx 이상 인용된 논문수
        if(c_count >= h_idx ) break;
        h_idx--;
    }
    return h_idx;
}

