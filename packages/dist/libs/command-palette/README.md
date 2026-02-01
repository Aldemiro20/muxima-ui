# Command Palette

Paleta de comandos com busca fuzzy e atalhos de teclado, inspirada no VSCode e Spotlight.

## Instalação

```bash
npm install @muxima-ui/command-palette
```

## Uso Básico

```typescript
import { CommandPaletteComponent, CommandItem } from '@muxima-ui/command-palette';

commands: CommandItem[] = [
  {
    id: 'nav-home',
    label: 'Ir para Home',
    icon: '🏠',
    category: 'Navegação',
    shortcut: 'Ctrl+H',
    action: () => this.navigateTo('/'),
    keywords: ['home', 'início']
  }
];
```

```html
<muxima-command-palette
  [commands]="commands"
  placeholder="Digite um comando..."
  (commandExecuted)="onCommandExecuted($event)">
</muxima-command-palette>
```

## Features

- ⚡ Atalho global (Ctrl+K)
- 🔍 Busca fuzzy inteligente
- ⌨️ Navegação por teclado
- 🎯 Organização por categorias
- 🎨 Totalmente customizável

## Atalhos de Teclado

- **Ctrl+K** - Abrir/Fechar
- **↑↓** - Navegar
- **Enter** - Executar
- **ESC** - Fechar

## Documentação Completa

Visite a documentação completa em `/components/command-palette`
