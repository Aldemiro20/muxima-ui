# 🌺 Muxima UI

<div align="center">

![Muxima UI Logo](https://img.shields.io/badge/Muxima-UI-8B5CF6?style=for-the-badge&logo=angular&logoColor=white)

**Design com coração – Componentes acessíveis, elegantes e feitos para pessoas.**

[![Angular](https://img.shields.io/badge/Angular-15+-DD0031?style=flat-square&logo=angular)](https://angular.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Nx](https://img.shields.io/badge/Nx-Monorepo-143055?style=flat-square&logo=nx)](https://nx.dev)
[![License](https://img.shields.io/badge/License-MIT-success?style=flat-square)](LICENSE)

[Documentação](#-componentes) • [Instalação](#-instalação) • [Exemplos](#-exemplos) • [Contribuir](#-contribuindo)

</div>

---

## 📖 Sobre

**Muxima UI** é uma biblioteca de componentes Angular moderna, inspirada na cultura e identidade angolana. Cada componente é cuidadosamente projetado para oferecer:

- ✨ **Design Elegante**: Gradientes vibrantes, animações suaves e atenção aos detalhes
- 🎨 **Tema Unificado**: Paleta de cores coesa (azul → índigo → roxo → magenta)
- ♿ **Acessibilidade**: Componentes pensados para todos os usuários
- 🚀 **Performance**: Otimizado para Angular com Standalone Components
- 🧩 **Modular**: Importe apenas o que precisa
- 🌍 **Identidade Africana**: Padrões e elementos visuais únicos

---

## 🎨 Paleta de Cores

```scss
Primary:   #2563EB → #6366F1 → #8B5CF6  // Azul → Índigo → Roxo
Accent:    #D946EF                       // Magenta
Success:   #10B981 → #22C55E → #34D399  // Verde
Warning:   #F59E0B → #FBBF24 → #FCD34D  // Amarelo
Error:     #EF4444 → #F87171 → #FCA5A5  // Vermelho
```

---

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ 
- Angular 15+
- npm ou yarn

### Via NPM (Em breve)

```bash
npm install @muxima-ui/core
```

### Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/muxima-ui.git
cd muxima-ui

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start

# Execute os testes
npm test
```

---

## 🧩 Componentes

### 📊 Feedback & Status

| Componente | Descrição | Status |
|------------|-----------|--------|
| [**Alert**](#alert) | Mensagens de notificação com múltiplos estilos | ✅ Pronto |
| [**Progress**](#progress) | Barras de progresso lineares e circulares | ✅ Pronto |
| [**Badge**](#badge) | Etiquetas e contadores com variantes | ✅ Pronto |
| [**Toast**](#toast) | Notificações temporárias | 🚧 Em desenvolvimento |
| [**Loading**](#loading) | Indicadores de carregamento | 🚧 Em desenvolvimento |

### 🎭 Exibição

| Componente | Descrição | Status |
|------------|-----------|--------|
| [**Avatar**](#avatar) | Fotos de perfil com fallback e badges | ✅ Pronto |
| [**Card**](#card) | Contêineres com variante African Pattern | ✅ Pronto |
| [**Timeline**](#timeline) | Linha do tempo vertical/horizontal | ✅ Pronto |
| [**Accordion**](#accordion) | Painéis expansíveis | ✅ Pronto |
| [**Carousel**](#carousel) | Slides de imagens e conteúdo | 🚧 Em desenvolvimento |
| [**Modal**](#modal) | Diálogos e overlays | 🚧 Em desenvolvimento |

### 📝 Formulários

| Componente | Descrição | Status |
|------------|-----------|--------|
| [**Input**](#input) | Campos de texto com validação | ✅ Pronto |
| [**Select**](#select) | Menus dropdown customizados | ✅ Pronto |
| [**Checkbox**](#checkbox) | Caixas de seleção estilizadas | ✅ Pronto |
| [**Radio Button**](#radio-button) | Botões de opção exclusiva | ✅ Pronto |
| [**Toggle**](#toggle) | Interruptores on/off elegantes | ✅ Pronto |
| [**File Upload**](#file-upload) | Upload de arquivos drag & drop | ✅ Pronto |
| [**Datepicker**](#datepicker) | Seletor de datas | 🚧 Em desenvolvimento |
| [**Slider**](#slider) | Controles deslizantes | 🚧 Em desenvolvimento |

### 🧭 Navegação

| Componente | Descrição | Status |
|------------|-----------|--------|
| [**Button**](#button) | Botões com múltiplas variantes | ✅ Pronto |
| [**Breadcrumb**](#breadcrumb) | Navegação hierárquica | 🚧 Em desenvolvimento |
| [**Tabs**](#tabs) | Abas de conteúdo | 🚧 Em desenvolvimento |
| [**Navbar**](#navbar) | Barra de navegação | 🚧 Em desenvolvimento |
| [**Sidebar**](#sidebar) | Menu lateral | 🚧 Em desenvolvimento |
| [**Pagination**](#pagination) | Paginação de dados | 🚧 Em desenvolvimento |
| [**Stepper**](#stepper) | Wizard de múltiplos passos | ✅ Pronto |

### 📊 Dados

| Componente | Descrição | Status |
|------------|-----------|--------|
| [**Table**](#table) | Tabelas de dados | ✅ Pronto |
| [**Chip**](#chip) | Tags removíveis | 🚧 Em desenvolvimento |
| [**Tooltip**](#tooltip) | Dicas contextuais | 🚧 Em desenvolvimento |
| [**Dropdown**](#dropdown) | Menus contextuais | 🚧 Em desenvolvimento |

---

## 🚀 Exemplos

### Alert

```typescript
import { MuximaAlertComponent } from '@muxima-ui/alert';

@Component({
  standalone: true,
  imports: [MuximaAlertComponent],
  template: `
    <muxima-alert 
      type="success" 
      appearance="fill"
      [closable]="true">
      Operação realizada com sucesso!
    </muxima-alert>
  `
})
export class AppComponent {}
```

### Progress

```typescript
import { ProgressProgressComponent } from '@muxima/progress';

@Component({
  standalone: true,
  imports: [ProgressProgressComponent],
  template: `
    <!-- Linear -->
    <muxima-progress 
      [value]="75" 
      [max]="100" 
      type="linear"
      color="primary"
      [showLabel]="true"
      [striped]="true"
      [animated]="true">
    </muxima-progress>

    <!-- Circular -->
    <muxima-progress 
      [value]="60" 
      type="circular"
      color="success"
      size="lg"
      [showLabel]="true">
    </muxima-progress>
  `
})
export class AppComponent {}
```

### Avatar

```typescript
import { AvatarAvatarComponent } from '@muxima/avatar';

@Component({
  standalone: true,
  imports: [AvatarAvatarComponent],
  template: `
    <muxima-avatar
      [src]="user.photo"
      [name]="user.name"
      size="lg"
      shape="circle"
      status="online"
      [showBadge]="true"
      [badgeCount]="3">
    </muxima-avatar>
  `
})
export class AppComponent {}
```

### Card

```typescript
import { CardCardComponent } from '@muxima/card';

@Component({
  standalone: true,
  imports: [CardCardComponent],
  template: `
    <muxima-card 
      variant="african-pattern"
      size="md"
      [hoverable]="true"
      [clickable]="true">
      <div class="muxima-card-header">
        <h3>Título do Card</h3>
      </div>
      <div class="muxima-card-body">
        Conteúdo com padrão africano único
      </div>
      <div class="muxima-card-footer">
        <button>Ação</button>
      </div>
    </muxima-card>
  `
})
export class AppComponent {}
```

### Toggle

```typescript
import { ToggleToggleComponent } from '@muxima/toggle';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ToggleToggleComponent, FormsModule],
  template: `
    <muxima-toggle
      [(checked)]="isEnabled"
      [disabled]="false"
      size="md"
      color="primary"
      label="Habilitar notificações">
    </muxima-toggle>
  `
})
export class AppComponent {
  isEnabled = false;
}
```

### Badge

```typescript
import { BadgeBadgeComponent } from '@muxima/badge';

@Component({
  standalone: true,
  imports: [BadgeBadgeComponent],
  template: `
    <muxima-badge 
      variant="solid"
      color="primary"
      size="md"
      [dot]="false"
      [removable]="true"
      (remove)="handleRemove()">
      Novo
    </muxima-badge>
  `
})
export class AppComponent {}
```

### Timeline

```typescript
import { TimelineTimelineComponent } from '@muxima/timeline';

@Component({
  standalone: true,
  imports: [TimelineTimelineComponent],
  template: `
    <muxima-timeline 
      [items]="timelineItems"
      orientation="vertical">
    </muxima-timeline>
  `
})
export class AppComponent {
  timelineItems = [
    { 
      title: 'Projeto Iniciado', 
      description: 'O desenvolvimento começou',
      status: 'completed',
      date: '2024-01-01'
    },
    { 
      title: 'Design Aprovado', 
      description: 'Wireframes finalizados',
      status: 'active',
      date: '2024-01-15'
    },
    { 
      title: 'Lançamento', 
      description: 'Release previsto',
      status: 'pending',
      date: '2024-02-01'
    }
  ];
}
```

---

## 🎯 Recursos

- **Standalone Components**: Totalmente compatível com a arquitetura moderna do Angular
- **Tree-shakeable**: Otimize o bundle importando apenas o necessário
- **TypeScript**: Tipagem completa para melhor DX
- **Responsive**: Componentes adaptáveis a diferentes telas
- **Dark Mode Ready**: Preparado para tema escuro (em breve)
- **RTL Support**: Suporte a idiomas da direita para esquerda (planejado)
- **SSR Compatible**: Funciona com Angular Universal

---

## 🛠️ Estrutura do Projeto

```
muxima-ui/
├── apps/
│   └── design-system/          # Aplicação de demonstração
├── libs/
│   ├── alert/                  # Componente Alert
│   ├── avatar/                 # Componente Avatar
│   ├── badge/                  # Componente Badge
│   ├── button/                 # Componente Button
│   ├── card/                   # Componente Card
│   ├── checkbox/               # Componente Checkbox
│   ├── input/                  # Componente Input
│   ├── progress/               # Componente Progress
│   ├── radio-button/           # Componente Radio Button
│   ├── select/                 # Componente Select
│   ├── stepper/                # Componente Stepper
│   ├── table/                  # Componente Table
│   ├── timeline/               # Componente Timeline
│   ├── toggle/                 # Componente Toggle
│   ├── toast/                  # Componente Toast
│   ├── file-upload/            # Componente File Upload
│   ├── accordion/              # Componente Accordion
│   ├── dialog/                 # Componente Dialog
│   └── styles/                 # Tema e variáveis globais
│       └── _theme.scss         # Variáveis SCSS centralizadas
├── docs/                       # Documentação detalhada
├── package.json
├── nx.json
└── README.md
```

---

## 📚 Documentação Detalhada

Consulte a pasta [`docs/`](./docs/) para documentação completa de cada componente, incluindo:

- API completa (Inputs, Outputs, Métodos)
- Exemplos de uso avançado
- Personalização e temas
- Guias de acessibilidade
- Boas práticas

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Código de Conduta

Este projeto segue o [Contributor Covenant](https://www.contributor-covenant.org/). Seja respeitoso e inclusivo.

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🙏 Agradecimentos

- Inspirado na rica cultura e identidade angolana 🇦🇴
- Comunidade Angular
- Todos os contribuidores

---

## 📞 Contato

- **Website**: [muxima-ui.dev](https://muxima-ui.dev) (em breve)
- **GitHub**: [github.com/seu-usuario/muxima-ui](https://github.com/seu-usuario/muxima-ui)
- **Email**: contato@muxima-ui.dev

---

<div align="center">

**Feito com 🫶 Muxima (coração)**

⭐ Se este projeto te ajudou, considere dar uma estrela!

</div>
