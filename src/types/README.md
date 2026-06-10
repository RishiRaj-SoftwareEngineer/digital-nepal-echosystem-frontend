# Types

TypeScript type definitions and interfaces.

## Organization

```
types/
├── index.ts            # Main exports
├── user.ts             # User-related types
├── citizen.ts          # Citizen-related types
├── api.ts              # API response types
└── ...
```

## Guidelines

- Use interfaces for object shapes
- Use enums for fixed sets
- Keep types close to usage
- Export from index.ts for convenience
- Avoid `any` type
- Document complex types with comments
