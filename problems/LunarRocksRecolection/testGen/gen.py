import random
arr = [5, 10, 50, 100, 500, 1000, 5000, 10000]
names = ['0.in', '1.in', '2.in', '3.in', '4.in', '5.in', '6.in', '7.in']

max = 2000

for k, name in zip(arr, names):
    f = open('./' + name, 'w+')
    f.write( str(k) + '\n')
    nums = ''
    for i in range(k):
        nums = nums + str(random.randint(1, max)) + '\n'
    for i in range(k):
        nums = nums + str(random.randint(1, max)) + '\n'
    f.write(nums)

