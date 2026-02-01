# Comments Section

Sistema completo de comentários com replies aninhadas, edição, curtidas e suporte a ControlValueAccessor.

## Instalação

```bash
npm install @muxima-ui/comments
```

## Uso Básico

```typescript
import { CommentsComponent, Comment } from '@muxima-ui/comments';

@Component({
  standalone: true,
  imports: [CommentsComponent],
  template: `
    <muxima-comments
      [comments]="comments"
      [currentUser]="user"
      (commentAdded)="onCommentAdded($event)">
    </muxima-comments>
  `
})
export class MyComponent {
  user = { name: 'João Silva', avatar: 'avatar.jpg' };
  comments: Comment[] = [];

  onCommentAdded(comment: Comment) {
    console.log('Novo comentário:', comment);
  }
}
```

## Features

- ✅ Comentários aninhados (replies)
- ✅ Edição e exclusão
- ✅ Sistema de curtidas
- ✅ Ordenação (recentes, antigos, curtidos)
- ✅ Avatares automáticos com iniciais
- ✅ Timestamps relativos
- ✅ ControlValueAccessor
- ✅ Tema roxo Muxima

## Licença

MIT
