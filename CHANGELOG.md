# Changelog

Todas as alterações relevantes do pacote `@muxima-ui/core`. O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-PT/1.1.0/) e as versões seguem o [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.2.0] - por publicar

Navegação e conteúdo.

### Novos

- **Sidebar** (`@muxima-ui/core/sidebar`): barra lateral que recolhe para ícones, com grupos, secções que abrem, contagens, cabeçalho e rodapé; os nomes ficam para o leitor de ecrã e aparecem numa dica.
- **Timeline** (`@muxima-ui/core/timeline`): lista ordenada com marcadores, variantes por estado, passos pendentes, ícones, horizontal e alternada.
- **Notification center** (`@muxima-ui/core/notification-center`): lista com por ler, filtros por categoria, marcar lida, marcar todas, remover e conteúdo próprio; botão `mxNotificationBell` com a contagem no nome; anuncia as que chegam.
- **Carousel** (`@muxima-ui/core/carousel`): padrão WAI-ARIA Carousel com scroll e snap, vários por vista, indicadores, ciclo, rotação automática com pausa e respeito por reduzir movimento.
- **Color picker** (`@muxima-ui/core/color-picker`): campo e painel com área de saturação e brilho, matiz, opacidade, hex e rgb(), amostras, conta-gotas e nomes das cores em português; funções `mxContrast` e conversões.

### Alterado

- Documentação: o código de todos os exemplos é compilado no CI (`npm run docs:check-examples`).

## [1.1.0] - 2026-10-27

Primeiro lote de componentes novos: formulários.

### Novos

- **Date range picker** (`MxDateRangePicker` em `@muxima-ui/core/date-picker`): dois campos num só, calendário em intervalo com pré-visualização, atalhos (`mxDefaultRangePresets`) e o validador `mxDateRangeComplete`.
- **Calendar em intervalo**: `mode="range"` com `[(range)]` e `(rangeSelected)`.
- **Time picker** (`@muxima-ui/core/time-picker`): combobox de horas com `step`, `min` e `max`; aceita 9, 930, 9h30.
- **Range slider** (`MxRangeSlider` em `@muxima-ui/core/slider`): dois cursores nativos, `minGap` e `format`.
- **Chips** (`@muxima-ui/core/chips`): `mx-chip` removível, `button[mxChipToggle]` para filtros e o campo `mx-tag-input`.
- **File upload** (`@muxima-ui/core/file-upload`): arrastar ou escolher, validação de tipo, tamanho e número, progresso e erros por ficheiro.
- **Rating** (`@muxima-ui/core/rating`): rádios nativos, `readonly` com meias estrelas, `clearable`.
- **Copy to clipboard** (`@muxima-ui/core/clipboard`): directiva `mxCopy` e botão `mxCopyButton`.

### Alterado

- Calendar: Enter e Espaço escolhem o dia activo mesmo antes de o foco chegar ao botão (evita escolher o dia anterior ao carregar depressa).

## [1.0.0] - 2026-10-27

Primeira versão pública da nova Muxima UI. Substitui os pacotes `@muxima-ui/*` 1.0.x, que passam a descontinuados.

### Requisitos

- Angular 21 ou 22 e `@angular/cdk` da mesma versão.
- Funciona com e sem zone.js.

### Componentes (33)

- Formulários: Button, Input, Textarea, Select (com `multiple`), Combobox, Checkbox, Radio, Switch, Slider, Date picker e Calendar, Time picker (input nativo), OTP input.
- Dados: Table (ordenação, variantes `striped` e `bordered`, cabeçalho fixo), Card, Badge, Avatar, Separator.
- Navegação: Tabs, Breadcrumb, Pagination (variantes `default`, `simple` e `compact`, linhas por página), Accordion, Stepper, Command Palette.
- Sobreposição: Dialog, Drawer, Dropdown menu (com submenus), Popover, Tooltip.
- Feedback: Alert, Progress e Spinner, Skeleton, Toast (cores por tipo, `promise()`).

### Padrão de qualidade

- Directivas sobre elementos nativos sempre que existe HTML equivalente.
- Padrões WAI-ARIA e teclado completo, sobre o `@angular/cdk`.
- Todos os campos funcionam com `ngModel` e Reactive Forms.
- Estados completos, documentados um a um.
- Só tokens CSS `--mx-*`; modo escuro automático; contornos dos controlos com contraste 3:1.
- API comum: `variant`, `size` (`sm`, `md`, `lg`) e `disabled`.
- Testes de comportamento e teclado com axe em cada componente; axe em todas as páginas da documentação; testes end-to-end com Playwright.

### Migração a partir dos pacotes 1.0.x

Os pacotes antigos (`@muxima-ui/button`, `@muxima-ui/select`...) não são compatíveis. A nova API usa directivas sobre o HTML nativo (`<button mxButton>` em vez de `<muxima-button>`) e um único pacote:

```bash
npm uninstall @muxima-ui/button @muxima-ui/input @muxima-ui/select
npm install @muxima-ui/core @angular/cdk
```
