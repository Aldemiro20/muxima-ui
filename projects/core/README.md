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
| `@muxima-ui/core/slider` | `MxSlider` |
| `@muxima-ui/core/date-picker` | `MxDatePicker`, `MxCalendar`, `mxParseDate`, `mxFormatDate` |
| `@muxima-ui/core/otp` | `MxOtp` |
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

Time picker usa `input[type=time][mxInput]`, sem componente próprio.

Licença MIT.
