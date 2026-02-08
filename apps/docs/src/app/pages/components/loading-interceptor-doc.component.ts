import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingInterceptorComponent } from '../../../../../../packages/overlay/loading-interceptor/src/lib/loading-interceptor.component';
import { LoadingInterceptorService } from '../../../../../../packages/overlay/loading-interceptor/src/lib/loading-interceptor.service';

@Component({
  selector: 'muxima-loading-interceptor-doc',
  standalone: true,
  imports: [CommonModule, LoadingInterceptorComponent],
  templateUrl: './loading-interceptor-doc.component.html',
  styleUrls: ['./loading-interceptor-doc.component.scss']
})
export class LoadingInterceptorDocComponent {
  // Estado de demonstração
  isManualLoading = false;

  constructor(private loadingService: LoadingInterceptorService) {}

  // Code examples
  installCode = `npm install @muxima-ui/loading-interceptor`;

  importCode = `import { LoadingInterceptorComponent, HttpLoadingInterceptor, LoadingInterceptorService } from '@muxima-ui/loading-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// No app.config.ts ou main.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([HttpLoadingInterceptor])
    ),
    LoadingInterceptorService
  ]
};

// No seu componente raiz (app.component.ts)
@Component({
  standalone: true,
  imports: [LoadingInterceptorComponent]
})`;

  basicCode = `<!-- Adicione no app.component.html (root) -->
<muxima-loading-interceptor></muxima-loading-interceptor>

<!-- O loading será ativado automaticamente em todas as requisições HTTP -->`;

  customMessageCode = `<muxima-loading-interceptor
  message="Processando sua solicitação..."
  [showMessage]="true">
</muxima-loading-interceptor>`;

  noBackdropCode = `<muxima-loading-interceptor
  [backdrop]="false"
  message="Carregando...">
</muxima-loading-interceptor>`;

  colorsCode = `<!-- Cor Muxima (vermelho) -->
<muxima-loading-interceptor color="muxima"></muxima-loading-interceptor>

<!-- Cor Primária (azul) -->
<muxima-loading-interceptor color="primary"></muxima-loading-interceptor>

<!-- Cor Secundária (roxo) -->
<muxima-loading-interceptor color="secondary"></muxima-loading-interceptor>

<!-- Cor de Destaque (verde) -->
<muxima-loading-interceptor color="accent"></muxima-loading-interceptor>`;

  sizesCode = `<!-- Pequeno -->
<muxima-loading-interceptor size="sm"></muxima-loading-interceptor>

<!-- Médio (padrão) -->
<muxima-loading-interceptor size="md"></muxima-loading-interceptor>

<!-- Grande -->
<muxima-loading-interceptor size="lg"></muxima-loading-interceptor>`;

  manualCode = `import { LoadingInterceptorService } from '@muxima-ui/loading-interceptor';

export class MyComponent {
  constructor(private loadingService: LoadingInterceptorService) {}

  async processData() {
    // Mostrar loading
    this.loadingService.show();

    try {
      await this.someAsyncOperation();
    } finally {
      // Esconder loading
      this.loadingService.hide();
    }
  }

  forceStop() {
    // Força parar o loading (útil para casos de erro)
    this.loadingService.forceHide();
  }
}`;

  skipLoadingCode = `import { HttpClient, HttpHeaders } from '@angular/common/http';

export class MyService {
  constructor(private http: HttpClient) {}

  // Requisição sem ativar o loading
  fetchDataSilently() {
    const headers = new HttpHeaders().set('X-Skip-Loading', 'true');
    return this.http.get('/api/data', { headers });
  }
}`;

  excludeUrlsCode = `import { HttpLoadingInterceptor } from '@muxima-ui/loading-interceptor';

// No seu app.config.ts
export function setupLoadingInterceptor(interceptor: HttpLoadingInterceptor) {
  // Exclui URLs específicas do loading automático
  interceptor.excludeUrls([
    '/api/notifications',
    '/api/polling',
    '/api/health-check'
  ]);
}`;

  advancedCode = `<muxima-loading-interceptor
  message="Sincronizando dados..."
  [showMessage]="true"
  [backdrop]="true"
  color="primary"
  size="lg">
</muxima-loading-interceptor>

<!-- Uso programático -->
<button (click)="simulateLoading()">
  Simular Loading
</button>

<button (click)="stopLoading()">
  Parar Loading
</button>`;

  copiedStates: { [key: string]: boolean } = {};

  copyCode(code: string, key: string = 'default'): void {
    navigator.clipboard.writeText(code).then(() => {
      this.copiedStates[key] = true;
      setTimeout(() => {
        this.copiedStates[key] = false;
      }, 2000);
    });
  }

  isCopied(key: string = 'default'): boolean {
    return this.copiedStates[key] || false;
  }

  // Métodos de demonstração
  simulateLoading(): void {
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 3000);
  }

  stopLoading(): void {
    this.loadingService.forceHide();
  }
}
