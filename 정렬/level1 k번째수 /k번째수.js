function solution(array, commands) {
    const answer = []
    const c_count = commands.length;
    commands.forEach(item => {
        const slice_array = array.slice(item[0]-1, item[1])
        slice_array.sort((a,b) => a-b) 
        answer.push(slice_array[item[2]-1])
    })
    return answer
}