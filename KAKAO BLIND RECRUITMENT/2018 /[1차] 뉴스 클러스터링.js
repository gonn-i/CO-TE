function solution(str1, str2) {
  let multi_str1 = multi_(str1);
  let multi_str2 = multi_(str2);

  if (multi_str1.length == 0 && multi_str2 == 0) {
    return 1 * 65536;
  }

  let N1 = intersect(multi_str1, multi_str2);
  let N2 = union(multi_str1, multi_str2);

  return Math.floor((N1 / (N2 - N1)) * 65536);
}

function multi_(str) {
  let splited_Arr = str.split('');
  let multi_Arr = [];

  for (let i = 0; i < splited_Arr.length - 1; i++) {
    //ASCII 코드로 알파벳 대문자 65~90 / 소문자 97~122
    if ((splited_Arr[i] >= 'a' && splited_Arr[i] <= 'z') || (splited_Arr[i] >= 'A' && splited_Arr[i] <= 'Z')) {
      if (
        (splited_Arr[i + 1] >= 'a' && splited_Arr[i + 1] <= 'z') ||
        (splited_Arr[i + 1] >= 'A' && splited_Arr[i + 1] <= 'Z')
      )
        multi_Arr.push(splited_Arr[i].toUpperCase() + splited_Arr[i + 1].toUpperCase());
    }
    continue;
  }
  return multi_Arr;
}

function intersect(str1, str2) {
  let comp = [];
  let intersection = [];

  for (let i = 0; i < str1.length; i++) {
    if (!comp.includes(str1[i])) comp.push(str1[i]);
  }

  for (let i = 0; i < str2.length; i++) {
    if (comp.includes(str2[i])) {
      if (!intersection.includes(str2[i])) {
        let a = str1.reduce((ac, v) => ac + (v === str2[i]), 0);
        let b = str2.reduce((ac, v) => ac + (v === str2[i]), 0);
        let count = Math.min(a, b);
        for (let j = 0; j < count; j++) {
          intersection.push(str2[i]);
        }
      }
    }
  }
  return intersection.length;
}

function union(str1, str2) {
  let union_arr = [];

  for (let i = 0; i < str1.length; i++) {
    union_arr.push(str1[i]);
  }

  for (let i = 0; i < str2.length; i++) {
    union_arr.push(str2[i]);
  }

  return union_arr.length;
}
