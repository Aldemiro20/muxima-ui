import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CropResult {
  dataUrl: string;
  blob: Blob | null;
  width: number;
  height: number;
}

@Component({
  selector: 'muxima-image-cropper',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('cropCanvas', { static: false }) cropCanvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() imageUrl: string = '';
  @Input() aspectRatio?: number; // undefined = free, 1 = square, 16/9, 4/3, etc
  @Input() outputWidth: number = 800;
  @Input() outputHeight: number = 600;
  @Input() outputFormat: 'png' | 'jpeg' | 'webp' = 'png';
  @Input() outputQuality: number = 0.9;
  @Input() disabled: boolean = false;
  @Input() showGrid: boolean = true;
  @Input() minCropSize: number = 50;

  @Output() imageCropped = new EventEmitter<CropResult>();
  @Output() imageLoaded = new EventEmitter<HTMLImageElement>();
  @Output() cropAreaChanged = new EventEmitter<CropArea>();

  image: HTMLImageElement | null = null;
  cropArea: CropArea = { x: 50, y: 50, width: 200, height: 200 };
  scale: number = 1;
  rotation: number = 0;
  isDragging: boolean = false;
  isResizing: boolean = false;
  resizeHandle: string = '';
  dragStart = { x: 0, y: 0 };

  ngAfterViewInit() {
    if (this.imageUrl) {
      this.loadImage(this.imageUrl);
    }
  }

  loadImage(url: string): void {
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

  initializeCropArea(): void {
    if (!this.image) return;

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

  drawImage(): void {
    if (!this.image || !this.canvasRef) return;

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

  drawCropArea(ctx: CanvasRenderingContext2D): void {
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

  drawResizeHandles(ctx: CanvasRenderingContext2D): void {
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

  onMouseDown(event: MouseEvent): void {
    if (this.disabled) return;

    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const handle = this.getResizeHandle(x, y);
    if (handle) {
      this.isResizing = true;
      this.resizeHandle = handle;
      this.dragStart = { x, y };
    } else if (this.isInsideCropArea(x, y)) {
      this.isDragging = true;
      this.dragStart = { x: x - this.cropArea.x, y: y - this.cropArea.y };
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging && !this.isResizing) return;

    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (this.isDragging) {
      this.moveCropArea(x - this.dragStart.x, y - this.dragStart.y);
    } else if (this.isResizing) {
      this.resizeCropArea(x, y);
    }

    this.drawImage();
    this.cropAreaChanged.emit(this.cropArea);
  }

  onMouseUp(): void {
    this.isDragging = false;
    this.isResizing = false;
  }

  moveCropArea(x: number, y: number): void {
    const canvas = this.canvasRef.nativeElement;
    this.cropArea.x = Math.max(0, Math.min(x, canvas.width - this.cropArea.width));
    this.cropArea.y = Math.max(0, Math.min(y, canvas.height - this.cropArea.height));
  }

  resizeCropArea(x: number, y: number): void {
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
      } else {
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

  getResizeHandle(x: number, y: number): string {
    const { x: cx, y: cy, width, height } = this.cropArea;
    const handleSize = 10;
    const handles: { [key: string]: { x: number; y: number } } = {
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

  isInsideCropArea(x: number, y: number): boolean {
    const { x: cx, y: cy, width, height } = this.cropArea;
    return x >= cx && x <= cx + width && y >= cy && y <= cy + height;
  }

  rotate(degrees: number): void {
    this.rotation = (this.rotation + degrees) % 360;
    this.drawImage();
  }

  zoom(delta: number): void {
    this.scale = Math.max(0.1, Math.min(3, this.scale + delta));
    this.drawImage();
  }

  reset(): void {
    this.scale = 1;
    this.rotation = 0;
    this.initializeCropArea();
    this.drawImage();
  }

  async crop(): Promise<void> {
    if (!this.image || !this.cropCanvasRef) return;

    const cropCanvas = this.cropCanvasRef.nativeElement;
    const ctx = cropCanvas.getContext('2d');
    if (!ctx) return;

    cropCanvas.width = this.outputWidth;
    cropCanvas.height = this.outputHeight;

    // Calculate source crop area
    const scaleX = this.image.width / this.canvasRef.nativeElement.width;
    const scaleY = this.image.height / this.canvasRef.nativeElement.height;

    const sourceX = this.cropArea.x * scaleX;
    const sourceY = this.cropArea.y * scaleY;
    const sourceWidth = this.cropArea.width * scaleX;
    const sourceHeight = this.cropArea.height * scaleY;

    ctx.drawImage(
      this.image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      this.outputWidth,
      this.outputHeight
    );

    const mimeType = `image/${this.outputFormat}`;
    const dataUrl = cropCanvas.toDataURL(mimeType, this.outputQuality);

    const blob = await new Promise<Blob | null>(resolve => {
      cropCanvas.toBlob(resolve, mimeType, this.outputQuality);
    });

    const result: CropResult = {
      dataUrl,
      blob,
      width: this.outputWidth,
      height: this.outputHeight
    };

    this.imageCropped.emit(result);
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.loadImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
