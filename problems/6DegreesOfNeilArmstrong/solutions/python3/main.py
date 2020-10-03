from datetime import datetime

recruit = input()
edgeCount = int(input())
class AdjacencyList:
    def __init__(self):
        self.data = dict()

    def addEdge(self, student, teacher):
        if student not in self.data:
            self.data[student] = set([teacher])
        else:
            self.data[student].add(teacher)

# load edges into adjacency list
adjList = AdjacencyList()
revList = AdjacencyList()
for i in range(edgeCount):
    edge = input()
    student, teacher = edge.split(' -> ')
    adjList.addEdge(student, teacher)
    revList.addEdge(teacher, student)
    
class Node:
    def __init__(self, val, prev=None):
        self.val = val
        self.prev = prev

# breadth first search to Neil Armstrong, 
path = Node(recruit)
from collections import deque
queue = deque([path])

while len(queue) > 0 and path.val != 'Neil Armstrong':
    curr = queue.popleft()
    teachers = adjList.data.get(curr.val, [])
    for teacher in teachers:
        if teacher == 'Neil Armstrong':
            path = Node('Neil Armstrong', curr)
        else:
            queue.append(Node(teacher, curr))

# prepare output
while path is not None:
    print(path.val)
    path = path.prev

# this could be done even faster with a bidirectional bfs...