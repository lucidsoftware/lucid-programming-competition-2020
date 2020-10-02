# Recycled Rockets

You have a list of spare rocket parts and their quantities that are sitting around in a warehouse. You also have a list with all the parts (and quantities) required to build a new rocket. Using only the spare parts in the warehouse, how many rockets can you build?

## Input

```
<number of different types of parts>
<required amount of part 1 for rocket> <spare amount of part 1 in warehouse>
<required amount of part 2 for rocket> <spare amount of part 2 in warehouse>
<required amount of part 3 for rocket> <spare amount of part 3 in warehouse>
...
```

## Output

```<how many rockets can be built>```

## Example

### Input
```
2
4 23
7 60
```
### Output
```
5
```

## Constraints
* Where `n` is the number of different types of parts, `2 <= n <= 5000000`
* Where `p` is the required or spare amount for any given part, `1 <= r <= MAX_INT`