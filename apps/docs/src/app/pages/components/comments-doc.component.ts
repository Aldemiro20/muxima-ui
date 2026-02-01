import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsComponent, Comment } from '@muxima-ui/comments';

@Component({
  selector: 'app-comments-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, CommentsComponent],
  templateUrl: './comments-doc.component.html',
  styleUrls: ['./comments-doc.component.scss']
})
export class CommentsDocComponent {
  // Current user
  currentUser = {
    name: 'Maria Silva',
    avatar: 'https://i.pravatar.cc/150?img=5'
  };

  // Example 1: Basic comments
  basicComments: Comment[] = [
    {
      id: '1',
      author: 'João Pedro',
      avatar: 'https://i.pravatar.cc/150?img=12',
      content: 'Excelente artigo! Muito bem explicado e com ótimos exemplos práticos.',
      timestamp: new Date(Date.now() - 3600000),
      likes: 5,
      replies: []
    },
    {
      id: '2',
      author: 'Ana Costa',
      avatar: 'https://i.pravatar.cc/150?img=45',
      content: 'Parabéns pelo conteúdo. Ajudou muito no meu projeto!',
      timestamp: new Date(Date.now() - 7200000),
      likes: 3,
      replies: [
        {
          id: '3',
          author: 'Carlos Lima',
          content: 'Concordo! Também usei no meu projeto.',
          timestamp: new Date(Date.now() - 5400000),
          likes: 1,
          replies: []
        }
      ]
    }
  ];

  // Example 2: With deep nesting
  nestedComments: Comment[] = [
    {
      id: '10',
      author: 'Roberto Santos',
      content: 'Alguém conseguiu fazer funcionar no Angular 16?',
      timestamp: new Date(Date.now() - 86400000),
      likes: 2,
      replies: [
        {
          id: '11',
          author: 'Paula Oliveira',
          content: 'Sim! Funcionou perfeitamente aqui.',
          timestamp: new Date(Date.now() - 82800000),
          likes: 1,
          replies: [
            {
              id: '12',
              author: 'Roberto Santos',
              content: 'Obrigado! Vou tentar novamente.',
              timestamp: new Date(Date.now() - 79200000),
              likes: 0,
              replies: []
            }
          ]
        }
      ]
    }
  ];

  // Example 3: Empty state
  emptyComments: Comment[] = [];

  // Example 4: Forms integration
  formComments: Comment[] = [];

  // Configuration
  allowReplies = true;
  allowEdit = true;
  allowDelete = true;
  allowLikes = true;
  showTimestamps = true;
  sortBy: 'newest' | 'oldest' | 'likes' = 'newest';

  // Event handlers
  onCommentAdded(comment: Comment) {
    console.log('✓ Comentário adicionado:', comment);
  }

  onCommentEdited(comment: Comment) {
    console.log('✓ Comentário editado:', comment);
  }

  onCommentDeleted(comment: Comment) {
    console.log('✓ Comentário removido:', comment);
  }

  onCommentLiked(comment: Comment) {
    console.log('👍 Comentário curtido:', comment);
  }

  onReplyAdded(data: { comment: Comment; parentId: string }) {
    console.log('✓ Resposta adicionada:', data);
  }

  // Code examples
  codeExamples = {
    basic: `<muxima-comments
  [comments]="comments"
  [currentUser]="currentUser"
  (commentAdded)="onCommentAdded($event)">
</muxima-comments>`,

    withConfig: `<muxima-comments
  [comments]="comments"
  [currentUser]="currentUser"
  [allowReplies]="true"
  [allowEdit]="true"
  [allowDelete]="true"
  [allowLikes]="true"
  [maxDepth]="3"
  [sortBy]="'newest'"
  (commentEdited)="onEdit($event)"
  (commentDeleted)="onDelete($event)">
</muxima-comments>`,

    typescript: `import { CommentsComponent, Comment } from '@muxima-ui/comments';

@Component({
  standalone: true,
  imports: [CommentsComponent],
  template: \`
    <muxima-comments
      [(ngModel)]="comments"
      [currentUser]="user">
    </muxima-comments>
  \`
})
export class MyComponent {
  user = {
    name: 'João Silva',
    avatar: 'https://example.com/avatar.jpg'
  };

  comments: Comment[] = [
    {
      id: '1',
      author: 'Ana Costa',
      content: 'Ótimo conteúdo!',
      timestamp: new Date(),
      likes: 5,
      replies: []
    }
  ];
}`
  };
}
