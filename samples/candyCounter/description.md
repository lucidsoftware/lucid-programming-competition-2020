# Candy Counter
You see a bowl full of candy and have a group of friends who you know each want a piece. You are given the number of friends who each want a piece, and the amount of candy in the bowl. If there is enough candy to get a piece for everyone, output the amount remaining in the bowl after you take one piece for every friend and one piece for yourself. If there is not enough candy in the bowl for you and each of your friends to have a piece, output the string "Not enough candy."

## Input
You will be given a number of friends and the amount of candy in the following format:
```
Friends: <number>
Candy: <number>
```
Both friends and candy will be positive integers.

## Constraints
* Friends and candy are both positive integers.
* 0 < Friends < 10^5
* 0 < Candy < 10^5

## Output
Output the amount of candy remaining if there is candy leftover, or the string "Not enough candy." if there is not.

## Examples
<table>
    <tr>
        <th>Input 1</th>
        <th>Input 2</th>
    </tr>
    <tr>
        <td>
            <pre>Friends: 3
Candy: 7</pre>
        </td>
        <td>
            <pre>Friends: 5
Candy: 2</pre>
        </td>
    </tr>
    <tr>
        <th>Output 1</th>
        <th>Output 2</th>
    </tr>
    <tr>
        <td>
            <pre>3</pre>
        </td>
        <td>
            <pre>Not enough candy.</pre>
        </td>
    </tr>
</table>