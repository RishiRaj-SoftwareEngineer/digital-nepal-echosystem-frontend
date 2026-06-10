# Services

Data fetching and business logic services.

## Structure

```
services/
├── api.ts              # API client setup
├── citizenService.ts   # Citizen-related API calls
├── authService.ts      # Authentication service
└── ...
```

## Guidelines

- Centralize API calls here
- Use TypeScript for types
- Handle errors gracefully
- Add retry logic for network failures
- Mock data during development
- Document public methods

## Usage

```typescript
import { citizenService } from '@/services/citizenService';

const citizens = await citizenService.fetchAll();
```
