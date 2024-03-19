function solution(numbers) {
    // const dictionary_array = numbers.sort().reverse()
    const string_arr = numbers.map(item => item.toString())

    const sorted_arr = string_arr.sort(compare)
    return sorted_arr.join('') == 0 ? "0": sorted_arr.join('');
}

function compare(a, b) {
    if (a + b > b + a ) return -1;
    if (a + b < b + a ) return 1;
    return 0;
}