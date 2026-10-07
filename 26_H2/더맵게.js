function solution(scoville, K) {
    class MinHeap {
        constructor(){
            this.heap = []
        }
        
        size () {
            return this.heap.length
        }
        
        insert (value) {
            this.heap.push(value)
            this.bubbleUp()
        }
        
        getMin() {
            if(this.heap.length === 0) return -1;
            if(this.heap.length === 1) return this.heap.pop()
            
            let min = this.heap[0];
            this.heap[0] = this.heap.pop();
            
            let idx = 0; 
            let leftIdx = (idx * 2 ) + 1
            let rightIdx = (idx * 2) + 2 
            
            while( (this.heap[leftIdx] && this.heap[idx] > this.heap[leftIdx] ) || 
                  (this.heap[rightIdx] && this.heap[idx] > this.heap[rightIdx] )) {
                
                let minIdx = leftIdx
                
                if(this.heap[leftIdx] && this.heap[rightIdx] && this.heap[leftIdx] > this.heap[rightIdx]) minIdx = rightIdx;
                
                this.swap(minIdx, idx)
                
                idx = minIdx;
                leftIdx = (idx * 2 ) + 1;
                rightIdx = (idx * 2) + 2 ;
            }
            
            return min 
        }
        
        swap (idx1, idx2) {
            [this.heap[idx1] , this.heap[idx2]] = [this.heap[idx2] , this.heap[idx1]] 
        }
        
        bubbleUp () {
            let idx = this.heap.length -1;
            let parentIdx = Math.floor((idx - 1) / 2)
            
            while(this.heap[parentIdx] && this.heap[parentIdx] > this.heap[idx]){
                this.swap(parentIdx, idx)
                idx = parentIdx;
                parentIdx = Math.floor((idx - 1) / 2)
            }
        }
        
        
    }
    
    let heap = new MinHeap()
    let ans = 0;
    
    scoville.forEach((sc) => {
        heap.insert(sc)
    })
    
    while(heap.size() > 1) {
        let min = heap.getMin();
        if(K > min){
            let getsecondWeak = heap.getMin();
            let newMix = min + getsecondWeak * 2;
            heap.insert(newMix)
            ans++
        } else {
            heap.insert(min)
            break
        }
    }
    
    return heap.getMin() >= K ? ans : -1
}