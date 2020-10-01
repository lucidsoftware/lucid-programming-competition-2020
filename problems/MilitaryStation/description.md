# Military Station
## Description
You have been hired to build a military space station for the Galactic Empire. The station will be shaped like a giant cube. Each level will be shaped like a square, with rooms forming a grid inside. For this particular space station, the emperor is very concerned about having the correct number of rooms with transport ship access. Each exterior room (rooms touching the outside of the square) will have transport ship access, while each interior room (rooms not touching the outside of the square) will not have transport ship access. For a given level, the emperor will tell you the percentage of rooms that should have transport ship access. You must determine the number of rooms needed to achieve the proper percentage exterior (transport access) rooms. If there are multiple possible configurations of rooms, give the configuration where the number of rooms along each side are the most similar.
For example, if you want 75% of rooms to have transport ship access, you could arrange the rooms in a 4x4 grid or a 3x8 grid. The 4x4 grid would give the correct answer, because 4 and 4 are closer together than 3 and 8.

| X | X | X | X |
| - | - | - | - |
| X |   |   | X |
| X |   |   | X |
| X | X | X | X |

*12 exterior rooms, 4 interior rooms*

| X | X | X | X | X | X | X | X |
| - | - | - | - | - | - | - | - |
| X |   |   |   |   |   |   | X |
| X | X | X | X | X | X | X | X |

*18 exterior rooms, 6 interior rooms*

## Input
Your input will be a single integer `P` that gives the percentage of rooms that should have transport ship access (that is, exterior rooms).

## Output
Your output will be a single integer `N` that tells the number of rooms needed to achieve the correct percentage of transport-accessible rooms.

## Constraints
0 < `P` < 100
All given percentages will be possible to achieve. P will always be an integer.

## Example

| Input 1	|	Output 1 |
| --- | ---|
| 50	|	48 |

| Input 2	|	Output 2 | 
| --- | --- |
| 10	|	1520 |
