export const formatNumberToCurrency = (num: number): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(num);
};

export const formatNumberToPercentage = (num: number): string => {
  return `${num.toFixed(2)}%`;
};
