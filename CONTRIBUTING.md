# Contributing to CalC - Calculator Messenger App

Thank you for your interest in contributing to CalC! This document provides guidelines and information for contributors.

## 🎯 Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our Code of Conduct.

### Our Standards

- **Be respectful**: Treat everyone with respect and kindness
- **Be inclusive**: Welcome newcomers and help them get started
- **Be collaborative**: Work together and share knowledge
- **Be constructive**: Provide helpful feedback and suggestions

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- Basic knowledge of React Native and TypeScript

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/calc-messenger-app.git
   cd calc-messenger-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the existing ESLint configuration
- **Prettier**: Use Prettier for code formatting
- **Naming**: Use descriptive variable and function names

### File Organization

```
app/                    # Expo Router pages
├── (tabs)/            # Tab navigation screens
├── chat/              # Chat-related screens
└── index.tsx          # Main calculator screen

components/            # Reusable UI components
├── ContactList.tsx    # Contact management
└── ...

services/              # Business logic and data services
├── ContactService.ts  # Contact operations
├── MessageService.ts  # Message handling
└── SettingsService.ts # App settings

utils/                 # Utility functions
├── crypto.ts          # Encryption utilities
└── haptics.ts         # Platform-specific features
```

### Component Guidelines

1. **Functional Components**: Use functional components with hooks
2. **TypeScript Interfaces**: Define clear interfaces for props
3. **Error Handling**: Implement proper error boundaries
4. **Performance**: Use React.memo for expensive components

Example component structure:
```typescript
interface ComponentProps {
  title: string;
  onPress: () => void;
}

export default function Component({ title, onPress }: ComponentProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
```

### Security Guidelines

- **Encryption**: All sensitive data must be encrypted
- **Local Storage**: Never send sensitive data to external servers
- **Input Validation**: Validate all user inputs
- **Platform Checks**: Use Platform.select() for platform-specific code

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write unit tests for utility functions
- Write integration tests for services
- Write component tests for UI components
- Maintain test coverage above 80%

Example test:
```typescript
import { encryptMessage, decryptMessage } from '../utils/crypto';

describe('Crypto Utils', () => {
  it('should encrypt and decrypt messages correctly', async () => {
    const message = 'Hello, World!';
    const encrypted = await encryptMessage(message);
    const decrypted = await decryptMessage(encrypted);
    
    expect(decrypted).toBe(message);
    expect(encrypted).not.toBe(message);
  });
});
```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, browser, device information
6. **Screenshots**: If applicable

### Bug Report Template

```markdown
**Bug Description**
A clear and concise description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment**
- OS: [e.g. iOS, Android, Web]
- Browser: [e.g. Chrome, Safari]
- Version: [e.g. 1.0.0]
```

## 💡 Feature Requests

We welcome feature requests! Please:

1. **Check existing issues** to avoid duplicates
2. **Provide detailed description** of the feature
3. **Explain the use case** and benefits
4. **Consider implementation complexity**

### Feature Request Template

```markdown
**Feature Description**
A clear and concise description of the feature.

**Problem Statement**
What problem does this feature solve?

**Proposed Solution**
How would you like this feature to work?

**Alternatives Considered**
What other solutions have you considered?

**Additional Context**
Any other context or screenshots about the feature.
```

## 🔄 Pull Request Process

### Before Submitting

1. **Test your changes** thoroughly
2. **Update documentation** if needed
3. **Add tests** for new functionality
4. **Follow code style** guidelines
5. **Update CHANGELOG.md** if applicable

### Pull Request Template

```markdown
**Description**
Brief description of changes made.

**Type of Change**
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

**Testing**
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Manual testing completed

**Checklist**
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process

1. **Automated Checks**: All CI checks must pass
2. **Code Review**: At least one maintainer review required
3. **Testing**: Manual testing for UI changes
4. **Documentation**: Ensure docs are updated

## 🏷️ Commit Guidelines

Use conventional commit messages:

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
feat(chat): add message encryption
fix(calculator): resolve division by zero error
docs(readme): update installation instructions
style(components): improve button styling
```

## 🚀 Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release branch
4. Test thoroughly
5. Create GitHub release
6. Deploy to production

## 📚 Resources

### Documentation

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

### Community

- [GitHub Discussions](https://github.com/yourusername/calc-messenger-app/discussions)
- [Discord Server](https://discord.gg/your-server)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/calc-messenger)

## 🙏 Recognition

Contributors will be recognized in:

- **README.md**: Contributors section
- **CHANGELOG.md**: Release notes
- **GitHub**: Contributor graphs
- **Discord**: Special contributor role

## 📞 Contact

If you have questions about contributing:

- **GitHub Issues**: For technical questions
- **Email**: maintainers@your-domain.com
- **Discord**: Join our community server

---

Thank you for contributing to CalC! Your efforts help make secure communication accessible to everyone. 🔐❤️