# 📦 Guia de Migração - Nova Estrutura

## 🎯 Visão Geral

Este guia ajudará você a entender e adaptar-se à nova estrutura profissional do Muxima UI.

## 🔄 Principais Mudanças

### 1. Renomeação de Diretórios

| Antigo | Novo | Motivo |
|--------|------|--------|
| `libs/` | `packages/` | Padrão da indústria (similar ao Angular Material, React, etc.) |
| `apps/design-system/` | `apps/docs/` | Nome mais descritivo e alinhado com propósito |

### 2. Organização por Categoria

Os componentes agora estão organizados em categorias lógicas:

```
packages/
├── core/              # Utilitários compartilhados
├── components/        # Componentes básicos
├── form/              # Controles de formulário
├── data/              # Exibição de dados
├── overlay/           # Modais e overlays
├── media/             # Componentes de mídia
├── advanced/          # Componentes complexos
├── navigation/        # Navegação
└── utility/           # Utilitários
```

### 3. Novos Imports

#### Antes:
```typescript
import { ButtonComponent } from '@muxima-ui/button';
import { InputComponent } from '@muxima-ui/input';
import { DialogComponent } from '@muxima-ui/dialog';
```

#### Depois:
```typescript
import { MuxButtonComponent } from '@muxima-ui/components/button';
import { MuxInputComponent } from '@muxima-ui/form/input';
import { MuxDialogComponent } from '@muxima-ui/overlay/dialog';
```

## 🛠️ Como Migrar Seu Código

### Passo 1: Atualizar Imports

Execute o script de migração automática:

```bash
node tools/scripts/migrate-imports.js
```

Ou atualize manualmente:

```typescript
// ❌ Antigo
import { ButtonComponent } from '@muxima-ui/button';

// ✅ Novo
import { MuxButtonComponent } from '@muxima-ui/components/button';
```

### Passo 2: Atualizar Seletores (se necessário)

A maioria dos seletores permanece igual, mas alguns componentes agora têm o prefixo `mux-`:

```html
<!-- Antigo -->
<muxima-button>Click</muxima-button>

<!-- Novo (permanece igual) -->
<muxima-button>Click</muxima-button>
```

### Passo 3: Atualizar package.json

```json
{
  "dependencies": {
    // ❌ Antigo - instalação individual
    "@muxima-ui/button": "^1.0.0",
    "@muxima-ui/input": "^1.0.0",
    "@muxima-ui/dialog": "^1.0.0"
    
    // ✅ Novo - instalação por categoria
    "@muxima-ui/core": "^1.0.0",
    "@muxima-ui/components": "^1.0.0",
    "@muxima-ui/form": "^1.0.0",
    "@muxima-ui/overlay": "^1.0.0"
  }
}
```

### Passo 4: Atualizar Imports de Estilos

```scss
// ❌ Antigo
@import '~@muxima-ui/button/styles';
@import '~@muxima-ui/input/styles';

// ✅ Novo
@import '@muxima-ui/styles/themes/default';
```

## 📋 Mapeamento de Componentes

### Components (`@muxima-ui/components`)

| Componente | Import Antigo | Import Novo |
|------------|--------------|-------------|
| Button | `@muxima-ui/button` | `@muxima-ui/components/button` |
| Badge | `@muxima-ui/badge` | `@muxima-ui/components/badge` |
| Card | `@muxima-ui/card` | `@muxima-ui/components/card` |
| Avatar | `@muxima-ui/avatar` | `@muxima-ui/components/avatar` |
| Chip | `@muxima-ui/chip` | `@muxima-ui/components/chip` |
| Progress | `@muxima-ui/progress` | `@muxima-ui/components/progress` |
| Skeleton | `@muxima-ui/skeleton` | `@muxima-ui/components/skeleton` |
| Loading | `@muxima-ui/loading` | `@muxima-ui/components/loading` |
| Alert | `@muxima-ui/alert` | `@muxima-ui/components/alert` |
| Accordion | `@muxima-ui/accordion` | `@muxima-ui/components/accordion` |

### Form (`@muxima-ui/form`)

| Componente | Import Antigo | Import Novo |
|------------|--------------|-------------|
| Input | `@muxima-ui/input` | `@muxima-ui/form/input` |
| Select | `@muxima-ui/select` | `@muxima-ui/form/select` |
| Checkbox | `@muxima-ui/checkbox` | `@muxima-ui/form/checkbox` |
| Radio | `@muxima-ui/radio-button` | `@muxima-ui/form/radio-button` |
| Toggle | `@muxima-ui/toggle` | `@muxima-ui/form/toggle` |
| Slider | `@muxima-ui/slider` | `@muxima-ui/form/slider` |
| Datepicker | `@muxima-ui/datepicker` | `@muxima-ui/form/datepicker` |
| Autocomplete | `@muxima-ui/autocomplete` | `@muxima-ui/form/autocomplete` |

### Data (`@muxima-ui/data`)

| Componente | Import Antigo | Import Novo |
|------------|--------------|-------------|
| Table | `@muxima-ui/table` | `@muxima-ui/data/table` |
| Data Table | `@muxima-ui/data-table` | `@muxima-ui/data/data-table` |
| Pagination | `@muxima-ui/pagination` | `@muxima-ui/data/pagination` |
| Tree View | `@muxima-ui/tree-view` | `@muxima-ui/data/tree-view` |
| Timeline | `@muxima-ui/timeline` | `@muxima-ui/data/timeline` |

### Overlay (`@muxima-ui/overlay`)

| Componente | Import Antigo | Import Novo |
|------------|--------------|-------------|
| Dialog | `@muxima-ui/dialog` | `@muxima-ui/overlay/dialog` |
| Modal | `@muxima-ui/modal` | `@muxima-ui/overlay/modal` |
| Drawer | `@muxima-ui/drawer` | `@muxima-ui/overlay/drawer` |
| Tooltip | `@muxima-ui/tooltip` | `@muxima-ui/overlay/tooltip` |
| Toast | `@muxima-ui/toast` | `@muxima-ui/overlay/toast` |
| Dropdown | `@muxima-ui/dropdown` | `@muxima-ui/overlay/dropdown` |

### Media (`@muxima-ui/media`)

| Componente | Import Antigo | Import Novo |
|------------|--------------|-------------|
| Video Player | `@muxima-ui/video-player` | `@muxima-ui/media/video-player` |
| Carousel | `@muxima-ui/carousel` | `@muxima-ui/media/carousel` |
| Image Cropper | `@muxima-ui/image-cropper` | `@muxima-ui/media/image-cropper` |

### Advanced (`@muxima-ui/advanced`)

| Componente | Import Antigo | Import Novo |
|------------|--------------|-------------|
| Chart | `@muxima-ui/chart` | `@muxima-ui/advanced/chart` |
| Kanban | `@muxima-ui/kanban` | `@muxima-ui/advanced/kanban` |
| Calendar | `@muxima-ui/calendar` | `@muxima-ui/advanced/calendar` |
| Rich Editor | `@muxima-ui/rich-text-editor` | `@muxima-ui/advanced/rich-text-editor` |

### Navigation (`@muxima-ui/navigation`)

| Componente | Import Antigo | Import Novo |
|------------|--------------|-------------|
| Navbar | `@muxima-ui/navbar` | `@muxima-ui/navigation/navbar` |
| Sidebar | `@muxima-ui/sidebar` | `@muxima-ui/navigation/sidebar` |
| Tabs | `@muxima-ui/tabs` | `@muxima-ui/navigation/tabs` |
| Breadcrumb | `@muxima-ui/breadcrumb` | `@muxima-ui/navigation/breadcrumb` |
| Stepper | `@muxima-ui/stepper` | `@muxima-ui/navigation/stepper` |

## 🔧 Script de Migração Automática

Criamos um script que atualiza automaticamente seus imports:

```bash
# Executar migração
node tools/scripts/migrate-imports.js

# Com preview (não modifica arquivos)
node tools/scripts/migrate-imports.js --dry-run

# Para um diretório específico
node tools/scripts/migrate-imports.js --path=src/app
```

## ✅ Checklist de Migração

- [ ] Atualizar `package.json` com novos pacotes
- [ ] Executar `npm install`
- [ ] Rodar script de migração de imports
- [ ] Atualizar imports de estilos
- [ ] Testar aplicação
- [ ] Atualizar testes
- [ ] Atualizar documentação interna
- [ ] Verificar build de produção

## 🐛 Problemas Comuns

### Erro: "Cannot find module '@muxima-ui/button'"

**Solução:** Atualize o import para a nova estrutura:
```typescript
import { MuxButtonComponent } from '@muxima-ui/components/button';
```

### Erro: "No provider for MuxThemeService"

**Solução:** Importe o `@muxima-ui/core`:
```typescript
import { provideMuxCore } from '@muxima-ui/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideMuxCore()
  ]
});
```

### Estilos não carregando

**Solução:** Atualize o import de estilos:
```scss
@import '@muxima-ui/styles/themes/default';
```

## 📞 Suporte

Se encontrar problemas durante a migração:

1. Verifique a [documentação](https://muxima-ui.vercel.app)
2. Consulte os [exemplos](https://muxima-ui.vercel.app/examples)
3. Abra uma [issue](https://github.com/Aldemiro20/muxima-ui/issues)

## 🎉 Benefícios da Nova Estrutura

### Para Desenvolvedores
- ✅ Imports mais organizados e intuitivos
- ✅ Melhor tree-shaking (menor bundle size)
- ✅ Instalação modular por categoria
- ✅ Alinhado com padrões da indústria

### Para o Projeto
- ✅ Melhor manutenibilidade
- ✅ CI/CD mais eficiente
- ✅ Publicação NPM simplificada
- ✅ Deploy Vercel otimizado

## 📚 Recursos Adicionais

- [Documentação Completa](https://muxima-ui.vercel.app/docs)
- [Guia de Instalação](https://muxima-ui.vercel.app/guides/installation)
- [API Reference](https://muxima-ui.vercel.app/api)
- [Exemplos](https://muxima-ui.vercel.app/examples)

---

**Última atualização:** Fevereiro 2026
