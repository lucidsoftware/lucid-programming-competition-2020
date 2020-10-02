# 6 Degrees of Neil Armstrong
## Description
At the United Solar Systems Naval Academy on Alpha Centauri, there is a proud sense of history and tradition. Founded in the year 2357 after the collapse of the Galactian's Republic of Federated Planets, the United Solar Systems looked backward to the unifying and inspiring influence of the Space Race in the 1960's to build a more cohesive space-faring empire.

As a side effect of this cultural reverence, new recruits to the U.S.S Naval Academy take great pride in tracing their "lineage" within the academy back to Neil Armstrong, the First Man on the Moon. Recruits who can trace the shortest path from themselves, through their teachers, and teachers teachers to Neil Armstrong are afforded greater social prestige than their peers.

Given a list of relationships from students to their teachers and the name of a specific recruit, produce the shortest path from that recruit to Neil Armstrong.

### Input
The first line of input will be the name of a recruit.
The second line will be a number _E_, followed by _E_ lines of pairs of names.
```
Bismuth Rotaxian
8
Bismuth Rotaxian -> Garfunkel Torol Booth
Rhaj Dasgupta -> Garfunkel Torol Booth
Garfunkel Torol Booth -> Bob Behnken
Peggy Whitson -> Neil Armstrong
Garfunkel Torol Booth -> Peggy Whitson
Buzz Aldrin -> Kevin Bacon
Bob Behnken -> Buzz Aldrin
Buzz Aldrin -> Neil Armstrong
```

### Output
A list of names, one on each line, beginning with the Neil Armstrong, and ending with the recruit
```
Neil Armstrong
Peggy Whitson
Garfunkel Torol Booth
Bismuth Rotaxian
```
