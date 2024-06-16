[문제링크](https://www.acmicpc.net/problem/1339)

## 접근 방향 설명

> 1) 한줄씩 주어진 알파벳 문자열을 split('') 해서 하나씩 each_value = {}; 안에 key값으로 넣어준다.
> 2) 근데 이제 value는 단위 (10000 ,1000 ... ) 를 넣어주었다. `10 ** (Arr[i].length - 1 - next);`
> 3) 중복으로 나올 수 있기 때문에 else를 통해서, 또 나온 경우에는 기존의 값에 단위를 더해주었다.
```js
else {
      each_value[Arr[i][j]] += 10 ** (Arr[i].length - 1 - next);
    }
```
> 4) 객체 형태에서 value를 기준으로 정렬해주고 (내림차순), 순차적으로 9~0까지 숫자를 재부여해준다.
> 5)  `ans +=  단위 * 객체에 넣은 숫자` 해주면 최종 sum!!

---

```js
let fs = require('fs');
let filePath = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
let input = fs
  .readFileSync(__dirname + filePath)
  .toString()
  .trim()
  .split('\n');

let N = +input.shift();
let Arr = [];
let num = 9;
let each_value = {};
let ans = 0;

for (let i = 0; i < N; i++) {
  Arr[i] = input[i].split('');
  let next = 0;
  for (let j = 0; j < Arr[i].length; j++) {
    if (each_value[Arr[i][j]] == undefined) {
      each_value[Arr[i][j]] = 10 ** (Arr[i].length - 1 - next);
    } else {
      each_value[Arr[i][j]] += 10 ** (Arr[i].length - 1 - next);
    }
    next++;
  }
}

each_value = Object.entries(each_value).sort(([, a], [, b]) => b - a);

each_value.forEach((e) => {
  e[1] = num;
  num--;
});
// [[ 'A', 9 ],[ 'C', 8 ],[ 'D', 7 ],[ 'G', 6 ],[ 'E', 5 ],[ 'F', 4 ],[ 'B', 3 ]]

each_value = each_value.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
// { A: 9, C: 8, D: 7, G: 6, E: 5, F: 4, B: 3 }

for (let i = 0; i < N; i++) {
  next = 0;
  for (let j = 0; j < Arr[i].length; j++) {
    let unit = 10 ** (Arr[i].length - 1 - next);
    ans += unit * each_value[Arr[i][j]];
    next++;
  }
}

console.log(ans);
```

---

## 풀이 과정에서 새롭게 느낀점(배운점)


첫 골드 4!! 사실 객체에 넣을 생각은 처음부터 있었지만, 이제 객체를 정렬할 방법을 몰라 애를 먹었다.


> Object.entries() 메서드는 **[key, value] 쌍의 배열을 반환**

> `each_value = each_value.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});`
이중 배열의 형태를 **객체로 다시 반환**

[참고url](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
[참고url](https://kyounghwan01.github.io/blog/JS/JSbasic/object-sort/#google_vignette)



---

## 문제
민식이는 수학학원에서 단어 수학 문제를 푸는 숙제를 받았다.

단어 수학 문제는 N개의 단어로 이루어져 있으며, 각 단어는 알파벳 대문자로만 이루어져 있다. 이때, 각 알파벳 대문자를 0부터 9까지의 숫자 중 하나로 바꿔서 N개의 수를 합하는 문제이다. 같은 알파벳은 같은 숫자로 바꿔야 하며, 두 개 이상의 알파벳이 같은 숫자로 바뀌어지면 안 된다.

예를 들어, GCF + ACDEB를 계산한다고 할 때, A = 9, B = 4, C = 8, D = 6, E = 5, F = 3, G = 7로 결정한다면, 두 수의 합은 99437이 되어서 최대가 될 것이다.

N개의 단어가 주어졌을 때, 그 수의 합을 최대로 만드는 프로그램을 작성하시오.

## 입력
첫째 줄에 단어의 개수 N(1 ≤ N ≤ 10)이 주어진다. 둘째 줄부터 N개의 줄에 단어가 한 줄에 하나씩 주어진다. 단어는 알파벳 대문자로만 이루어져있다. 모든 단어에 포함되어 있는 알파벳은 최대 10개이고, 수의 최대 길이는 8이다. 서로 다른 문자는 서로 다른 숫자를 나타낸다.

## 출력
첫째 줄에 주어진 단어의 합의 최댓값을 출력한다.

**예제 입력 1**
2
AAA
AAA

**예제 출력 1**
1998