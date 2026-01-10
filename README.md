# zStudio License Management System

A TypeScript React application for managing zStudio software licenses, built with Vite.

## Features

- User authentication (login/signup)
- License dashboard with status overview
- Seat management for licenses
- API integration with backend server
- Responsive dark theme UI

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router
- **Styling**: CSS-in-JS (inline styles)
- **State Management**: React Context

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

## API Integration

The app integrates with a backend API running on `http://127.0.0.1:4000` with the following endpoints:

- `POST /login` - User authentication
- `POST /create-user` - User registration
- `GET /user-licenses` - Fetch user licenses
- `POST /validate-email-license` - Validate email license
- `POST /add-license-email` - Add user to license
- `POST /remove-license-email` - Remove user from license
- `POST /revoke-license` - Cancel license

## Project Structure

```
src/
├── api.ts              # API service functions
├── App.tsx             # Main app component with routing
├── AuthContext.tsx     # Authentication context
├── Dashboard.tsx       # License dashboard
├── EditSeats.tsx       # Seat management page
├── Footer.tsx          # Footer component
├── Login.tsx           # Login/signup page
├── Navbar.tsx          # Navigation bar
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## Development

- Uses TypeScript for type safety
- ESLint for code linting
- Vite for fast development and building
- Hot module replacement for development

## License

This project is part of the zStudio ecosystem.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
