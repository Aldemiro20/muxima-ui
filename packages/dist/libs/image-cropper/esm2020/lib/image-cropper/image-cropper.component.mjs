import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class ImageCropperComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtY3JvcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tZWRpYS9pbWFnZS1jcm9wcGVyL3NyYy9saWIvaW1hZ2UtY3JvcHBlci9pbWFnZS1jcm9wcGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL21lZGlhL2ltYWdlLWNyb3BwZXIvc3JjL2xpYi9pbWFnZS1jcm9wcGVyL2ltYWdlLWNyb3BwZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBYyxTQUFTLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQzdHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQXVCN0MsTUFBTSxPQUFPLHFCQUFxQjtJQVBsQztRQVdXLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFFdEIsZ0JBQVcsR0FBVyxHQUFHLENBQUM7UUFDMUIsaUJBQVksR0FBVyxHQUFHLENBQUM7UUFDM0IsaUJBQVksR0FBNEIsS0FBSyxDQUFDO1FBQzlDLGtCQUFhLEdBQVcsR0FBRyxDQUFDO1FBQzVCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUN6QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUV4QixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFjLENBQUM7UUFDOUMsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUNuRCxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFZLENBQUM7UUFFekQsVUFBSyxHQUE0QixJQUFJLENBQUM7UUFDdEMsYUFBUSxHQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFB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QXBCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUVJLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTTtnQkFDRyxlQUFlO3NCQUF4QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ3JvcEFyZWEge1xyXG4gIHg6IG51bWJlcjtcclxuICB5OiBudW1iZXI7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDcm9wUmVzdWx0IHtcclxuICBkYXRhVXJsOiBzdHJpbmc7XHJcbiAgYmxvYjogQmxvYiB8IG51bGw7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtdXhpbWEtaW1hZ2UtY3JvcHBlcicsXHJcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZV0sXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2ltYWdlLWNyb3BwZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2ltYWdlLWNyb3BwZXIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW1hZ2VDcm9wcGVyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgQFZpZXdDaGlsZCgnY2FudmFzJywgeyBzdGF0aWM6IGZhbHNlIH0pIGNhbnZhc1JlZiE6IEVsZW1lbnRSZWY8SFRNTENhbnZhc0VsZW1lbnQ+O1xyXG4gIEBWaWV3Q2hpbGQoJ2Nyb3BDYW52YXMnLCB7IHN0YXRpYzogZmFsc2UgfSkgY3JvcENhbnZhc1JlZiE6IEVsZW1lbnRSZWY8SFRNTENhbnZhc0VsZW1lbnQ+O1xyXG5cclxuICBASW5wdXQoKSBpbWFnZVVybDogc3RyaW5nID0gJyc7XHJcbiAgQElucHV0KCkgYXNwZWN0UmF0aW8/OiBudW1iZXI7IC8vIHVuZGVmaW5lZCA9IGZyZWUsIDEgPSBzcXVhcmUsIDE2LzksIDQvMywgZXRjXHJcbiAgQElucHV0KCkgb3V0cHV0V2lkdGg6IG51bWJlciA9IDgwMDtcclxuICBASW5wdXQoKSBvdXRwdXRIZWlnaHQ6IG51bWJlciA9IDYwMDtcclxuICBASW5wdXQoKSBvdXRwdXRGb3JtYXQ6ICdwbmcnIHwgJ2pwZWcnIHwgJ3dlYnAnID0gJ3BuZyc7XHJcbiAgQElucHV0KCkgb3V0cHV0UXVhbGl0eTogbnVtYmVyID0gMC45O1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgc2hvd0dyaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIEBJbnB1dCgpIG1pbkNyb3BTaXplOiBudW1iZXIgPSA1MDtcclxuXHJcbiAgQE91dHB1dCgpIGltYWdlQ3JvcHBlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Q3JvcFJlc3VsdD4oKTtcclxuICBAT3V0cHV0KCkgaW1hZ2VMb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEhUTUxJbWFnZUVsZW1lbnQ+KCk7XHJcbiAgQE91dHB1dCgpIGNyb3BBcmVhQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Q3JvcEFyZWE+KCk7XHJcblxyXG4gIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50IHwgbnVsbCA9IG51bGw7XHJcbiAgY3JvcEFyZWE6IENyb3BBcmVhID0geyB4OiA1MCwgeTogNTAsIHdpZHRoOiAyMDAsIGhlaWdodDogMjAwIH07XHJcbiAgc2NhbGU6IG51bWJlciA9IDE7XHJcbiAgcm90YXRpb246IG51bWJlciA9IDA7XHJcbiAgaXNEcmFnZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGlzUmVzaXppbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICByZXNpemVIYW5kbGU6IHN0cmluZyA9ICcnO1xyXG4gIGRyYWdTdGFydCA9IHsgeDogMCwgeTogMCB9O1xyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAodGhpcy5pbWFnZVVybCkge1xyXG4gICAgICB0aGlzLmxvYWRJbWFnZSh0aGlzLmltYWdlVXJsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvYWRJbWFnZSh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgdGhpcy5pbWFnZS5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xyXG4gICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmltYWdlKSB7XHJcbiAgICAgICAgdGhpcy5pbWFnZUxvYWRlZC5lbWl0KHRoaXMuaW1hZ2UpO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNyb3BBcmVhKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2UoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoaXMuaW1hZ2Uub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGxvYWQgaW1hZ2UnKTtcclxuICAgIH07XHJcbiAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemVDcm9wQXJlYSgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pbWFnZSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCBtYXhXaWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIGNvbnN0IG1heEhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcblxyXG4gICAgbGV0IHdpZHRoID0gTWF0aC5taW4odGhpcy5pbWFnZS53aWR0aCAqIDAuOCwgbWF4V2lkdGggKiAwLjgpO1xyXG4gICAgbGV0IGhlaWdodCA9IE1hdGgubWluKHRoaXMuaW1hZ2UuaGVpZ2h0ICogMC44LCBtYXhIZWlnaHQgKiAwLjgpO1xyXG5cclxuICAgIGlmICh0aGlzLmFzcGVjdFJhdGlvKSB7XHJcbiAgICAgIGhlaWdodCA9IHdpZHRoIC8gdGhpcy5hc3BlY3RSYXRpbztcclxuICAgICAgaWYgKGhlaWdodCA+IG1heEhlaWdodCAqIDAuOCkge1xyXG4gICAgICAgIGhlaWdodCA9IG1heEhlaWdodCAqIDAuODtcclxuICAgICAgICB3aWR0aCA9IGhlaWdodCAqIHRoaXMuYXNwZWN0UmF0aW87XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNyb3BBcmVhID0ge1xyXG4gICAgICB4OiAobWF4V2lkdGggLSB3aWR0aCkgLyAyLFxyXG4gICAgICB5OiAobWF4SGVpZ2h0IC0gaGVpZ2h0KSAvIDIsXHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHRcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jcm9wQXJlYUNoYW5nZWQuZW1pdCh0aGlzLmNyb3BBcmVhKTtcclxuICB9XHJcblxyXG4gIGRyYXdJbWFnZSgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pbWFnZSB8fCAhdGhpcy5jYW52YXNSZWYpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNhbnZhc1JlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICBpZiAoIWN0eCkgcmV0dXJuO1xyXG5cclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICAvLyBBcHBseSB0cmFuc2Zvcm1hdGlvbnNcclxuICAgIGN0eC5zYXZlKCk7XHJcbiAgICBjdHgudHJhbnNsYXRlKGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyKTtcclxuICAgIGN0eC5yb3RhdGUoKHRoaXMucm90YXRpb24gKiBNYXRoLlBJKSAvIDE4MCk7XHJcbiAgICBjdHguc2NhbGUodGhpcy5zY2FsZSwgdGhpcy5zY2FsZSk7XHJcblxyXG4gICAgY29uc3QgZHJhd1dpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcclxuICAgIGNvbnN0IGRyYXdIZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcclxuICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgLWRyYXdXaWR0aCAvIDIsIC1kcmF3SGVpZ2h0IC8gMiwgZHJhd1dpZHRoLCBkcmF3SGVpZ2h0KTtcclxuXHJcbiAgICBjdHgucmVzdG9yZSgpO1xyXG5cclxuICAgIC8vIERyYXcgY3JvcCBhcmVhXHJcbiAgICB0aGlzLmRyYXdDcm9wQXJlYShjdHgpO1xyXG4gIH1cclxuXHJcbiAgZHJhd0Nyb3BBcmVhKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcbiAgICBjb25zdCB7IHgsIHksIHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMuY3JvcEFyZWE7XHJcblxyXG4gICAgLy8gU2VtaS10cmFuc3BhcmVudCBvdmVybGF5XHJcbiAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwgMCwgMCwgMC41KSc7XHJcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgY3R4LmNhbnZhcy53aWR0aCwgY3R4LmNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgIC8vIENsZWFyIGNyb3AgYXJlYVxyXG4gICAgY3R4LmNsZWFyUmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAvLyBEcmF3IGJvcmRlclxyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJyM2NjdlZWEnO1xyXG4gICAgY3R4LmxpbmVXaWR0aCA9IDI7XHJcbiAgICBjdHguc3Ryb2tlUmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAvLyBEcmF3IGdyaWRcclxuICAgIGlmICh0aGlzLnNob3dHcmlkKSB7XHJcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDEwMiwgMTI2LCAyMzQsIDAuNSknO1xyXG4gICAgICBjdHgubGluZVdpZHRoID0gMTtcclxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4Lm1vdmVUbyh4ICsgKHdpZHRoIC8gMykgKiBpLCB5KTtcclxuICAgICAgICBjdHgubGluZVRvKHggKyAod2lkdGggLyAzKSAqIGksIHkgKyBoZWlnaHQpO1xyXG4gICAgICAgIGN0eC5zdHJva2UoKTtcclxuXHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGN0eC5tb3ZlVG8oeCwgeSArIChoZWlnaHQgLyAzKSAqIGkpO1xyXG4gICAgICAgIGN0eC5saW5lVG8oeCArIHdpZHRoLCB5ICsgKGhlaWdodCAvIDMpICogaSk7XHJcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRHJhdyByZXNpemUgaGFuZGxlc1xyXG4gICAgdGhpcy5kcmF3UmVzaXplSGFuZGxlcyhjdHgpO1xyXG4gIH1cclxuXHJcbiAgZHJhd1Jlc2l6ZUhhbmRsZXMoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHsgeCwgeSwgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5jcm9wQXJlYTtcclxuICAgIGNvbnN0IGhhbmRsZVNpemUgPSAxMDtcclxuICAgIGNvbnN0IGhhbmRsZXMgPSBbXHJcbiAgICAgIHsgeDogeCAtIGhhbmRsZVNpemUgLyAyLCB5OiB5IC0gaGFuZGxlU2l6ZSAvIDIsIHBvczogJ253JyB9LFxyXG4gICAgICB7IHg6IHggKyB3aWR0aCAvIDIgLSBoYW5kbGVTaXplIC8gMiwgeTogeSAtIGhhbmRsZVNpemUgLyAyLCBwb3M6ICduJyB9LFxyXG4gICAgICB7IHg6IHggKyB3aWR0aCAtIGhhbmRsZVNpemUgLyAyLCB5OiB5IC0gaGFuZGxlU2l6ZSAvIDIsIHBvczogJ25lJyB9LFxyXG4gICAgICB7IHg6IHggKyB3aWR0aCAtIGhhbmRsZVNpemUgLyAyLCB5OiB5ICsgaGVpZ2h0IC8gMiAtIGhhbmRsZVNpemUgLyAyLCBwb3M6ICdlJyB9LFxyXG4gICAgICB7IHg6IHggKyB3aWR0aCAtIGhhbmRsZVNpemUgLyAyLCB5OiB5ICsgaGVpZ2h0IC0gaGFuZGxlU2l6ZSAvIDIsIHBvczogJ3NlJyB9LFxyXG4gICAgICB7IHg6IHggKyB3aWR0aCAvIDIgLSBoYW5kbGVTaXplIC8gMiwgeTogeSArIGhlaWdodCAtIGhhbmRsZVNpemUgLyAyLCBwb3M6ICdzJyB9LFxyXG4gICAgICB7IHg6IHggLSBoYW5kbGVTaXplIC8gMiwgeTogeSArIGhlaWdodCAtIGhhbmRsZVNpemUgLyAyLCBwb3M6ICdzdycgfSxcclxuICAgICAgeyB4OiB4IC0gaGFuZGxlU2l6ZSAvIDIsIHk6IHkgKyBoZWlnaHQgLyAyIC0gaGFuZGxlU2l6ZSAvIDIsIHBvczogJ3cnIH1cclxuICAgIF07XHJcblxyXG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjNjY3ZWVhJztcclxuICAgIGhhbmRsZXMuZm9yRWFjaChoYW5kbGUgPT4ge1xyXG4gICAgICBjdHguZmlsbFJlY3QoaGFuZGxlLngsIGhhbmRsZS55LCBoYW5kbGVTaXplLCBoYW5kbGVTaXplKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcmVjdCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB4ID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcclxuICAgIGNvbnN0IHkgPSBldmVudC5jbGllbnRZIC0gcmVjdC50b3A7XHJcblxyXG4gICAgY29uc3QgaGFuZGxlID0gdGhpcy5nZXRSZXNpemVIYW5kbGUoeCwgeSk7XHJcbiAgICBpZiAoaGFuZGxlKSB7XHJcbiAgICAgIHRoaXMuaXNSZXNpemluZyA9IHRydWU7XHJcbiAgICAgIHRoaXMucmVzaXplSGFuZGxlID0gaGFuZGxlO1xyXG4gICAgICB0aGlzLmRyYWdTdGFydCA9IHsgeCwgeSB9O1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmlzSW5zaWRlQ3JvcEFyZWEoeCwgeSkpIHtcclxuICAgICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcclxuICAgICAgdGhpcy5kcmFnU3RhcnQgPSB7IHg6IHggLSB0aGlzLmNyb3BBcmVhLngsIHk6IHkgLSB0aGlzLmNyb3BBcmVhLnkgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uTW91c2VNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaXNEcmFnZ2luZyAmJiAhdGhpcy5pc1Jlc2l6aW5nKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcmVjdCA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB4ID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcclxuICAgIGNvbnN0IHkgPSBldmVudC5jbGllbnRZIC0gcmVjdC50b3A7XHJcblxyXG4gICAgaWYgKHRoaXMuaXNEcmFnZ2luZykge1xyXG4gICAgICB0aGlzLm1vdmVDcm9wQXJlYSh4IC0gdGhpcy5kcmFnU3RhcnQueCwgeSAtIHRoaXMuZHJhZ1N0YXJ0LnkpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmlzUmVzaXppbmcpIHtcclxuICAgICAgdGhpcy5yZXNpemVDcm9wQXJlYSh4LCB5KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRyYXdJbWFnZSgpO1xyXG4gICAgdGhpcy5jcm9wQXJlYUNoYW5nZWQuZW1pdCh0aGlzLmNyb3BBcmVhKTtcclxuICB9XHJcblxyXG4gIG9uTW91c2VVcCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc1Jlc2l6aW5nID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBtb3ZlQ3JvcEFyZWEoeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY2FudmFzUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB0aGlzLmNyb3BBcmVhLnggPSBNYXRoLm1heCgwLCBNYXRoLm1pbih4LCBjYW52YXMud2lkdGggLSB0aGlzLmNyb3BBcmVhLndpZHRoKSk7XHJcbiAgICB0aGlzLmNyb3BBcmVhLnkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbih5LCBjYW52YXMuaGVpZ2h0IC0gdGhpcy5jcm9wQXJlYS5oZWlnaHQpKTtcclxuICB9XHJcblxyXG4gIHJlc2l6ZUNyb3BBcmVhKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCBkZWx0YVggPSB4IC0gdGhpcy5kcmFnU3RhcnQueDtcclxuICAgIGNvbnN0IGRlbHRhWSA9IHkgLSB0aGlzLmRyYWdTdGFydC55O1xyXG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICBsZXQgbmV3WCA9IHRoaXMuY3JvcEFyZWEueDtcclxuICAgIGxldCBuZXdZID0gdGhpcy5jcm9wQXJlYS55O1xyXG4gICAgbGV0IG5ld1dpZHRoID0gdGhpcy5jcm9wQXJlYS53aWR0aDtcclxuICAgIGxldCBuZXdIZWlnaHQgPSB0aGlzLmNyb3BBcmVhLmhlaWdodDtcclxuXHJcbiAgICAvLyBIYW5kbGUgZGlmZmVyZW50IHJlc2l6ZSBkaXJlY3Rpb25zXHJcbiAgICBpZiAodGhpcy5yZXNpemVIYW5kbGUuaW5jbHVkZXMoJ3cnKSkge1xyXG4gICAgICBuZXdYICs9IGRlbHRhWDtcclxuICAgICAgbmV3V2lkdGggLT0gZGVsdGFYO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucmVzaXplSGFuZGxlLmluY2x1ZGVzKCdlJykpIHtcclxuICAgICAgbmV3V2lkdGggKz0gZGVsdGFYO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucmVzaXplSGFuZGxlLmluY2x1ZGVzKCduJykpIHtcclxuICAgICAgbmV3WSArPSBkZWx0YVk7XHJcbiAgICAgIG5ld0hlaWdodCAtPSBkZWx0YVk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5yZXNpemVIYW5kbGUuaW5jbHVkZXMoJ3MnKSkge1xyXG4gICAgICBuZXdIZWlnaHQgKz0gZGVsdGFZO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1haW50YWluIGFzcGVjdCByYXRpbyBpZiBzZXRcclxuICAgIGlmICh0aGlzLmFzcGVjdFJhdGlvKSB7XHJcbiAgICAgIGlmICh0aGlzLnJlc2l6ZUhhbmRsZS5pbmNsdWRlcygndycpIHx8IHRoaXMucmVzaXplSGFuZGxlLmluY2x1ZGVzKCdlJykpIHtcclxuICAgICAgICBuZXdIZWlnaHQgPSBuZXdXaWR0aCAvIHRoaXMuYXNwZWN0UmF0aW87XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV3V2lkdGggPSBuZXdIZWlnaHQgKiB0aGlzLmFzcGVjdFJhdGlvO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXBwbHkgY29uc3RyYWludHNcclxuICAgIGlmIChuZXdXaWR0aCA+PSB0aGlzLm1pbkNyb3BTaXplICYmIG5ld0hlaWdodCA+PSB0aGlzLm1pbkNyb3BTaXplICYmXHJcbiAgICAgICAgbmV3WCA+PSAwICYmIG5ld1kgPj0gMCAmJlxyXG4gICAgICAgIG5ld1ggKyBuZXdXaWR0aCA8PSBjYW52YXMud2lkdGggJiYgbmV3WSArIG5ld0hlaWdodCA8PSBjYW52YXMuaGVpZ2h0KSB7XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLmNyb3BBcmVhID0geyB4OiBuZXdYLCB5OiBuZXdZLCB3aWR0aDogbmV3V2lkdGgsIGhlaWdodDogbmV3SGVpZ2h0IH07XHJcbiAgICAgIHRoaXMuZHJhZ1N0YXJ0ID0geyB4LCB5IH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRSZXNpemVIYW5kbGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgeyB4OiBjeCwgeTogY3ksIHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMuY3JvcEFyZWE7XHJcbiAgICBjb25zdCBoYW5kbGVTaXplID0gMTA7XHJcbiAgICBjb25zdCBoYW5kbGVzOiB7IFtrZXk6IHN0cmluZ106IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB9ID0ge1xyXG4gICAgICBudzogeyB4OiBjeCwgeTogY3kgfSxcclxuICAgICAgbjogeyB4OiBjeCArIHdpZHRoIC8gMiwgeTogY3kgfSxcclxuICAgICAgbmU6IHsgeDogY3ggKyB3aWR0aCwgeTogY3kgfSxcclxuICAgICAgZTogeyB4OiBjeCArIHdpZHRoLCB5OiBjeSArIGhlaWdodCAvIDIgfSxcclxuICAgICAgc2U6IHsgeDogY3ggKyB3aWR0aCwgeTogY3kgKyBoZWlnaHQgfSxcclxuICAgICAgczogeyB4OiBjeCArIHdpZHRoIC8gMiwgeTogY3kgKyBoZWlnaHQgfSxcclxuICAgICAgc3c6IHsgeDogY3gsIHk6IGN5ICsgaGVpZ2h0IH0sXHJcbiAgICAgIHc6IHsgeDogY3gsIHk6IGN5ICsgaGVpZ2h0IC8gMiB9XHJcbiAgICB9O1xyXG5cclxuICAgIGZvciAoY29uc3QgW2tleSwgcG9zXSBvZiBPYmplY3QuZW50cmllcyhoYW5kbGVzKSkge1xyXG4gICAgICBpZiAoTWF0aC5hYnMoeCAtIHBvcy54KSA8PSBoYW5kbGVTaXplIC8gMiAmJiBNYXRoLmFicyh5IC0gcG9zLnkpIDw9IGhhbmRsZVNpemUgLyAyKSB7XHJcbiAgICAgICAgcmV0dXJuIGtleTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuXHJcbiAgaXNJbnNpZGVDcm9wQXJlYSh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgeyB4OiBjeCwgeTogY3ksIHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMuY3JvcEFyZWE7XHJcbiAgICByZXR1cm4geCA+PSBjeCAmJiB4IDw9IGN4ICsgd2lkdGggJiYgeSA+PSBjeSAmJiB5IDw9IGN5ICsgaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgcm90YXRlKGRlZ3JlZXM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9ICh0aGlzLnJvdGF0aW9uICsgZGVncmVlcykgJSAzNjA7XHJcbiAgICB0aGlzLmRyYXdJbWFnZSgpO1xyXG4gIH1cclxuXHJcbiAgem9vbShkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLnNjYWxlID0gTWF0aC5tYXgoMC4xLCBNYXRoLm1pbigzLCB0aGlzLnNjYWxlICsgZGVsdGEpKTtcclxuICAgIHRoaXMuZHJhd0ltYWdlKCk7XHJcbiAgfVxyXG5cclxuICByZXNldCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2NhbGUgPSAxO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9IDA7XHJcbiAgICB0aGlzLmluaXRpYWxpemVDcm9wQXJlYSgpO1xyXG4gICAgdGhpcy5kcmF3SW1hZ2UoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNyb3AoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBpZiAoIXRoaXMuaW1hZ2UgfHwgIXRoaXMuY3JvcENhbnZhc1JlZikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGNyb3BDYW52YXMgPSB0aGlzLmNyb3BDYW52YXNSZWYubmF0aXZlRWxlbWVudDtcclxuICAgIGNvbnN0IGN0eCA9IGNyb3BDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIGlmICghY3R4KSByZXR1cm47XHJcblxyXG4gICAgY3JvcENhbnZhcy53aWR0aCA9IHRoaXMub3V0cHV0V2lkdGg7XHJcbiAgICBjcm9wQ2FudmFzLmhlaWdodCA9IHRoaXMub3V0cHV0SGVpZ2h0O1xyXG5cclxuICAgIC8vIENhbGN1bGF0ZSBzb3VyY2UgY3JvcCBhcmVhXHJcbiAgICBjb25zdCBzY2FsZVggPSB0aGlzLmltYWdlLndpZHRoIC8gdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC53aWR0aDtcclxuICAgIGNvbnN0IHNjYWxlWSA9IHRoaXMuaW1hZ2UuaGVpZ2h0IC8gdGhpcy5jYW52YXNSZWYubmF0aXZlRWxlbWVudC5oZWlnaHQ7XHJcblxyXG4gICAgY29uc3Qgc291cmNlWCA9IHRoaXMuY3JvcEFyZWEueCAqIHNjYWxlWDtcclxuICAgIGNvbnN0IHNvdXJjZVkgPSB0aGlzLmNyb3BBcmVhLnkgKiBzY2FsZVk7XHJcbiAgICBjb25zdCBzb3VyY2VXaWR0aCA9IHRoaXMuY3JvcEFyZWEud2lkdGggKiBzY2FsZVg7XHJcbiAgICBjb25zdCBzb3VyY2VIZWlnaHQgPSB0aGlzLmNyb3BBcmVhLmhlaWdodCAqIHNjYWxlWTtcclxuXHJcbiAgICBjdHguZHJhd0ltYWdlKFxyXG4gICAgICB0aGlzLmltYWdlLFxyXG4gICAgICBzb3VyY2VYLFxyXG4gICAgICBzb3VyY2VZLFxyXG4gICAgICBzb3VyY2VXaWR0aCxcclxuICAgICAgc291cmNlSGVpZ2h0LFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICB0aGlzLm91dHB1dFdpZHRoLFxyXG4gICAgICB0aGlzLm91dHB1dEhlaWdodFxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBtaW1lVHlwZSA9IGBpbWFnZS8ke3RoaXMub3V0cHV0Rm9ybWF0fWA7XHJcbiAgICBjb25zdCBkYXRhVXJsID0gY3JvcENhbnZhcy50b0RhdGFVUkwobWltZVR5cGUsIHRoaXMub3V0cHV0UXVhbGl0eSk7XHJcblxyXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IG5ldyBQcm9taXNlPEJsb2IgfCBudWxsPihyZXNvbHZlID0+IHtcclxuICAgICAgY3JvcENhbnZhcy50b0Jsb2IocmVzb2x2ZSwgbWltZVR5cGUsIHRoaXMub3V0cHV0UXVhbGl0eSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCByZXN1bHQ6IENyb3BSZXN1bHQgPSB7XHJcbiAgICAgIGRhdGFVcmwsXHJcbiAgICAgIGJsb2IsXHJcbiAgICAgIHdpZHRoOiB0aGlzLm91dHB1dFdpZHRoLFxyXG4gICAgICBoZWlnaHQ6IHRoaXMub3V0cHV0SGVpZ2h0XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuaW1hZ2VDcm9wcGVkLmVtaXQocmVzdWx0KTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUZpbGVJbnB1dChldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlucHV0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBpZiAoaW5wdXQuZmlsZXMgJiYgaW5wdXQuZmlsZXNbMF0pIHtcclxuICAgICAgY29uc3QgZmlsZSA9IGlucHV0LmZpbGVzWzBdO1xyXG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICByZWFkZXIub25sb2FkID0gKGUpID0+IHtcclxuICAgICAgICBpZiAoZS50YXJnZXQ/LnJlc3VsdCkge1xyXG4gICAgICAgICAgdGhpcy5sb2FkSW1hZ2UoZS50YXJnZXQucmVzdWx0IGFzIHN0cmluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cImltYWdlLWNyb3BwZXItd3JhcHBlclwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxyXG4gIDwhLS0gRmlsZSBJbnB1dCAtLT5cclxuICA8ZGl2IGNsYXNzPVwiY3JvcHBlci11cGxvYWRcIiAqbmdJZj1cIiFpbWFnZVVybFwiPlxyXG4gICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgI2ZpbGVJbnB1dCAoY2hhbmdlKT1cImhhbmRsZUZpbGVJbnB1dCgkZXZlbnQpXCIgYWNjZXB0PVwiaW1hZ2UvKlwiIGhpZGRlbiAvPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cInVwbG9hZC1idG5cIiAoY2xpY2spPVwiZmlsZUlucHV0LmNsaWNrKClcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cclxuICAgICAg8J+TgSBTZWxlY2lvbmFyIEltYWdlbVxyXG4gICAgPC9idXR0b24+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDwhLS0gQ3JvcHBlciBBcmVhIC0tPlxyXG4gIDxkaXYgY2xhc3M9XCJjcm9wcGVyLWNvbnRhaW5lclwiICpuZ0lmPVwiaW1hZ2VVcmxcIj5cclxuICAgIDxjYW52YXNcclxuICAgICAgI2NhbnZhc1xyXG4gICAgICB3aWR0aD1cIjYwMFwiXHJcbiAgICAgIGhlaWdodD1cIjQwMFwiXHJcbiAgICAgIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50KVwiXHJcbiAgICAgIChtb3VzZW1vdmUpPVwib25Nb3VzZU1vdmUoJGV2ZW50KVwiXHJcbiAgICAgIChtb3VzZXVwKT1cIm9uTW91c2VVcCgpXCJcclxuICAgICAgKG1vdXNlbGVhdmUpPVwib25Nb3VzZVVwKClcIj5cclxuICAgIDwvY2FudmFzPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8IS0tIEhpZGRlbiBjYW52YXMgZm9yIGNyb3Agb3V0cHV0IC0tPlxyXG4gIDxjYW52YXMgI2Nyb3BDYW52YXMgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPjwvY2FudmFzPlxyXG5cclxuICA8IS0tIENvbnRyb2xzIC0tPlxyXG4gIDxkaXYgY2xhc3M9XCJjcm9wcGVyLWNvbnRyb2xzXCIgKm5nSWY9XCJpbWFnZVVybFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbnRyb2wtZ3JvdXBcIj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImNvbnRyb2wtYnRuXCIgKGNsaWNrKT1cInJvdGF0ZSgtOTApXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgdGl0bGU9XCJSb3RhY2lvbmFyIC05MMKwXCI+XHJcbiAgICAgICAg4oa6XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiY29udHJvbC1idG5cIiAoY2xpY2spPVwicm90YXRlKDkwKVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIHRpdGxlPVwiUm90YWNpb25hciArOTDCsFwiPlxyXG4gICAgICAgIOKGu1xyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJjb250cm9sLWdyb3VwXCI+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJjb250cm9sLWJ0blwiIChjbGljayk9XCJ6b29tKC0wLjEpXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgdGl0bGU9XCJab29tIE91dFwiPlxyXG4gICAgICAgIPCflI0tXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiY29udHJvbC1idG5cIiAoY2xpY2spPVwiem9vbSgwLjEpXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgdGl0bGU9XCJab29tIEluXCI+XHJcbiAgICAgICAg8J+UjStcclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiY29udHJvbC1ncm91cFwiPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiY29udHJvbC1idG5cIiAoY2xpY2spPVwicmVzZXQoKVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIHRpdGxlPVwiUmVzZXRcIj5cclxuICAgICAgICDwn5SEXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImNvbnRyb2wtZ3JvdXBcIj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImNvbnRyb2wtYnRuIGNvbnRyb2wtYnRuLS1wcmltYXJ5XCIgKGNsaWNrKT1cImNyb3AoKVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxyXG4gICAgICAgIOKcgu+4jyBDb3J0YXIgSW1hZ2VtXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDwhLS0gSW5mbyAtLT5cclxuICA8ZGl2IGNsYXNzPVwiY3JvcHBlci1pbmZvXCIgKm5nSWY9XCJpbWFnZVVybFwiPlxyXG4gICAgPHNtYWxsPkVzY2FsYToge3sgKHNjYWxlICogMTAwKS50b0ZpeGVkKDApIH19JSB8IFJvdGHDp8Ojbzoge3sgcm90YXRpb24gfX3CsDwvc21hbGw+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=