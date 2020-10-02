from collections import deque

class TreeNode:

    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    def insert(self, value):
        if value == self.value:
            return

        if value < self.value:
            if self.left is None:
                self.left = TreeNode(value)
            else:
                self.left.insert(value)
        else:
            if self.right is None:
                self.right = TreeNode(value)
            else:
                self.right.insert(value)

    def full_level_order(self):
        queue = deque()
        queue.append(self)
        empty_nodes_enqueued = 0
        total_nodes_output = 0

        while queue and len(queue) != empty_nodes_enqueued and total_nodes_output < 3000:
            current = queue.popleft()
            total_nodes_output += 1
            yield current if current is None else current.value

            if current is None:
                empty_nodes_enqueued += 1
                queue.append(None)
                queue.append(None)
                continue

            queue.append(current.left)
            if current.left is None:
                empty_nodes_enqueued += 1
            queue.append(current.right)
            if current.right is None:
                empty_nodes_enqueued += 1

        def is_power_of_2(n):
            return (n & (n - 1)) == 0

        while not is_power_of_2(total_nodes_output + 1):
            yield None
            total_nodes_output += 1


def main():
    import secrets
    # source = [secrets.randbelow(1000) for i in range(1000)]
    import random
    source = list(range(31))
    random.shuffle(source)


    root = None
    for i in source:
        if root is None:
            root = TreeNode(i)
        else:
            root.insert(i)

    output_nodes = list(root.full_level_order())
    print(len(output_nodes))

    for node in output_nodes:
        print(node if node is not None else "empty")


if __name__ == "__main__":
    main()



