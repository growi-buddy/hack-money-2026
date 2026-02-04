export {};

declare global {
  interface Window {
    waap?: {
      login: () => Promise<'human' | 'walletconnect' | 'injected' | null>;
      logout: () => Promise<void>;
      request: (args: { method: string; params?: unknown[] }) => Promise<string[] | string>;
      on?: (event: string, handler: (data: unknown) => void) => void;
    };
  }
}
