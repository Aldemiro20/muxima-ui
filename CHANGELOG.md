# Changelog

Todas as alterações relevantes do pacote `@muxima-ui/core`. O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-PT/1.1.0/) e as versões seguem o [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.5.0] - por publicar

Idiomas: português e inglês.

### Novos

- **Idiomas** (`@muxima-ui/core/i18n`): todos os textos dos componentes (botões, avisos ao leitor de ecrã, nomes das cores, atalhos de datas) vêm do idioma activo. A biblioteca traz português (`MX_MESSAGES_PT`) e inglês (`MX_MESSAGES_EN`).
  - `provideMuximaI18n({ locale: 'en' })` escolhe o idioma ao arrancar; `messages` corrige textos ou acrescenta idiomas (um idioma novo parte do inglês).
  - O serviço `MxI18n` guarda o idioma num signal: `setLocale('en')` muda logo todos os componentes no ecrã.
  - Cada idioma define também o locale de `Intl` (`pt-AO`, `en-US`), a ordem das datas escritas (`dd/mm/aaaa` ou `mm/dd/yyyy`) e o primeiro dia da semana.
  - `injectMxMessages()` dá os textos aos teus próprios componentes.
- `mxParseDate` e `mxFormatDate` aceitam a ordem (`'dmy'`, `'mdy'`, `'ymd'`); `mxColorName` aceita os nomes das cores noutro idioma; `mxSortData` aceita o locale; `mxDefaultRangePresets` aceita os nomes dos atalhos.

### Alterado

- Os inputs de texto dos componentes (por exemplo `removeLabel`, `placeholder`, `emptyText`) passam a ter `undefined` por omissão e, sem valor, usam o idioma activo. Quem passa um texto continua a vê-lo; quem não passa vê o mesmo texto em português de antes. Os inputs `locale` funcionam da mesma forma.
- `MX_TOUR_LABELS` fica obsoleto; os textos da visita guiada vêm do idioma activo.
- Na 2.0, o inglês passa a ser o idioma por omissão. Para manter o português, indica já `provideMuximaI18n({ locale: 'pt' })`.

### Corrigido

- Data grid: os campos na barra (`mxGridToolbar`) encolhem em ecrãs estreitos em vez de saírem da grelha.

## [1.4.0] - 2026-10-28

Visita guiada e blocos.

### Novos

- **Tour guide** (`@muxima-ui/core/tour`): visita guiada que destaca um elemento de cada vez, com o serviço `MxTour` e a directiva `mxTourAnchor`. O cartão é um diálogo modal (foco preso, setas para mudar de passo, Escape para fechar, foco devolvido no fim); passos sem alvo ficam ao centro; `beforeShow` prepara o ecrã antes de cada passo (ex.: abrir um separador); `startAt` para continuar onde parou; `afterClosed` diz se chegou ao fim; textos em `labels`; `dismissible: false` para visitas obrigatórias. Respeita reduzir movimento e alto contraste.

### Documentação

- Blocos para copiar (não entram no pacote): 32 secções em 10 categorias (Hero, Feature card, Pricing card, Product card, Navbar, Shopping cart, Settings item, Comments, Credit card form e Onboarding), cada uma num iframe com ecrã inteiro, tablet e telemóvel, e o código .ts, .html e .css.

## [1.3.0] - 2026-10-28

Componentes avançados. Com esta versão, todos os componentes do plano 1.x estão publicados.

### Novos

- **Data grid** (`@muxima-ui/core/data-grid`): padrão WAI-ARIA Grid com navegação célula a célula, ordenação, filtros por coluna (texto, número com >, < e intervalos, lista), pesquisa, selecção simples e múltipla, colunas redimensionáveis (rato e Alt + setas), fixas e escondíveis, scroll virtual com aria-rowcount real, modelos de célula e modo servidor (`manual`).
- **Kanban** (`@muxima-ui/core/kanban`): colunas com arrastar e largar e mover com o teclado (Espaço, setas, Esc), anúncios de cada passo, limite por coluna e rodapé por coluna.
- **Image cropper** (`@muxima-ui/core/image-cropper`): área de recorte com rato e teclado, proporção, máscara redonda, zoom, rodar e exportação na resolução original (`toBlob`, `toDataURL`, `areaChange`).
- **Rich text editor** (`@muxima-ui/core/editor`): sobre o Tiptap 3 (dependência opcional), barra role=toolbar com setas e Alt + F10, ligações, contagem com limite, só leitura e integração com formulários; o valor é HTML.

### Alterado

- Documentação: mais 13 exemplos (filtros iniciais, acções em massa, totais e colunas escondidas na Data grid; desfazer, acções no cartão e limite no Kanban; pré-visualização ao vivo e tamanho final no Image cropper; ngModel, contagem de palavras, rascunho automático e pré-visualização no editor) e nota sobre quando usar Table ou Data grid.
- Kanban: a contagem lida pelo leitor de ecrã diz "1 cartão" no singular.

## [1.2.0] - 2026-10-27

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
