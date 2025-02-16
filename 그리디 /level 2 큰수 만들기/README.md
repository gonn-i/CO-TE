[문제링크](https://school.programmers.co.kr/learn/courses/30/lessons/42883)

## 접근 방향 설명

제공된 문자열에서, 순서대로 진행하되 이제 큰 숫자들만 뽑아서 가장 큰 수를 만들면 되는 문제였다. 

그리디를 이용해야 하지만, 완전 탐색으로 갈 수 없는 이유는 N이 굉장히 크기 떄문이다 (number는 2자리 이상, 1,000,000자리 이하인 숫자)

따라서, 완전탐색으로 접근할 경우, O(n^2) 이기에, 스택을 이용하여 O(n) 으로 접근하는 편이 좋다. (아니라면 시간초과를 면하지 못함)

> 나의 소스 코드 설명 </br>
> 1️⃣ number 문자열을 split으로 쪼개 배열로 만들어주고, 하나씩 탐색  </br>
> 2️⃣ 이 과정에서, `k가 양수`이고 / `스택안에 가장 최근 들어온 수 < num` (당연히, 스택은 비어있으면 안됨) 인 경우, 
> 스택에 들어간 최신 값을 빼주었다. 이와 동시에, 특정 수를 제거했으니  `k--` 도 해줌  </br>
> 3️⃣ 배열을 하나씩 돌면서, 스택에 숫자를 추가해주는 것도 잊지 않았다.  </br>
> 왜 다 넣어버리냐? 
  다른 질문엔 짜피 다음 반복문에서 pop 해줄 요소를 넣어줄 수도 있고, `stack_arr[stack_arr.length - 1] > num` 인 경우에는 다음 수를 넣어 큰수를 keep 할 수 있기 때문이다. 
> 4️⃣ 이후, `nums` 배열을 순회했지만, `k`가 양수인 경우를 대비하여 반복문을 돌아주었다. 
```js
  while (k > 0) {
    stack_arr.pop();
    k--;
  }
```

---

**풀이 코드 설명**

```js
function solution(number, k) {
  let nums = number.split('');
  let stack_arr = [];

  // nums 배열을 하나씩 돌며 진행
  for (let num of nums) {
    // stack이 텅빈 경우 / 제거해야 하는 횟수 k가 양수 / 스택 안보다 더큰 수 num을 만난 경우 => 스택.pop
    while (k > 0 && stack_arr.length > 0 && stack_arr[stack_arr.length - 1] < num) {
      stack_arr.pop();
      k--;
    }
    stack_arr.push(num);
  }

  //nums 는 다 돌았지만, k가 0이 아닐 경우 처리
  while (k > 0) {
    stack_arr.pop();
    k--;
  }

  return stack_arr.join('');
}
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)

`1트 실패 코드` 

```js
function solution(number, k) {
    var answer = '';
    let nums = number.split('');
    
    let count = nums.length - k;
    let idx = 0;
    while(count >= 1) {
        let max = 0;
        for(let i = idx; i <= k; i++){
            if(max >= nums[i]) continue;
            idx = i;
            max = nums[i];
        }
        answer += max;
        idx++;
        count--;
        k++;
    }
    
    return answer;
}
```
다시 봐도 비효율적인 코드였던거 같다... 
음 사실 시간초과에 걸려서 고민이 많았다.  

![alt text](<Pasted Graphic.png>)

O(n^2) 가 될건 알았지만, 스택으로 풀 생각을 전혀 하지 못했던터라 조금 헤맸다. 
반년만에 다시 알고리즘 푸니 그럴 수 밖에.. 라고 위안을 삼기엔 조금 창피한 코드인 것 같다. 당장 앞에 놓인 테케 해결도 좋지만, 시간 복잡도에 따라서 좀 접근 방법을 바꿀 수 있는 차분함이 있어야 할 것 같다.

그리고 아직 반례 찾는 능력이 많이 부족한거 같다. 문제 해결하고 나서도 머리속으로 차근히 돌려보면서 예외 case가 있진 않는지 고민해볼 필요가 있을 것 같다. 

---

## 문제
어떤 숫자에서 k개의 수를 제거했을 때 얻을 수 있는 가장 큰 숫자를 구하려 합니다.

예를 들어, 숫자 1924에서 수 두 개를 제거하면 [19, 12, 14, 92, 94, 24] 를 만들 수 있습니다. 이 중 가장 큰 숫자는 94 입니다.

문자열 형식으로 숫자 number와 제거할 수의 개수 k가 solution 함수의 매개변수로 주어집니다. number에서 k 개의 수를 제거했을 때 만들 수 있는 수 중 가장 큰 숫자를 문자열 형태로 return 하도록 solution 함수를 완성하세요.

**제한 조건**
number는 2자리 이상, 1,000,000자리 이하인 숫자입니다.
k는 1 이상 number의 자릿수 미만인 자연수입니다.

**입출력 예**
number	k	return
"1924"	2	"94"
"1231234"	3	"3234"
"4177252841"	4	"775841"