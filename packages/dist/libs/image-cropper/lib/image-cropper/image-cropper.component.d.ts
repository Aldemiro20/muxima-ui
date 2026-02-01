import { EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import * as i0 from "@angular/core";
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
export declare class ImageCropperComponent implements AfterViewInit {
    canvasRef: ElementRef<HTMLCanvasElement>;
    cropCanvasRef: ElementRef<HTMLCanvasElement>;
    imageUrl: string;
    aspectRatio?: number;
    outputWidth: number;
    outputHeight: number;
    outputFormat: 'png' | 'jpeg' | 'webp';
    outputQuality: number;
    disabled: boolean;
    showGrid: boolean;
    minCropSize: number;
    imageCropped: EventEmitter<CropResult>;
    imageLoaded: EventEmitter<HTMLImageElement>;
    cropAreaChanged: EventEmitter<CropArea>;
    image: HTMLImageElement | null;
    cropArea: CropArea;
    scale: number;
    rotation: number;
    isDragging: boolean;
    isResizing: boolean;
    resizeHandle: string;
    dragStart: {
        x: number;
        y: number;
    };
    ngAfterViewInit(): void;
    loadImage(url: string): void;
    initializeCropArea(): void;
    drawImage(): void;
    drawCropArea(ctx: CanvasRenderingContext2D): void;
    drawResizeHandles(ctx: CanvasRenderingContext2D): void;
    onMouseDown(event: MouseEvent): void;
    onMouseMove(event: MouseEvent): void;
    onMouseUp(): void;
    moveCropArea(x: number, y: number): void;
    resizeCropArea(x: number, y: number): void;
    getResizeHandle(x: number, y: number): string;
    isInsideCropArea(x: number, y: number): boolean;
    rotate(degrees: number): void;
    zoom(delta: number): void;
    reset(): void;
    crop(): Promise<void>;
    handleFileInput(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImageCropperComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImageCropperComponent, "muxima-image-cropper", never, { "imageUrl": "imageUrl"; "aspectRatio": "aspectRatio"; "outputWidth": "outputWidth"; "outputHeight": "outputHeight"; "outputFormat": "outputFormat"; "outputQuality": "outputQuality"; "disabled": "disabled"; "showGrid": "showGrid"; "minCropSize": "minCropSize"; }, { "imageCropped": "imageCropped"; "imageLoaded": "imageLoaded"; "cropAreaChanged": "cropAreaChanged"; }, never, never, true, never>;
}
