function solution(bridge_length, weight, truck_weights) {
    const on_the_bridge = Array.from({length: bridge_length}, () => 0);
    let weight_sum = 0;
    let time = 0;
    
    console.log(on_the_bridge)
    time += 1;
    weight_sum += truck_weights[0]
    on_the_bridge.push(truck_weights.shift())
    
    while(sum + truck_weights[1] && truck_weights.length !== 0) {
        weight_sum += truck_weights[0]
        if(weight_sum <= weight && on_the_bridge.length <= bridge_length ) {
            // 다리 위 기차 +1 
            on_the_bridge.push(truck_weights.shift());
        } else {
            
            
        }
    }
}