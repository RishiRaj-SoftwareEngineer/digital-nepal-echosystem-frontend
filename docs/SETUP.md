# Development Environment Setup

## Prerequisites

- Node.js 18.17 or later
- npm 9.6 or later (or yarn/pnpm)
- Git
- A code editor (VS Code recommended)
- Git configured with your GitHub account

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/intersectinfodevelopers/digital-nepal-echosystem-frontend.git
cd digital-nepal-echosystem-frontend
```

### 2. Install Dependencies

```bash
npm install
```

If using yarn:
```bash
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_API_TIMEOUT=30000

# Feature Flags
NEXT_PUBLIC_ENABLE_MOCK_DATA=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false

# Application
NEXT_PUBLIC_APP_NAME=Digital Nepal Citizen Ecosystem
NEXT_PUBLIC_APP_VERSION=1.0.0
```

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never store sensitive data there.

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 5. Verify Installation

- Open browser and navigate to `http://localhost:3000`
- Check console for any errors
- Verify all pages load correctly

## Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload

# Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run type-check       # Check TypeScript types

# Testing
npm run test             # Run Jest tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report

# Analysis
npm run analyze          # Analyze bundle size
```

## Project Configuration

### TypeScript Configuration

The project uses strict TypeScript configuration. Ensure your IDE is set up to recognize TypeScript errors.

### ESLint Rules

ESLint is configured to enforce:
- React best practices
- TypeScript strict rules
- Accessibility standards
- Code consistency

Run `npm run lint` to check for violations.

### Prettier Formatting

Code is auto-formatted with Prettier on save (if configured in your IDE).

To manually format:
```bash
npm run format
```

## IDE Setup (VS Code)

### Recommended Extensions

1. **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
2. **Prettier** - esbenp.prettier-vscode
3. **ESLint** - dbaeumer.vscode-eslint
4. **TypeScript Vue Plugin** - Vue.vscode-typescript-vue-plugin (if using Vue)
5. **Tailwind CSS IntelliSense** - bradlc.vscode-tailwindcss

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.enablePromptUseWorkspaceTypesForJsFiles": true,
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Git Workflow

### Branch Naming Convention

```
feature/feature-name        # New features
fix/bug-fix-name           # Bug fixes
docs/documentation-update  # Documentation
refactor/refactor-name     # Code refactoring
test/test-addition         # Tests
chore/dependency-update    # Dependencies
```

### Pre-commit Hooks

Husky is configured to run linting before commits:

```bash
# Hooks will automatically run:
- npm run lint      # Lint code
- npm run format    # Format code
```

If a hook fails, fix the issues and try committing again.

## Troubleshooting

### Port 3000 Already in Use

```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Node Modules Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Verify TypeScript configuration
npx tsc --noEmit

# Check for type errors
npm run type-check
```

### Cache Issues

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## Database/Mock Data

The application currently uses JSON mock data. Data files are located in:

```
public/data/
├── citizens.json
├── wards.json
├── municipalities.json
└── provinces.json
```

To modify mock data, edit these JSON files directly.

## Future: Spring Boot API Integration

When the backend API is ready:

1. Update `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
2. Replace mock data services with API calls
3. Update authentication to use backend tokens
4. Run integration tests

## Getting Help

- Check [docs/ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- Review [CONTRIBUTING.md](../CONTRIBUTING.md) for coding standards
- Open an issue for bugs or feature requests
- Contact the development team

## Next Steps

After setup:

1. Read [docs/ARCHITECTURE.md](./ARCHITECTURE.md) to understand the project structure
2. Review [CONTRIBUTING.md](../CONTRIBUTING.md) for coding standards
3. Create a feature branch: `git checkout -b feature/my-feature`
4. Start implementing features
5. Submit a pull request

---

**Happy coding!** 🚀
