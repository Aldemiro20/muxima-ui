# @muxima-ui/core

Componentes Angular acessíveis, com temas por variáveis CSS e modo escuro.
Requer Angular 21 ou superior e `@angular/cdk`.

```bash
npm install @muxima-ui/core @angular/cdk
```

Estilos (em `angular.json`):

```json
"styles": ["@muxima-ui/core/styles.css"]
```

Fontes (opcional; sem elas usa as fontes do sistema):

```bash
npm install @fontsource/instrument-sans @fontsource/ibm-plex-mono
```

Cada componente tem o seu ponto de entrada, para só importares o que usas:

| Ponto de entrada | Exporta |
| --- | --- |
| `@muxima-ui/core/button` | `MxButton` |
| `@muxima-ui/core/form-field` | `MxFormField`, `MxLabel`, `MxHint`, `MxError`, `MxInput` (input e textarea), `MxChoice`, `MxFieldset` |
| `@muxima-ui/core/select` | `MxSelect` (simples e `multiple`), `MxOption` |
| `@muxima-ui/core/combobox` | `MxCombobox` |
| `@muxima-ui/core/checkbox` | `MxCheckbox` |
| `@muxima-ui/core/radio` | `MxRadio` |
| `@muxima-ui/core/switch` | `MxSwitch` |
| `@muxima-ui/core/slider` | `MxSlider`, `MxRangeSlider` (dois cursores) |
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
| `@muxima-ui/core/editor` | `MxEditor` (precisa do Tiptap, ver abaixo) |
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
| `@muxima-ui/core/alert` | `MX_ALERT` |
| `@muxima-ui/core/progress` | `MxProgress`, `MxSpinner` |
| `@muxima-ui/core/skeleton` | `MxSkeleton` |
| `@muxima-ui/core/toast` | `MxToast` |

O editor de texto usa o Tiptap, que é opcional: só é preciso se importares `@muxima-ui/core/editor`.

```bash
npm install @tiptap/core @tiptap/pm @tiptap/starter-kit @tiptap/extensions
```

Licença MIT.
