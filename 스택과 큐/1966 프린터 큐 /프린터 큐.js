const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "/input.txt";
let input = fs.readFileSync(__dirname + filePath).toString().split("\n");
// let input = fs.readFileSync(filePath).toString().split("\n");

let testCaseN = +input[0];
// console.log(testCaseN)

for(let i = 1; i <= testCaseN; i++){
    let num_target = input[i * 2 - 1].split(' ').map((i) => +i);
    let prior = input[i*2].split(' ').map((i) => +i);

    // console.log(num_Idx, prior)
    // console.log("---------------")
    let doc_Num = num_target[0];
    let target = num_target[1];
    let max_Prior = Math.max(...prior);
    let ans = 0;
    let Idx_Arr = [];

    for(let i=0; i < doc_Num; i++) {
        Idx_Arr.push(i);
    }
    
    while(prior.length !== 0){
        if(prior[0] < max_Prior) {
            prior.push(prior.shift())
            Idx_Arr.push(Idx_Arr.shift())
        } else {
            ans +=1;
            if(Idx_Arr[0] === target) {
                console.log(ans);
                break;
            }
            prior.shift();
            Idx_Arr.shift();
            max_Prior = Math.max(...prior);
        }
    }
}

// 3

// 1 0
// 5

// 4 2
// 1 2 3 4

// 6 0
// 1 1 9 1 1 1