
k = int(input())

a = []
b = []

for i in range(k):
    a.append(int(input()))
for i in range(k):
    b.append(int(input()))

cacheA = [0] * k
cacheB = [0] * k

cacheA[0] = a[0]
cacheA[1] = a[0] + a[1]
cacheB[0] = b[0]
cacheB[1] = b[0] + b[1] 

for i in range(k):
    if i == 0:
        i = 2
    cacheA[i] = max(cacheB[i - 2], cacheA[i - 1]) + a[i]
    cacheB[i] = max(cacheA[i - 2], cacheB[i - 1]) + b[i]

print(max(cacheA[len(a) - 1], cacheB[len(b) - 1]))