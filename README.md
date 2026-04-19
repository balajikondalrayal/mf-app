# MF-App: Module Federation Monorepo

A modern monorepo demonstrating **Module Federation** with **Rspack**, **React 19**, and **Tailwind CSS**. This project showcases how to build micro frontends where applications can share components and dependencies seamlessly.

## 📋 Project Overview

MF-App is a two-application setup using **Webpack 5 Module Federation** (via `@module-federation/enhanced`) to enable dynamic component sharing:

- **home-app**: Remote application that exposes shared components (Header, Footer)
- **pdp-app**: Host application that consumes remote components from home-app

### Key Features

- ✅ **Module Federation**: Share components across federated applications
- ✅ **Rspack**: Ultra-fast build tool replacing Webpack
- ✅ **React 19**: Latest React with automatic JSX transformation
- ✅ **Tailwind CSS v4**: Utility-first CSS framework
- ✅ **TypeScript**: Full type safety
- ✅ **Hot Module Replacement (HMR)**: Development experience with React Refresh

## 🗂️ Repository Structure

```
mf-app/
├── home-app/                      # Remote app - exposes components
│   ├── src/
│   │   ├── App.tsx               # Main app component
│   │   ├── Header.tsx            # Exported component
│   │   ├── Footer.tsx            # Exported component
│   │   ├── index.tsx             # Entry point
│   │   └── index.css             # Tailwind CSS imports
│   ├── @mf-types/                # Generated type definitions
│   ├── module-federation.config.ts
│   ├── rspack.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.mjs
│   ├── index.html
│   └── package.json
│
├── pdp-app/                       # Host app - consumes components
│   ├── src/
│   │   ├── App.tsx               # Imports Header from home-app
│   │   ├── index.tsx             # Entry point
│   │   └── index.css             # Tailwind CSS imports
│   ├── @mf-types/                # Generated type definitions
│   ├── module-federation.config.ts
│   ├── rspack.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.mjs
│   ├── index.html
│   └── package.json
│
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18+ (LTS recommended)
- **npm** or **yarn**: Package manager

### Installation

1. **Clone or navigate to the repository**:

   ```bash
   cd /path/to/mf-app
   ```

2. **Install dependencies for both applications**:

   ```bash
   # Install home-app dependencies
   cd home-app && npm install && cd ..

   # Install pdp-app dependencies
   cd pdp-app && npm install && cd ..
   ```

### Development

Run both applications in development mode in separate terminals:

**Terminal 1 - Start home-app (Remote)**:

```bash
cd home-app
npm start
# Runs on http://localhost:3000
```

**Terminal 2 - Start pdp-app (Host)**:

```bash
cd pdp-app
npm start
# Runs on http://localhost:3001
```

Visit http://localhost:3001 to see pdp-app with the federated Header component from home-app.

### Build

Build each application for production:

```bash
# Build home-app
cd home-app && npm run build && cd ..

# Build pdp-app
cd pdp-app && npm run build && cd ..
```

Build outputs are in each app's `dist/` directory.

## 🔌 Module Federation Configuration

### home-app (Remote)

Exposes components via `module-federation.config.ts`:

```typescript
exposes: {
  './Header': './src/Header.tsx',
  './Footer': './src/Footer.tsx'
}
```

Runs on port **3000** and serves `remoteEntry.js` at:

```
http://localhost:3000/remoteEntry.js
```

### pdp-app (Host)

Consumes remote components via `module-federation.config.ts`:

```typescript
remotes: {
  'home': 'home@http://localhost:3000/remoteEntry.js'
}
```

Imports components:

```typescript
import Header from "home/Header";
import Footer from "home/Footer";
```

## 🎨 Styling & CSS

### Important: Self-Contained Component Styles

Federated components must import their own CSS to ensure styles are available in consuming applications:

```typescript
// ✅ Correct - Component brings its own styles
import "./index.css";

const Header = () => {
  return <div className="bg-blue-500">Header</div>;
};
```

**Why?** When a component is federated:

- CSS is not automatically bundled with the component
- The consuming app needs the CSS to be imported with the component
- Each component should be self-contained with its own style imports

### Tailwind CSS

Both applications use **Tailwind CSS v4** for styling:

- **home-app/src/index.css**: Global CSS with Tailwind
- **pdp-app/src/index.css**: Global CSS with Tailwind

Components use Tailwind utility classes:

```typescript
<div className="bg-blue-500 text-white">Content</div>
```

## 📦 Shared Dependencies

Both applications share dependencies via Module Federation to reduce bundle size:

```typescript
shared: {
  react: { singleton: true },
  'react-dom': { singleton: true },
  // ... other dependencies
}
```

This ensures only one version of React is loaded, even across federated applications.

## 🔧 Build Tools & Technologies

| Tool                  | Version | Purpose                   |
| --------------------- | ------- | ------------------------- |
| **Rspack**            | ~1.2.0  | Fast bundler & dev server |
| **React**             | ^19.0.0 | UI framework              |
| **React DOM**         | ^19.0.0 | React rendering           |
| **TypeScript**        | ^5.7.3  | Type safety               |
| **Tailwind CSS**      | ^4.0.3  | Utility-first CSS         |
| **PostCSS**           | ^8.2.1  | CSS processing            |
| **Module Federation** | ^0.8.9  | Micro frontend support    |

## 📝 Available Scripts

Both home-app and pdp-app have identical scripts:

```bash
npm start          # Development server with HMR
npm run build      # Production build
npm run build:dev  # Development build
npm run build:start # Serve the built dist folder
```

## 🚨 Troubleshooting

### CSS Not Applied to Federated Components

**Problem**: Styles from federated components don't appear in the consuming app.

**Solution**: Ensure federated components import their CSS:

```typescript
import "./index.css"; // Add this to Header.tsx, Footer.tsx, etc.
```

### Port Already in Use

**Problem**: `EADDRINUSE: address already in use :::3000`

**Solution**: Kill the process using the port or specify a different port in rspack.config.ts:

```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Type Definitions Not Generated

**Problem**: `@types` directory doesn't have the federated component types.

**Solution**: Rebuild the application:

```bash
npm run build:dev
```

## 🔗 Resources

- [Module Federation Enhanced Docs](https://module-federation.io/)
- [Rspack Documentation](https://www.rspack.dev/)
- [React 19 Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created as a modern micro frontend architecture example using next-generation build tools.

---

**Last Updated**: April 2026
