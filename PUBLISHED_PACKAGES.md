# 🎉 Pacotes Publicados no NPM

## ✅ Componentes Avançados Publicados

Todos os componentes avançados foram publicados com sucesso no NPM e estão disponíveis publicamente para instalação!

---

## 📦 Pacotes Disponíveis

| Componente | Pacote NPM | Versão | Status |
|------------|-----------|---------|---------|
| **Kanban Board** | `@muxima-ui/kanban` | 1.0.1 | ✅ Publicado |
| **Comments System** | `@muxima-ui/comments` | 1.0.1 | ✅ Publicado |
| **Shopping Cart** | `@muxima-ui/shopping-cart` | 1.0.1 | ✅ Publicado |
| **Quill Editor** | `@muxima-ui/quill-editor` | 1.0.1 | ✅ Publicado |

---

## 🚀 Como Instalar

### Instalação Individual

```bash
# Kanban Board - Gerenciamento de tarefas com drag & drop
npm install @muxima-ui/kanban

# Comments System - Sistema de comentários com replies e reactions
npm install @muxima-ui/comments

# Shopping Cart - Carrinho de compras completo
npm install @muxima-ui/shopping-cart

# Quill Editor - Editor de texto rico WYSIWYG
npm install @muxima-ui/quill-editor
```

### Instalar Todos de Uma Vez

```bash
npm install @muxima-ui/kanban @muxima-ui/comments @muxima-ui/shopping-cart @muxima-ui/quill-editor
```

---

## 💡 Como Usar

### 1. Kanban Board

**Instalação:**
```bash
npm install @muxima-ui/kanban
```

**Documentação:** https://muxima-ui.vercel.app/components/kanban

**Uso no Angular:**
```typescript
import { Component } from '@angular/core';
import { KanbanComponent } from '@muxima-ui/kanban';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KanbanComponent],
  template: `
    <muxima-kanban 
      [boards]="boards"
      (taskMoved)="onTaskMoved($event)">
    </muxima-kanban>
  `
})
export class AppComponent {
  boards = [
    {
      id: '1',
      title: 'To Do',
      tasks: [
        { id: '1', title: 'Task 1', description: 'Description' }
      ]
    },
    {
      id: '2',
      title: 'In Progress',
      tasks: []
    }
  ];

  onTaskMoved(event: any) {
    console.log('Task moved:', event);
  }
}
```

**Features:**
- ✅ Drag & Drop entre colunas
- ✅ Gerenciamento de tarefas
- ✅ Customizável
- ✅ Angular 18+ com CDK

**Package Size:** 27.0 kB

---

### 2. Comments System

**Instalação:**
```bash
npm install @muxima-ui/comments
```

**Documentação:** https://muxima-ui.vercel.app/components/comments

**Uso no Angular:**
```typescript
import { Component } from '@angular/core';
import { CommentsComponent } from '@muxima-ui/comments';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommentsComponent],
  template: `
    <muxima-comments
      [comments]="comments"
      [currentUser]="currentUser"
      (commentAdded)="onCommentAdded($event)">
    </muxima-comments>
  `
})
export class AppComponent {
  currentUser = {
    id: '1',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1'
  };

  comments = [
    {
      id: '1',
      user: this.currentUser,
      text: 'Great component!',
      timestamp: new Date(),
      replies: []
    }
  ];

  onCommentAdded(comment: any) {
    console.log('New comment:', comment);
  }
}
```

**Features:**
- ✅ Sistema de replies (respostas)
- ✅ Reactions (reações)
- ✅ Mentions (@user)
- ✅ Timestamps
- ✅ Avatar do usuário

**Package Size:** 32.5 kB

---

### 3. Shopping Cart

**Instalação:**
```bash
npm install @muxima-ui/shopping-cart
```

**Documentação:** https://muxima-ui.vercel.app/components/shopping-cart

**Uso no Angular:**
```typescript
import { Component } from '@angular/core';
import { ShoppingCartComponent } from '@muxima-ui/shopping-cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShoppingCartComponent],
  template: `
    <muxima-shopping-cart
      [items]="cartItems"
      [total]="total"
      (checkout)="onCheckout($event)">
    </muxima-shopping-cart>
  `
})
export class AppComponent {
  cartItems = [
    {
      id: '1',
      name: 'Product 1',
      price: 29.99,
      quantity: 2,
      image: 'product1.jpg'
    },
    {
      id: '2',
      name: 'Product 2',
      price: 49.99,
      quantity: 1,
      image: 'product2.jpg'
    }
  ];

  get total() {
    return this.cartItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    );
  }

  onCheckout(items: any[]) {
    console.log('Checkout:', items);
  }
}
```

**Features:**
- ✅ Gerenciamento de carrinho
- ✅ Cálculo automático de totais
- ✅ Quantidade de itens
- ✅ Remover itens
- ✅ Checkout

**Package Size:** 17.4 kB

---

### 4. Quill Editor (Rich Text Editor)

**Instalação:**
```bash
npm install @muxima-ui/quill-editor
```

**Documentação:** https://muxima-ui.vercel.app/components/quill-editor

**Uso no Angular:**
```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillEditorComponent } from '@muxima-ui/quill-editor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, QuillEditorComponent],
  template: `
    <muxima-quill-editor
      [(content)]="editorContent"
      [placeholder]="'Digite seu texto aqui...'"
      (contentChange)="onContentChange($event)">
    </muxima-quill-editor>
    
    <div [innerHTML]="editorContent"></div>
  `
})
export class AppComponent {
  editorContent = '<p>Hello <strong>World</strong>!</p>';

  onContentChange(html: string) {
    console.log('Content changed:', html);
  }
}
```

**Features:**
- ✅ Editor WYSIWYG completo
- ✅ Formatação de texto (bold, italic, underline)
- ✅ Listas (ordered, unordered)
- ✅ Headers (H1-H6)
- ✅ Links e imagens
- ✅ Code blocks
- ✅ Output em HTML

**Package Size:** 100.0 kB (o maior - editor completo!)

---

## 🌐 Links do NPM

Visite os pacotes no NPM:

- 📦 [Kanban](https://www.npmjs.com/package/@muxima-ui/kanban) - [Docs](https://muxima-ui.vercel.app/components/kanban)
- 📦 [Comments](https://www.npmjs.com/package/@muxima-ui/comments) - [Docs](https://muxima-ui.vercel.app/components/comments)
- 📦 [Shopping Cart](https://www.npmjs.com/package/@muxima-ui/shopping-cart) - [Docs](https://muxima-ui.vercel.app/components/shopping-cart)
- 📦 [Quill Editor](https://www.npmjs.com/package/@muxima-ui/quill-editor) - [Docs](https://muxima-ui.vercel.app/components/quill-editor)

---

## 📊 Estatísticas

| Métrica | Valor |
|---------|-------|
| **Total de Pacotes** | 4 |
| **Tamanho Total** | ~177 kB |
| **Angular Version** | 18.0+ |
| **License** | MIT |
| **Acesso** | Público |

---

## 🔄 Atualizações Futuras

Para atualizar para a versão mais recente:

```bash
npm update @muxima-ui/kanban
npm update @muxima-ui/comments
npm update @muxima-ui/shopping-cart
npm update @muxima-ui/quill-editor
```

Ou atualizar todos:

```bash
npm update @muxima-ui/*
```

---

## 📚 Requisitos

Todos os componentes requerem:

- **Angular**: ^18.0.0
- **Node.js**: >= 18.x
- **TypeScript**: >= 5.0

### Peer Dependencies:

```json
{
  "@angular/common": "^18.0.0",
  "@angular/core": "^18.0.0",
  "@angular/forms": "^18.0.0",
  "@angular/cdk": "^18.0.0" // apenas para Kanban
}
```

---

## 🤝 Contribuindo

Quer contribuir? Acesse o repositório:

**GitHub:** https://github.com/Aldemiro20/muxima-ui

---

## 📝 Licença

MIT License - Todos os pacotes são open source e gratuitos!

---

## 🎯 Próximos Passos

1. ✅ **Instalação** - Use `npm install` para adicionar ao seu projeto
2. ✅ **Importação** - Importe os componentes standalone no seu app
3. ✅ **Customização** - Personalize com inputs e outputs
4. ✅ **Documentação** - Veja exemplos completos em cada componente

---

## 💬 Suporte

Encontrou um bug ou tem uma sugestão?

- 🐛 [Reportar Issue](https://github.com/Aldemiro20/muxima-ui/issues)
- 💡 [Request Feature](https://github.com/Aldemiro20/muxima-ui/issues/new)
- 📧 Email: suporte@muxima-ui.com

---

## 🌟 Star no GitHub

Se você gostou dos componentes, deixe uma ⭐ no repositório!

**https://github.com/Aldemiro20/muxima-ui**

---

## 📈 Downloads

Acompanhe as estatísticas de download no NPM:

- [npm trends](https://npmtrends.com/@muxima-ui/kanban)

---

**Feito com ❤️ pela Equipe Muxima UI**
