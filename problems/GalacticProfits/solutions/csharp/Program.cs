using System;
using System.Collections.Generic;
using System.Linq;

using StockName = System.String;
using Price = System.Int32;

/*
 This solution was a lot cooler when the problem was more complicated.
 In order to not make it a horrible exercise in optimizing a linear combination
 we changed it to just require a greedy solution, and all these classes
 are overkill.
*/

class CapitalGain
{

    public StockName StockName { get; }
    public Price StartingPrice { get; }
    public Price EndingPrice { get; }

    public CapitalGain(StockName stockName, Price start, Price end)
    {
        this.StockName = stockName;
        this.StartingPrice = start;
        this.EndingPrice = end;
    }

    public bool WillGainMoney()
    {
        return this.EndingPrice - this.StartingPrice > 0;
    }

    public bool WillLoseMoney()
    {
        return this.EndingPrice - this.StartingPrice < 0;
    }

    public int ComputeGain(int maxSpend)
    {
        int numShares = maxSpend / this.StartingPrice;
        return numShares * (this.EndingPrice - this.StartingPrice);
    }

}

class Month : Dictionary<StockName, Price>
{
    public List<CapitalGain> ComputePotentialCapitalGainsWith(Month endMonth)
    {
        return this.Select(
            kvpair => new CapitalGain(kvpair.Key, kvpair.Value, endMonth[kvpair.Key])
        ).ToList();
    }
}

class StockPriceTable : Dictionary<StockName, List<Price>>
{

    private Month GetMonth(Func<List<Price>, Price> extractor)
    {
        var month = new Month();
        foreach (var kvpair in this)
        {
            month[kvpair.Key] = extractor(kvpair.Value);
        }
        return month;
    }

    public Month GetMonth(int monthIndex)
    {
        return this.GetMonth(prices => prices[monthIndex]);
    }

    private Month lastMonth = null;

    public Month GetFinalMonth()
    {
        if (lastMonth == null)
        {
            lastMonth = GetMonth(prices => prices.Last());
        }
        return lastMonth;
    }

}

class Portfolio
{

    public int TotalMoneySpent { get; private set; } = 0;
    private Dictionary<StockName, int> stocks = new Dictionary<StockName, int>();

    public int PurchaseStock(int price, StockName stockName, int quantity)
    {
        if (!stocks.ContainsKey(stockName))
        {
            stocks[stockName] = 0;
        }

        var cost = price * quantity;

        TotalMoneySpent += cost;
        stocks[stockName] += quantity;

        return cost;
    }

    public int PortfolioValue(Month month)
    {
        return stocks.Select(kv =>
        {
            var stockPrice = month[kv.Key];
            var stockQuantity = kv.Value;

            return stockPrice * stockQuantity;
        }).Sum();
    }

    public int GetProfit(Month month)
    {
        return PortfolioValue(month) - TotalMoneySpent;
    }

}


class Program
{
    const int MonthlyMoney = 5000;

    public static void Main(string[] args)
    {
        int numMonths = Int32.Parse(Console.ReadLine());
        int numStocks = Int32.Parse(Console.ReadLine());

        var stockPrices = new StockPriceTable();

        for (int stock = 0; stock < numStocks; stock++)
        {
            StockName stockName = Console.ReadLine();
            List<Price> prices = Console.ReadLine()
                .Split(" ")
                .Select(price => Int32.Parse(price))
                .ToList();

            stockPrices[stockName] = prices;
        }

        var losingProfit = 0;
        var winningProfit = 0;

        for (int month = 0; month < numMonths - 1; month++)
        {
            var currentMonth = stockPrices.GetMonth(month);
            var finalMonth = stockPrices.GetFinalMonth();

            var potentialGains = currentMonth.ComputePotentialCapitalGainsWith(finalMonth);
            var maxGain = potentialGains.Max(gain => gain.ComputeGain(MonthlyMoney));
            var minGain = potentialGains.Min(gain => gain.ComputeGain(MonthlyMoney));

            if (maxGain > 0) {
                winningProfit += maxGain;
            }

            if (minGain < 0) {
                losingProfit += minGain;
            }

        }

        Console.WriteLine($"Max: {winningProfit}");
        Console.WriteLine($"Min: {losingProfit}");
    }
}
