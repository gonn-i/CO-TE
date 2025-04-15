// 문자열 정수로 바꾸기
function solution(s) {
  return Number(s)
}

// 두 정수 사이 합
function solution(a, b) {
  let max = b > a? b : a;
  let min = max === b? a : b;
  let count =  (max - min + 1);
  let temp = count % 2 === 0? 0: (a+b)/2
  
  let sum = (a + b) * Math.floor(count /2) + temp
  return a == b? a : sum 
}

// 문자열내 p와 y의 개수
function solution(s){
  let arr = s.toString().split('');
  let comparision = 0;
  
  arr.forEach((e) => {
      if(e === 'p' || e === 'P') comparision +=1;
      else if(e === 'y' || e === 'Y') comparision -=1;
  })
  
  return comparision === 0
}

// 정수 내림차순으로 배치하기
function solution(n) {
  let arr = n.toString().split('').sort((a,b) => b-a)
  
  return +arr.join('')
}

// 정수 제곱근 판별
function solution(n) {
  let temp = Math.sqrt(n);
  return temp === Math.floor(temp) ? Math.pow(temp+1, 2): -1;
}