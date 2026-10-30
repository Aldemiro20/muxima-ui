# Contributing to Muxima UI

**English** · [Português](CONTRIBUTING.pt.md)

Thank you for helping. Muxima UI is maintained by [Aldemiro Valentim](https://www.linkedin.com/in/aldemiro-valentim/).
Documentation: [muxima-ui.pages.dev](https://muxima-ui.pages.dev).

## Before you start

- **Bugs:** open an issue with the steps to reproduce, what you expected and what happened,
  and the versions of Angular and `@muxima-ui/core`.
- **New components or API changes:** open an issue first and wait for an answer before writing
  code. A pull request with a new component or a breaking change that was not discussed may be
  closed.
- **Small fixes** (typos, docs, a bug with an obvious fix): send the pull request directly.
- **Security problems:** do not open a public issue. Write to
  [muximaui@gmail.com](mailto:muximaui@gmail.com).

## Rules for pull requests

1. **One change per pull request.** Do not mix a fix with a refactor or unrelated formatting.
2. **Branch from `main`** and open the pull request against `main`. Nobody pushes to `main`
   directly; every change goes through a pull request and a review.
3. **Follow the quality standard** ([/docs/quality-standard](https://muxima-ui.pages.dev/docs/quality-standard)):
   Angular 21+, native HTML first, WAI-ARIA and keyboard, forms, complete states, tokens only
   (no hard-coded colors), a small API (`variant`, `size`, `disabled`; at most 6 variants and
   3 sizes) and tests with axe.
4. **Tests.** Every fix comes with a test that fails without it. Every new behavior has tests,
   including keyboard and axe.
5. **Docs in both languages.** If the change is visible, update the English and the Portuguese
   pages of the docs, and the examples.
6. **No breaking changes without discussion.** If one is agreed, describe it in the pull
   request and in `CHANGELOG.md`.
7. **No new dependencies** in `@muxima-ui/core` without discussing it first.
8. **CI must pass** (tests, builds, examples, axe on every page, end-to-end tests).
9. **Commit messages** in the form `type: summary`, for example `fix: dialog keeps focus on close`
   or `feat: add size to the slider`. Types: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`.
10. **No secrets or private data.** Never commit tokens, `.env` files, internal URLs or real
    personal data, including in examples and tests. Use invented data.

## Check locally

```bash
npm ci
npm test                 # library tests (behavior, keyboard and axe)
npm run build:core       # build the library
npm run build:docs       # build the docs site
npm run test:a11y        # axe on every page, light and dark (after build:docs)
npm run test:e2e         # end-to-end tests (after build:docs)
```

## Review

The maintainer reviews every pull request. It may take a few days. Changes may be requested
before merging; pull requests are merged with "Squash and merge".

## License

By sending a pull request you agree that your contribution is published under the
[MIT license](LICENSE) of the project.
