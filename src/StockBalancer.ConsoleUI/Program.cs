using StockBalancer.Core;

var positions = new[]
{
    new Position { Ticker = "VTI", Quantity = 52, Price = 276.17m, TargetPercentage = 70 },
    new Position { Ticker = "VEA", Quantity = 89, Price = 52.77m, TargetPercentage = 20 },
    new Position { Ticker = "AGG", Quantity = 24, Price = 98.50m, TargetPercentage = 10 }
};

var portfolio = new Portfolio(30000, positions);

PrintPortfolio(portfolio);

var balancer = new Balancer();
var newPortfolio = balancer.Calculate(portfolio);

PrintPortfolio(newPortfolio);

void PrintPortfolio(Portfolio portfolio)
{
    Console.WriteLine();
    Console.WriteLine($"Portfolio Balance: {portfolio.Balance}$");
    Console.WriteLine($"Portfolio Total: {portfolio.Total}$");

    foreach (var position in portfolio.Positions)
    {
        Console.WriteLine($"{position.Ticker}: #{position.Quantity} @ {position.Price}$ ({portfolio.GetPositionPercentage(position):F2}%)");
    }
}