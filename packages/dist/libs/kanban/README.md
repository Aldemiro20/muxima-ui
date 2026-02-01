# Kanban

Quadro Kanban completo com drag & drop, limites WIP e busca integrada.

## Instalação

```bash
npm install @muxima-ui/kanban @angular/cdk
```

## Uso Básico

```typescript
import { KanbanComponent } from '@muxima-ui/kanban';

columns = [
  {
    id: 'todo',
    title: 'A Fazer',
    color: '#667eea',
    cards: [...]
  }
];
```

```html
<muxima-kanban
  [columns]="columns"
  [showSearch]="true"
  [showLimits]="true"
  (cardMoved)="onCardMoved($event)">
</muxima-kanban>
```

## Features

- 🎯 Drag & Drop com Angular CDK
- 🔍 Busca em tempo real
- ⚡ Limites WIP (Work In Progress)
- 🎨 Customizável (cores, prioridades)
- 📱 Responsivo

## Documentação Completa

Visite a documentação completa em `/components/kanban`
