# Ancient Language
## Description
In a recent dig on Old Earth, archaeoligists discovered an ancient tome describing a long forgotten language. After much study, experts at the museum have come to the astonishing conclusion that the tome contains the specifications for an early, primitive language for computation. You have been tasked with implementing an interpreter for this language in preparation for an upcoming presentation on the discovery.

Implement the interpreter according to the following specifications:

### Grammar
```
PROGRAM      ->  INSTRUCTION <new-line> PROGRAM | INSTRUCTION <new-line> "EXT"
INSTRUCTION  ->  "SET" ADDR (ADDR|NUM) | 
                 "ADD" ADDR (ADDR|NUM) | 
                 "JMP" (ADDR|NUM) (ADDR|NUM) | 
                 "OUT" (ADDR|NUM) ("0"|"1")
ADDR         ->  ("&")+(NUM)
NUM          ->  [0-9]+
```

### Instructions

```
SET {A} {B} - Stores a value B (or indicated by the address at B) into address A

ADD {A} {B} - Adds the value in A to the value B (or the value indicated by address B) and stores the result into address A

JMP {A} {B} - If A (or the value indicated by address A) is 0, execute the instruction at line B of the program next, else move on to the next instruction

OUT {A} {B} - If B is 0, print the value at A (or the value indicated by address A) as an ASCII character, else print it as a raw number

EXT - stop execution of the program
```
#### Special note on addresses
A memory address looks like this: "&2". The "&" denotes that the "2" is an address in memory rather than a raw number. Multiple "&"s can be strung together for extra layers of indirection. For example, "&&&2" suggests that we should look at memory address 2 to find another memory address that leads to yet another memory address which is holding the final, desired value. (Memory[Memory[Memory[2]]])

### Memory Model and Program Execution
Memory for these programs is expected to support memory addresses from 0 to 127; the word size for a memory address is 8 bits, and supports integers from -128 to 127. Data and instructions are stored separately, and the line numbers for instructions start at 0.

When a program executes, it starts at line 0 of the instructions, reads the instruction, increments the line number, THEN executes the previously read instruction. The current line number to read is always stored in memory address 0, updated between the read and execute phases, and altered by JMP instructions. Program execution halts when an "EXT" instruction is executed.

## Input
```
SET &1 65
SET &2 4
SET &3 2 
OUT &1 0
ADD &2 -1
JMP &&3 6
JMP 0 1
EXT
```
## Output
```
AAAAA
```
