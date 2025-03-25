type Portfolio = {
  balance: number;
  positions: Position[];
};

type Position = {
  ticker: string;
  quantity: number;
  price: number;
  target: number;
};

interface Window {
  electron: {
    store: {
      get: (key: string) => Promise<Portfolio>;
      set: (key: string, value: Portfolio) => Promise<void>;
    };
  };
}
