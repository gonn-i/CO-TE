class MinHeap {
    constructor () {
        this.heap = []
    }
    
    swap(idx1, idx2){
        [ this.heap[idx1], this.heap[idx2] ] = 
            [ this.heap[idx2], this.heap[idx1] ]
    }
    
    insert (v) {
        this.heap.push(v)
        this.bubbleUp()
    }  
    
    bubbleUp () {
        let idx = this.heap.length -1
        let parentIdx = Math.floor((idx -1) /2)
        

        while(1){
            if(parentIdx < 0 || parentIdx >= this.heap.length) break;
            if(this.heap[idx] > this.heap[parentIdx]) break;
            
            this.swap(idx, parentIdx);
            idx = parentIdx;
            parentIdx = Math.floor((idx -1) /2);
        }
    }
    
    getone () {
        if(this.heap.length === 0) return;
        if(this.heap.length === 1) return this.heap.pop()
        
        let min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return min
    }
    
    bubbleDown () {
        let idx = 0;
        let leftIdx = idx *2 +1
        let rightIdx = idx *2 +2
        let minIdx = 0;
        
        while(1){
            if(this.heap.length > leftIdx && this.heap[idx] > this.heap[leftIdx] ){
                minIdx = leftIdx;
            } 
            
            if(this.heap.length > rightIdx && this.heap[minIdx] > this.heap[rightIdx] ){
                minIdx = rightIdx;
            } 
                        
            if (minIdx === idx) break;
            
            this.swap(minIdx, idx);
            idx = minIdx;
            leftIdx = idx *2 +1
            rightIdx = idx *2 +2
        }
        
    }
}

class MaxHeap {
    constructor () {
        this.heap = []
    }
    swap(idx1, idx2){
        [ this.heap[idx1], this.heap[idx2] ] = 
            [ this.heap[idx2], this.heap[idx1] ]
    }
    
    insert (v) {
        this.heap.push(v)
        this.bubbleUp()
    }  
    
    bubbleUp () {
        let idx = this.heap.length -1
        let parentIdx = Math.floor((idx -1) /2)
        
        while(1){
            if(parentIdx < 0 || parentIdx >= this.heap.length) break;
            if(this.heap[idx] < this.heap[parentIdx]) break;
            
            this.swap(idx, parentIdx);
            idx = parentIdx;
            parentIdx = Math.floor((idx -1) /2);
        }
    }
    
    getone () {
        if(this.heap.length === 0) return;
        if(this.heap.length === 1) return this.heap.pop()
        
        let max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return max
    }
    
    bubbleDown () {
        let idx = 0;
        let leftIdx = idx *2 +1
        let rightIdx = idx *2 +2
        let maxIdx = 0;
        
        while(1){
            if(this.heap.length > leftIdx && this.heap[idx] < this.heap[leftIdx] ){
                maxIdx = leftIdx;
            } 
            
            if(this.heap.length > rightIdx && this.heap[maxIdx] < this.heap[rightIdx] ){
                maxIdx = rightIdx;
            } 
            
            if (maxIdx === idx) break;
            
            this.swap(maxIdx, idx);
            idx = maxIdx;
            leftIdx = idx *2 +1
            rightIdx = idx *2 +2
        }
        
    }
}

function solution(operations) {
    let cnt = 0;
    let min = new MinHeap();
    let max = new MaxHeap();
    let count = new Map();

    function trim(heap) {
        while (heap.heap.length > 0) {
            let top = heap.heap[0];

            if ((count.get(top) ?? 0) === 0) {
                heap.getone();
            } else {
                break;
            }
        }
    }

    operations.forEach((ln) => {
        let [order, value] = ln.split(' ');
        let num = Number(value);

        switch (order) {
            case "I":
                min.insert(num);
                max.insert(num);

                count.set(num, (count.get(num) ?? 0) + 1);
                cnt++;
                break;

            case "D":
                if (cnt === 0) break;

                if (num === 1) {
                    trim(max);

                    let max_num = max.getone();
                    count.set(max_num, count.get(max_num) - 1);
                } else {
                    trim(min);

                    let min_num = min.getone();
                    count.set(min_num, count.get(min_num) - 1);
                }

                cnt--;
                break;
        }
    });

    if (cnt === 0) return [0, 0];

    trim(max);
    trim(min);

    return [max.heap[0], min.heap[0]];
}