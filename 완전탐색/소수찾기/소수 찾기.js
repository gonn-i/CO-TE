function solution(numbers) {
    var answer = [];
    let num_Arr = numbers.split('').sort((a, b) => b - a);
    let max = parseInt(num_Arr.join(''));
    let prime_Arr = [];

    for (let i = 2; i <= Math.sqrt(max); i++) {
        let prime = true;
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                prime = false;
                break;
            }
        }
        if (prime) prime_Arr.push(i);
    }

    prime_Arr.forEach((e) => {
        let contain = true;
        let num = e.toString();
        let str_n = num.split('');

        for (let i = 0; i < num_Arr.length; i++) {
            if (!str_n.includes(num_Arr[i])) {
                contain = false;
                break;
            }
        }
        if (contain) answer.push(num);
    });
    
    return answer;
}
