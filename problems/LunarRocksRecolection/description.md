# Lunar Rocks Recolection 
In your latest mission to the Moon, NASA informs you that there are 2 drills one on each side of the moon. At the end of the day each drill outputs a different amount of rocks and then ejects them to space if there is no one to collect them. NASA is obviously rethinking this system but in the meantime they sent you to help them get the as many rocks as possible. Before you travel to the Moon, NASA  gives you a list with the amount of rocks that each drill will output each day, but also warns you that, because of the distance between the 2 drills, traveling between them will take a full day and you wont reach the other drill before the ejection, meaning that, to change drills you will have to miss a day of recollection. Your task is to come back with the maximum of rocks possible.

## Input
The input consists in:

The number K of days tha you will be estaying in the Moon followed by K numbers (The output of the first drill each day) followed by K numbers (The output of the second drill each day)

```
k
a0 
a1 
... 
a(k-1)
b0 
b1 
... 
b(k-1)
```



## Output
Output the maximum amount of rocks that you can collect


```
m
```


## Constraints

* `2 <= k <= 10000`
* `1 <= ai|bi <= 200000`


## Example

### Input

```
5
8
5
2
16
18
10
11
1
3
3
```

### Output

```
55
```