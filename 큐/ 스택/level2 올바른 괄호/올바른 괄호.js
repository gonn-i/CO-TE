function solution(s){ 
    const c = new Array();
    const t = s.split('');
    
    for (let i =0; i < t.length; i++) {
        if(t[i] == '(') c.push(i);
        else {
            if (c.length === 0) return false
            c.pop()
        }
    }
    
    return c.length === 0
}