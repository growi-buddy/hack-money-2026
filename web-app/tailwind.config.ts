// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './index.html',
    './node_modules/@ably/chat-react-ui-kit/src/**/*.{js,ts,jsx,tsx}',
  ],
};

export default config;
