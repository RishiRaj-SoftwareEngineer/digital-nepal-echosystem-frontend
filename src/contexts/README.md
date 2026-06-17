# Contexts

React Context providers for global state.

## Guidelines

- One context per file
- Create custom hooks to use context
- Memoize context value
- Document context shape
- Use TypeScript interfaces

## Usage

```typescript
// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
```
