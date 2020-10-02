#!/usr/bin/env python3

import argparse
import uuid
import secrets

parser = argparse.ArgumentParser()
parser.add_argument('--months', type=int, required=True)
parser.add_argument('--stocks', type=int, required=True)
args = parser.parse_args()

months = args.months
stocks = args.stocks

print(months)
print(stocks)
for s in range(stocks):
    print(f"Shady-Co-{s}")
    print(" ".join([str(secrets.randbelow(4950) + 1) for m in range(months)]))
