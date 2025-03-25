// noinspection JSUnusedGlobalSymbols

interface Window {
  electron: {
    store: {
      get: (key: string) => Promise<string>;
      set: (key: string, value: string) => Promise<void>;
    };
  };
}
