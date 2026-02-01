import * as i0 from '@angular/core';
import { EventEmitter, Component, ViewChild, Input, Output } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

class ImageCropperComponent {
    constructor() {
        this.imageUrl = '';
        this.outputWidth = 800;
        this.outputHeight = 600;
        this.outputFormat = 'png';
        this.outputQuality = 0.9;
        this.disabled = false;
        this.showGrid = true;
        this.minCropSize = 50;
        this.imageCropped = new EventEmitter();
        this.imageLoaded = new EventEmitter();
        this.cropAreaChanged = new EventEmitter();
        this.image = null;
        this.cropArea = { x: 50, y: 50, width: 200, height: 200 };
        this.scale = 1;
        this.rotation = 0;
        this.isDragging = false;
        this.isResizing = false;
        this.resizeHandle = '';
        this.dragStart = { x: 0, y: 0 };
    }
    ngAfterViewInit() {
        if (this.imageUrl) {
            this.loadImage(this.imageUrl);
        }
    }
    loadImage(url) {
        this.image = new Image();
        this.image.crossOrigin = 'anonymous';
        this.image.onload = () => {
            if (this.image) {
                this.imageLoaded.emit(this.image);
                this.initializeCropArea();
                this.drawImage();
            }
        };
        this.image.onerror = () => {
            console.error('Failed to load image');
        };
        this.image.src = url;
    }
    initializeCropArea() {
        if (!this.image)
            return;
        const canvas = this.canvasRef.nativeElement;
        const maxWidth = canvas.width;
        const maxHeight = canvas.height;
        let width = Math.min(this.image.width * 0.8, maxWidth * 0.8);
        let height = Math.min(this.image.height * 0.8, maxHeight * 0.8);
        if (this.aspectRatio) {
            height = width / this.aspectRatio;
            if (height > maxHeight * 0.8) {
                height = maxHeight * 0.8;
                width = height * this.aspectRatio;
            }
        }
        this.cropArea = {
            x: (maxWidth - width) / 2,
            y: (maxHeight - height) / 2,
            width,
            height
        };
        this.cropAreaChanged.emit(this.cropArea);
    }
    drawImage() {
        if (!this.image || !this.canvasRef)
            return;
        const canvas = this.canvasRef.nativeElement;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Apply transformations
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.scale(this.scale, this.scale);
        const drawWidth = this.image.width;
        const drawHeight = this.image.height;
        ctx.drawImage(this.image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
        ctx.restore();
        // Draw crop area
        this.drawCropArea(ctx);
    }
    drawCropArea(ctx) {
        const { x, y, width, height } = this.cropArea;
        // Semi-transparent overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // Clear crop area
        ctx.clearRect(x, y, width, height);
        // Draw border
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        // Draw grid
        if (this.showGrid) {
            ctx.strokeStyle = 'rgba(102, 126, 234, 0.5)';
            ctx.lineWidth = 1;
            for (let i = 1; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(x + (width / 3) * i, y);
                ctx.lineTo(x + (width / 3) * i, y + height);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x, y + (height / 3) * i);
                ctx.lineTo(x + width, y + (height / 3) * i);
                ctx.stroke();
            }
        }
        // Draw resize handles
        this.drawResizeHandles(ctx);
    }
    drawResizeHandles(ctx) {
        const { x, y, width, height } = this.cropArea;
        const handleSize = 10;
        const handles = [
            { x: x - handleSize / 2, y: y - handleSize / 2, pos: 'nw' },
            { x: x + width / 2 - handleSize / 2, y: y - handleSize / 2, pos: 'n' },
            { x: x + width - handleSize / 2, y: y - handleSize / 2, pos: 'ne' },
            { x: x + width - handleSize / 2, y: y + height / 2 - handleSize / 2, pos: 'e' },
            { x: x + width - handleSize / 2, y: y + height - handleSize / 2, pos: 'se' },
            { x: x + width / 2 - handleSize / 2, y: y + height - handleSize / 2, pos: 's' },
            { x: x - handleSize / 2, y: y + height - handleSize / 2, pos: 'sw' },
            { x: x - handleSize / 2, y: y + height / 2 - handleSize / 2, pos: 'w' }
        ];
        ctx.fillStyle = '#667eea';
        handles.forEach(handle => {
            ctx.fillRect(handle.x, handle.y, handleSize, handleSize);
        });
    }
    onMouseDown(event) {
        if (this.disabled)
            return;
        const rect = this.canvasRef.nativeElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const handle = this.getResizeHandle(x, y);
        if (handle) {
            this.isResizing = true;
            this.resizeHandle = handle;
            this.dragStart = { x, y };
        }
        else if (this.isInsideCropArea(x, y)) {
            this.isDragging = true;
            this.dragStart = { x: x - this.cropArea.x, y: y - this.cropArea.y };
        }
    }
    onMouseMove(event) {
        if (!this.isDragging && !this.isResizing)
            return;
        const rect = this.canvasRef.nativeElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if (this.isDragging) {
            this.moveCropArea(x - this.dragStart.x, y - this.dragStart.y);
        }
        else if (this.isResizing) {
            this.resizeCropArea(x, y);
        }
        this.drawImage();
        this.cropAreaChanged.emit(this.cropArea);
    }
    onMouseUp() {
        this.isDragging = false;
        this.isResizing = false;
    }
    moveCropArea(x, y) {
        const canvas = this.canvasRef.nativeElement;
        this.cropArea.x = Math.max(0, Math.min(x, canvas.width - this.cropArea.width));
        this.cropArea.y = Math.max(0, Math.min(y, canvas.height - this.cropArea.height));
    }
    resizeCropArea(x, y) {
        const deltaX = x - this.dragStart.x;
        const deltaY = y - this.dragStart.y;
        const canvas = this.canvasRef.nativeElement;
        let newX = this.cropArea.x;
        let newY = this.cropArea.y;
        let newWidth = this.cropArea.width;
        let newHeight = this.cropArea.height;
        // Handle different resize directions
        if (this.resizeHandle.includes('w')) {
            newX += deltaX;
            newWidth -= deltaX;
        }
        if (this.resizeHandle.includes('e')) {
            newWidth += deltaX;
        }
        if (this.resizeHandle.includes('n')) {
            newY += deltaY;
            newHeight -= deltaY;
        }
        if (this.resizeHandle.includes('s')) {
            newHeight += deltaY;
        }
        // Maintain aspect ratio if set
        if (this.aspectRatio) {
            if (this.resizeHandle.includes('w') || this.resizeHandle.includes('e')) {
                newHeight = newWidth / this.aspectRatio;
            }
            else {
                newWidth = newHeight * this.aspectRatio;
            }
        }
        // Apply constraints
        if (newWidth >= this.minCropSize && newHeight >= this.minCropSize &&
            newX >= 0 && newY >= 0 &&
            newX + newWidth <= canvas.width && newY + newHeight <= canvas.height) {
            this.cropArea = { x: newX, y: newY, width: newWidth, height: newHeight };
            this.dragStart = { x, y };
        }
    }
    getResizeHandle(x, y) {
        const { x: cx, y: cy, width, height } = this.cropArea;
        const handleSize = 10;
        const handles = {
            nw: { x: cx, y: cy },
            n: { x: cx + width / 2, y: cy },
            ne: { x: cx + width, y: cy },
            e: { x: cx + width, y: cy + height / 2 },
            se: { x: cx + width, y: cy + height },
            s: { x: cx + width / 2, y: cy + height },
            sw: { x: cx, y: cy + height },
            w: { x: cx, y: cy + height / 2 }
        };
        for (const [key, pos] of Object.entries(handles)) {
            if (Math.abs(x - pos.x) <= handleSize / 2 && Math.abs(y - pos.y) <= handleSize / 2) {
                return key;
            }
        }
        return '';
    }
    isInsideCropArea(x, y) {
        const { x: cx, y: cy, width, height } = this.cropArea;
        return x >= cx && x <= cx + width && y >= cy && y <= cy + height;
    }
    rotate(degrees) {
        this.rotation = (this.rotation + degrees) % 360;
        this.drawImage();
    }
    zoom(delta) {
        this.scale = Math.max(0.1, Math.min(3, this.scale + delta));
        this.drawImage();
    }
    reset() {
        this.scale = 1;
        this.rotation = 0;
        this.initializeCropArea();
        this.drawImage();
    }
    async crop() {
        if (!this.image || !this.cropCanvasRef)
            return;
        const cropCanvas = this.cropCanvasRef.nativeElement;
        const ctx = cropCanvas.getContext('2d');
        if (!ctx)
            return;
        cropCanvas.width = this.outputWidth;
        cropCanvas.height = this.outputHeight;
        // Calculate source crop area
        const scaleX = this.image.width / this.canvasRef.nativeElement.width;
        const scaleY = this.image.height / this.canvasRef.nativeElement.height;
        const sourceX = this.cropArea.x * scaleX;
        const sourceY = this.cropArea.y * scaleY;
        const sourceWidth = this.cropArea.width * scaleX;
        const sourceHeight = this.cropArea.height * scaleY;
        ctx.drawImage(this.image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, this.outputWidth, this.outputHeight);
        const mimeType = `image/${this.outputFormat}`;
        const dataUrl = cropCanvas.toDataURL(mimeType, this.outputQuality);
        const blob = await new Promise(resolve => {
            cropCanvas.toBlob(resolve, mimeType, this.outputQuality);
        });
        const result = {
            dataUrl,
            blob,
            width: this.outputWidth,
            height: this.outputHeight
        };
        this.imageCropped.emit(result);
    }
    handleFileInput(event) {
        const input = event.target;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    this.loadImage(e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    }
}
ImageCropperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ImageCropperComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ImageCropperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: ImageCropperComponent, isStandalone: true, selector: "muxima-image-cropper", inputs: { imageUrl: "imageUrl", aspectRatio: "aspectRatio", outputWidth: "outputWidth", outputHeight: "outputHeight", outputFormat: "outputFormat", outputQuality: "outputQuality", disabled: "disabled", showGrid: "showGrid", minCropSize: "minCropSize" }, outputs: { imageCropped: "imageCropped", imageLoaded: "imageLoaded", cropAreaChanged: "cropAreaChanged" }, viewQueries: [{ propertyName: "canvasRef", first: true, predicate: ["canvas"], descendants: true }, { propertyName: "cropCanvasRef", first: true, predicate: ["cropCanvas"], descendants: true }], ngImport: i0, template: "<div class=\"image-cropper-wrapper\" [class.disabled]=\"disabled\">\r\n  <!-- File Input -->\r\n  <div class=\"cropper-upload\" *ngIf=\"!imageUrl\">\r\n    <input type=\"file\" #fileInput (change)=\"handleFileInput($event)\" accept=\"image/*\" hidden />\r\n    <button class=\"upload-btn\" (click)=\"fileInput.click()\" [disabled]=\"disabled\">\r\n      \uD83D\uDCC1 Selecionar Imagem\r\n    </button>\r\n  </div>\r\n\r\n  <!-- Cropper Area -->\r\n  <div class=\"cropper-container\" *ngIf=\"imageUrl\">\r\n    <canvas\r\n      #canvas\r\n      width=\"600\"\r\n      height=\"400\"\r\n      (mousedown)=\"onMouseDown($event)\"\r\n      (mousemove)=\"onMouseMove($event)\"\r\n      (mouseup)=\"onMouseUp()\"\r\n      (mouseleave)=\"onMouseUp()\">\r\n    </canvas>\r\n  </div>\r\n\r\n  <!-- Hidden canvas for crop output -->\r\n  <canvas #cropCanvas style=\"display: none;\"></canvas>\r\n\r\n  <!-- Controls -->\r\n  <div class=\"cropper-controls\" *ngIf=\"imageUrl\">\r\n    <div class=\"control-group\">\r\n      <button class=\"control-btn\" (click)=\"rotate(-90)\" [disabled]=\"disabled\" title=\"Rotacionar -90\u00B0\">\r\n        \u21BA\r\n      </button>\r\n      <button class=\"control-btn\" (click)=\"rotate(90)\" [disabled]=\"disabled\" title=\"Rotacionar +90\u00B0\">\r\n        \u21BB\r\n      </button>\r\n    </div>\r\n\r\n    <div class=\"control-group\">\r\n      <button class=\"control-btn\" (click)=\"zoom(-0.1)\" [disabled]=\"disabled\" title=\"Zoom Out\">\r\n        \uD83D\uDD0D-\r\n      </button>\r\n      <button class=\"control-btn\" (click)=\"zoom(0.1)\" [disabled]=\"disabled\" title=\"Zoom In\">\r\n        \uD83D\uDD0D+\r\n      </button>\r\n    </div>\r\n\r\n    <div class=\"control-group\">\r\n      <button class=\"control-btn\" (click)=\"reset()\" [disabled]=\"disabled\" title=\"Reset\">\r\n        \uD83D\uDD04\r\n      </button>\r\n    </div>\r\n\r\n    <div class=\"control-group\">\r\n      <button class=\"control-btn control-btn--primary\" (click)=\"crop()\" [disabled]=\"disabled\">\r\n        \u2702\uFE0F Cortar Imagem\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Info -->\r\n  <div class=\"cropper-info\" *ngIf=\"imageUrl\">\r\n    <small>Escala: {{ (scale * 100).toFixed(0) }}% | Rota\u00E7\u00E3o: {{ rotation }}\u00B0</small>\r\n  </div>\r\n</div>\r\n", styles: [".image-cropper-wrapper{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.image-cropper-wrapper.disabled{opacity:.6;pointer-events:none}.cropper-upload{display:flex;justify-content:center;padding:3rem}.cropper-upload .upload-btn{padding:1rem 2rem;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;border-radius:12px;font-size:1.125rem;font-weight:600;cursor:pointer;transition:all .3s ease;box-shadow:0 4px 12px #667eea4d}.cropper-upload .upload-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 6px 20px #667eea66}.cropper-upload .upload-btn:disabled{opacity:.5;cursor:not-allowed}.cropper-container{display:flex;justify-content:center;background:#f9fafb;border-radius:12px;padding:1rem;margin-bottom:1rem}.cropper-container canvas{cursor:move;border:2px solid #e5e7eb;border-radius:8px;box-shadow:0 2px 8px #0000001a}.cropper-controls{display:flex;justify-content:center;gap:.75rem;flex-wrap:wrap;padding:1rem}.cropper-controls .control-group{display:flex;gap:.5rem}.cropper-controls .control-btn{padding:.625rem 1rem;background:white;color:#374151;border:2px solid #e5e7eb;border-radius:8px;font-size:.95rem;font-weight:600;cursor:pointer;transition:all .2s ease}.cropper-controls .control-btn:hover:not(:disabled){border-color:#667eea;background:#f9fafb}.cropper-controls .control-btn:disabled{opacity:.5;cursor:not-allowed}.cropper-controls .control-btn--primary{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;box-shadow:0 2px 8px #667eea4d}.cropper-controls .control-btn--primary:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 4px 12px #667eea66}.cropper-info{text-align:center;padding:.5rem}.cropper-info small{color:#6b7280;font-size:.875rem}@media (max-width: 768px){.cropper-container canvas{max-width:100%;height:auto}.cropper-controls .control-btn{padding:.5rem .75rem;font-size:.85rem}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ImageCropperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-image-cropper', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"image-cropper-wrapper\" [class.disabled]=\"disabled\">\r\n  <!-- File Input -->\r\n  <div class=\"cropper-upload\" *ngIf=\"!imageUrl\">\r\n    <input type=\"file\" #fileInput (change)=\"handleFileInput($event)\" accept=\"image/*\" hidden />\r\n    <button class=\"upload-btn\" (click)=\"fileInput.click()\" [disabled]=\"disabled\">\r\n      \uD83D\uDCC1 Selecionar Imagem\r\n    </button>\r\n  </div>\r\n\r\n  <!-- Cropper Area -->\r\n  <div class=\"cropper-container\" *ngIf=\"imageUrl\">\r\n    <canvas\r\n      #canvas\r\n      width=\"600\"\r\n      height=\"400\"\r\n      (mousedown)=\"onMouseDown($event)\"\r\n      (mousemove)=\"onMouseMove($event)\"\r\n      (mouseup)=\"onMouseUp()\"\r\n      (mouseleave)=\"onMouseUp()\">\r\n    </canvas>\r\n  </div>\r\n\r\n  <!-- Hidden canvas for crop output -->\r\n  <canvas #cropCanvas style=\"display: none;\"></canvas>\r\n\r\n  <!-- Controls -->\r\n  <div class=\"cropper-controls\" *ngIf=\"imageUrl\">\r\n    <div class=\"control-group\">\r\n      <button class=\"control-btn\" (click)=\"rotate(-90)\" [disabled]=\"disabled\" title=\"Rotacionar -90\u00B0\">\r\n        \u21BA\r\n      </button>\r\n      <button class=\"control-btn\" (click)=\"rotate(90)\" [disabled]=\"disabled\" title=\"Rotacionar +90\u00B0\">\r\n        \u21BB\r\n      </button>\r\n    </div>\r\n\r\n    <div class=\"control-group\">\r\n      <button class=\"control-btn\" (click)=\"zoom(-0.1)\" [disabled]=\"disabled\" title=\"Zoom Out\">\r\n        \uD83D\uDD0D-\r\n      </button>\r\n      <button class=\"control-btn\" (click)=\"zoom(0.1)\" [disabled]=\"disabled\" title=\"Zoom In\">\r\n        \uD83D\uDD0D+\r\n      </button>\r\n    </div>\r\n\r\n    <div class=\"control-group\">\r\n      <button class=\"control-btn\" (click)=\"reset()\" [disabled]=\"disabled\" title=\"Reset\">\r\n        \uD83D\uDD04\r\n      </button>\r\n    </div>\r\n\r\n    <div class=\"control-group\">\r\n      <button class=\"control-btn control-btn--primary\" (click)=\"crop()\" [disabled]=\"disabled\">\r\n        \u2702\uFE0F Cortar Imagem\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Info -->\r\n  <div class=\"cropper-info\" *ngIf=\"imageUrl\">\r\n    <small>Escala: {{ (scale * 100).toFixed(0) }}% | Rota\u00E7\u00E3o: {{ rotation }}\u00B0</small>\r\n  </div>\r\n</div>\r\n", styles: [".image-cropper-wrapper{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.image-cropper-wrapper.disabled{opacity:.6;pointer-events:none}.cropper-upload{display:flex;justify-content:center;padding:3rem}.cropper-upload .upload-btn{padding:1rem 2rem;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;border-radius:12px;font-size:1.125rem;font-weight:600;cursor:pointer;transition:all .3s ease;box-shadow:0 4px 12px #667eea4d}.cropper-upload .upload-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 6px 20px #667eea66}.cropper-upload .upload-btn:disabled{opacity:.5;cursor:not-allowed}.cropper-container{display:flex;justify-content:center;background:#f9fafb;border-radius:12px;padding:1rem;margin-bottom:1rem}.cropper-container canvas{cursor:move;border:2px solid #e5e7eb;border-radius:8px;box-shadow:0 2px 8px #0000001a}.cropper-controls{display:flex;justify-content:center;gap:.75rem;flex-wrap:wrap;padding:1rem}.cropper-controls .control-group{display:flex;gap:.5rem}.cropper-controls .control-btn{padding:.625rem 1rem;background:white;color:#374151;border:2px solid #e5e7eb;border-radius:8px;font-size:.95rem;font-weight:600;cursor:pointer;transition:all .2s ease}.cropper-controls .control-btn:hover:not(:disabled){border-color:#667eea;background:#f9fafb}.cropper-controls .control-btn:disabled{opacity:.5;cursor:not-allowed}.cropper-controls .control-btn--primary{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;box-shadow:0 2px 8px #667eea4d}.cropper-controls .control-btn--primary:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 4px 12px #667eea66}.cropper-info{text-align:center;padding:.5rem}.cropper-info small{color:#6b7280;font-size:.875rem}@media (max-width: 768px){.cropper-container canvas{max-width:100%;height:auto}.cropper-controls .control-btn{padding:.5rem .75rem;font-size:.85rem}}\n"] }]
        }], propDecorators: { canvasRef: [{
                type: ViewChild,
                args: ['canvas', { static: false }]
            }], cropCanvasRef: [{
                type: ViewChild,
                args: ['cropCanvas', { static: false }]
            }], imageUrl: [{
                type: Input
            }], aspectRatio: [{
                type: Input
            }], outputWidth: [{
                type: Input
            }], outputHeight: [{
                type: Input
            }], outputFormat: [{
                type: Input
            }], outputQuality: [{
                type: Input
            }], disabled: [{
                type: Input
            }], showGrid: [{
                type: Input
            }], minCropSize: [{
                type: Input
            }], imageCropped: [{
                type: Output
            }], imageLoaded: [{
                type: Output
            }], cropAreaChanged: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { ImageCropperComponent };
//# sourceMappingURL=muxima-ui-image-cropper.mjs.map
