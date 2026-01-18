import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '@muxima-ui/file-upload';

@Component({
  selector: 'app-file-upload-doc',
  standalone: true,
  imports: [CommonModule, FileUploadComponent],
  templateUrl: './file-upload-doc.component.html',
  styleUrls: ['./file-upload-doc.component.scss']
})
export class FileUploadDocComponent {
  uploadedFiles: File[] = [];
  imageFiles: File[] = [];
  documentFiles: File[] = [];

  onFilesChange(files: File[]): void {
    this.uploadedFiles = files;
    console.log('Files selecionados:', files);
  }

  onFileRemoved(file: File): void {
    console.log('Arquivo removido:', file.name);
  }

  onImageFilesChange(files: File[]): void {
    this.imageFiles = files;
    console.log('Imagens selecionadas:', files);
  }

  onDocumentFilesChange(files: File[]): void {
    this.documentFiles = files;
    console.log('Documentos selecionados:', files);
  }

  getCodeExample(type: string): string {
    const examples: Record<string, string> = {
      import: `import { FileUploadComponent } from '@muxima-ui/file-upload';

@Component({
  standalone: true,
  imports: [FileUploadComponent]
})`,
      basic: `<muxima-file-upload
  placeholder="Clique ou arraste arquivos aqui"
  [maxSize]="10"
  [multiple]="true"
  (filesChange)="onFilesChange($event)"
  (fileRemoved)="onFileRemoved($event)"
></muxima-file-upload>`,
      single: `<muxima-file-upload
  placeholder="Selecione um arquivo"
  [multiple]="false"
  [maxSize]="5"
  (filesChange)="onFilesChange($event)"
></muxima-file-upload>`,
      images: `<muxima-file-upload
  placeholder="Envie suas imagens"
  accept="image/*"
  [maxSize]="5"
  [multiple]="true"
  (filesChange)="onImageFilesChange($event)"
></muxima-file-upload>`,
      documents: `<muxima-file-upload
  placeholder="Envie seus documentos"
  accept=".pdf,.doc,.docx,.txt"
  [maxSize]="20"
  [multiple]="true"
  (filesChange)="onDocumentFilesChange($event)"
></muxima-file-upload>`
    };
    return examples[type] || '';
  }
}
