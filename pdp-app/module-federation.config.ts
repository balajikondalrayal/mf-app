import { dependencies } from './package.json';
export const mfConfig = {
  name: "pdp",
  filename: "remoteEntry.js",
  exposes: {
    './App': './src/App.tsx'
  },
  remotes: {
    'home': 'home@http://localhost:3000/remoteEntry.js'
  },
  shared: {
    ...dependencies,
    react: { singleton: true },
    'react-dom': { singleton: true }
  }
};
