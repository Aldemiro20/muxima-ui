# Quill Editor - Muxima UI

Um editor de texto rico extremamente poderoso **construído do zero**, sem dependências externas! Com todas as funcionalidades essenciais do Microsoft Word e recursos inovadores.

## 🌟 Recursos Principais

### Formatação de Texto Avançada
- **Fontes**: 8 fontes diferentes (Arial, Times New Roman, Courier, Georgia, Verdana, Trebuchet, Impact, Comic Sans)
- **Tamanhos**: 13 tamanhos de fonte (10px a 54px)
- **Estilos**: Negrito, Itálico, Sublinhado, Tachado
- **Cores**: Cor de texto e cor de fundo com paleta customizada
- **Picker de cores** com presets e seletor HTML5

### Formatação de Parágrafo
- **Cabeçalhos**: 6 níveis de títulos (H1-H6)
- **Listas**: Ordenadas e com marcadores
- **Alinhamento**: Esquerda, Centro, Direita, Justificado
- **Indentação**: Aumentar e diminuir recuo

### Inserções Ricas
- **Links**: Modal customizado com texto e URL
- **Imagens**: Com preview ao vivo
- **Tabelas**: Customizáveis (linhas x colunas)
- **Código**: Inline e blocos de código
- **Citações**: Blocos de citação estilizados
- **Linha Horizontal**: Separadores visuais

### Recursos Inovadores
- **Contador de Palavras e Caracteres**: Estatísticas em tempo real
- **Histórico Undo/Redo**: 50 níveis de desfazer/refazer
- **Atalhos de Teclado**: Todos os atalhos padrão (Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Z, Ctrl+Y, Ctrl+K)
- **ContentEditable Nativo**: Performance superior
- **Modais Elegantes**: Interface moderna para inserções
- **Toolbar Organizada**: Grupos lógicos com separadores visuais
- **Responsivo**: Adaptável a dispositivos móveis
- **Scrollbar Customizada**: Com gradiente do tema

## 📦 Instalação

```bash
npm install @muxima-ui/quill-editor
```

**Nenhuma dependência externa necessária!** 🎉

## 🚀 Uso Básico

```typescript
import { Component } from '@angular/core';
import { QuillEditorComponent } from '@muxima-ui/quill-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [QuillEditorComponent, FormsModule],
  template: `
    <muxima-quill-editor
      [(ngModel)]="content"
      [height]="'500px'"
      [placeholder]="'Comece a escrever...'"
      (contentChanged)="onContentChange($event)">
    </muxima-quill-editor>
  `
})
export class MyComponent {
  content = '<p>Olá mundo!</p>';

  onContentChange(event: any) {
    console.log('HTML:', event.html);
    console.log('Texto:', event.text);
    console.log('Palavras:', event.wordCount);
  }
}
```

## 🎨 Uso com Reactive Forms

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuillEditorComponent } from '@muxima-ui/quill-editor';

@Component({
  selector: 'app-my-form',
  standalone: true,
  imports: [QuillEditorComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <muxima-quill-editor
        formControlName="content"
        [height]="'400px'">
      </muxima-quill-editor>
      
      <button (click)="save()">Salvar</button>
    </form>
  `
})
export class MyFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      content: ['<p>Conteúdo inicial</p>']
    });
  }

  save() {
    console.log(this.form.value.content);
  }
}
```

## ⚙️ API Completa

### Inputs

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `placeholder` | `string` | `'Escreva algo incrível...'` | Texto placeholder do editor |
| `readOnly` | `boolean` | `false` | Define se o editor é somente leitura |
| `height` | `string` | `'400px'` | Altura do editor |
| `showToolbar` | `boolean` | `true` | Exibir ou ocultar toolbar |

### Outputs

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `contentChanged` | `EventEmitter<{html, text, wordCount, charCount}>` | Emitido quando o conteúdo muda |
| `selectionChanged` | `EventEmitter<EditorSelection>` | Emitido quando a seleção muda |

### Métodos Públicos

```typescript
// Obter contagem de palavras
const wordCount = editorComponent.getWordCount();

// Obter contagem de caracteres
const charCount = editorComponent.getCharCount();

// Limpar conteúdo
editorComponent.clear();

// Obter HTML
const html = editorComponent.getHTML();

// Obter texto puro
const text = editorComponent.getText();
```

## ⌨️ Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `Ctrl/Cmd + B` | Negrito |
| `Ctrl/Cmd + I` | Itálico |
| `Ctrl/Cmd + U` | Sublinhado |
| `Ctrl/Cmd + Z` | Desfazer |
| `Ctrl/Cmd + Y` | Refazer |
| `Ctrl/Cmd + K` | Inserir link |

## 🎨 Estilização

O componente segue o tema da biblioteca Muxima UI com gradiente roxo (#667eea → #764ba2).

Para personalizar:

```scss
muxima-quill-editor {
  ::ng-deep {
    .custom-toolbar {
      background: your-custom-gradient;
    }
    
    .editor-content {
      font-family: your-custom-font;
    }
  }
}
```

## 📱 Responsividade

O componente é totalmente responsivo:
- Toolbar se adapta em dispositivos móveis
- Botões reduzidos em telas pequenas
- Labels ocultos em mobile para economizar espaço
- Touch-friendly

## 🎯 Casos de Uso

- **Blogs & CMS**: Sistemas de gerenciamento de conteúdo
- **Emails**: Compose emails ricos
- **Documentação**: Documentação técnica com código
- **Comentários**: Comentários ricos em fóruns
- **E-Learning**: Conteúdo educacional interativo
- **Relatórios**: Relatórios profissionais

## 🚀 Vantagens

✅ **Zero Dependências**: Construído do zero em TypeScript puro  
✅ **Performance**: ContentEditable nativo, super rápido  
✅ **Leve**: Sem bibliotecas externas pesadas  
✅ **Customizável**: Totalmente personalizável via SCSS  
✅ **Moderno**: Design com gradientes e animações suaves  
✅ **Completo**: Todas as funcionalidades essenciais incluídas  
✅ **TypeScript**: Totalmente tipado  

## 📄 Licença

MIT

## 🌟 Recursos Principais

### Formatação de Texto Avançada
- **Fontes**: 8 fontes diferentes (Arial, Times New Roman, Courier, Georgia, Verdana, Trebuchet, Impact, Comic Sans)
- **Tamanhos**: 10 tamanhos de fonte (10px a 54px)
- **Estilos**: Negrito, Itálico, Sublinhado, Tachado
- **Cores**: Cor de texto e cor de fundo ilimitadas
- **Scripts**: Subscrito e Sobrescrito para fórmulas

### Formatação de Parágrafo
- **Cabeçalhos**: 6 níveis de títulos (H1-H6)
- **Listas**: Ordenadas, com marcadores e listas de tarefas (checkboxes)
- **Alinhamento**: Esquerda, Centro, Direita, Justificado
- **Indentação**: Aumentar e diminuir recuo
- **Direção**: Suporte para texto RTL (Right-to-Left)

### Inserções Ricas
- **Links**: Inserir e editar hyperlinks
- **Imagens**: Upload e inserção de imagens
- **Vídeos**: Incorporar vídeos (YouTube, Vimeo, etc.)
- **Fórmulas**: Suporte para fórmulas matemáticas (LaTeX)
- **Código**: Blocos de código com syntax highlighting
- **Citações**: Blocos de citação estilizados

### Recursos Inovadores
- **Contador de Palavras e Caracteres**: Estatísticas em tempo real
- **Toolbar Customizável**: Escolha entre toolbar padrão ou customizada
- **Tema Bubble**: Editor inline estilo Medium
- **Histórico**: Desfazer/Refazer com 50 níveis
- **Atalhos de Teclado**: Todos os atalhos padrão do Word
- **Dark Mode**: Suporte automático para tema escuro
- **Responsivo**: Adaptável a dispositivos móveis

## 📦 Instalação

```bash
npm install @muxima-ui/quill-editor
```

**Dependências necessárias:**
```bash
npm install quill ngx-quill
```

## 🚀 Uso Básico

```typescript
import { Component } from '@angular/core';
import { QuillEditorComponent } from '@muxima-ui/quill-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [QuillEditorComponent, FormsModule],
  template: `
    <muxima-quill-editor
      [(ngModel)]="content"
      [height]="'500px'"
      [placeholder]="'Comece a escrever...'"
      (contentChanged)="onContentChange($event)">
    </muxima-quill-editor>
  `
})
export class MyComponent {
  content = '<p>Olá mundo!</p>';

  onContentChange(event: any) {
    console.log('Conteúdo alterado:', event);
  }
}
```

## 🎨 Uso com Reactive Forms

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuillEditorComponent } from '@muxima-ui/quill-editor';

@Component({
  selector: 'app-my-form',
  standalone: true,
  imports: [QuillEditorComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <muxima-quill-editor
        formControlName="content"
        [height]="'400px'">
      </muxima-quill-editor>
      
      <button (click)="save()">Salvar</button>
    </form>
  `
})
export class MyFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      content: ['<p>Conteúdo inicial</p>']
    });
  }

  save() {
    console.log(this.form.value.content);
  }
}
```

## ⚙️ API Completa

### Inputs

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `placeholder` | `string` | `'Escreva algo incrível...'` | Texto placeholder do editor |
| `readOnly` | `boolean` | `false` | Define se o editor é somente leitura |
| `height` | `string` | `'400px'` | Altura do editor |
| `theme` | `'snow' \| 'bubble'` | `'snow'` | Tema do editor |
| `showToolbar` | `boolean` | `true` | Exibir ou ocultar toolbar |
| `customToolbar` | `boolean` | `false` | Usar toolbar customizada com visual aprimorado |
| `config` | `QuillEditorConfig` | `{}` | Configuração avançada do Quill |

### Outputs

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `contentChanged` | `EventEmitter<any>` | Emitido quando o conteúdo muda |
| `selectionChanged` | `EventEmitter<any>` | Emitido quando a seleção muda |
| `editorCreated` | `EventEmitter<any>` | Emitido quando o editor é criado |

### Métodos Públicos

```typescript
// Obter contagem de palavras
const wordCount = editorComponent.getWordCount();

// Obter contagem de caracteres
const charCount = editorComponent.getCharCount();

// Limpar conteúdo
editorComponent.clear();
```

## 🎨 Toolbar Customizada

Para usar a toolbar com design aprimorado:

```html
<muxima-quill-editor
  [customToolbar]="true"
  [(ngModel)]="content">
</muxima-quill-editor>
```

A toolbar customizada oferece:
- Visual com gradiente roxo
- Agrupamento lógico de ferramentas
- Labels para cada seção
- Animações suaves
- Design moderno e intuitivo

## 🌙 Tema Bubble

Para editor inline estilo Medium:

```html
<muxima-quill-editor
  [theme]="'bubble'"
  [(ngModel)]="content">
</muxima-quill-editor>
```

## 📝 Configuração Avançada

```typescript
const config: QuillEditorConfig = {
  theme: 'snow',
  placeholder: 'Digite aqui...',
  readOnly: false,
  modules: {
    toolbar: [
      ['bold', 'italic'],
      ['link', 'image']
    ]
  }
};
```

```html
<muxima-quill-editor
  [config]="config"
  [(ngModel)]="content">
</muxima-quill-editor>
```

## ⌨️ Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `Ctrl/Cmd + B` | Negrito |
| `Ctrl/Cmd + I` | Itálico |
| `Ctrl/Cmd + U` | Sublinhado |
| `Ctrl/Cmd + Z` | Desfazer |
| `Ctrl/Cmd + Y` | Refazer |
| `Ctrl/Cmd + K` | Inserir link |
| `Tab` | Aumentar indentação |
| `Shift + Tab` | Diminuir indentação |

## 🎨 Estilização

O componente segue o tema da biblioteca Muxima UI com gradiente roxo (#667eea → #764ba2).

Para personalizar:

```scss
muxima-quill-editor {
  ::ng-deep {
    .ql-toolbar {
      background: your-custom-gradient;
    }
    
    .ql-editor {
      font-family: your-custom-font;
    }
  }
}
```

## 📱 Responsividade

O componente é totalmente responsivo:
- Toolbar se adapta em dispositivos móveis
- Botões reduzidos em telas pequenas
- Layout otimizado para touch
- Labels ocultos em mobile para economizar espaço

## 🌍 Suporte para Idiomas

- Suporte completo para português brasileiro
- Suporte para texto RTL (árabe, hebraico)
- Placeholder customizável em qualquer idioma

## 🔧 Troubleshooting

### Estilos não aparecem

Certifique-se de importar os estilos do Quill no `angular.json`:

```json
"styles": [
  "node_modules/quill/dist/quill.snow.css",
  "node_modules/quill/dist/quill.bubble.css"
]
```

Ou importe no `styles.scss` global:

```scss
@import 'quill/dist/quill.snow.css';
@import 'quill/dist/quill.bubble.css';
```

### Fórmulas matemáticas não funcionam

Instale a biblioteca KaTeX:

```bash
npm install katex
```

E adicione no `angular.json`:

```json
"styles": [
  "node_modules/katex/dist/katex.min.css"
]
```

## 📄 Licença

MIT
