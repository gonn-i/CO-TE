const bonus = ['S', 'D', 'T'];
const opt = ['*', '#']

const getBonus = (num, type) => {
    switch(type){
        case bonuce[0]: 
            return Math.pow(num,1)
            break;
        case bonuce[1]: 
            return Math.pow(num,2)  
            break;
        case bonuce[2]: 
            return Math.pow(num,3)
            break;
    }
}

function solution(dartResult) {
    let ans = 0;
    let temp = [];
    let arr = dartResult.split('');
    
    for(let i =0; i < arr.length; i++){
        if(bonuce.includes(arr[i])){
            if(arr[i-2] === '1') temp.push(getBonus(10, arr[i]));
            else temp.push(getBonus(arr[i-1], arr[i]));
        }

        else if (opt.includes(arr[i])){
            let count = temp.length;
            if(arr[i] === opt[0]) {
                if(count > 1){
                  temp[count - 2] = temp[count -2] * 2;
                } 
                  temp[count - 1] = temp[count -1] * 2;
            } else {
                  temp[count - 1] = temp[count -1] * -1;
            }
        }
    }

    ans = temp.reduce((ans, num)=> ans += num)
    return ans
}

// 더 나은 풀이 
function solution(dartResult) {
  const bonusMap = { S: 1, D: 2, T: 3 };
  
  const scores = [];
  const regex = /\d{1,2}[SDT][*#]?/g;
  const tokens = dartResult.match(regex);

  console.log(tokens)
  tokens.forEach((token, idx) => {
      const match = token.match(/(\d{1,2})([SDT])([*#]?)/);
      let [_, num, bonus, option] = match;
      num = Number(num);
      let score = Math.pow(num, bonusMap[bonus]);

      if(option === '*') {
          score *= 2;
          if(idx > 0) scores[idx - 1] *= 2; 
      } else if(option === '#') {
          score *= -1;
      }

      scores.push(score);
  });

  return scores.reduce((a, b) => a + b, 0);
}
