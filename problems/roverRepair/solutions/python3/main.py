class TreeNode:

    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right


def read_levelorder_tree():
    num_inputs = int(input())

    for i in range(num_inputs):
        node_value = input()
        if node_value == "empty":
            yield None
        else:
            yield int(node_value)


def construct_tree_from_levelorder_array(tree_array):
    num_non_leaf_nodes = len(tree_array) // 2
    for i in range(num_non_leaf_nodes):
        tree_array[i].left = tree_array[i * 2 + 1]
        tree_array[i].right = tree_array[i * 2 + 2]
    return tree_array[0]


def tree_to_inorder_array(root_node):
    if root_node is None:
        return []

    left_inorder = tree_to_inorder_array(root_node.left)
    right_inorder = tree_to_inorder_array(root_node.right)

    left_inorder.append(root_node.value)
    left_inorder.extend(right_inorder)

    return left_inorder


def find_misplaced_values(ordered_arr):
    for i in range(len(ordered_arr)):
        is_left_good = ordered_arr[i - 1] < ordered_arr[i] if i > 0 else True
        is_right_good = ordered_arr[i] < ordered_arr[i + 1] if i < len(ordered_arr) - 1 else True

        if not is_left_good or not is_right_good:
            yield ordered_arr[i]


def main():
    tree_array = list([TreeNode(value) for value in read_levelorder_tree()])
    root_node = construct_tree_from_levelorder_array(tree_array)

    inorder_traversal = tree_to_inorder_array(root_node)
    inorder_traversal_numbers_only = list([value for value in inorder_traversal if value is not None])

    bad_values = find_misplaced_values(inorder_traversal_numbers_only)
    bad_values = list(sorted(bad_values))

    print(f"Swap nodes {bad_values[0]} and {bad_values[-1]}")

if __name__ == "__main__":
    main()
