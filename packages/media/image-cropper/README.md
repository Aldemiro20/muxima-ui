# Image Cropper

Componente de crop de imagens com zoom, rotação e preview em tempo real.

## Instalação

```bash
npm install @muxima-ui/image-cropper
```

## Uso

```typescript
import { ImageCropperComponent } from '@muxima-ui/image-cropper';

@Component({
  standalone: true,
  imports: [ImageCropperComponent],
  template: `
    <muxima-image-cropper
      [imageUrl]="imageUrl"
      (imageCropped)="onImageCropped($event)">
    </muxima-image-cropper>
  `
})
export class MyComponent {
  onImageCropped(result: CropResult) {
    console.log('Imagem cortada:', result);
  }
}
```

## Licença

MIT
