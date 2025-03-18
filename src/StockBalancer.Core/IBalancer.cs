namespace StockBalancer.Core;

public interface IBalancer
{
    Portfolio Calculate(Portfolio portfolio);
}