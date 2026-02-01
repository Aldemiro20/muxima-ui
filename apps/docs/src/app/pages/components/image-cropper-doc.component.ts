import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageCropperComponent, CropResult } from '@muxima-ui/image-cropper';

@Component({
  selector: 'app-image-cropper-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, ImageCropperComponent],
  templateUrl: './image-cropper-doc.component.html',
  styleUrls: ['./image-cropper-doc.component.scss']
})
export class ImageCropperDocComponent {
  // Example 1: Basic usage
  imageUrl1 = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800';
  croppedImage1: string | null = null;

  // Example 2: Aspect ratios
  imageUrl2 = 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800';
  aspectRatio: number | undefined = 1;
  aspectRatios = [
    { label: 'Livre', value: undefined },
    { label: 'Quadrado (1:1)', value: 1 },
    { label: 'Retrato (3:4)', value: 3/4 },
    { label: 'Paisagem (16:9)', value: 16/9 },
    { label: 'Paisagem (4:3)', value: 4/3 }
  ];

  // Example 3: Output configuration
  imageUrl3 = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800';
  outputWidth = 400;
  outputHeight = 400;
  outputFormat: 'png' | 'jpeg' | 'webp' = 'jpeg';
  outputQuality = 0.9;
  croppedImage3: string | null = null;

  // Example 4: Upload custom image
  uploadedImage: string | null = null;
  croppedUpload: string | null = null;

  // Playground
  playgroundImage = 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800';
  playgroundCropped: string | null = null;
  playgroundAspectRatio: number | undefined = undefined;
  playgroundOutputWidth = 600;
  playgroundOutputHeight = 400;
  playgroundOutputFormat: 'png' | 'jpeg' | 'webp' = 'png';
  playgroundOutputQuality = 0.92;

  // Code examples
  basicUsageCode = `<muxima-image-cropper
  [imageUrl]="imageUrl"
  (imageCropped)="onImageCropped($event)">
</muxima-image-cropper>`;

  aspectRatioCode = `<muxima-image-cropper
  [imageUrl]="imageUrl"
  [aspectRatio]="16/9"
  (imageCropped)="onImageCropped($event)">
</muxima-image-cropper>`;

  outputConfigCode = `<muxima-image-cropper
  [imageUrl]="imageUrl"
  [outputWidth]="800"
  [outputHeight]="600"
  [outputFormat]="'jpeg'"
  [outputQuality]="0.85"
  (imageCropped)="onImageCropped($event)">
</muxima-image-cropper>`;

  componentCode = `import { Component } from '@angular/core';
import { ImageCropperComponent, CropResult } from '@muxima-ui/image-cropper';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [ImageCropperComponent],
  template: \\\`
    <muxima-image-cropper
      [imageUrl]="imageUrl"
      [aspectRatio]="1"
      [outputWidth]="400"
      [outputHeight]="400"
      (imageCropped)="onImageCropped($event)">
    </muxima-image-cropper>

    <img *ngIf="croppedImage" [src]="croppedImage" alt="Cropped">
  \\\`
})
export class MyComponent {
  imageUrl = 'https://example.com/image.jpg';
  croppedImage: string | null = null;

  onImageCropped(result: CropResult) {
    this.croppedImage = result.dataUrl;
    console.log('Dimensions:', result.width, 'x', result.height);
  }
}`;

  interfaceCode = `interface CropResult {
  dataUrl: string;    // Data URL da imagem cortada
  blob: Blob | null;  // Blob da imagem cortada
  width: number;      // Largura em pixels
  height: number;     // Altura em pixels
}`;

  onImageCropped1(result: CropResult) {
    this.croppedImage1 = result.dataUrl;
  }

  onImageCropped3(result: CropResult) {
    this.croppedImage3 = result.dataUrl;
  }

  onUploadCropped(result: CropResult) {
    this.croppedUpload = result.dataUrl;
  }

  onPlaygroundCropped(result: CropResult) {
    this.playgroundCropped = result.dataUrl;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImage = e.target?.result as string;
        this.croppedUpload = null;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  downloadCroppedImage(imageUrl: string) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `cropped-image-${Date.now()}.${this.outputFormat}`;
    link.click();
  }

  downloadPlaygroundImage() {
    if (this.playgroundCropped) {
      const link = document.createElement('a');
      link.href = this.playgroundCropped;
      link.download = `cropped-image-${Date.now()}.${this.playgroundOutputFormat}`;
      link.click();
    }
  }
}
