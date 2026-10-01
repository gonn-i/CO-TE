function solution(participant, completion) {
    let people = new Map();
    let ans = [];
    
    participant.map((person) => {
        let prev = people.get(person) ?? 0;
        
        people.set(person, prev +1)
    })
    
    completion.map((person) => {
        let prev = people.get(person);
        
        if (prev > 1) people.set(person, prev -1)
        else people.delete(person)
    }) 
    
    people.forEach((value, key) => {
        ans.push(key)
    })
    
    return (ans.join(''))
}