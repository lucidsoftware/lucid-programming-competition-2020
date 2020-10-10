"""
This is an example of a naive solution that is too slow.
"""
import sys

for line in sys.stdin:
  result = line.strip()
  while 'antimatter' in result:
    result = result.replace('antimatter', '')
  print(result)