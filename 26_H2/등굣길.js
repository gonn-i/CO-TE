// DP - 55m
function solution(m, n, puddles) {
    const dp = Array.from(
        { length: n },
        () => Array(m).fill(0)
    );

    const blocked = Array.from(
        { length: n },
        () => Array(m).fill(false)
    );

    for (const [x, y] of puddles) {
        blocked[y - 1][x - 1] = true;
    }

    dp[0][0] = 1;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (blocked[i][j]) continue;
            if (i === 0 && j === 0) continue;

            const up = i > 0 ? dp[i - 1][j] : 0;
            const left = j > 0 ? dp[i][j - 1] : 0;

            dp[i][j] = (up + left) % 1000000007;
        }
    }

    return dp[n - 1][m - 1];
}