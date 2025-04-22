function state_format(state) {
  let word = '';
  switch (state) {
    case 'Enter':
      word = '님이 들어왔습니다.';
      break;
    case 'Leave':
      word = '님이 나갔습니다.';
      break;
  }
  return word;
}

function solution(record) {
  let in_out = []; // 입퇴장 정보
  let id_name = {}; // 아이디 닉네임
  let ans = [];

  record.map((e) => {
    const [state, uid, name] = e.split(' ');
    if (state !== 'Change') in_out.push([state, uid]);
    if (state !== 'Leave') id_name[uid] = name;
  });

  in_out.forEach((e) => {
    const [state, uid] = e;
    const word = `${id_name[uid]}${state_format(state)}`;
    ans.push(word);
  });
  return ans;
}
