from collections import deque
import sys

match = 'antimatter'

def starts_with_match(d):
  for i, c in enumerate(match):
    if d[i] != c:
      return False
  return True

d = deque(sys.stdin.read().strip())
rotation = 0
while rotation < len(d):
  if starts_with_match(d):
    for _ in match:
      d.popleft()
    rot = min(rotation, len(match))
    d.rotate(rot)
    rotation -= rot
  else:
    d.rotate(-1)
    rotation += 1

print(''.join(d))