import sys

def read_input():
    n_months = int(input())
    n_stocks = int(input())
    stocks = {}
    for i in range(n_stocks):
        name = input()
        prices = list(map(int, input().split()))
        stocks[name] = prices
    return n_months, n_stocks, stocks


def profits():
        n_months, n_stocks, stocks = read_input()
        profit_max = 0
        loss_max = 0
        for month in range(n_months):
            budget = 5000
            profit = 0
            loss = 0 
            for stock in stocks:
                ns = budget//stocks[stock][month]
                net = (stocks[stock][n_months-1] - stocks[stock][month]) * ns
                profit = max(net,profit)
                    
                ns = budget//stocks[stock][month]
                net = (stocks[stock][n_months-1] - stocks[stock][month]) * ns
                loss = min(net,loss) 
                              
            profit_max+= profit
            loss_max+= loss
        print("Max: ",profit_max)
        print("Min: ",loss_max)

profits()