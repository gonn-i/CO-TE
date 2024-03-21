const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "/input.txt";
let input = fs.readFileSync(__dirname + filePath).toString().split("\n");

const meeting_num = input[0];
const meetings = input.slice(1);
let answer = 0;

meetings.sort(compare)

// console.log(meetings)
let prev_end = 0;
meetings.forEach((meeting) =>{
    // console.log(prev_end)
    const m = meeting.split(" ").map(Number);
    if(m[0] >= prev_end ) {
        answer++;
        // console.log(m) 
        prev_end = m[1];
    }
})

console.log(answer)

function compare (a,b) { // 정렬의 기준은 끝나는 시간_ 오름차순
    let num1 = a.split(' ');
    let num2 = b.split(' ');
    if (num1[1] == num2[1]) return num1[0] - num2[0] // 끝나는 시간이 같을 경우 + 시작시간과 끝나는 시간이 같을 경우!!! 
    return num1[1] - num2[1];
}


