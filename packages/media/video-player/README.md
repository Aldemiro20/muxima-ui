# Video Player

Componente de player de vídeo com controles personalizados, legendas e múltiplas qualidades.

## Instalação

```bash
npm install @muxima-ui/video-player
```

## Uso

```typescript
import { VideoPlayerComponent } from '@muxima-ui/video-player';

@Component({
  standalone: true,
  imports: [VideoPlayerComponent],
  template: `
    <muxima-video-player
      [sources]="videoSources"
      [subtitles]="subtitles"
      [config]="config">
    </muxima-video-player>
  `
})
export class MyComponent {
  videoSources = [
    { src: 'video-720p.mp4', type: 'video/mp4', quality: '720p' },
    { src: 'video-1080p.mp4', type: 'video/mp4', quality: '1080p' }
  ];

  subtitles = [
    { src: 'pt-br.vtt', srclang: 'pt-BR', label: 'Português' }
  ];

  config = {
    autoplay: false,
    loop: false,
    muted: false
  };
}
```

## Licença

MIT
