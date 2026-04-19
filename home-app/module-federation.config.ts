import { dependencies } from './package.json';
export const mfConfig = {
  name: "home",
  filename: "remoteEntry.js",
  exposes: {
    './Header': './src/Header.tsx',
    './Footer': './src/Footer.tsx'
  },
  shared: {
    ...dependencies,
    react: { 
      singleton: true,
      requiredVersion: dependencies.react,
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies["react-dom"],
    },
  }
};
