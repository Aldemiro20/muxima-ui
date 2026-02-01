import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, ViewChild } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

class FileUploadComponent {
    constructor() {
        this.accept = '*/*';
        this.maxSize = 10; // MB
        this.multiple = true;
        this.disabled = false;
        this.placeholder = 'Arraste arquivos ou clique para selecionar';
        this.filesChange = new EventEmitter();
        this.fileRemoved = new EventEmitter();
        this.uploadedFiles = [];
        this.isDragging = false;
    }
    onFileSelected(event) {
        const input = event.target;
        if (input.files) {
            this.handleFiles(Array.from(input.files));
        }
    }
    onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = true;
    }
    onDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;
    }
    onDrop(event) {
        var _a;
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;
        if ((_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.files) {
            this.handleFiles(Array.from(event.dataTransfer.files));
        }
    }
    handleFiles(files) {
        if (this.disabled)
            return;
        const validFiles = files.filter(file => this.validateFile(file));
        if (!this.multiple && validFiles.length > 0) {
            this.uploadedFiles = [];
        }
        validFiles.forEach(file => {
            const uploadedFile = {
                file,
                progress: 0,
                uploaded: false
            };
            this.uploadedFiles.push(uploadedFile);
            this.simulateUpload(uploadedFile);
        });
        this.filesChange.emit(this.uploadedFiles.map(uf => uf.file));
    }
    validateFile(file) {
        const sizeInMB = file.size / (1024 * 1024);
        if (sizeInMB > this.maxSize) {
            alert(`O arquivo "${file.name}" excede o tamanho máximo de ${this.maxSize}MB`);
            return false;
        }
        return true;
    }
    simulateUpload(uploadedFile) {
        const interval = setInterval(() => {
            uploadedFile.progress += 10;
            if (uploadedFile.progress >= 100) {
                uploadedFile.progress = 100;
                uploadedFile.uploaded = true;
                clearInterval(interval);
            }
        }, 200);
    }
    removeFile(index) {
        const removed = this.uploadedFiles[index];
        this.uploadedFiles.splice(index, 1);
        this.fileRemoved.emit(removed.file);
        this.filesChange.emit(this.uploadedFiles.map(uf => uf.file));
        if (this.fileInput) {
            this.fileInput.nativeElement.value = '';
        }
    }
    triggerFileInput() {
        if (!this.disabled) {
            this.fileInput.nativeElement.click();
        }
    }
    getFileIcon(file) {
        var _a;
        const ext = (_a = file.name.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext || ''))
            return '🖼️';
        if (['pdf'].includes(ext || ''))
            return '📄';
        if (['doc', 'docx'].includes(ext || ''))
            return '📝';
        if (['xls', 'xlsx'].includes(ext || ''))
            return '📊';
        if (['zip', 'rar', '7z'].includes(ext || ''))
            return '📦';
        if (['mp4', 'avi', 'mov'].includes(ext || ''))
            return '🎥';
        if (['mp3', 'wav', 'ogg'].includes(ext || ''))
            return '🎵';
        return '📎';
    }
    formatFileSize(bytes) {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
}
FileUploadComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FileUploadComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
FileUploadComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: FileUploadComponent, isStandalone: true, selector: "muxima-file-upload", inputs: { accept: "accept", maxSize: "maxSize", multiple: "multiple", disabled: "disabled", placeholder: "placeholder" }, outputs: { filesChange: "filesChange", fileRemoved: "fileRemoved" }, viewQueries: [{ propertyName: "fileInput", first: true, predicate: ["fileInput"], descendants: true }], ngImport: i0, template: "<div class=\"muxima-file-upload\">\n  <input\n    #fileInput\n    type=\"file\"\n    [accept]=\"accept\"\n    [multiple]=\"multiple\"\n    [disabled]=\"disabled\"\n    (change)=\"onFileSelected($event)\"\n    style=\"display: none;\">\n\n  <div\n    class=\"upload-zone\"\n    [class.dragging]=\"isDragging\"\n    [class.disabled]=\"disabled\"\n    (click)=\"triggerFileInput()\"\n    (dragover)=\"onDragOver($event)\"\n    (dragleave)=\"onDragLeave($event)\"\n    (drop)=\"onDrop($event)\">\n    \n    <svg class=\"upload-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n      <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"></path>\n      <polyline points=\"17 8 12 3 7 8\"></polyline>\n      <line x1=\"12\" y1=\"3\" x2=\"12\" y2=\"15\"></line>\n    </svg>\n\n    <h3 class=\"upload-title\">{{ placeholder }}</h3>\n    <p class=\"upload-subtitle\">ou arraste e solte aqui</p>\n    <p class=\"upload-info\">M\u00E1ximo {{ maxSize }}MB por arquivo</p>\n  </div>\n\n  <div class=\"files-list\" *ngIf=\"uploadedFiles.length > 0\">\n    <div class=\"file-item\" *ngFor=\"let uploadedFile of uploadedFiles; let i = index\">\n      <div class=\"file-icon\">{{ getFileIcon(uploadedFile.file) }}</div>\n      \n      <div class=\"file-info\">\n        <div class=\"file-name\">{{ uploadedFile.file.name }}</div>\n        <div class=\"file-size\">{{ formatFileSize(uploadedFile.file.size) }}</div>\n        \n        <div class=\"file-progress\" *ngIf=\"!uploadedFile.uploaded\">\n          <div class=\"progress-bar\">\n            <div class=\"progress-fill\" [style.width.%]=\"uploadedFile.progress\"></div>\n          </div>\n          <span class=\"progress-text\">{{ uploadedFile.progress }}%</span>\n        </div>\n\n        <div class=\"file-status\" *ngIf=\"uploadedFile.uploaded\">\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n            <polyline points=\"20 6 9 17 4 12\"></polyline>\n          </svg>\n          <span>Upload completo</span>\n        </div>\n      </div>\n\n      <button \n        type=\"button\"\n        class=\"remove-btn\" \n        (click)=\"removeFile(i)\"\n        [disabled]=\"disabled\">\n        <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n          <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".muxima-file-upload{width:100%}.upload-zone{border:3px dashed #e5e7eb;border-radius:16px;padding:3rem 2rem;text-align:center;cursor:pointer;transition:all .3s ease;background:linear-gradient(135deg,#f8f9ff 0%,#ffffff 100%)}.upload-zone:hover:not(.disabled){border-color:#667eea;background:linear-gradient(135deg,#f0f4ff 0%,#f8f9ff 100%);transform:translateY(-2px);box-shadow:0 8px 24px #667eea26}.upload-zone.dragging{border-color:#667eea;background:linear-gradient(135deg,#e8ecff 0%,#f0f4ff 100%);transform:scale(1.02);box-shadow:0 12px 32px #667eea40}.upload-zone.disabled{opacity:.6;cursor:not-allowed;background:#f3f4f6}.upload-icon{width:64px;height:64px;margin:0 auto 1.5rem;color:#667eea;animation:floatUpDown 3s ease-in-out infinite}.upload-title{font-size:1.25rem;font-weight:700;color:#1f2937;margin:0 0 .5rem;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.upload-subtitle{font-size:.95rem;color:#6b7280;margin:0 0 .5rem}.upload-info{font-size:.875rem;color:#9ca3af;margin:0}.files-list{margin-top:2rem;display:flex;flex-direction:column;gap:1rem}.file-item{display:flex;align-items:center;gap:1rem;padding:1.25rem;background:white;border:2px solid #e5e7eb;border-radius:12px;transition:all .3s ease;animation:slideIn .3s ease-out}.file-item:hover{border-color:#667eea;box-shadow:0 4px 12px #667eea1a;transform:translate(4px)}.file-icon{font-size:2.5rem;flex-shrink:0;width:48px;text-align:center}.file-info{flex:1;min-width:0}.file-name{font-size:.95rem;font-weight:600;color:#1f2937;margin-bottom:.25rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.file-size{font-size:.875rem;color:#6b7280;margin-bottom:.5rem}.file-progress{display:flex;align-items:center;gap:.75rem}.progress-bar{flex:1;height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden}.progress-fill{height:100%;background:linear-gradient(90deg,#667eea 0%,#764ba2 100%);border-radius:4px;transition:width .3s ease}.progress-text{font-size:.875rem;font-weight:600;color:#667eea;min-width:40px;text-align:right}.file-status{display:flex;align-items:center;gap:.5rem;color:#10b981;font-size:.875rem;font-weight:600}.file-status svg{width:20px;height:20px}.remove-btn{flex-shrink:0;width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:rgba(239,68,68,.1);border:none;border-radius:8px;color:#ef4444;cursor:pointer;transition:all .3s ease}.remove-btn svg{width:20px;height:20px}.remove-btn:hover:not(:disabled){background:#ef4444;color:#fff;transform:scale(1.1)}.remove-btn:disabled{opacity:.5;cursor:not-allowed}@keyframes floatUpDown{0%,to{transform:translateY(0)}50%{transform:translateY(-10px)}}@keyframes slideIn{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}@media (max-width: 768px){.upload-zone{padding:2rem 1.5rem}.upload-icon{width:48px;height:48px}.upload-title{font-size:1.125rem}.file-item{padding:1rem}.file-icon{font-size:2rem;width:40px}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FileUploadComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-file-upload', standalone: true, imports: [CommonModule], template: "<div class=\"muxima-file-upload\">\n  <input\n    #fileInput\n    type=\"file\"\n    [accept]=\"accept\"\n    [multiple]=\"multiple\"\n    [disabled]=\"disabled\"\n    (change)=\"onFileSelected($event)\"\n    style=\"display: none;\">\n\n  <div\n    class=\"upload-zone\"\n    [class.dragging]=\"isDragging\"\n    [class.disabled]=\"disabled\"\n    (click)=\"triggerFileInput()\"\n    (dragover)=\"onDragOver($event)\"\n    (dragleave)=\"onDragLeave($event)\"\n    (drop)=\"onDrop($event)\">\n    \n    <svg class=\"upload-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n      <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"></path>\n      <polyline points=\"17 8 12 3 7 8\"></polyline>\n      <line x1=\"12\" y1=\"3\" x2=\"12\" y2=\"15\"></line>\n    </svg>\n\n    <h3 class=\"upload-title\">{{ placeholder }}</h3>\n    <p class=\"upload-subtitle\">ou arraste e solte aqui</p>\n    <p class=\"upload-info\">M\u00E1ximo {{ maxSize }}MB por arquivo</p>\n  </div>\n\n  <div class=\"files-list\" *ngIf=\"uploadedFiles.length > 0\">\n    <div class=\"file-item\" *ngFor=\"let uploadedFile of uploadedFiles; let i = index\">\n      <div class=\"file-icon\">{{ getFileIcon(uploadedFile.file) }}</div>\n      \n      <div class=\"file-info\">\n        <div class=\"file-name\">{{ uploadedFile.file.name }}</div>\n        <div class=\"file-size\">{{ formatFileSize(uploadedFile.file.size) }}</div>\n        \n        <div class=\"file-progress\" *ngIf=\"!uploadedFile.uploaded\">\n          <div class=\"progress-bar\">\n            <div class=\"progress-fill\" [style.width.%]=\"uploadedFile.progress\"></div>\n          </div>\n          <span class=\"progress-text\">{{ uploadedFile.progress }}%</span>\n        </div>\n\n        <div class=\"file-status\" *ngIf=\"uploadedFile.uploaded\">\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n            <polyline points=\"20 6 9 17 4 12\"></polyline>\n          </svg>\n          <span>Upload completo</span>\n        </div>\n      </div>\n\n      <button \n        type=\"button\"\n        class=\"remove-btn\" \n        (click)=\"removeFile(i)\"\n        [disabled]=\"disabled\">\n        <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n          <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n          <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".muxima-file-upload{width:100%}.upload-zone{border:3px dashed #e5e7eb;border-radius:16px;padding:3rem 2rem;text-align:center;cursor:pointer;transition:all .3s ease;background:linear-gradient(135deg,#f8f9ff 0%,#ffffff 100%)}.upload-zone:hover:not(.disabled){border-color:#667eea;background:linear-gradient(135deg,#f0f4ff 0%,#f8f9ff 100%);transform:translateY(-2px);box-shadow:0 8px 24px #667eea26}.upload-zone.dragging{border-color:#667eea;background:linear-gradient(135deg,#e8ecff 0%,#f0f4ff 100%);transform:scale(1.02);box-shadow:0 12px 32px #667eea40}.upload-zone.disabled{opacity:.6;cursor:not-allowed;background:#f3f4f6}.upload-icon{width:64px;height:64px;margin:0 auto 1.5rem;color:#667eea;animation:floatUpDown 3s ease-in-out infinite}.upload-title{font-size:1.25rem;font-weight:700;color:#1f2937;margin:0 0 .5rem;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.upload-subtitle{font-size:.95rem;color:#6b7280;margin:0 0 .5rem}.upload-info{font-size:.875rem;color:#9ca3af;margin:0}.files-list{margin-top:2rem;display:flex;flex-direction:column;gap:1rem}.file-item{display:flex;align-items:center;gap:1rem;padding:1.25rem;background:white;border:2px solid #e5e7eb;border-radius:12px;transition:all .3s ease;animation:slideIn .3s ease-out}.file-item:hover{border-color:#667eea;box-shadow:0 4px 12px #667eea1a;transform:translate(4px)}.file-icon{font-size:2.5rem;flex-shrink:0;width:48px;text-align:center}.file-info{flex:1;min-width:0}.file-name{font-size:.95rem;font-weight:600;color:#1f2937;margin-bottom:.25rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.file-size{font-size:.875rem;color:#6b7280;margin-bottom:.5rem}.file-progress{display:flex;align-items:center;gap:.75rem}.progress-bar{flex:1;height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden}.progress-fill{height:100%;background:linear-gradient(90deg,#667eea 0%,#764ba2 100%);border-radius:4px;transition:width .3s ease}.progress-text{font-size:.875rem;font-weight:600;color:#667eea;min-width:40px;text-align:right}.file-status{display:flex;align-items:center;gap:.5rem;color:#10b981;font-size:.875rem;font-weight:600}.file-status svg{width:20px;height:20px}.remove-btn{flex-shrink:0;width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:rgba(239,68,68,.1);border:none;border-radius:8px;color:#ef4444;cursor:pointer;transition:all .3s ease}.remove-btn svg{width:20px;height:20px}.remove-btn:hover:not(:disabled){background:#ef4444;color:#fff;transform:scale(1.1)}.remove-btn:disabled{opacity:.5;cursor:not-allowed}@keyframes floatUpDown{0%,to{transform:translateY(0)}50%{transform:translateY(-10px)}}@keyframes slideIn{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}@media (max-width: 768px){.upload-zone{padding:2rem 1.5rem}.upload-icon{width:48px;height:48px}.upload-title{font-size:1.125rem}.file-item{padding:1rem}.file-icon{font-size:2rem;width:40px}}\n"] }]
        }], propDecorators: { accept: [{
                type: Input
            }], maxSize: [{
                type: Input
            }], multiple: [{
                type: Input
            }], disabled: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], filesChange: [{
                type: Output
            }], fileRemoved: [{
                type: Output
            }], fileInput: [{
                type: ViewChild,
                args: ['fileInput']
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { FileUploadComponent };
//# sourceMappingURL=agt-ui-file-upload.mjs.map
