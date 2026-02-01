import { EventEmitter, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export interface UploadedFile {
    file: File;
    progress: number;
    uploaded: boolean;
    error?: string;
}
export declare class FileUploadComponent {
    accept: string;
    maxSize: number;
    multiple: boolean;
    disabled: boolean;
    placeholder: string;
    filesChange: EventEmitter<File[]>;
    fileRemoved: EventEmitter<File>;
    fileInput: ElementRef<HTMLInputElement>;
    uploadedFiles: UploadedFile[];
    isDragging: boolean;
    onFileSelected(event: Event): void;
    onDragOver(event: DragEvent): void;
    onDragLeave(event: DragEvent): void;
    onDrop(event: DragEvent): void;
    handleFiles(files: File[]): void;
    validateFile(file: File): boolean;
    simulateUpload(uploadedFile: UploadedFile): void;
    removeFile(index: number): void;
    triggerFileInput(): void;
    getFileIcon(file: File): string;
    formatFileSize(bytes: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<FileUploadComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FileUploadComponent, "muxima-file-upload", never, { "accept": "accept"; "maxSize": "maxSize"; "multiple": "multiple"; "disabled": "disabled"; "placeholder": "placeholder"; }, { "filesChange": "filesChange"; "fileRemoved": "fileRemoved"; }, never, never, true, never>;
}
