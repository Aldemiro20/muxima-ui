import { Component, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UploadedFile {
  file: File;
  progress: number;
  uploaded: boolean;
  error?: string;
}

@Component({
  selector: 'muxima-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @Input() accept = '*/*';
  @Input() maxSize = 10; // MB
  @Input() multiple = true;
  @Input() disabled = false;
  @Input() placeholder = 'Arraste arquivos ou clique para selecionar';
  
  @Output() filesChange = new EventEmitter<File[]>();
  @Output() fileRemoved = new EventEmitter<File>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  uploadedFiles: UploadedFile[] = [];
  isDragging = false;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer?.files) {
      this.handleFiles(Array.from(event.dataTransfer.files));
    }
  }

  handleFiles(files: File[]): void {
    if (this.disabled) return;

    const validFiles = files.filter(file => this.validateFile(file));
    
    if (!this.multiple && validFiles.length > 0) {
      this.uploadedFiles = [];
    }

    validFiles.forEach(file => {
      const uploadedFile: UploadedFile = {
        file,
        progress: 0,
        uploaded: false
      };
      
      this.uploadedFiles.push(uploadedFile);
      this.simulateUpload(uploadedFile);
    });

    this.filesChange.emit(this.uploadedFiles.map(uf => uf.file));
  }

  validateFile(file: File): boolean {
    const sizeInMB = file.size / (1024 * 1024);
    
    if (sizeInMB > this.maxSize) {
      alert(`O arquivo "${file.name}" excede o tamanho máximo de ${this.maxSize}MB`);
      return false;
    }

    return true;
  }

  simulateUpload(uploadedFile: UploadedFile): void {
    const interval = setInterval(() => {
      uploadedFile.progress += 10;
      
      if (uploadedFile.progress >= 100) {
        uploadedFile.progress = 100;
        uploadedFile.uploaded = true;
        clearInterval(interval);
      }
    }, 200);
  }

  removeFile(index: number): void {
    const removed = this.uploadedFiles[index];
    this.uploadedFiles.splice(index, 1);
    this.fileRemoved.emit(removed.file);
    this.filesChange.emit(this.uploadedFiles.map(uf => uf.file));
    
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  triggerFileInput(): void {
    if (!this.disabled) {
      this.fileInput.nativeElement.click();
    }
  }

  getFileIcon(file: File): string {
    const ext = file.name.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext || '')) return '🖼️';
    if (['pdf'].includes(ext || '')) return '📄';
    if (['doc', 'docx'].includes(ext || '')) return '📝';
    if (['xls', 'xlsx'].includes(ext || '')) return '📊';
    if (['zip', 'rar', '7z'].includes(ext || '')) return '📦';
    if (['mp4', 'avi', 'mov'].includes(ext || '')) return '🎥';
    if (['mp3', 'wav', 'ogg'].includes(ext || '')) return '🎵';
    
    return '📎';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}
