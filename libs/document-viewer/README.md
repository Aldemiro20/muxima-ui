# 📄 Muxima Document Viewer Component

Componente elegante e profissional para visualização de documentos com suporte a imagens e PDFs.

## ✨ Características

- 🖼️ **Suporte a Imagens**: JPG, PNG, GIF, WebP
- 📑 **Suporte a PDFs**: Visualização integrada via iframe
- 🎨 **Miniaturas**: Barra lateral com navegação visual
- 🔍 **Zoom**: Controles de 50% a 200% para imagens
- ⬅️➡️ **Navegação**: Setas para múltiplos documentos
- 💾 **Download**: Botão integrado com comportamento padrão
- 🖨️ **Impressão**: Suporte nativo para imprimir
- 🖥️ **Tela Cheia**: Modo fullscreen imersivo
- 📱 **Responsivo**: Adaptado para mobile
- 🎨 **Gradiente Roxo**: #667eea → #764ba2
- 🎭 **Animações**: Transições suaves
- ♿ **Acessível**: Semântico e navegável

## 📦 Instalação

```typescript
import { DocumentViewerComponent, Document } from '@muxima-ui/document-viewer';

@Component({
  standalone: true,
  imports: [DocumentViewerComponent]
})
```

## 🚀 Uso Básico

### Imagem Única

```typescript
export class MyComponent {
  documents: Document[] = [
    {
      name: 'photo.jpg',
      type: 'image',
      url: 'https://example.com/photo.jpg',
      size: '2.4 MB',
      date: '18 Jan 2026'
    }
  ];
}
```

```html
<muxima-document-viewer
  [documents]="documents"
  height="600px">
</muxima-document-viewer>
```

### Múltiplas Imagens com Miniaturas

```typescript
images: Document[] = [
  {
    id: '1',
    name: 'landscape.jpg',
    type: 'image',
    url: 'https://example.com/landscape.jpg',
    thumbnail: 'https://example.com/thumb-landscape.jpg',
    size: '1.8 MB'
  },
  {
    id: '2',
    name: 'portrait.jpg',
    type: 'image',
    url: 'https://example.com/portrait.jpg',
    thumbnail: 'https://example.com/thumb-portrait.jpg',
    size: '2.1 MB'
  }
];
```

```html
<muxima-document-viewer
  [documents]="images"
  [showThumbnails]="true"
  height="650px">
</muxima-document-viewer>
```

### PDF Viewer

```typescript
pdfDocuments: Document[] = [
  {
    name: 'report.pdf',
    type: 'pdf',
    url: 'https://example.com/report.pdf',
    size: '1.2 MB',
    date: '18 Jan 2026'
  }
];
```

```html
<muxima-document-viewer
  [documents]="pdfDocuments"
  [allowDownload]="true"
  [allowPrint]="true"
  height="700px">
</muxima-document-viewer>
```

### Documentos Mistos (Imagens + PDFs)

```typescript
mixedDocs: Document[] = [
  { 
    name: 'cover.jpg', 
    type: 'image', 
    url: 'https://example.com/cover.jpg',
    thumbnail: 'https://example.com/thumb-cover.jpg'
  },
  { 
    name: 'contract.pdf', 
    type: 'pdf', 
    url: 'https://example.com/contract.pdf' 
  },
  { 
    name: 'signature.jpg', 
    type: 'image', 
    url: 'https://example.com/signature.jpg',
    thumbnail: 'https://example.com/thumb-signature.jpg'
  }
];
```

```html
<muxima-document-viewer
  [documents]="mixedDocs"
  [showThumbnails]="true"
  [allowZoom]="true"
  height="650px">
</muxima-document-viewer>
```

## 🎨 Funcionalidades Avançadas

### Controles de Zoom

Para imagens, o componente oferece zoom de 50% a 200%:

```html
<muxima-document-viewer
  [documents]="images"
  [allowZoom]="true">
</muxima-document-viewer>
```

Níveis disponíveis:
- `50%` - Zoom out máximo
- `75%` - Reduzido
- `100%` - Tamanho original
- `125%` - Ampliado
- `150%` - Mais ampliado
- `200%` - Zoom in máximo
- `Fit` - Ajustar à tela

### Eventos

```typescript
export class MyComponent {
  onDocumentChange(doc: Document) {
    console.log('Current document:', doc);
  }

  onDownload(doc: Document) {
    // Lógica customizada de download
    console.log('Downloading:', doc.name);
  }

  onPrint(doc: Document) {
    // Lógica customizada de impressão
    console.log('Printing:', doc.name);
  }
}
```

```html
<muxima-document-viewer
  [documents]="documents"
  (documentChange)="onDocumentChange($event)"
  (downloadClick)="onDownload($event)"
  (printClick)="onPrint($event)">
</muxima-document-viewer>
```

### Navegação entre Documentos

O componente automaticamente adiciona setas de navegação quando há múltiplos documentos:

```html
<!-- Setas de navegação aparecem automaticamente -->
<muxima-document-viewer [documents]="multipleDocuments">
</muxima-document-viewer>
```

### Modo Tela Cheia

Clique no botão de tela cheia para expandir:

```html
<!-- Botão de fullscreen incluído por padrão -->
<muxima-document-viewer [documents]="documents">
</muxima-document-viewer>
```

## ⚙️ API

### Inputs

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `documents` | `Document[]` | `[]` | Array de documentos |
| `viewMode` | `'single' \| 'grid' \| 'list'` | `'single'` | Modo de visualização |
| `allowDownload` | `boolean` | `true` | Habilita download |
| `allowPrint` | `boolean` | `true` | Habilita impressão |
| `allowZoom` | `boolean` | `true` | Habilita zoom (imagens) |
| `showThumbnails` | `boolean` | `true` | Exibe miniaturas |
| `height` | `string` | `'600px'` | Altura do viewer |

### Outputs

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `documentChange` | `EventEmitter<Document>` | Documento atual mudou |
| `downloadClick` | `EventEmitter<Document>` | Clique em download |
| `printClick` | `EventEmitter<Document>` | Clique em imprimir |

### Interfaces

```typescript
export interface Document {
  id?: string;
  name: string;
  type: 'image' | 'pdf';
  url: string;
  thumbnail?: string;
  size?: string;
  date?: string;
}

export type ViewMode = 'single' | 'grid' | 'list';
export type ZoomLevel = 'fit' | 'fill' | '50' | '75' | '100' | '125' | '150' | '200';
```

## 💡 Casos de Uso

### Galeria de Fotos

```typescript
photoGallery: Document[] = [
  { name: 'vacation1.jpg', type: 'image', url: '...' },
  { name: 'vacation2.jpg', type: 'image', url: '...' },
  { name: 'vacation3.jpg', type: 'image', url: '...' }
];
```

### Documentos Legais

```typescript
legalDocs: Document[] = [
  { name: 'contract.pdf', type: 'pdf', url: '...' },
  { name: 'terms.pdf', type: 'pdf', url: '...' }
];
```

### Portfólio

```typescript
portfolio: Document[] = [
  { name: 'project1-cover.jpg', type: 'image', url: '...' },
  { name: 'project1-details.pdf', type: 'pdf', url: '...' },
  { name: 'project2-cover.jpg', type: 'image', url: '...' }
];
```

### Sistema de Arquivos

```typescript
filePreview: Document[] = [
  { name: 'invoice.pdf', type: 'pdf', url: '...', size: '245 KB' },
  { name: 'receipt.jpg', type: 'image', url: '...', size: '1.2 MB' }
];
```

## 🎯 Boas Práticas

### 1. Otimize Imagens

Use thumbnails menores para a barra lateral:

```typescript
{
  name: 'photo.jpg',
  type: 'image',
  url: 'https://example.com/photo-full.jpg',       // Full size
  thumbnail: 'https://example.com/photo-thumb.jpg' // Smaller thumbnail
}
```

### 2. URLs Seguras

O componente usa `DomSanitizer` automaticamente para URLs seguras.

### 3. Lazy Loading

Para múltiplos documentos grandes, considere carregar sob demanda:

```typescript
loadDocument(index: number) {
  // Carregar documento apenas quando necessário
  this.documents[index] = this.fetchDocument(index);
}
```

### 4. Altura Responsiva

Ajuste a altura conforme o contexto:

```html
<!-- Desktop -->
<muxima-document-viewer height="700px" [documents]="docs">
</muxima-document-viewer>

<!-- Mobile -->
<muxima-document-viewer height="400px" [documents]="docs">
</muxima-document-viewer>
```

### 5. Tratamento de Erros

```typescript
documents: Document[] = [];

loadDocuments() {
  try {
    this.documents = this.documentService.getDocuments();
  } catch (error) {
    console.error('Error loading documents:', error);
    this.showErrorMessage();
  }
}
```

## 🎨 Personalização

### Cores

O componente usa o gradiente roxo padrão do Muxima:
- Primário: `#667eea` → `#764ba2`
- Backgrounds: `#f8f9ff` → `#ffffff`
- Borders: `#e5e7eb`
- Hover: Roxo translúcido

### Toolbar

A toolbar inclui:
- Navegação (setas)
- Contador de documentos
- Nome do documento atual
- Controles de zoom
- Botões de download/print
- Botão fullscreen

### Footer

O footer mostra:
- Nome do documento
- Tamanho do arquivo
- Data (se fornecida)

## 📱 Responsividade

### Desktop (> 768px)
- Miniaturas laterais visíveis
- Controles de zoom completos
- Toolbar com todos os botões

### Mobile (≤ 768px)
- Miniaturas ocultas
- Controles de zoom ocultos
- Toolbar simplificada
- Footer em coluna

## 🖨️ Impressão

O componente suporta impressão:

```typescript
onPrint(doc: Document) {
  if (doc.type === 'pdf') {
    window.print(); // Print PDF iframe
  } else {
    const printWindow = window.open(doc.url);
    printWindow?.print(); // Print image
  }
}
```

## 🔒 Segurança

- URLs são sanitizadas com `DomSanitizer`
- Iframes de PDF têm sandbox apropriado
- Validação de tipos de documento
- CORS deve estar configurado corretamente no servidor

## ⚡ Performance

- Imagens com lazy loading implícito
- Thumbnails otimizadas
- CSS animations (sem JavaScript)
- Virtual scrolling para muitos documentos
- Debounce em zoom changes

## ♿ Acessibilidade

- Elementos semânticos (nav, button)
- ARIA labels em botões
- Navegação por teclado
- Alt text para imagens
- Focus indicators visíveis

## 🐛 Troubleshooting

### PDFs não carregam

**Problema:** "Site recusou-se a ligar" ou PDF não aparece

**Soluções:**

1. **Use PDFs Locais (Recomendado):**
```typescript
// Coloque o PDF em src/assets/docs/
documents: Document[] = [
  {
    name: 'manual.pdf',
    type: 'pdf',
    url: 'assets/docs/manual.pdf'
  }
];
```

2. **Configure CORS no servidor:**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET
```

3. **Use Blob URLs para PDFs gerados:**
```typescript
const pdfBlob = await generatePDF();
const blobUrl = URL.createObjectURL(pdfBlob);

documents = [{
  name: 'report.pdf',
  type: 'pdf',
  url: blobUrl
}];
```

4. **Use Base64 para PDFs pequenos:**
```typescript
documents = [{
  name: 'doc.pdf',
  type: 'pdf',
  url: 'data:application/pdf;base64,JVBERi0xLjQK...'
}];
```

### Imagens não aparecem

Certifique-se que as URLs são válidas e acessíveis.

### Zoom não funciona

Zoom só funciona para imagens, não para PDFs.

### Thumbnails não aparecem

Forneça URLs de thumbnails menores para melhor performance.

## 📁 Estrutura de Arquivos Recomendada

```
src/
  assets/
    docs/           # PDFs aqui
      manual.pdf
      report.pdf
    images/         # Imagens aqui
      photo1.jpg
      photo2.jpg
    thumbnails/     # Thumbnails aqui
      thumb1.jpg
      thumb2.jpg
```

Então use:
```typescript
documents: Document[] = [
  {
    name: 'manual.pdf',
    type: 'pdf',
    url: 'assets/docs/manual.pdf'
  },
  {
    name: 'photo.jpg',
    type: 'image',
    url: 'assets/images/photo.jpg',
    thumbnail: 'assets/thumbnails/thumb.jpg'
  }
];
```
