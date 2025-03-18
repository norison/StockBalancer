namespace StockBalancer.Core;

public class Position
{
    public string Ticker { get; set; } = string.Empty;
    public uint Quantity { get; set; }
    public decimal Price { get; set; }
    public int TargetPercentage { get; set; }
}