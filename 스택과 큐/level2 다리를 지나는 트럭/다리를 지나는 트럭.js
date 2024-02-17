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



// 다리 길이 ( 트최몇 ) : 2
// 최대 하중 : 10
//대기 배열: [ 4, 5, 6]

// 다리를 건너는 트럭 무게 t

//    [ ⬅️ ⬅️ ] 

// 다리를 건너는 큐 [  0  7 ] t ++  sum = 7 /
// 다리를 건너는 큐 [  7  0 ] t ++  sum = 7 
// 다리를 건너는 큐 [  0  0 ] t ++  sum = 0 

// 다리를 건너는 배열 [  0  4] t ++  sum = 4 
// 다리를 건너는 배열 [ 4  5 ] t ++  sum = 4 

// sum  > 10 -> 새로운 트럭 넣기 못 함 그래서 0을 넣어줌 + 젤 앞 Poll 

// t = 7  [ ]