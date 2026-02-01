# 🚀 Muxima Video Player - Recursos Avançados

## 📋 Índice
- [Picture-in-Picture](#picture-in-picture)
- [Screenshot Capture](#screenshot-capture)
- [Filtros de Vídeo](#filtros-de-vídeo)
- [Theater Mode](#theater-mode)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Gesture Controls](#gesture-controls)
- [Timeline Preview](#timeline-preview)

## 📺 Picture-in-Picture

Permite assistir vídeos em uma janela flutuante enquanto navega em outras abas.

### Ativação

```typescript
config = {
  enablePiP: true
};
```

### Uso Programático

```typescript
<muxima-video-player
  [config]="{ enablePiP: true }"
  (pipToggle)="onPipToggle($event)">
</muxima-video-player>

onPipToggle(isActive: boolean) {
  if (isActive) {
    console.log('PiP ativado');
  } else {
    console.log('PiP desativado');
  }
}
```

### Atalho de Teclado
Pressione **I** para ativar/desativar

## 📸 Screenshot Capture

Capture frames do vídeo em alta qualidade, incluindo os filtros aplicados.

### Ativação

```typescript
config = {
  enableScreenshot: true
};
```

### Capturando Screenshots

```typescript
<muxima-video-player
  [config]="{ enableScreenshot: true }"
  (screenshot)="handleScreenshot($event)">
</muxima-video-player>

handleScreenshot(dataUrl: string) {
  // dataUrl contém a imagem em formato base64
  
  // Exemplo 1: Exibir em um elemento img
  const img = document.getElementById('preview') as HTMLImageElement;
  img.src = dataUrl;
  
  // Exemplo 2: Fazer upload para servidor
  fetch('/api/upload', {
    method: 'POST',
    body: JSON.stringify({ image: dataUrl })
  });
  
  // Exemplo 3: Salvar localmente (já feito automaticamente)
  console.log('Screenshot salvo!');
}
```

### Atalho de Teclado
Pressione **S** para capturar screenshot

## 🎨 Filtros de Vídeo

Ajuste brilho, contraste e saturação em tempo real.

### Uso

Clique no ícone de configurações nos controles do player para acessar:

- **Brilho**: 0% a 200% (padrão: 100%)
- **Contraste**: 0% a 200% (padrão: 100%)
- **Saturação**: 0% a 200% (padrão: 100%)

### Uso Programático

```typescript
import { ViewChild } from '@angular/core';
import { VideoPlayerComponent } from '@muxima-ui/video-player';

@Component({...})
export class MyComponent {
  @ViewChild(VideoPlayerComponent) player!: VideoPlayerComponent;
  
  ajustarFiltros() {
    this.player.setBrightness(120); // Mais claro
    this.player.setContrast(110);   // Mais contraste
    this.player.setSaturation(90);  // Menos saturado
  }
  
  resetarFiltros() {
    this.player.resetFilters();
  }
}
```

## 🎭 Theater Mode

Modo cinema que expande o vídeo para ocupar mais espaço horizontal.

### Uso

Clique no ícone de teatro nos controles do player.

### Atalho de Teclado
Pressione **T** para ativar/desativar

### Programático

```typescript
@ViewChild(VideoPlayerComponent) player!: VideoPlayerComponent;

toggleTheater() {
  this.player.toggleTheaterMode();
}
```

## ⌨️ Keyboard Shortcuts

Lista completa de atalhos de teclado disponíveis.

### Ativação

```typescript
config = {
  enableKeyboardShortcuts: true // padrão: true
};
```

### Lista de Atalhos

#### Reprodução
- **Espaço** ou **K**: Play/Pause
- **J**: Voltar 10 segundos
- **L**: Avançar 10 segundos
- **←**: Voltar 5 segundos
- **→**: Avançar 5 segundos
- **0** ou **Home**: Voltar ao início
- **End**: Ir para o final

#### Volume
- **↑**: Aumentar volume (+10%)
- **↓**: Diminuir volume (-10%)
- **M**: Mudo on/off

#### Visualização
- **F**: Tela cheia
- **T**: Modo teatro
- **I**: Picture-in-Picture

#### Controles
- **C**: Menu de legendas
- **S**: Capturar screenshot
- **>**: Aumentar velocidade
- **<**: Diminuir velocidade

### Desabilitar Atalhos

```typescript
config = {
  enableKeyboardShortcuts: false
};
```

## 👆 Gesture Controls

Controles por gestos touch para dispositivos móveis.

### Ativação

```typescript
config = {
  enableGestures: true
};
```

### Gestos Disponíveis

#### Double Tap Esquerda
Voltar 10 segundos
- Toque rápido duas vezes no terço esquerdo do vídeo

#### Double Tap Direita
Avançar 10 segundos
- Toque rápido duas vezes no terço direito do vídeo

#### Double Tap Centro
Play/Pause
- Toque rápido duas vezes no centro do vídeo

#### Single Tap
Mostrar/Esconder Controles
- Um toque em qualquer lugar do vídeo

### Feedback Visual

Animações aparecem indicando a ação:
- **-10s**: Ao voltar 10 segundos (lado esquerdo)
- **+10s**: Ao avançar 10 segundos (lado direito)

## 🕐 Timeline Preview

Visualize o tempo ao passar o mouse sobre a barra de progresso.

### Funcionalidade

- Passe o mouse sobre a barra de progresso
- Uma tooltip aparece mostrando o tempo correspondente
- Útil para navegar rapidamente pelo vídeo

### Customização

```css
.timeline-preview {
  --preview-bg: rgba(0, 0, 0, 0.9);
  --preview-color: white;
  --preview-border-radius: 6px;
}
```

## 🎯 Exemplo Completo com Todos os Recursos

```typescript
import { Component } from '@angular/core';
import { VideoPlayerComponent } from '@muxima-ui/video-player';

@Component({
  selector: 'app-advanced-player',
  standalone: true,
  imports: [VideoPlayerComponent],
  template: `
    <div class="player-wrapper">
      <muxima-video-player
        [sources]="sources"
        [subtitles]="subtitles"
        [config]="config"
        (play)="onPlay()"
        (pause)="onPause()"
        (screenshot)="onScreenshot($event)"
        (pipToggle)="onPipToggle($event)">
      </muxima-video-player>

      <div class="controls-panel">
        <button (click)="player.captureScreenshot()">
          📸 Screenshot
        </button>
        <button (click)="player.togglePiP()">
          📺 PiP
        </button>
        <button (click)="player.toggleTheaterMode()">
          🎭 Teatro
        </button>
        <button (click)="player.resetFilters()">
          🎨 Reset Filtros
        </button>
      </div>

      <div class="gallery" *ngIf="screenshots.length">
        <h3>Screenshots Capturados</h3>
        <div class="thumbnails">
          <img *ngFor="let shot of screenshots" 
               [src]="shot" 
               (click)="downloadScreenshot(shot)">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .player-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .controls-panel {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .controls-panel button {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
    }

    .controls-panel button:hover {
      opacity: 0.9;
    }

    .gallery {
      margin-top: 2rem;
      padding: 1.5rem;
      background: #f5f5f5;
      border-radius: 12px;
    }

    .thumbnails {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .thumbnails img {
      width: 100%;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .thumbnails img:hover {
      transform: scale(1.05);
    }
  `]
})
export class AdvancedPlayerComponent {
  @ViewChild(VideoPlayerComponent) player!: VideoPlayerComponent;
  
  screenshots: string[] = [];

  sources = [
    { src: 'video-1080p.mp4', type: 'video/mp4', quality: '1080p' },
    { src: 'video-720p.mp4', type: 'video/mp4', quality: '720p' }
  ];

  subtitles = [
    { src: 'pt.vtt', srclang: 'pt', label: 'Português' },
    { src: 'en.vtt', srclang: 'en', label: 'English' }
  ];

  config = {
    enablePiP: true,
    enableScreenshot: true,
    enableKeyboardShortcuts: true,
    enableGestures: true,
    playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2]
  };

  onPlay() {
    console.log('Vídeo reproduzindo');
  }

  onPause() {
    console.log('Vídeo pausado');
  }

  onScreenshot(dataUrl: string) {
    this.screenshots.push(dataUrl);
    console.log('Total de screenshots:', this.screenshots.length);
  }

  onPipToggle(isActive: boolean) {
    console.log('PiP:', isActive ? 'Ativo' : 'Inativo');
  }

  downloadScreenshot(dataUrl: string) {
    const link = document.createElement('a');
    link.download = `screenshot-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  }
}
```

## 🎬 Dicas e Boas Práticas

### Performance

1. **Screenshots**: Capturas são feitas em resolução nativa. Para vídeos 4K, isso pode gerar arquivos grandes.

2. **Filtros**: Aplicados via CSS filter, têm baixo impacto de performance.

3. **PiP**: Consome recursos mínimos do navegador.

### Acessibilidade

- Todos os controles têm `title` attributes
- Suporte completo a teclado
- ARIA labels em elementos interativos

### Mobile

- Gestos funcionam em todos os dispositivos touch
- Controles adaptam-se automaticamente
- Timeline preview otimizada para touch

### Compatibilidade

- **PiP**: Chrome 70+, Edge 79+, Safari 13.1+
- **Screenshot**: Todos os navegadores modernos
- **Gestures**: Touch API universal

## 🔧 Troubleshooting

### PiP não funciona

```typescript
// Verificar suporte
if (!document.pictureInPictureEnabled) {
  console.log('PiP não suportado neste navegador');
}
```

### Screenshots ficam pretos

Isso pode acontecer com vídeos de domínios diferentes (CORS). Solução:

```html
<video crossorigin="anonymous">
  <source src="..." />
</video>
```

### Gestos não respondem

Certifique-se de que `enableGestures` está `true` e o dispositivo suporta touch.

## 📝 Changelog de Recursos Avançados

### v2.0.0
- ✨ Picture-in-Picture
- ✨ Screenshot Capture
- ✨ Filtros de Vídeo (Brilho, Contraste, Saturação)
- ✨ Theater Mode
- ✨ Keyboard Shortcuts completos
- ✨ Gesture Controls (Double tap)
- ✨ Timeline Preview
- ✨ Feedback visual para gestos
- 🎨 UI melhorada com novos ícones
- 📱 Melhor suporte mobile

## 🤝 Contribuindo

Tem ideias para novos recursos avançados? Abra uma issue ou PR!

### Roadmap
- [ ] Controle de rotação de vídeo
- [ ] Zoom in/out
- [ ] Marcadores/capítulos na timeline
- [ ] Mini player arrastável
- [ ] Chromecast support
- [ ] AirPlay support
- [ ] VR mode
