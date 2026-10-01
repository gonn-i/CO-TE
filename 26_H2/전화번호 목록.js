function solution(phone_book) {
    phone_book.sort();

    // 문자열로 정렬 -> 이중 for 문 필요없음
    for (let i = 0; i < phone_book.length - 1; i++) {
        if (phone_book[i + 1].startsWith(phone_book[i])) {
            return false;
        }
    }

    return true;
}s