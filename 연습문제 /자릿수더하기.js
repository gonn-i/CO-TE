function solution(n)
{
    var ans = 0;
    let arr = n.toString().split('')

    arr.forEach((i) => ans += Number(i) )
    return ans;
}

// code version2
function solution(n)
{
    var ans = 0;
    
    const recursion = (n) => {
        if(n  < 10) {
            ans += n
            return;
        }
        
        ans += n % 10;
        recursion(Math.floor(n / 10));
    }
    
    recursion(n)
    return ans;
}