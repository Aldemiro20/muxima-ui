import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentViewerComponent, Document } from '@muxima-ui/document-viewer';

@Component({
  selector: 'app-document-viewer-doc',
  standalone: true,
  imports: [CommonModule, DocumentViewerComponent],
  templateUrl: './document-viewer-doc.component.html',
  styleUrls: ['./document-viewer-doc.component.scss']
})
export class DocumentViewerDocComponent {
  // Sample images
  singleImage: Document[] = [
    {
      id: '1',
      name: 'landscape.jpg',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
      size: '2.4 MB',
      date: '18 Jan 2026'
    }
  ];

  multipleImages: Document[] = [
    {
      id: '1',
      name: 'mountain-landscape.jpg',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200',
      size: '1.8 MB',
      date: '18 Jan 2026'
    },
    {
      id: '2',
      name: 'forest-path.jpg',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200',
      size: '2.1 MB',
      date: '18 Jan 2026'
    },
    {
      id: '3',
      name: 'ocean-sunset.jpg',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=200',
      size: '1.5 MB',
      date: '18 Jan 2026'
    }
  ];

  // Sample PDFs (using public URLs that work)
  singlePdf: Document[] = [
    {
      id: '1',
      name: 'sample-document.pdf',
      type: 'pdf',
      url: 'https://pdfobject.com/pdf/sample.pdf',
      size: '13 KB',
      date: '18 Jan 2026'
    }
  ];

  multiplePdfs: Document[] = [
    {
      id: '1',
      name: 'sample-report.pdf',
      type: 'pdf',
      url: 'https://pdfobject.com/pdf/sample.pdf',
      size: '13 KB',
      date: '18 Jan 2026'
    },
    {
      id: '2',
      name: 'sample-presentation.pdf',
      type: 'pdf',
      url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
      size: '234 KB',
      date: '17 Jan 2026'
    }
  ];

  // Mixed documents
  mixedDocuments: Document[] = [
    {
      id: '1',
      name: 'cover-image.jpg',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=200',
      size: '2.0 MB',
      date: '18 Jan 2026'
    },
    {
      id: '2',
      name: 'sample-document.pdf',
      type: 'pdf',
      url: 'https://pdfobject.com/pdf/sample.pdf',
      size: '13 KB',
      date: '18 Jan 2026'
    },
    {
      id: '3',
      name: 'chart-image.jpg',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200',
      size: '1.8 MB',
      date: '18 Jan 2026'
    }
  ];

  onDocumentChange(doc: Document): void {
    console.log('Document changed:', doc);
  }

  onDownload(doc: Document): void {
    console.log('Download requested:', doc);
  }

  onPrint(doc: Document): void {
    console.log('Print requested:', doc);
  }

  getCodeExample(type: string): string {
    const examples: Record<string, string> = {
      import: `import { DocumentViewerComponent, Document } from '@muxima-ui/document-viewer';

@Component({{ '{' }}
  standalone: true,
  imports: [DocumentViewerComponent]
{{ '}' }})`,
      singleImage: `<!-- Single Image -->
<muxima-document-viewer
  [documents]="imageDocuments"
  height="500px">
</muxima-document-viewer>

<!-- Component Logic -->
export class MyComponent {{ '{' }}
  imageDocuments: Document[] = [
    {{ '{' }}
      name: 'photo.jpg',
      type: 'image',
      url: 'https://example.com/photo.jpg',
      size: '2.4 MB',
      date: '18 Jan 2026'
    {{ '}' }}
  ];
{{ '}' }}`,
      multipleImages: `<!-- Multiple Images with Thumbnails -->
<muxima-document-viewer
  [documents]="images"
  [showThumbnails]="true"
  height="600px"
  (documentChange)="onDocumentChange($event)">
</muxima-document-viewer>

<!-- Component Logic -->
images: Document[] = [
  {{ '{' }}
    name: 'image1.jpg',
    type: 'image',
    url: 'https://example.com/image1.jpg',
    thumbnail: 'https://example.com/thumb1.jpg'
  {{ '}' }},
  {{ '{' }}
    name: 'image2.jpg',
    type: 'image',
    url: 'https://example.com/image2.jpg',
    thumbnail: 'https://example.com/thumb2.jpg'
  {{ '}' }}
];`,
      pdf: `<!-- PDF Viewer -->
<muxima-document-viewer
  [documents]="pdfDocuments"
  [allowDownload]="true"
  [allowPrint]="true"
  height="700px">
</muxima-document-viewer>

<!-- Component Logic -->
pdfDocuments: Document[] = [
  {{ '{' }}
    name: 'report.pdf',
    type: 'pdf',
    url: 'https://example.com/report.pdf',
    size: '1.2 MB'
  {{ '}' }}
];`,
      mixed: `<!-- Mixed Documents (Images + PDFs) -->
<muxima-document-viewer
  [documents]="mixedDocs"
  [showThumbnails]="true"
  [allowZoom]="true"
  height="650px"
  (downloadClick)="onDownload($event)"
  (printClick)="onPrint($event)">
</muxima-document-viewer>

<!-- Component Logic -->
mixedDocs: Document[] = [
  {{ '{' }} name: 'cover.jpg', type: 'image', url: '...' {{ '}' }},
  {{ '{' }} name: 'contract.pdf', type: 'pdf', url: '...' {{ '}' }},
  {{ '{' }} name: 'signature.jpg', type: 'image', url: '...' {{ '}' }}
];`,
      zoom: `<!-- Image with Zoom Controls -->
<muxima-document-viewer
  [documents]="imageDocuments"
  [allowZoom]="true"
  height="600px">
</muxima-document-viewer>

<!-- Zoom levels available: 50%, 75%, 100%, 125%, 150%, 200%, Fit -->`,
      events: `<!-- With Event Handlers -->
<muxima-document-viewer
  [documents]="documents"
  (documentChange)="onDocumentChange($event)"
  (downloadClick)="onDownload($event)"
  (printClick)="onPrint($event)">
</muxima-document-viewer>

<!-- Component Logic -->
onDocumentChange(doc: Document) {{ '{' }}
  console.log('Current document:', doc);
{{ '}' }}

onDownload(doc: Document) {{ '{' }}
  // Custom download logic
  console.log('Downloading:', doc.name);
{{ '}' }}

onPrint(doc: Document) {{ '{' }}
  // Custom print logic
  console.log('Printing:', doc.name);
{{ '}' }}`,
      interface: `export interface Document {{ '{' }}
  id?: string;
  name: string;
  type: 'image' | 'pdf';
  url: string;
  thumbnail?: string;
  size?: string;
  date?: string;
{{ '}' }}

export type ViewMode = 'single' | 'grid' | 'list';
export type ZoomLevel = 'fit' | 'fill' | '50' | '75' | '100' | '125' | '150' | '200';`,
      local: `// PDFs Locais (recomendado para produção)
documents: Document[] = [
  {{ '{' }}
    name: 'manual.pdf',
    type: 'pdf',
    url: 'assets/docs/manual.pdf',  // Coloque o PDF em src/assets/docs/
    size: '2.4 MB'
  {{ '}' }},
  {{ '{' }}
    name: 'photo.jpg',
    type: 'image',
    url: 'assets/images/photo.jpg'  // Imagens em src/assets/images/
  {{ '}' }}
];`,
      blob: `// PDF Gerado Dinamicamente
async generatePdfDocument() {{ '{' }}
  const pdfBlob = await this.generatePDF(); // Sua função que gera PDF
  const blobUrl = URL.createObjectURL(pdfBlob);
  
  this.documents = [
    {{ '{' }}
      name: 'generated-report.pdf',
      type: 'pdf',
      url: blobUrl
    {{ '}' }}
  ];
{{ '}' }}`,
      base64: `// PDF em Base64
documents: Document[] = [
  {{ '{' }}
    name: 'inline-document.pdf',
    type: 'pdf',
    url: 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MK...'
  {{ '}' }}
];`
    };
    return examples[type] || '';
  }
}
