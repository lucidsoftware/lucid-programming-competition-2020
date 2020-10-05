def read_input():
    num_inputs = int(input())
    input_values = []
    for i in range(num_inputs):
        value = input()
        input_values.append(int(value))
    return input_values


def trap():
        height = read_input()
        n = len(height)
        if n==0:
            return 0
        rightmax=[0]*n
        
        mx = height[n-1]
        
        for i in range(n-1,-1,-1):
            mx = max(mx,height[i])
            rightmax[i]=mx
            
        mx = height[0]
        total = 0
        for i in range(n):
            mx = max(mx,height[i])
            total+=min(mx,rightmax[i])-height[i]
        return total

print(trap())