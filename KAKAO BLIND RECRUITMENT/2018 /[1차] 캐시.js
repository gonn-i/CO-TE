function solution(cacheSize, cities) {
  let cache_arr = [];
  let runTime = 0;

  cities.forEach((city) => {
    let idx = cache_arr.indexOf(city.toLowerCase());
    if (idx !== -1) {
      // 캐시hit
      runTime += 1;
      cache_arr = cache_arr.filter((e) => e !== city.toLowerCase());
      cache_arr.unshift(city.toLowerCase());
    } else {
      // 캐시 miss
      runTime += 5;
      cache_arr.unshift(city.toLowerCase());
    }
    if (cache_arr.length - cacheSize > 0) {
      // 캐시 공간 없음
      cache_arr.pop();
    }
  });
  return runTime;
}
