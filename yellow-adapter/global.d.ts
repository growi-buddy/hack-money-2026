/**
 * Tipos globales para TypeScript
 */

// Declaración de window.waap inyectado por WAAP SDK
interface Window {
  waap?: {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
  };
}
