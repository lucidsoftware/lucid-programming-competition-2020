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
            budget_p = 5000
            budget_l = 5000
            while True:
                profit = 0
                loss = 0
                p_p = 0
                p_l = 0

                for stock in stocks:
                    ns = budget_p//stocks[stock][month]
                    net = (stocks[stock][n_months-1] - stocks[stock][month]) * ns
                    if net>profit:
                        profit = net
                        p_p = stocks[stock][month] * ns
                        
                    ns = budget_l//stocks[stock][month]
                    net = (stocks[stock][n_months-1] - stocks[stock][month]) * ns

                    if net<loss:
                        loss = net
                        p_l = stocks[stock][month] * ns
                       
                if profit==0 and loss==0:
                    break               
                budget_p-=p_p
                budget_l-=p_l
                profit_max+= profit
                loss_max+= loss
        print("Max: ",profit_max)
        print("Min: ",loss_max)

profits()