# Muxima UI

**English** · [Português](README.pt.md)

A component library for Angular 21 or later, documented in English and Portuguese.
Accessible components, themes through CSS variables and dark mode included.

## Structure

| Folder | Contents |
| --- | --- |
| `projects/core` | The `@muxima-ui/core` package: components, tokens and styles (list in `projects/core/README.md`) |
| `projects/docs` | Documentation site in English (at the root) and Portuguese (under `/pt`): a page per component, blocks, theming, dark mode, languages, quality standard, templates, pricing, consulting and changelog |

## Quality standard

Every component follows the eight rules described at `/docs/quality-standard` on the site: Angular 21+, native HTML first, WAI-ARIA and keyboard, forms, complete states, tokens only, a small API (`variant`, `size`, `disabled`; at most 6 variants and 3 sizes) and tests with axe.

## Requirements

- Node.js 20.19 or later (22 recommended)
- For `test:a11y`, Playwright's Chromium: `npx playwright install chromium`
- npm 11 (npm 10.9 fails to install this workspace with an `edgesOut` error; use `npx npm@11 install` if needed)

## Commands

```bash
npm install          # install dependencies
npm start            # documentation site at http://localhost:4200 (generates the example code first)
npm test             # library tests (Vitest), with axe on every component
npm run build:core   # build the package into dist/core
npm run build:docs   # build the site into dist/docs
npm run docs:examples # only regenerate the code shown in each example
npm run test:a11y    # axe on every page of the site, light and dark (after build:docs)
```

## Using the library in an app

```bash
npm install @muxima-ui/core @angular/cdk
```

In `angular.json`, add the styles:

```json
"styles": ["@muxima-ui/core/styles.css", "src/styles.css"]
```

Then import only what you need:

```ts
import { MxButton } from '@muxima-ui/core/button';
import { MxFormField, MxLabel, MxInput } from '@muxima-ui/core/form-field';
```

## Theming

Every color comes from `--mx-*` variables. To match your brand:

```css
:root {
  --mx-accent: #7a1f3d;
  --mx-radius: 8px;
}
```

Dark mode follows the system by default; force it with `<html data-theme="dark">` or `data-theme="light"`.

## Languages

English (the default since 2.0) and Portuguese. For Portuguese, `provideMuximaI18n({ locale: 'pt' })`; switch at runtime with `inject(MxI18n).setLocale('en')`. See the Languages page in the docs.

## Compatibility

Angular 21 and 22 (`peerDependencies: >=21.0.0 <23.0.0`). Earlier versions are not supported.

## Tests and publishing

- `npm run test:e2e`: end-to-end tests with Playwright (keyboard, focus and accessibility with menus, dialogs and the calendar open). Needs `npm run build:docs` first.
- `docs/verificacao-leitores-de-ecra.md`: manual checklist with NVDA, VoiceOver and TalkBack (in Portuguese).
- `docs/publicar.md`: how to publish to npm and deprecate old packages (in Portuguese).
- `CHANGELOG.md`: changes per version (in Portuguese).

## License

MIT. Author: Aldemiro Valentim.
