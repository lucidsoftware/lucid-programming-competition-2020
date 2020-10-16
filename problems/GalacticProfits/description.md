# Galactic Profits

After you obliterated most of your savings on a failed Lunar cryptocurrency experiment, you decided to look into investing on the Martian Stock Exchange.
Using historical price data from the exchange, you want to compute the maximum gain and maximum loss you would have achieved over the past several years while using the following strategy:

Each month you may invest up to 5,000 galactic credits into purchasing stocks available on the Martian Stock Exchange.
You may purchase as many shares as you like as long as the total purchase price for the month is less than or equal to 5,000 credits.
You may buy stock in different companies throughout the simulation, but **in a given month, you must only purchase stock in a single company**.

Once you have purchased a stock, you may not sell it; you must hold all purchased stocks for the rest of the simulation.
On the last month for which you have historical price data, you will compute your portfolio's total value by taking the final price for each stock and multiplying it by the number of shares of that stock you own.

As a measure of how successful your investing was, you'll want to calculate your return. To compute your return, take your total portfolio value and subtract off the number of credits that you used to make purchases.
```
Return = PortfolioValue - PurchaseCost
```

Following the strategy described above, write a program that finds the largest and smallest possible returns, given a table of historical stock data.

## Input
As input, you will receive the following:

* The number of months of historical data.
* The number of stocks included in that historical data.
* For each stock, the historic price of that stock on a given month (stock prices only change once a month on the Martian Stock Exchange)

The input will be formatted as follows:
```
<number of months, m>
<number of stocks, s>
<name of stock 1>
<price_1> <price_2>...<price_m>
<name of stock 2>
<price_1> <price_2>...<price_m>
...
<name of stock s>
<price_1> <price_2>...<price_m>
```

## Output
Output the maximum and minimum gains on seperate lines, as follows:
```
Max: <maximum>
Min: <minimum>
```

## Constraints
* Where `m` is the number of months, `2 <= m <= 600`
* Where `s` is the number of stocks, `1 <= s <= 65535`
* Names of stocks will be no longer than 256 ASCII characters and will not contain any whitespace characters.
* The price of an individual stock will be an integer value between `1` and `5000` (inclusive).
* _Use it or lose it_: If you invest less than 5000 credits in a given month, you cannot carry over the remaining balance to another month.
* 


## Examples

### Input 0
```
4
3
Dusty_Logistics
32 20 82 78
Red_Rovers
64 21 70 47
Methane_Holdings_Co
70 77 18 75
```

### Output 0
```
Max: 37465
Min: -3087
```

### Input 1
```
6
3
Dusty_Logistics
1200 1300 1400 800 1200 2200
Red_Rovers
120 390 410 450 540 200
Methane_Holdings_Co
25 20 65 86 67 30
```

### Output 1
```
Max: 22145
Min: -11322
```
