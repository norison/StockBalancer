namespace StockBalancer.Core;

public class Balancer : IBalancer
{
    public Portfolio Calculate(Portfolio portfolio)
    {
        var totalValue = portfolio.Positions.Sum(p => p.Quantity * p.Price);
        var totalAvailable = totalValue + portfolio.Balance;
        var newBalance = portfolio.Balance;

        var targetValues = portfolio.Positions.ToDictionary(
            p => p.Ticker,
            p => totalAvailable * (p.TargetPercentage / 100m)
        );

        var currentValues = portfolio.Positions.ToDictionary(
            p => p.Ticker,
            p => p.Quantity * p.Price
        );

        var newPositions = portfolio.Positions.Select(p => new Position
        {
            Ticker = p.Ticker, Quantity = p.Quantity, Price = p.Price, TargetPercentage = p.TargetPercentage
        }).ToList();

        bool purchased;
        do
        {
            purchased = false;
            var buyOptions = newPositions
                .Select(p => new { p.Ticker, p.Price, Deficit = targetValues[p.Ticker] - currentValues[p.Ticker] })
                .Where(x => x.Deficit > 0 && newBalance >= x.Price)
                .OrderByDescending(x => x.Deficit)
                .ToList();

            foreach (var option in buyOptions)
            {
                if (newBalance < option.Price)
                {
                    continue;
                }

                var position = newPositions.First(p => p.Ticker == option.Ticker);
                position.Quantity++;
                newBalance -= option.Price;
                currentValues[option.Ticker] += option.Price;
                purchased = true;
            }
        } while (purchased);

        return new Portfolio(newBalance, newPositions.ToArray());
    }
}