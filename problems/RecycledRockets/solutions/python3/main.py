import sys
import random

def quotient(line): 
    i,j = line.split(" ")
    return int(j) // int(i)

sys.stdin.readline()
print(min([quotient(line)for line in sys.stdin]))
