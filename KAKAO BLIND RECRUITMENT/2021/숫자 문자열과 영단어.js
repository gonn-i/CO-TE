const NumChart = {
  'zero': 0,
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9
};

function solution(s) {
  let temp = s.toString().split('');
  let strArr = [];
  let ans = [];
  
  temp.forEach((e) => {
      if(+e >= 0 || +e <=9){
          ans.push(e)
      } else {
          strArr.push(e);
      }
      
      if(NumChart[strArr.join('')] || NumChart[strArr.join('')] === 0) {
          ans.push(NumChart[strArr.join('')]);
          strArr = [];
      }
  })
  return +ans.join('')
}