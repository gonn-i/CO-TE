function solution(bridge_length, weight, truck_weights) {
    const on_the_bridge = Array.from({length: bridge_length}, () => 0);
    let weight_sum = 0;
    let time = 0;
    
    console.log(on_the_bridge)
    on_the_bridge.shift()
    time += 1;
    weight_sum += truck_weights[0]
    on_the_bridge.push(truck_weights.shift())
   
    while(weight_sum > 0){
        time += 1;
        weight_sum -= on_the_bridge.shift();
        if(weight_sum  + truck_weights[1] <= weight && truck_weights.length !== 0){
            weight_sum += truck_weights[0]
            on_the_bridge.push(truck_weights.shift())
        }
        else on_the_bridge.push(0)
    }
    
return time
}