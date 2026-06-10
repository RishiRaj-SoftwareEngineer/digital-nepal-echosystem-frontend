# Project Rules & Standards

## 1. Code Quality Standards

### TypeScript Rules
- ✅ Strict mode enabled (`"strict": true`)
- ✅ No implicit `any` types
- ✅ All function parameters and returns must be typed
- ✅ Use interfaces for object shapes
- ✅ Use enums for fixed sets of values

### React & Component Standards
- ✅ Functional components only (no class components)
- ✅ Use hooks for state and side effects
- ✅ Keep components focused and small
- ✅ Descriptive component names (PascalCase)
- ✅ Props should be interface-typed
- ✅ Avoid prop drilling (use Context or custom hooks)
- ✅ Memoize expensive components with `React.memo`

### Code Organization
- ✅ One component per file
- ✅ Export default for components
- ✅ Group imports: React → External libs → Local
- ✅ Keep files under 300 lines
- ✅ Extract complex logic to custom hooks

## 2. Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `UserCard.tsx`, `Dashboard.tsx` |
| Hooks | camelCase, start with `use` | `useAuth.ts`, `useFetchUsers.ts` |
| Utils | camelCase | `formatDate.ts`, `validateEmail.ts` |
| Types | PascalCase | `User.ts`, `ApiResponse.ts` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL`, `MAX_RETRIES` |
| Functions | camelCase | `fetchUser()`, `calculateTotal()` |
| Variables | camelCase | `userName`, `isLoading` |
| CSS Classes | kebab-case | `user-card`, `primary-button` |
| Files/Folders | kebab-case or camelCase | `user-card/`, `index.ts` |

## 3. Commit Message Standards

Follow Conventional Commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting/style changes
- `refactor` - Code refactoring
- `perf` - Performance improvement
- `test` - Tests
- `chore` - Dependencies/build

### Examples
```
feat(auth): add JWT token validation
fix(ui): correct responsive layout on mobile
docs(readme): update setup instructions
refactor(hooks): simplify useAuth hook
test(components): add UserCard tests
```

## 4. File Structure Rules

```
src/
├── app/                    # Next.js pages (DO NOT edit structure)
├── components/
│   ├── common/            # Shared UI components
│   ├── features/          # Feature-specific components
│   ├── forms/             # Form components
│   └── layout/            # Layout components
├── hooks/                 # Custom React hooks
├── contexts/              # Context providers (one file per context)
├── services/              # Data fetching and API services
├── types/                 # TypeScript interfaces and types
├── utils/                 # Utility functions
├── constants/             # App-wide constants
└── store/                 # State management (if using Zustand)
```

## 5. Performance Rules

- ✅ Use `React.memo` for expensive components
- ✅ Lazy load routes with `React.lazy`
- ✅ Optimize images with Next.js Image component
- ✅ Minimize bundle size (target: < 200KB gzipped)
- ✅ Use Next.js built-in optimizations (font loading, image optimization)
- ✅ Avoid unnecessary re-renders (use memoization)
- ✅ Code split by route automatically with Next.js

## 6. Accessibility Rules

- ✅ All interactive elements must be keyboard accessible
- ✅ Semantic HTML (use proper tags)
- ✅ Alt text for all images
- ✅ Sufficient color contrast (WCAG AA)
- ✅ ARIA labels where needed
- ✅ Focus states visible for keyboard navigation
- ✅ Screen reader tested

## 7. Testing Requirements

- ✅ Minimum 80% code coverage
- ✅ Test files in same directory as source
- ✅ Test file naming: `ComponentName.test.tsx`
- ✅ Follow AAA pattern (Arrange, Act, Assert)
- ✅ Mock external dependencies
- ✅ Integration tests for critical flows
- ✅ No skipped tests in main branch

## 8. Git Workflow Rules

### Branching
- Main branch: `main` (production)
- Development branch: `develop`
- Feature branch: `feature/feature-name`
- Bugfix branch: `fix/bug-name`

### PR Requirements
- Minimum 1 approval before merge
- All CI checks must pass
- Code coverage must not decrease
- No force pushes to main

### Commit Rules
- Atomic commits (one logical change per commit)
- No merge commits (use rebase)
- Descriptive commit messages
- Co-authored-by trailer for pair programming

## 9. Environment & Configuration

### `.env.local` Rules
- Never commit `.env.local`
- Use `.env.example` as template
- Document all environment variables
- Prefix browser-exposed vars with `NEXT_PUBLIC_`
- Rotate secrets regularly

## 10. Documentation Rules

- ✅ JSDoc comments for public APIs
- ✅ README for complex components
- ✅ Inline comments for non-obvious logic only
- ✅ Update docs when changing behavior
- ✅ Keep ARCHITECTURE.md current

## 11. Security Rules

- ✅ Never store secrets in code
- ✅ Validate all user input
- ✅ Sanitize data before display
- ✅ Use HTTPS always
- ✅ No hardcoded credentials
- ✅ Regular dependency audits
- ✅ Report security issues privately

## 12. Design System Rules

- ✅ Use Tailwind CSS utility classes
- ✅ No inline styles
- ✅ Consistent spacing (follow design system)
- ✅ Responsive by default (mobile-first)
- ✅ Color palette from config only
- ✅ Typography hierarchy respected

## 13. Error Handling

- ✅ Centralized error boundary component
- ✅ User-friendly error messages
- ✅ Log errors to monitoring service
- ✅ Graceful degradation for failed features
- ✅ Retry logic for network failures

## 14. State Management Rules

- ✅ Local state with `useState` first
- ✅ Context for global state
- ✅ Custom hooks for complex logic
- ✅ Avoid prop drilling
- ✅ Normalize data structure

## Enforcement

These rules are enforced by:
- **ESLint** - Code style and best practices
- **TypeScript** - Type safety
- **Prettier** - Formatting
- **Husky** - Pre-commit hooks
- **GitHub Actions** - Automated checks
- **Code Review** - Manual review

Violations detected by tools are blocking and must be fixed before merge.

---

**Last Updated**: June 2024
