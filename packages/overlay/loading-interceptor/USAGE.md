# 🫀 Loading Interceptor - Muxima UI

## Visão Geral

O **Loading Interceptor** é um componente profissional que intercepta automaticamente requisições HTTP e exibe uma animação de **coração batendo** no estilo Muxima. Perfeito para aplicações que precisam de feedback visual durante operações assíncronas.

## ✨ Características Principais

### 🎨 Animação Única
- **Coração Batendo**: Animação realista de batimento cardíaco
- **Partículas de Amor**: 6 partículas flutuantes em formato de coração
- **4 Paletas de Cores**: Muxima (vermelho), Primary (azul), Secondary (roxo), Accent (verde)
- **Smooth Animations**: Transições suaves e naturais

### 🔄 Interceptação Automática
- **HTTP Interceptor**: Ativa automaticamente em requisições
- **Contador Inteligente**: Gerencia múltiplas requisições simultâneas
- **Skip Loading**: Header customizado para pular requisições específicas
- **Exclude URLs**: Sistema para excluir padrões de URL

### 🎛️ Controle Programático
- **API Completa**: `show()`, `hide()`, `forceHide()`, `isLoading()`
- **Observable**: `loading$` para reatividade
- **Manual Override**: Controle total quando necessário

### 🎨 Altamente Customizável
- **Mensagens**: Textos personalizados por contexto
- **Backdrop**: Com ou sem fundo escurecido
- **Tamanhos**: Pequeno (60px), Médio (80px), Grande (120px)
- **Cores**: 4 variações de cores pré-definidas

## 📦 Instalação

```bash
npm install @muxima-ui/loading-interceptor
```

## 🚀 Setup Rápido

### 1. Configure o Interceptor

```typescript
// app.config.ts ou main.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { 
  HttpLoadingInterceptor, 
  LoadingInterceptorService 
} from '@muxima-ui/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([HttpLoadingInterceptor])
    ),
    LoadingInterceptorService
  ]
};
```

### 2. Adicione o Componente no Root

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { LoadingInterceptorComponent } from '@muxima-ui/loading-interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoadingInterceptorComponent],
  template: `
    <router-outlet></router-outlet>
    <muxima-loading-interceptor></muxima-loading-interceptor>
  `
})
export class AppComponent {}
```

## 💡 Exemplos de Uso

### Básico (Automático)

```html
<!-- O loading será ativado automaticamente em todas as requisições HTTP -->
<muxima-loading-interceptor></muxima-loading-interceptor>
```

### Mensagem Customizada

```html
<muxima-loading-interceptor
  message="Processando seu pedido..."
  [showMessage]="true">
</muxima-loading-interceptor>
```

### Diferentes Cores

```html
<!-- Vermelho Muxima (padrão) -->
<muxima-loading-interceptor color="muxima"></muxima-loading-interceptor>

<!-- Azul -->
<muxima-loading-interceptor color="primary"></muxima-loading-interceptor>

<!-- Roxo -->
<muxima-loading-interceptor color="secondary"></muxima-loading-interceptor>

<!-- Verde -->
<muxima-loading-interceptor color="accent"></muxima-loading-interceptor>
```

### Tamanhos

```html
<!-- Pequeno (60px) -->
<muxima-loading-interceptor size="sm"></muxima-loading-interceptor>

<!-- Médio (80px) - Padrão -->
<muxima-loading-interceptor size="md"></muxima-loading-interceptor>

<!-- Grande (120px) -->
<muxima-loading-interceptor size="lg"></muxima-loading-interceptor>
```

### Sem Backdrop

```html
<!-- Loading sem fundo escurecido -->
<muxima-loading-interceptor
  [backdrop]="false"
  message="Carregando...">
</muxima-loading-interceptor>
```

## 🎮 Controle Manual

### Uso Básico do Serviço

```typescript
import { Component } from '@angular/core';
import { LoadingInterceptorService } from '@muxima-ui/loading-interceptor';

@Component({
  selector: 'app-my-component',
  template: `
    <button (click)="processData()">Processar</button>
  `
})
export class MyComponent {
  constructor(private loadingService: LoadingInterceptorService) {}

  async processData() {
    // Mostrar loading
    this.loadingService.show();

    try {
      await this.heavyOperation();
      console.log('Operação concluída!');
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      // Esconder loading
      this.loadingService.hide();
    }
  }

  private heavyOperation(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 3000));
  }
}
```

### Observable de Estado

```typescript
import { Component, OnInit } from '@angular/core';
import { LoadingInterceptorService } from '@muxima-ui/loading-interceptor';

@Component({
  selector: 'app-status',
  template: `
    <div *ngIf="isLoading$ | async" class="loading-badge">
      Carregando...
    </div>
  `
})
export class StatusComponent implements OnInit {
  isLoading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingInterceptorService) {}

  ngOnInit() {
    this.isLoading$.subscribe(loading => {
      console.log('Loading state:', loading);
    });
  }
}
```

### Force Hide (Em Caso de Erro)

```typescript
import { Component } from '@angular/core';
import { LoadingInterceptorService } from '@muxima-ui/loading-interceptor';

@Component({
  selector: 'app-error-handler',
  template: `<button (click)="handleCriticalError()">Simular Erro</button>`
})
export class ErrorHandlerComponent {
  constructor(private loadingService: LoadingInterceptorService) {}

  handleCriticalError() {
    // Em caso de erro crítico, força esconder o loading
    // Mesmo com requisições pendentes
    this.loadingService.forceHide();
    
    alert('Operação cancelada!');
  }
}
```

## 🚫 Excluir Requisições Específicas

### Método 1: Header Customizado (Recomendado)

```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // Requisição normal (com loading)
  getUsers() {
    return this.http.get('/api/users');
  }

  // Requisição silenciosa (sem loading)
  pollNotifications() {
    const headers = new HttpHeaders().set('X-Skip-Loading', 'true');
    return this.http.get('/api/notifications', { headers });
  }

  // Health check (sem loading)
  checkHealth() {
    const headers = new HttpHeaders().set('X-Skip-Loading', 'true');
    return this.http.get('/api/health', { headers });
  }
}
```

### Método 2: Excluir por Padrão de URL

```typescript
// app.config.ts
import { HttpLoadingInterceptor } from '@muxima-ui/loading-interceptor';

export function setupLoadingInterceptor(interceptor: HttpLoadingInterceptor) {
  interceptor.excludeUrls([
    '/api/notifications',
    '/api/polling',
    '/api/health-check',
    '/api/analytics'
  ]);
}

// Usar no bootstrap
bootstrapApplication(AppComponent, {
  providers: [
    // ... outros providers
    {
      provide: APP_INITIALIZER,
      useFactory: (interceptor: HttpLoadingInterceptor) => 
        () => setupLoadingInterceptor(interceptor),
      deps: [HttpLoadingInterceptor],
      multi: true
    }
  ]
});
```

## 📚 API Reference

### Component Properties

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `message` | `string` | `'Carregando...'` | Mensagem exibida durante o loading |
| `showMessage` | `boolean` | `true` | Se deve exibir a mensagem |
| `backdrop` | `boolean` | `true` | Se deve exibir fundo escurecido |
| `color` | `'muxima' \| 'primary' \| 'secondary' \| 'accent'` | `'muxima'` | Cor do coração |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho do loading |

### Service Methods

| Método | Retorno | Descrição |
|--------|---------|-----------|
| `show()` | `void` | Exibe o loading (incrementa contador) |
| `hide()` | `void` | Esconde o loading (decrementa contador) |
| `forceHide()` | `void` | Força esconder (zera contador) |
| `isLoading()` | `boolean` | Retorna estado atual |
| `loading$` | `Observable<boolean>` | Observable do estado |

### Interceptor Methods

| Método | Parâmetros | Descrição |
|--------|------------|-----------|
| `excludeUrls()` | `string[]` | Adiciona URLs a serem excluídas |

## 🎯 Casos de Uso

### 1. Aplicações SaaS
```typescript
// Login com feedback
async login(credentials) {
  this.loadingService.show();
  try {
    const user = await this.authService.login(credentials);
    this.router.navigate(['/dashboard']);
  } finally {
    this.loadingService.hide();
  }
}
```

### 2. E-commerce
```html
<!-- Checkout process -->
<muxima-loading-interceptor
  message="Processando pagamento..."
  color="accent"
  size="lg">
</muxima-loading-interceptor>
```

### 3. Upload de Arquivos
```typescript
async uploadFile(file: File) {
  this.loadingService.show();
  try {
    await this.fileService.upload(file);
    this.toastService.success('Arquivo enviado!');
  } catch (error) {
    this.toastService.error('Erro no upload');
    this.loadingService.forceHide();
  }
}
```

### 4. Relatórios e Exportações
```html
<muxima-loading-interceptor
  message="Gerando relatório..."
  color="primary"
  [showMessage]="true">
</muxima-loading-interceptor>
```

## ⚡ Performance

O Loading Interceptor foi projetado para alta performance:

- **Sistema de Contador**: Gerencia múltiplas requisições simultâneas
- **CSS Animations**: Usa CSS puro para animações suaves
- **Lazy Rendering**: Só renderiza quando necessário
- **Memory Efficient**: Cleanup automático de subscriptions

## 🎨 Customização Avançada

### Override de Estilos

```scss
// styles.scss
muxima-loading-interceptor {
  .loading-container {
    // Customizar container
    background: rgba(255, 255, 255, 0.98);
    border-radius: 2rem;
  }

  .heart-icon {
    // Customizar coração
    filter: drop-shadow(0 0 30px rgba(231, 76, 60, 0.8));
  }

  .loading-message .message-text {
    // Customizar texto
    font-family: 'CustomFont', sans-serif;
    font-size: 1.125rem;
  }
}
```

## 🐛 Troubleshooting

### Loading não aparece
```typescript
// Verifique se o interceptor está registrado
providers: [
  provideHttpClient(withInterceptors([HttpLoadingInterceptor]))
]

// E se o componente está no template
<muxima-loading-interceptor></muxima-loading-interceptor>
```

### Loading não some
```typescript
// Use forceHide() em caso de erro
catch (error) {
  this.loadingService.forceHide();
}
```

### Múltiplos loadings
```typescript
// Use apenas UM componente no app.component.html
// Não adicione em múltiplos lugares
```

## 📄 Licença

MIT License - Muxima UI

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, abra uma issue ou PR.

---

**Feito com 🫀 pela equipe Muxima UI**
