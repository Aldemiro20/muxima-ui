import { Component, Input, Output, EventEmitter, OnInit, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

@Component({
  selector: 'muxima-document-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit {
  @Input() documents: Document[] = [];
  @Input() viewMode: ViewMode = 'single';
  @Input() allowDownload: boolean = true;
  @Input() allowPrint: boolean = true;
  @Input() allowZoom: boolean = true;
  @Input() showThumbnails: boolean = true;
  @Input() height: string = '600px';
  @Output() documentChange = new EventEmitter<Document>();
  @Output() downloadClick = new EventEmitter<Document>();
  @Output() printClick = new EventEmitter<Document>();

  currentDocument: Document | null = null;
  currentIndex: number = 0;
  zoomLevel: ZoomLevel = 'fit';
  isFullscreen: boolean = false;
  safeUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.documents.length > 0) {
      this.selectDocument(0);
    }
  }

  selectDocument(index: number): void {
    if (index >= 0 && index < this.documents.length) {
      this.currentIndex = index;
      this.currentDocument = this.documents[index];
      this.updateSafeUrl();
      this.documentChange.emit(this.currentDocument);
    }
  }

  updateSafeUrl(): void {
    if (this.currentDocument) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentDocument.url);
    }
  }

  previousDocument(): void {
    if (this.currentIndex > 0) {
      this.selectDocument(this.currentIndex - 1);
    }
  }

  nextDocument(): void {
    if (this.currentIndex < this.documents.length - 1) {
      this.selectDocument(this.currentIndex + 1);
    }
  }

  setZoom(level: ZoomLevel): void {
    this.zoomLevel = level;
  }

  toggleFullscreen(): void {
    this.isFullscreen = !this.isFullscreen;
  }

  download(): void {
    if (this.currentDocument) {
      this.downloadClick.emit(this.currentDocument);
      
      // Default download behavior
      const link = document.createElement('a');
      link.href = this.currentDocument.url;
      link.download = this.currentDocument.name;
      link.click();
    }
  }

  print(): void {
    if (this.currentDocument) {
      this.printClick.emit(this.currentDocument);
      
      // Default print behavior
      if (this.currentDocument.type === 'pdf') {
        window.print();
      } else {
        const printWindow = window.open(this.currentDocument.url, '_blank');
        if (printWindow) {
          printWindow.print();
        }
      }
    }
  }

  getZoomClass(): string {
    return `zoom-${this.zoomLevel}`;
  }

  get hasPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get hasNext(): boolean {
    return this.currentIndex < this.documents.length - 1;
  }

  get isPdf(): boolean {
    return this.currentDocument?.type === 'pdf';
  }

  get isImage(): boolean {
    return this.currentDocument?.type === 'image';
  }
}
