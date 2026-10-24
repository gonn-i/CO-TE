// 18m
function solution(begin, target, words) {
    let used = Array.from({length: words.length}).fill(false)
    let needTovisite = [[begin, 0]]
    let word_len = begin.length
    let idx = 0
    
    
    while(needTovisite.length > idx){
        let [current_word, cnt] = needTovisite[idx++];
        
        if(current_word == target){ 
            console.log(current_word, target)
            return cnt
        }
        
        for(let i =0; i < words.length; i++){
            if(used[i]) continue;
            let correct = 0
            
            
            words[i].split('').forEach((lt, idx) => {
                if(lt === current_word[idx]) correct++;
            })
            
            console.log(correct, words[i], current_word )
            
            if(correct === word_len-1) {
                needTovisite.push([words[i], cnt+1])
                used[i] = true
            }
        }
    }
    
    
    return 0 
}