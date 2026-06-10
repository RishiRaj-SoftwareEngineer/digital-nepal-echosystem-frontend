# Digital Nepal Citizen Ecosystem - Frontend

[![Build Status](https://github.com/intersectinfodevelopers/digital-nepal-echosystem-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/intersectinfodevelopers/digital-nepal-echosystem-frontend/actions)
[![Code Coverage](https://img.shields.io/codecov/c/github/intersectinfodevelopers/digital-nepal-echosystem-frontend)](https://codecov.io/gh/intersectinfodevelopers/digital-nepal-echosystem-frontend)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A modern, scalable frontend application for the Digital Nepal Citizen Ecosystem platform. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Overview

The Digital Nepal Citizen Ecosystem provides a comprehensive digital platform for government services at ward, municipality, province, and central levels. This frontend application enables:

- **Citizen Registration** - Register and manage citizen information
- **Service Management** - Access government services by governance tier
- **Data Visualization** - Interactive dashboards for each governance level
- **Offline Support** - Progressive Web App capabilities
- **Real-time Updates** - Live data synchronization

## Features

- 🏗️ **Hierarchical Governance** - Support for Ward → Municipality → Province → Central
- 🔐 **Role-Based Access** - Admin, Manager, and User roles
- 📱 **Fully Responsive** - Mobile, tablet, and desktop support
- ♿ **Accessible** - WCAG 2.1 Level AA compliant
- ⚡ **High Performance** - Optimized for speed and user experience
- 🎨 **Modern UI** - Clean, intuitive interface with Tailwind CSS
- 📊 **Real Nepali Data** - Authentic citizen names and governance structure
- 🔌 **API Ready** - Prepared for Spring Boot backend integration

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier
- **Data**: JSON Mock Data (Spring Boot API integration planned)

## Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm 9.6 or later

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/intersectinfodevelopers/digital-nepal-echosystem-frontend.git
   cd digital-nepal-echosystem-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:3000`

For detailed setup instructions, see [docs/SETUP.md](docs/SETUP.md)

## Project Structure

```
digital-nepal-echosystem-frontend/
├── .github/
│   └── workflows/          # CI/CD pipelines
├── docs/                   # Documentation
├── public/
│   ├── assets/            # Images and media
│   └── data/              # Mock JSON data
├── src/
│   ├── app/               # Next.js app router pages
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks
│   ├── contexts/          # React Context providers
│   ├── services/          # API and data services
│   ├── types/             # TypeScript definitions
│   ├── utils/             # Utility functions
│   └── constants/         # App constants
├── CODE_OF_CONDUCT.md     # Community guidelines
├── CONTRIBUTING.md        # Contribution guidelines
└── package.json           # Dependencies
```

For more details, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## Development

### Available Commands

```bash
# Development
npm run dev              # Start dev server with hot reload

# Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier
npm run type-check       # Check TypeScript types

# Testing
npm run test             # Run tests
npm run test:watch       # Run in watch mode
npm run test:coverage    # Generate coverage report

# Analysis
npm run analyze          # Analyze bundle size
```

### Coding Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for React, accessibility, and best practices
- **Prettier**: Automatic code formatting
- **Accessibility**: WCAG 2.1 Level AA compliant

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## CI/CD Pipeline

Automated workflows run on every push and pull request:

- ✅ **Linting** - ESLint checks
- ✅ **Type Checking** - TypeScript verification
- ✅ **Testing** - Unit and integration tests
- ✅ **Build** - Production build verification
- ✅ **Coverage** - Code coverage reporting

See `.github/workflows/` for workflow configurations.

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Code of Conduct

This project follows a [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming and inclusive community.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- 📖 **Documentation**: See [docs/](docs/) folder
- 🐛 **Report Issues**: [GitHub Issues](https://github.com/intersectinfodevelopers/digital-nepal-echosystem-frontend/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/intersectinfodevelopers/digital-nepal-echosystem-frontend/discussions)

## Roadmap

### Phase 1 (Current - 3 Weeks)
- [x] Project setup and scaffolding
- [x] Component library
- [x] Mock data layer
- [ ] Core pages and workflows

### Phase 2 (Upcoming)
- [ ] Spring Boot API integration
- [ ] User authentication
- [ ] Advanced filtering and search
- [ ] Real-time updates

### Phase 3 (Future)
- [ ] Mobile app (React Native)
- [ ] Progressive Web App
- [ ] Advanced analytics

## Contributors

- **Team**: 10 Developers
- **Duration**: 3 Weeks (18 Working Days)
- **Client**: Kummayak Rural Municipality, Panchthar, Koshi Province

---

**Made with ❤️ for Digital Nepal** 🇳🇵
