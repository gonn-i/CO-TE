function transBinary (temp, num, n) {
  let count = 0;
  while(num > 0){
      temp += (num % 2);
      num = Math.floor(num/2);
      count++;
  }
  let temp_arr = temp.split('').reverse()
  
   if(count !== n){
      for(let i = 0; i < n - count; i++){
          temp_arr.unshift('0')
      }
  } 
  
  return temp_arr;
}

function transMap (arr1, arr2) {
  let temp = '';
  arr1.forEach((comp, i) => {
      if(comp === '0' && arr2[i] == '0') temp += ' '
      else temp +='#'
  })
  return temp;
}

function solution(n, arr1, arr2) {
  let arr1_binary = [];
  let ans =[]
  
  arr1.forEach((num) => {
      let temp = '';
      let binary = transBinary(temp, num, n)

      arr1_binary.push(binary)
  })
  
  arr2.forEach((num, idx) => {
      let temp = '';
      let binary2 = transBinary(temp, num, n)

      ans.push(transMap(binary2, arr1_binary[idx]))
  })

 return (ans)
}

