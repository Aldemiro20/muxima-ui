import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SignatureOptions {
  penColor?: string;
  backgroundColor?: string;
  lineWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  velocityFilterWeight?: number;
}

@Component({
  selector: 'muxima-signature-pad',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignaturePadComponent),
      multi: true
    }
  ],
  template: `
    <div class="signature-pad-container">
      <div class="signature-header" *ngIf="showHeader">
        <h3>{{ title }}</h3>
        <p *ngIf="subtitle">{{ subtitle }}</p>
      </div>

      <div class="canvas-wrapper" [style.height.px]="height">
        <canvas 
          #canvas
          [attr.width]="width"
          [attr.height]="height"
          (mousedown)="startDrawing($event)"
          (mousemove)="draw($event)"
          (mouseup)="stopDrawing()"
          (mouseleave)="stopDrawing()"
          (touchstart)="handleTouchStart($event)"
          (touchmove)="handleTouchMove($event)"
          (touchend)="stopDrawing()"
          [class.disabled]="disabled">
        </canvas>

        <div class="signature-placeholder" *ngIf="isEmpty && !disabled">
          <span>✍️ {{ placeholder }}</span>
        </div>

        <div class="signature-overlay" *ngIf="disabled"></div>
      </div>

      <div class="signature-actions" *ngIf="!disabled">
        <button type="button" class="btn-clear" (click)="clear()" [disabled]="isEmpty">
          🗑️ Limpar
        </button>
        <button type="button" class="btn-undo" (click)="undo()" [disabled]="isEmpty">
          ↶ Desfazer
        </button>
        <button type="button" class="btn-save" (click)="save()" [disabled]="isEmpty">
          💾 Salvar
        </button>
      </div>

      <div class="signature-info" *ngIf="showInfo && !isEmpty">
        <small>✓ Assinado por {{ signerName || 'Usuário' }}</small>
        <small *ngIf="timestamp">📅 {{ timestamp | date:'dd/MM/yyyy HH:mm' }}</small>
      </div>
    </div>
  `,
  styles: [`
    .signature-pad-container {
      max-width: 600px;
      margin: 0 auto;
    }

    .signature-header {
      margin-bottom: 16px;

      h3 {
        font-size: 20px;
        font-weight: 700;
        color: #374151;
        margin-bottom: 4px;
      }

      p {
        font-size: 14px;
        color: #6b7280;
      }
    }

    .canvas-wrapper {
      position: relative;
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: border-color 0.2s;

      &:hover {
        border-color: #667eea;
      }

      canvas {
        display: block;
        width: 100%;
        height: 100%;
        cursor: crosshair;
        touch-action: none;

        &.disabled {
          cursor: not-allowed;
        }
      }
    }

    .signature-placeholder {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      color: #9ca3af;
      font-size: 16px;
      font-style: italic;
      text-align: center;

      span {
        display: block;
        animation: pulse 2s ease-in-out infinite;
      }
    }

    .signature-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.7);
      cursor: not-allowed;
    }

    .signature-actions {
      display: flex;
      gap: 12px;
      margin-top: 16px;
      justify-content: center;
    }

    .btn-clear,
    .btn-undo,
    .btn-save {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .btn-clear {
      background: #fee2e2;
      color: #991b1b;

      &:hover:not(:disabled) {
        background: #fecaca;
      }
    }

    .btn-undo {
      background: #fef3c7;
      color: #92400e;

      &:hover:not(:disabled) {
        background: #fde68a;
      }
    }

    .btn-save {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      }
    }

    .signature-info {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      padding: 12px;
      background: #f0fdf4;
      border-radius: 8px;
      border-left: 4px solid #10b981;

      small {
        font-size: 12px;
        color: #065f46;
      }
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `]
})
export class SignaturePadComponent implements AfterViewInit, ControlValueAccessor {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  @Input() width = 600;
  @Input() height = 300;
  @Input() penColor = '#000000';
  @Input() backgroundColor = '#ffffff';
  @Input() lineWidth = 2;
  @Input() disabled = false;
  @Input() title = 'Assinatura Digital';
  @Input() subtitle = 'Assine no espaço abaixo';
  @Input() placeholder = 'Assine aqui com o mouse ou toque';
  @Input() showHeader = true;
  @Input() showInfo = true;
  @Input() signerName = '';

  @Output() signatureChange = new EventEmitter<string>();
  @Output() signatureSaved = new EventEmitter<string>();

  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  private lastX = 0;
  private lastY = 0;
  private strokes: ImageData[] = [];
  isEmpty = true;
  timestamp: Date | null = null;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  ngAfterViewInit() {
    this.initCanvas();
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      this.ctx = ctx;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.strokeStyle = this.penColor;
      this.ctx.lineWidth = this.lineWidth;
      this.clearCanvas();
    }
  }

  private clearCanvas() {
    if (this.ctx) {
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
  }

  startDrawing(event: MouseEvent) {
    if (this.disabled) return;
    
    this.isDrawing = true;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.lastX = event.clientX - rect.left;
    this.lastY = event.clientY - rect.top;
    this.saveStroke();
  }

  draw(event: MouseEvent) {
    if (!this.isDrawing || this.disabled) return;
    
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const currentX = event.clientX - rect.left;
    const currentY = event.clientY - rect.top;

    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;
    this.isEmpty = false;
  }

  stopDrawing() {
    if (this.isDrawing) {
      this.isDrawing = false;
      this.timestamp = new Date();
      const dataUrl = this.getDataUrl();
      this.signatureChange.emit(dataUrl);
      this.onChange(dataUrl);
    }
  }

  handleTouchStart(event: TouchEvent) {
    event.preventDefault();
    if (this.disabled) return;
    
    const touch = event.touches[0];
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.isDrawing = true;
    this.lastX = touch.clientX - rect.left;
    this.lastY = touch.clientY - rect.top;
    this.saveStroke();
  }

  handleTouchMove(event: TouchEvent) {
    event.preventDefault();
    if (!this.isDrawing || this.disabled) return;
    
    const touch = event.touches[0];
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const currentX = touch.clientX - rect.left;
    const currentY = touch.clientY - rect.top;

    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;
    this.isEmpty = false;
  }

  private saveStroke() {
    const imageData = this.ctx.getImageData(0, 0, this.width, this.height);
    this.strokes.push(imageData);
    
    // Limit history to 20 strokes
    if (this.strokes.length > 20) {
      this.strokes.shift();
    }
  }

  clear() {
    this.clearCanvas();
    this.strokes = [];
    this.isEmpty = true;
    this.timestamp = null;
    this.signatureChange.emit('');
    this.onChange('');
  }

  undo() {
    if (this.strokes.length > 0) {
      this.strokes.pop();
      
      if (this.strokes.length > 0) {
        const lastStroke = this.strokes[this.strokes.length - 1];
        this.ctx.putImageData(lastStroke, 0, 0);
      } else {
        this.clearCanvas();
        this.isEmpty = true;
      }
      
      const dataUrl = this.isEmpty ? '' : this.getDataUrl();
      this.signatureChange.emit(dataUrl);
      this.onChange(dataUrl);
    }
  }

  save() {
    const dataUrl = this.getDataUrl();
    this.signatureSaved.emit(dataUrl);
    this.onTouched();
  }

  getDataUrl(type = 'image/png'): string {
    return this.canvasRef.nativeElement.toDataURL(type);
  }

  getBlob(callback: (blob: Blob | null) => void, type = 'image/png') {
    this.canvasRef.nativeElement.toBlob(callback, type);
  }

  loadSignature(dataUrl: string) {
    const img = new Image();
    img.onload = () => {
      this.clearCanvas();
      this.ctx.drawImage(img, 0, 0);
      this.isEmpty = false;
      this.saveStroke();
    };
    img.src = dataUrl;
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    if (value) {
      this.loadSignature(value);
    } else {
      this.clear();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
