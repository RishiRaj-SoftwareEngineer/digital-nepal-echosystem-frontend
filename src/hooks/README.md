# Hooks

Custom React hooks for business logic and state management.

## Guidelines

- Name hooks with `use` prefix: `useAuth`, `useFetchUsers`
- Keep hook logic separate from components
- Use TypeScript for proper typing
- Document complex hooks with comments
- Export as named exports

## Common Hooks

- `useAuth` - Authentication state and methods
- `useFetchData` - Data fetching with loading/error states
- `useLocalStorage` - Local storage persistence
- `useTheme` - Theme switching
