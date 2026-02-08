# 📋 @muxima-ui/kanban# Kanban



> Kanban Board component for Angular 18+ with drag & dropQuadro Kanban completo com drag & drop, limites WIP e busca integrada.



[![npm version](https://img.shields.io/npm/v/@muxima-ui/kanban.svg)](https://www.npmjs.com/package/@muxima-ui/kanban)## Instalação

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

```bash

## 📦 Installationnpm install @muxima-ui/kanban @angular/cdk

```

```bash

npm install @muxima-ui/kanban## Uso Básico

```

```typescript

## 🚀 Quick Startimport { KanbanComponent } from '@muxima-ui/kanban';



```typescriptcolumns = [

import { Component } from '@angular/core';  {

import { KanbanComponent } from '@muxima-ui/kanban';    id: 'todo',

    title: 'A Fazer',

@Component({    color: '#667eea',

  selector: 'app-root',    cards: [...]

  standalone: true,  }

  imports: [KanbanComponent],];

  template: ````

    <muxima-kanban 

      [boards]="boards"```html

      (taskMoved)="onTaskMoved($event)"><muxima-kanban

    </muxima-kanban>  [columns]="columns"

  `  [showSearch]="true"

})  [showLimits]="true"

export class AppComponent {  (cardMoved)="onCardMoved($event)">

  boards = [</muxima-kanban>

    {```

      id: '1',

      title: 'To Do',## Features

      tasks: [

        { id: '1', title: 'Task 1', description: 'Description' }- 🎯 Drag & Drop com Angular CDK

      ]- 🔍 Busca em tempo real

    }- ⚡ Limites WIP (Work In Progress)

  ];- 🎨 Customizável (cores, prioridades)

- 📱 Responsivo

  onTaskMoved(event: any) {

    console.log('Task moved:', event);## Documentação Completa

  }

}Visite a documentação completa em `/components/kanban`

```

## ✨ Features

- ✅ Drag & Drop entre colunas
- ✅ Gerenciamento de tarefas
- ✅ Totalmente customizável
- ✅ Angular 18+ com CDK
- ✅ TypeScript support
- ✅ Responsive design

## 📚 Documentation

**Full documentation:** https://muxima-ui.vercel.app

**Component docs:** https://muxima-ui.vercel.app/components/kanban

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@muxima-ui/kanban)
- [GitHub Repository](https://github.com/Aldemiro20/muxima-ui)
- [Documentation](https://muxima-ui.vercel.app)
- [Report Issues](https://github.com/Aldemiro20/muxima-ui/issues)

## 📝 License

MIT © Muxima UI Team
