const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "/input.txt";
let input = fs.readFileSync(__dirname + filePath).toString().split("\n");
// let input = fs.readFileSync(filePath).toString().split("\n");

const num = +input[0];
input.shift();
input.map((i)=> +i)
const new_Arr = [];
const ans = [];
let i =1;
let l = 0;
let success = true;

while(l < num) {
    if ( new_Arr[new_Arr.length-1] == input[l]) {
        new_Arr.pop(i)
        ans.push('-')
        l += 1;
    }

    else if (i <= input[l]) {
    new_Arr.push(i)
    ans.push('+')
    i += 1
    }

    else {
        success = false;
        break;
    }
}

// console.log(ans)
// console.log(new_Arr)
if (!success) {
    console.log('NO')
} 
else {
    console.log(ans.join('\n'));
}

