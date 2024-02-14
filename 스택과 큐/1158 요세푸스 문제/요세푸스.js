const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "/input.txt";
let input = fs.readFileSync(__dirname + filePath).toString().split(" ");
// let input = fs.readFileSync(filePath).toString().split("\n");

let N = +input[0];
let K  = +input[1];

let idx = K;
let circle = [];
let ans =[];

for(let i =1; i <= N; i++){
    circle.push(i)
}

while(circle.length !== 0) {
    if (idx === 1) {
        ans.push(circle.shift())
        idx = K
    }
    else {
        circle.push(circle.shift());
        idx -=1
    }

}
console.log(`<${ans.join(', ')}>`);


