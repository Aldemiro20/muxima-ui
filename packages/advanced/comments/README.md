# 💬 @muxima-ui/comments# Comments Section



> Advanced comments system for Angular 18+ with replies, reactions, and mentionsSistema completo de comentários com replies aninhadas, edição, curtidas e suporte a ControlValueAccessor.



[![npm version](https://img.shields.io/npm/v/@muxima-ui/comments.svg)](https://www.npmjs.com/package/@muxima-ui/comments)## Instalação

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

```bash

## 📦 Installationnpm install @muxima-ui/comments

```

```bash

npm install @muxima-ui/comments## Uso Básico

```

```typescript

## 🚀 Quick Startimport { CommentsComponent, Comment } from '@muxima-ui/comments';



```typescript@Component({

import { Component } from '@angular/core';  standalone: true,

import { CommentsComponent } from '@muxima-ui/comments';  imports: [CommentsComponent],

  template: `

@Component({    <muxima-comments

  selector: 'app-root',      [comments]="comments"

  standalone: true,      [currentUser]="user"

  imports: [CommentsComponent],      (commentAdded)="onCommentAdded($event)">

  template: `    </muxima-comments>

    <muxima-comments  `

      [comments]="comments"})

      [currentUser]="currentUser"export class MyComponent {

      (commentAdded)="onCommentAdded($event)">  user = { name: 'João Silva', avatar: 'avatar.jpg' };

    </muxima-comments>  comments: Comment[] = [];

  `

})  onCommentAdded(comment: Comment) {

export class AppComponent {    console.log('Novo comentário:', comment);

  currentUser = {  }

    id: '1',}

    name: 'John Doe',```

    avatar: 'https://i.pravatar.cc/150?img=1'

  };## Features



  comments = [- ✅ Comentários aninhados (replies)

    {- ✅ Edição e exclusão

      id: '1',- ✅ Sistema de curtidas

      user: this.currentUser,- ✅ Ordenação (recentes, antigos, curtidos)

      text: 'Great component!',- ✅ Avatares automáticos com iniciais

      timestamp: new Date(),- ✅ Timestamps relativos

      replies: []- ✅ ControlValueAccessor

    }- ✅ Tema roxo Muxima

  ];

## Licença

  onCommentAdded(comment: any) {

    console.log('New comment:', comment);MIT

  }
}
```

## ✨ Features

- ✅ Sistema de replies (respostas)
- ✅ Reactions (reações)
- ✅ Mentions (@user)
- ✅ Timestamps
- ✅ Avatar do usuário
- ✅ TypeScript support
- ✅ Responsive design

## 📚 Documentation

**Full documentation:** https://muxima-ui.vercel.app

**Component docs:** https://muxima-ui.vercel.app/components/comments

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@muxima-ui/comments)
- [GitHub Repository](https://github.com/Aldemiro20/muxima-ui)
- [Documentation](https://muxima-ui.vercel.app)
- [Report Issues](https://github.com/Aldemiro20/muxima-ui/issues)

## 📝 License

MIT © Muxima UI Team
