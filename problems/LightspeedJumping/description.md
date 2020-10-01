# Lightspeed Jumping
## Description
You're flying a starship out in deep space. You have a teleportation engine that can help your ship instantly jump towards home. The teleportation engine fluctuates randomly in how well it works - sometimes it only jumps a short distance, and other times it jumps very far. The ship will never jump past your home planet. If your ship tries to jump past home, it instead stops once you've reached your home planet. Given a distance from home and an engine with set max jump distance, how many jumps will it take you (on average) to get home?

To calculate how far your starship jumps, you are given a max jump distance of X parsecs. Each time your ship jumps, it will jump a random number of parsecs between 1 and X. Your ship can only jump a whole number of parsecs, and will always jump at least 1 parsec. Each possible jump distance is equally likely.
For example, if your max jump distance is 5, then on each jump, your ship is equally likely to jump 1, 2, 3, 4, or 5 parsecs forward.

## Input
`N  X`

`N` => The number of parsecs your starship starts from home.

`X` => The max number of parsecs your starship teleportation engine is able to jump.

## Output
The average number of jumps it will take your ship to get home, rounded to the nearest two decimal places.

## Constraints
0 < `N` < 10,000  
0 < `X` < 10,000

`N` and `X` will always be integers.

## Example

| Input 1	|	Output 1 |
| --- | --- |
| 2  4	|	1.25 |

| Input 2	|	Output 2 |
| --- | --- |
| 10  4	|	4.40 |
