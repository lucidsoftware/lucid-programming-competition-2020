# Galactic Profits

After you obliterated most of your savings on a failed Lunar cryptocurrency experiment, you decided to look into investing on the Martian Stock Exchange.
Using historical price data from the exchange, you want to compute the maximum gain and maximum loss you would have achieved over the past several years while using the following strategy:

Each month you invest up to and no more than 5,000 galactic credits into stocks available on the Martian Stock Exchange.
Once you have purchased a stock, you may not sell it; you must hold all purchased stocks for the rest of the simulation.
On the last month for which you have historical price data, you will compute your portfolio's total value by taking the final price for each stock and multiplying it by the number of shares of that stock you own.

To compute your overall profit (or loss) on your investments, take your total portfolio value and subtract off the number of credits that you used to make purchases.

Following the strategy described above, write a program to find the largest and smallest possible overall profit.

## Input
As input, you will receive the following:

* The number of months of historical data.
* The number of stocks included in that historical data.
* For each stock, the historic price of that stock on a given month.

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







