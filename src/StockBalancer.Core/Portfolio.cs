namespace StockBalancer.Core;

public class Portfolio(decimal balance, Position[] positions)
{
    public decimal Balance { get; init; } = balance;
    public Position[] Positions { get; init; } = positions;
    public decimal Total { get; } = positions.Sum(x => x.Price * x.Quantity);
    
    public decimal GetPositionPercentage(Position position)
    {
        return (position.Quantity * position.Price) * 100 / Total;
    }
}