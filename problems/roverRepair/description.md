# Rover Repair

Dr. Sheila Simmons is an engineer at NASA working on the electrical systems for a new rover that will explore the Jezero crater on Mars.
She has noticed a glitch in the autonomous driving system, and has traced it to some radiation-hardened processing nodes that have been wired incorrectly.

Each processing node comes equipped with two input connectors on the left and right.
These allow the processing node to be connected to two or more sub-processing nodes.
Each processing node also comes equipped with a single output connector that allows the node to act as a sub-processing node for a "parent" processor.
These connectors allow all the nodes to be connected together in a tree structure.

Every processing node is labeled with a unique part number.
In order to work correctly, the processing tree must follow a strict, but simple set of rules.
Any sub processor connected via the left port must have a part number that is strictly less than the processing node it connects to.
Similarly, any sub processor connected via the right port must have a part number that is strictly greater than the processing node it connects to.

For example, the following is a _valid_ processing tree:
```
   10
   / \
  5   16
 / \    \
3   6   20
```

Dr. Simmons believes that two processing nodes in the rover she is fixing have been swapped by accident.
Write a program that identifies which nodes have been swapped so she can make the processing tree valid again.

# Input / Output
Your input consists of the current structure of the rover's processing tree.
The first row of input consists of the total number of nodes you will read in, _including any empty nodes_.
Each row of the input represents the label of a single node, or if there is no processor in that location, it will be labeled "empty".
The order of the nodes is in _level order_, that is, the the nodes are listed from top to bottom, left to right order.

For example, consider the following _invalid_ processing tree:
```
   10
   / \
  6   16
 / \    \
3   5   20
```

The input for this tree would look like this:
```
7
10
6
16
3
5
empty
20
```

Your output should take the following format:
```
Swap nodes 5 and 6
```
For consistency, always list the two nodes so that node with the lower number comes _first_.

# Constraints
* The number of total nodes in the system will be between 3 and 65535.
* The part numbers will range from 1 to 2,147,483,647.
* It is guaranteed that a single swap will fix the tree.
* It is invalid to swap with an empty node. Only numbered nodes can be swapped.
* The input tree will be fully specified in level-order, including any empty nodes.
* The number of nodes in the input will always be one less than a power of 2.

# Examples
## Input 0:

```
7
10
6
16
3
5
empty
20
```

## Output 0:

```
Swap nodes 5 and 6
```

## Input 1:

```
7
8
3
14
1
6
empty
10
```

## Output 1:

```
Blah
```

## Input 2:
```
15
50
19
72
12
23
54
76
9
14
17
empty
empty
67
empty
empty

```

## Output 2:
```
```


