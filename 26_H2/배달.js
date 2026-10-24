// 28m 15s
class MinHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    swap(a, b) {
        [this.heap[a], this.heap[b]] =
            [this.heap[b], this.heap[a]];
    }

    push(v) {
        this.heap.push(v);
        let idx = this.heap.length - 1;

        while (idx > 0) {
            let parent = Math.floor((idx - 1) / 2);

            if (this.heap[parent][1] <= this.heap[idx][1]) break;

            this.swap(parent, idx);
            idx = parent;
        }
    }

    pop() {
        if (this.size() === 0) return null;
        if (this.size() === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();

        let idx = 0;

        while (true) {
            let left = idx * 2 + 1;
            let right = idx * 2 + 2;
            let smallest = idx;

            if (left < this.size() &&
                this.heap[left][1] < this.heap[smallest][1]) {
                smallest = left;
            }

            if (right < this.size() &&
                this.heap[right][1] < this.heap[smallest][1]) {
                smallest = right;
            }

            if (smallest === idx) break;

            this.swap(idx, smallest);
            idx = smallest;
        }

        return min;
    }
}

function solution(N, road, K) {
    // 마을 그래프 생성
    let map = Array.from({length: N+1}, () => [])
    
    road.forEach((each) => {
        let [town1, town2, cost] = each
        
        map[town1].push([town2, cost])
        map[town2].push([town1, cost])
    })
    
    // 거리 dist 배열 
    let dist = Array.from({length: N+1}).fill(Infinity)
    let heap = new MinHeap()
    // let needTovisite = [[1, 0]] // [마을, 비용]
    heap.push([1,0])
    let idx = 0
    dist[1] = 0
    
    
    while(heap.size() > 0){
        let [now, cost] = heap.pop()
        
        if(cost > dist[now]) continue
        
        map[now].forEach(([next, next_cost]) => {
            let newCost = cost + next_cost // 현재 비용 + 간선 가중치
            
            if(dist[next] > newCost){
                heap.push([next, newCost])
                dist[next] = newCost
            }
        })

    }
    console.log(dist)
    return (dist.filter((i) => i <= K).length)
}