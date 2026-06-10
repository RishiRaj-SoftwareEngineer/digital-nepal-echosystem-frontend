# Contributing to Digital Nepal Frontend

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the Digital Nepal Citizen Ecosystem Frontend project.

## Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- Git
- Familiarity with Next.js 14, TypeScript, and Tailwind CSS

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/intersectinfodevelopers/digital-nepal-echosystem-frontend.git
   cd digital-nepal-echosystem-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Make your changes**
   - Follow the coding standards (see below)
   - Write clean, well-documented code
   - Add tests for new features

6. **Run tests and linting**
   ```bash
   npm run lint
   npm run format
   npm run test
   ```

7. **Commit your changes**
   ```bash
   git commit -m "feat: add new feature"
   ```

8. **Push to your fork and submit a Pull Request**

## Coding Standards

### TypeScript
- Use strict mode (`"strict": true` in tsconfig.json)
- Type all function parameters and return values
- Avoid `any` type unless absolutely necessary
- Use interfaces for object shapes

### React & Next.js
- Use functional components with hooks
- Keep components small and focused (single responsibility)
- Use descriptive component names
- Organize components by feature/domain

### File Structure
```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── contexts/       # React Context providers
├── services/       # API and data services
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── constants/      # App constants
└── store/          # State management
```

### Naming Conventions
- Components: PascalCase (e.g., `UserCard.tsx`)
- Hooks: camelCase starting with `use` (e.g., `useAuth.ts`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Types: PascalCase (e.g., `User.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

### Code Quality
- Keep functions small and focused
- Use descriptive variable and function names
- Comment complex logic only
- Follow DRY (Don't Repeat Yourself) principle
- Write meaningful commit messages

## Commit Message Format

Follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding or updating tests
- `chore`: Changes to build process or dependencies

### Examples
```
feat(auth): add login form validation
fix(dashboard): correct data sorting order
docs: update API documentation
refactor(utils): simplify date formatting function
test(components): add UserCard component tests
```

## Pull Request Process

1. **Before submitting:**
   - Ensure all tests pass: `npm run test`
   - Run linter: `npm run lint`
   - Format code: `npm run format`
   - Update documentation if needed

2. **PR Title & Description:**
   - Use clear, descriptive titles
   - Reference related issues (#123)
   - Describe what changes were made and why
   - Include any breaking changes

3. **Review Process:**
   - At least one maintainer review required
   - Address all feedback and suggestions
   - Squash commits if requested
   - Ensure CI/CD pipelines pass

## Testing Guidelines

- Write tests for new features
- Maintain test coverage above 80%
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

```typescript
describe('UserCard', () => {
  it('should display user name and email', () => {
    // Arrange
    const user = { name: 'John', email: 'john@example.com' };
    
    // Act
    render(<UserCard user={user} />);
    
    // Assert
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});
```

## Performance Considerations

- Lazy load components when appropriate
- Optimize images and assets
- Use Next.js built-in optimizations (Image component, etc.)
- Monitor bundle size with `npm run analyze`

## Accessibility

- Follow WCAG 2.1 Level AA standards
- Use semantic HTML
- Include alt text for images
- Test with screen readers
- Ensure keyboard navigation works

## Documentation

- Update README for significant changes
- Document new components and utilities
- Add JSDoc comments for public APIs
- Keep API documentation current

## Need Help?

- Check existing issues and discussions
- Review the [ARCHITECTURE.md](docs/ARCHITECTURE.md) for system design
- Ask questions in project discussions
- Contact the maintainers

## License

By contributing, you agree that your contributions will be licensed under the project's LICENSE.

---

**Thank you for contributing to Digital Nepal!** 🇳🇵
