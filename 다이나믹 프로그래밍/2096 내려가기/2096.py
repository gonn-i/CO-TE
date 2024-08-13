import sys

input = sys.stdin.readline

N = int(input())

dp_max = [[0] * 3 for _ in range(2)]
dp_min = [[0] * 3 for _ in range(2)]

for i in range(N):
    a, b, c = map(int, input().split())
    
    if i == 0:
        dp_max[0][0], dp_max[0][1], dp_max[0][2] = a, b, c
        dp_min[0][0], dp_min[0][1], dp_min[0][2] = a, b, c
    else:
        dp_max[1][0] = max(dp_max[0][0] + a, dp_max[0][1] + a)
        dp_min[1][0] = min(dp_min[0][0] + a, dp_min[0][1] + a)

        dp_max[1][1] = max(dp_max[0][0] + b, dp_max[0][1] + b, dp_max[0][2] + b)
        dp_min[1][1] = min(dp_min[0][0] + b, dp_min[0][1] + b, dp_min[0][2] + b)

        dp_max[1][2] = max(dp_max[0][1] + c, dp_max[0][2] + c)
        dp_min[1][2] = min(dp_min[0][1] + c, dp_min[0][2] + c)

        dp_max[0][0], dp_max[0][1], dp_max[0][2] = dp_max[1][0], dp_max[1][1], dp_max[1][2]
        dp_min[0][0], dp_min[0][1], dp_min[0][2] = dp_min[1][0], dp_min[1][1], dp_min[1][2]

print(max(dp_max[0]))
print(min(dp_min[0]))
