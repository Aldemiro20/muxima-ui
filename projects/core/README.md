# @muxima-ui/core

**English** · [Português](https://github.com/Aldemiro20/muxima-ui/blob/HEAD/projects/core/README.pt.md)

Accessible Angular components, themed with CSS variables, with dark mode included.
Requires Angular 21 or later and `@angular/cdk`.

**Documentation and examples:** [muxima-ui.pages.dev](https://muxima-ui.pages.dev)

```bash
npm install @muxima-ui/core @angular/cdk
```

Styles (in `angular.json`):

```json
"styles": ["@muxima-ui/core/styles.css"]
```

Fonts (optional; without them the system fonts are used):

```bash
npm install @fontsource/instrument-sans @fontsource/ibm-plex-mono
```

Each component has its own entry point, so you only import what you use:

```ts
import { MxButton } from '@muxima-ui/core/button';
import { MxFormField, MxLabel, MxInput } from '@muxima-ui/core/form-field';
```

| Entry point | Exports |
| --- | --- |
| `@muxima-ui/core/button` | `MxButton` |
| `@muxima-ui/core/form-field` | `MxFormField`, `MxLabel`, `MxHint`, `MxError`, `MxInput` (input and textarea), `MxChoice`, `MxFieldset` |
| `@muxima-ui/core/select` | `MxSelect` (single and `multiple`), `MxOption` |
| `@muxima-ui/core/combobox` | `MxCombobox` |
| `@muxima-ui/core/checkbox` | `MxCheckbox` |
| `@muxima-ui/core/radio` | `MxRadio` |
| `@muxima-ui/core/switch` | `MxSwitch` |
| `@muxima-ui/core/slider` | `MxSlider`, `MxRangeSlider` (two thumbs) |
| `@muxima-ui/core/date-picker` | `MxDatePicker`, `MxDateRangePicker`, `MxCalendar`, `mxDefaultRangePresets`, `mxDateRangeComplete`, `mxParseDate`, `mxFormatDate` |
| `@muxima-ui/core/time-picker` | `MxTimePicker`, `mxParseTime` |
| `@muxima-ui/core/otp` | `MxOtp` |
| `@muxima-ui/core/chips` | `MxChip`, `MxChipToggle`, `MxTagInput` |
| `@muxima-ui/core/file-upload` | `MxFileUpload`, `mxFormatBytes` |
| `@muxima-ui/core/rating` | `MxRating` |
| `@muxima-ui/core/clipboard` | `MxCopy`, `MxCopyButton` |
| `@muxima-ui/core/color-picker` | `MxColorPicker`, `MxColorPanel`, `mxParseColor`, `mxColorName`, `mxContrast` |
| `@muxima-ui/core/sidebar` | `MX_SIDEBAR` |
| `@muxima-ui/core/timeline` | `MX_TIMELINE` |
| `@muxima-ui/core/carousel` | `MxCarousel`, `MxCarouselSlide` |
| `@muxima-ui/core/notification-center` | `MxNotificationCenter`, `MxNotificationBell`, `mxRelativeTime` |
| `@muxima-ui/core/data-grid` | `MX_DATA_GRID`, `MxGridColumn` |
| `@muxima-ui/core/kanban` | `MX_KANBAN`, `MxKanbanColumn` |
| `@muxima-ui/core/image-cropper` | `MxImageCropper` |
| `@muxima-ui/core/editor` | `MxEditor` (needs Tiptap, see below) |
| `@muxima-ui/core/table` | `MX_TABLE`, `mxSortData` |
| `@muxima-ui/core/card` | `MX_CARD` |
| `@muxima-ui/core/badge` | `MxBadge` |
| `@muxima-ui/core/avatar` | `MxAvatar` |
| `@muxima-ui/core/separator` | `MxSeparator` |
| `@muxima-ui/core/tabs` | `MxTabs`, `MxTab` |
| `@muxima-ui/core/breadcrumb` | `MxBreadcrumb` |
| `@muxima-ui/core/pagination` | `MxPagination` |
| `@muxima-ui/core/accordion` | `MX_ACCORDION` |
| `@muxima-ui/core/stepper` | `MX_STEPPER` |
| `@muxima-ui/core/command` | `MX_COMMAND`, `MxCommandPalette` |
| `@muxima-ui/core/dialog` | `MxDialog`, `MX_DIALOG`, `MxDialogRef`, `MX_DIALOG_DATA` |
| `@muxima-ui/core/drawer` | `MxDrawer` |
| `@muxima-ui/core/menu` | `MX_MENU` |
| `@muxima-ui/core/popover` | `MX_POPOVER` |
| `@muxima-ui/core/tooltip` | `MxTooltip` |
| `@muxima-ui/core/tour` | `MxTour`, `MxTourAnchor` (guided tour) |
| `@muxima-ui/core/alert` | `MX_ALERT` |
| `@muxima-ui/core/progress` | `MxProgress`, `MxSpinner` |
| `@muxima-ui/core/skeleton` | `MxSkeleton` |
| `@muxima-ui/core/toast` | `MxToast` |
| `@muxima-ui/core/i18n` | `provideMuximaI18n`, `MxI18n`, `MX_MESSAGES_PT`, `MX_MESSAGES_EN`, `injectMxMessages` |

## Languages

Component texts (buttons, screen reader announcements, color names, date shortcuts) come in English (the default) and Portuguese. For Portuguese:

```ts
import { provideMuximaI18n } from '@muxima-ui/core/i18n';

providers: [provideMuximaI18n({ locale: 'pt' })]
```

`inject(MxI18n).setLocale('en')` switches the language without reloading. Use `messages` to change any text or add another language. Upgrading from 1.x and want to keep Portuguese? Set `locale: 'pt'`.

## Theming

Every color comes from `--mx-*` variables. To match your brand:

```css
:root {
  --mx-accent: #7a1f3d;
  --mx-radius: 8px;
}
```

Dark mode follows the system by default; force it with `<html data-theme="dark">` or `data-theme="light"`.

## Rich text editor

The editor uses Tiptap, which is optional: you only need it if you import `@muxima-ui/core/editor`.

```bash
npm install @tiptap/core @tiptap/pm @tiptap/starter-kit @tiptap/extensions
```

## Links

- [Documentation](https://muxima-ui.pages.dev)
- [Changelog](https://github.com/Aldemiro20/muxima-ui/blob/HEAD/CHANGELOG.md)
- [Issues](https://github.com/Aldemiro20/muxima-ui/issues)

MIT license. Created by [Aldemiro Valentim](https://www.linkedin.com/in/aldemiro-valentim/). Contact: [muximaui@gmail.com](mailto:muximaui@gmail.com).
