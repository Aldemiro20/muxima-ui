# Contributing to Muxima UI

First off, thank you for considering contributing to Muxima UI! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Guidelines](#coding-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and expected**
- **Include screenshots if possible**
- **Specify your environment** (OS, Browser, Angular version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Create an issue and provide:

- **Clear and descriptive title**
- **Detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List some examples of how it would be used**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes
4. Make sure your code lints
5. Update documentation if needed

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Aldemiro20/muxima-ui.git

# Navigate to the directory
cd muxima-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev                 # Start docs dev server
nx serve docs              # Alternative

# Build
nx build <package-name>    # Build specific package
npm run build:all          # Build all packages

# Test
nx test <package-name>     # Test specific package
nx test --all              # Test all packages

# Lint
nx lint <package-name>     # Lint specific package
nx lint --all              # Lint all

# Storybook
npm run storybook          # Start Storybook
npm run build-storybook    # Build Storybook
```

## Project Structure

```
muxima-ui/
├── apps/
│   ├── docs/              # Documentation website (Vercel)
│   └── playground/        # Development playground
│
├── packages/              # All publishable packages
│   ├── core/             # @muxima-ui/core
│   ├── components/       # @muxima-ui/components/*
│   ├── form/             # @muxima-ui/form/*
│   ├── data/             # @muxima-ui/data/*
│   ├── overlay/          # @muxima-ui/overlay/*
│   ├── media/            # @muxima-ui/media/*
│   ├── advanced/         # @muxima-ui/advanced/*
│   ├── navigation/       # @muxima-ui/navigation/*
│   └── utility/          # @muxima-ui/utility/*
│
├── docs/                 # Markdown documentation
├── tools/                # Build tools and scripts
└── e2e/                  # End-to-end tests
```

## Coding Guidelines

### TypeScript

- Use TypeScript strict mode
- Avoid `any` type - use `unknown` or proper types
- Prefer interfaces over type aliases for object shapes
- Use explicit return types for public methods

### Angular

- Use standalone components (Angular 15+)
- Follow Angular style guide
- Use OnPush change detection when possible
- Implement proper lifecycle hooks cleanup

### Naming Conventions

#### Files
```
// Component
button.component.ts
button.component.html
button.component.scss
button.component.spec.ts

// Service
theme.service.ts

// Directive
ripple.directive.ts

// Pipe
safe-html.pipe.ts
```

#### Components
```typescript
// Selector: muxima-button or mux-button
@Component({
  selector: 'muxima-button',
  ...
})
export class MuxButtonComponent { }
```

#### Classes and Interfaces
```typescript
// Component class
export class MuxButtonComponent { }

// Interface
export interface MuxButtonConfig { }

// Type
export type MuxButtonVariant = 'primary' | 'secondary';

// Enum
export enum MuxButtonSize {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg'
}
```

### CSS/SCSS

- Use BEM methodology for class names
- Prefix component classes with `mux-`
- Use CSS custom properties for theming
- Mobile-first responsive design

```scss
.mux-button {
  // Base styles

  &__icon {
    // Element
  }

  &--primary {
    // Modifier
  }

  &:hover {
    // State
  }
}
```

### Documentation

- Add JSDoc comments for public APIs
- Include examples in component documentation
- Update README.md for significant changes
- Add inline comments for complex logic

```typescript
/**
 * A customizable button component with multiple variants and sizes.
 * 
 * @example
 * ```html
 * <muxima-button variant="primary" size="lg">
 *   Click me
 * </muxima-button>
 * ```
 */
@Component({ ... })
export class MuxButtonComponent {
  /**
   * The visual style variant of the button.
   * @default 'primary'
   */
  @Input() variant: MuxButtonVariant = 'primary';
}
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, missing semi colons, etc)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Changes to build process or auxiliary tools
- `ci`: Changes to CI configuration files and scripts

### Examples

```bash
feat(button): add ripple effect animation

Add Material Design ripple effect to button component.
Includes customizable color and duration options.

Closes #123

---

fix(input): prevent memory leak on destroy

Properly unsubscribe from value changes observable
in ngOnDestroy lifecycle hook.

---

docs(readme): update installation instructions

Add npm and yarn installation commands.
Include Angular version compatibility matrix.
```

### Scope

The scope should be the name of the package/component affected:

- `button`
- `input`
- `dialog`
- `core`
- `docs`
- etc.

## Pull Request Process

1. **Create a branch**
   ```bash
   git checkout -b feat/button-ripple-effect
   ```

2. **Make your changes**
   - Write clean, maintainable code
   - Follow the coding guidelines
   - Add tests for new features
   - Update documentation

3. **Test your changes**
   ```bash
   nx test <package-name>
   nx lint <package-name>
   ```

4. **Commit your changes**
   ```bash
   git commit -m "feat(button): add ripple effect"
   ```

5. **Push to your fork**
   ```bash
   git push origin feat/button-ripple-effect
   ```

6. **Open a Pull Request**
   - Use a clear and descriptive title
   - Reference any related issues
   - Provide a detailed description of changes
   - Include screenshots/GIFs for UI changes
   - Ensure CI passes

### PR Checklist

- [ ] Code follows the style guidelines
- [ ] Self-review performed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated and passing
- [ ] No new warnings generated
- [ ] Dependent changes merged and published

## Package Publishing

For maintainers publishing to NPM:

```bash
# Build all packages
npm run build:all

# Version bump (patch/minor/major)
npm run version:bump -- --version patch

# Publish to NPM
npm run publish:all
```

## Questions?

Feel free to open an issue or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Muxima UI! 🚀
