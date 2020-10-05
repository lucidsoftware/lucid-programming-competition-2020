 # Space Highways

 ## Description
The galactic republic wants to construct hyperspace highways to connect all the planetary systems in its jurisdiction. However, hyperspace highways are expensive, and the ongoing war with the separatists is using much of the government’s money. As the designated construction planner, it is up to you to minimize the cost of this new group of hyperspace highways. Each highway can connect exactly two planetary systems together. You will need to build just enough highways to connect all of the given planetary systems, such that a ship starting at one system could traverse a number of highways to end up at any other planet. A committee has already gathered a list of all the planetary systems that need to be connected. They have also listed potential pairs of planets to connect with highways, as well as the cost to build a highway for each potential connection. Given this information, what is the lowest cost you could spend to connect all the systems together?

## Input
First line:
```
N E
```
`N` => number of planetary systems

`E` => number of potential places to build highways

The first line is followed by `N` lines, each with the name of a planetary system.
```
<name>
<name>
<name>
...
```
The list of systems is then followed by `E` lines. Each line gives a potential place for highways to be build, as well as the cost of building there.
```
<name> <name> <cost>
<name> <name> <cost>
...
```

## Output
Your output will be a single integer that tells the total minimum cost of a group of highways that can connect all the planetary systems

## Constraints
0 < `N` <= 1000

`N`-1 < `E` < 10000

There will be no duplicates in the given potential highway locations. That is, for any two planets, there will be at most one cost given to connect them directly. 

Costs will be integers between 1 and 1000.

Each planet name will be a single word with no spaces.

## Examples
Input 1
```
3 3
Dantooine
Kamino
Geonosis
Dantooine Kamino 3
Dantooine Geonosis 2
Kamino Geonosis 1
```
Output 1
```
3
```
Input 2
```
4 6
Bespin
Hoth
Naboo
Musafar
Bespin Hoth 5
Bespin Naboo 8
Bespin Mustafar 3
Hoth Naboo 4
Hoth Mustafar 6
Naboo Mustafar 9
```
Output 2
```
12
```
