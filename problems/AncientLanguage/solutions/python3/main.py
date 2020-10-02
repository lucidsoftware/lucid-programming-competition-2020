
DATA = []
OUTPUT_BUFFER = ''

# convert string to integer value
def value(op: str):    
    return int(op)

# return the value at an addr
def addr(op: str):
    if op.startswith('&&'):
        return DATA[addr(op[1:])]
    else:
        return value(op[1:])

# return the value or value at an address (including dereferences)
def addr_or_value(op: str):
    if op.startswith('&'):
        return DATA[addr_or_value(op[1:])]
    else:
        return value(op)

def SET(op1, op2):
    DATA[addr(op1)] = addr_or_value(op2)

def ADD(op1, op2):
    address = addr(op1)
    op = addr_or_value(op2)
    total = DATA[address] + op
    if total > 127:
        DATA[address] = 127-(total & 0xff)
    elif total < -128:
        DATA[address] = total & 0xff
    else:
        DATA[address] = total

def JMP(op1, op2):
    global DATA
    if addr_or_value(op1) == 0:
        DATA[0] = addr_or_value(op2)

def OUT(op1, op2):
    global OUTPUT_BUFFER
    if value(op2) == 1:
        OUTPUT_BUFFER += str(addr_or_value(op1))
    else:
        OUTPUT_BUFFER += chr(addr_or_value(op1))

def execute(program):
    global OUTPUT_BUFFER
    global DATA
    DATA = [0] * 1024
    OUTPUT_BUFFER = ''
    while True:
        line = program[DATA[0]].strip().split(' ')
        DATA[0] += 1
        instruction = line[0]
        if instruction == 'SET':
            SET(line[1], line[2])
        elif instruction == 'ADD':
            ADD(line[1], line[2])
        elif instruction == 'JMP':
            JMP(line[1], line[2])
        elif instruction == 'OUT':
            OUT(line[1], line[2])
        else:
            if len(OUTPUT_BUFFER) > 0:
                print(OUTPUT_BUFFER)
            return

if __name__ == '__main__':
    lines_to_read = int(input())
    program = []
    for i in range(lines_to_read):
        program.append(input())
    execute(program)