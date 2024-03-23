const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "/input.txt";
const input = fs.readFileSync(__dirname + filePath).toString().trim().split("\n");

const T = input[0];
const testCases = input.slice(1);
let answer = [];
// console.log(testCases)

for (let i = 0; i < T; i++) {
    let temp = [];
    let pick = 0;
    let nthCase = [];

    const N = testCases[i];
    // console.log(N)

    nthCase.push(
        testCases
            .splice(i+1, N)
            .map((e) => e.split(" "))
            .sort(compare)
            )

    let standard = nthCase[0][0][1];  //서류 1등의 면접 점수 (기준점)

    // console.log(nthCase)
    // console.log(standard)
    let standard_2 = '';

    for(let i=0; i < nthCase[0].length; i++ ) {
        if(nthCase[0][i][1] <= standard) pick++;
        standard = nthCase[0][i][1];
    }
    // console.log(temp)
    // console.log(standard_2)

    answer.push(pick)
}

console.log(answer.join('\n'))

function compare(a, b) {
    return a[0] - b[0];
}

