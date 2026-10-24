// 40m 30s
class Minheap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] =
            [this.heap[idx2], this.heap[idx1]];
    }

    push(v) {
        this.heap.push(v);
        let idx = this.heap.length - 1;
        let parentIdx = Math.floor((idx - 1) / 2);

        while (
            idx > 0 &&
            this.heap[parentIdx][1] > this.heap[idx][1]
        ) {
            this.swap(parentIdx, idx);
            idx = parentIdx;
            parentIdx = Math.floor((idx - 1) / 2);
        }
    }

    bubbleDown() {
        let idx = 0;

        while (true) {
            let leftChildIdx = idx * 2 + 1;
            let rightChildIdx = idx * 2 + 2;
            let smallerIdx = idx;

            if (
                this.heap[leftChildIdx] &&
                this.heap[leftChildIdx][1] < this.heap[smallerIdx][1]
            ) {
                smallerIdx = leftChildIdx;
            }

            if (
                this.heap[rightChildIdx] &&
                this.heap[rightChildIdx][1] < this.heap[smallerIdx][1]
            ) {
                smallerIdx = rightChildIdx;
            }

            if (smallerIdx === idx) break;

            this.swap(idx, smallerIdx);
            idx = smallerIdx;
        }
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        let min = this.heap[0];
        this.heap[0] = this.heap.pop();

        this.bubbleDown();

        return min;
    }
}

function solution(jobs) {
    let heap = new Minheap();
    let current_time = 0;
    let idx = 0;
    let complete_task_cnt = 0;
    let return_time = 0;

    jobs.sort((a, b) => a[0] - b[0]);

    while (jobs.length > complete_task_cnt) {
        while (
            idx < jobs.length &&
            current_time >= jobs[idx][0]
        ) {
            heap.push(jobs[idx++]);
        }

        if (heap.size() > 0) {
            let job = heap.pop();

            current_time += job[1];
            complete_task_cnt++;
            return_time += current_time - job[0];
        } else {
            current_time = jobs[idx][0];
        }
    }

    return Math.floor(return_time / jobs.length);
}
