using System;
using System.Collections.Generic;
using System.Linq;

using StockName = System.String;
using Price = System.Int32;


class CapitalGain {

    public StockName StockName { get; }
    public Price StartingPrice { get; }
    public Price EndingPrice { get; }


    public CapitalGain(StockName stockName, Price start, Price end) {
        this.StockName = stockName;
        this.StartingPrice = start;
        this.EndingPrice = end;
    }

    public double ExpectedReturnRatio() {
        return (double)EndingPrice / (double)StartingPrice;
    }

    public bool WillGainMoney() {
        return this.EndingPrice - this.StartingPrice > 0;
    }

    public bool WillLoseMoney() {
        return this.EndingPrice - this.StartingPrice < 0;
    }

}

class Month : Dictionary<StockName, Price>
{
    public List<CapitalGain> ComputePotentialCapitalGainsWith(Month endMonth) {
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

    public int TotalMoneySpent {get; private set;} = 0;
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

    public int PortfolioValue(Month month) {
        return stocks.Select(kv => {
            var stockPrice = month[kv.Key];
            var stockQuantity = kv.Value;

            return stockPrice * stockQuantity;
        }).Sum();
    }

    public int GetProfit(Month month) {
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

        var losingPortfolio = new Portfolio();
        var winningPortfolio = new Portfolio();

        for (int month = 0; month < numMonths - 1; month++)
        {
            var currentMonth = stockPrices.GetMonth(month);
            var finalMonth = stockPrices.GetFinalMonth();

            var orderedGains = currentMonth.ComputePotentialCapitalGainsWith(finalMonth).OrderBy(gain => gain.ExpectedReturnRatio()).ToList();

            var remainingLosingMoney = MonthlyMoney;
            var remainingWinningMoney = MonthlyMoney;

            for (int i = 0; i < orderedGains.Count; i++) /* in order of worst gains first */ {
                var gain = orderedGains[i];
                if (gain.WillGainMoney()) {
                    break;
                }

                var quantityToPurchase = remainingLosingMoney / gain.StartingPrice;

                if (quantityToPurchase > 0) {
                    int cost = losingPortfolio.PurchaseStock(gain.StartingPrice, gain.StockName, quantityToPurchase);
                    remainingLosingMoney -= cost;
                }
            }

            for (int i = orderedGains.Count - 1; i >= 0; i--) /* in order of best gains first */ {
                var gain = orderedGains[i];
                if (gain.WillLoseMoney()) {
                    break;
                }

                var quantityToPurchase = remainingWinningMoney / gain.StartingPrice;
                if (quantityToPurchase > 0) {
                    int cost = winningPortfolio.PurchaseStock(gain.StartingPrice, gain.StockName, quantityToPurchase);
                    remainingWinningMoney -= cost;
                }

            }

        }

        Console.WriteLine("Max: " + winningPortfolio.GetProfit(stockPrices.GetFinalMonth()));
        Console.WriteLine("Min: " + losingPortfolio.GetProfit(stockPrices.GetFinalMonth()));

    }
}
