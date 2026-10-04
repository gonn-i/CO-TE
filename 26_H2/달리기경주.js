function solution(players, callings) {
    let temp = {};
    
    players.forEach((player, idx) => {
        temp[player] = idx;
    })
    
    callings.forEach((call) => {
        let rank = temp[call]; 
        let front_player = players[rank-1];
        
        players[rank] = front_player;
        players[rank -1] = call;
        
        temp[front_player] = rank;
        temp[call] = rank -1;
        
    })
    
    
    return (players)
}