# Contributing to Component Testing Example

Thank you for your interest in contributing! This document provides guidelines for contributing to this Angular component testing project.

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or 20.x
- npm (comes with Node.js)
- Git

### Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/ComponentTestingWithJasmineForClasses.git`
3. Install dependencies: `npm install`
4. Start development server: `npm start`

## 🔄 Development Workflow

### 1. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Changes
- Write your code
- Add or update tests
- Ensure code follows project style
- Update documentation if needed

### 3. Test Your Changes
```bash
npm run test           # Run unit tests
npm run test:coverage  # Run tests with coverage
npm run lint          # Check code style
npm run build         # Ensure build works
```

### 4. Commit Your Changes
Use conventional commit format:
```bash
git commit -m "feat: add new component test"
git commit -m "fix: resolve validation issue"
git commit -m "docs: update README"
```

### 5. Push and Create PR
```bash
git push origin your-branch-name
```
Then create a Pull Request on GitHub.

## 📋 Code Standards

### TypeScript/Angular
- Follow Angular style guide
- Use TypeScript strict mode
- Write type-safe code with proper interfaces
- Use reactive forms for form handling

### Testing
- Write unit tests for all components
- Write interface tests for type contracts
- Aim for >80% test coverage
- Use descriptive test names
- Group related tests with `describe` blocks

### Code Style
- Use ESLint configuration
- Format code with Prettier
- Use meaningful variable names
- Add JSDoc comments for complex functions

## 🧪 Testing Guidelines

### Component Tests
- Test component initialization
- Test user interactions
- Test form validation
- Test error handling
- Test UI rendering

### Interface Tests
- Test interface compliance
- Test type safety
- Test data transformation
- Test integration contracts

### Test Structure
```typescript
describe('ComponentName', () => {
  describe('Feature Group', () => {
    it('should do something specific', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

## 🚀 Pull Request Process

### Before Submitting
- [ ] All tests pass
- [ ] Code is linted and formatted
- [ ] Documentation is updated
- [ ] Commit messages follow convention
- [ ] PR description is complete

### PR Requirements
- Follow the PR template
- Link related issues
- Include screenshots for UI changes
- Request reviews from maintainers

### Review Process
1. Automated checks must pass
2. Code review by maintainers
3. Address feedback if needed
4. Approval and merge

## 🐛 Reporting Issues

### Bug Reports
- Use the bug report template
- Include reproduction steps
- Provide environment details
- Add screenshots if applicable

### Feature Requests
- Use the feature request template
- Explain the problem it solves
- Provide detailed requirements
- Consider implementation impact

## 📊 Project Structure

```
src/
├── app/
│   ├── users/                 # User component
│   │   ├── users.component.*
│   │   └── *.spec.ts         # Tests
│   ├── displayusers/         # Display component
│   └── crudlogic.service.ts  # Service layer
├── assets/                   # Static assets
└── environments/            # Environment configs
```

## 🔧 Development Tips

### Running Tests
```bash
npm run test              # Interactive mode
npm run test:ci          # CI mode (single run)
npm run test:coverage    # With coverage report
```

### Building
```bash
npm run build            # Development build
npm run build:prod       # Production build
```

### Debugging
- Use Angular DevTools
- Use browser debugger
- Add console.log (remove before committing)
- Use Angular CLI debugging features

## 📚 Resources

- [Angular Testing Guide](https://angular.io/guide/testing)
- [Jasmine Documentation](https://jasmine.github.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 💬 Getting Help

- Create an issue for questions
- Check existing issues and PRs
- Review documentation
- Ask in pull request comments

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing! 🎉