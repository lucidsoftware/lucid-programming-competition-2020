import heapq
from collections import defaultdict


def main():
    available_nodes = []

    number_nodes, number_edges = map(int, input().split())

    unconnected_nodes = set([ input() for n in range(number_nodes) ])
    adjacency_matrix = defaultdict(lambda: defaultdict(lambda: float('inf')))

    total_cost = 0

    for e in range(number_edges):
        node_a, node_b, cost = input().split()
        cost = int(cost)
        adjacency_matrix[node_a][node_b] = cost
        adjacency_matrix[node_b][node_a] = cost

    current_node = node_a
    while True:
        # Add current node into spanning tree
        unconnected_nodes.remove(current_node)
        if len(unconnected_nodes) == 0:
            break

        for neighbor, cost in adjacency_matrix[current_node].items():
            heapq.heappush(available_nodes, (cost, neighbor))

        while current_node not in unconnected_nodes:
            cost, current_node = heapq.heappop(available_nodes)

        total_cost += cost

    print(total_cost)


if __name__ == "__main__":
    main()
