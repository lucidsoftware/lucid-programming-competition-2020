import sys

result = sys.stdin.read().strip()
index = 0
index = result.find('antimatter', index)
while index >= 0 and index < len(result):
  result = result[:index] + result[index+len('antimatter'):]
  index = max(0, index-len('antimatter'))
  index = result.find('antimatter', index)
print(result)
