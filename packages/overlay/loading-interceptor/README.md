# Loading Interceptor

Interceptor HTTP profissional com animação de coração batendo no estilo Muxima.

## Características

- 🎨 **Coração Batendo**: Animação única com coração e partículas de amor
- 🔄 **Automático**: Intercepta automaticamente requisições HTTP
- 🎛️ **Controle Manual**: API completa para controle programático
- 🎨 **4 Cores**: Muxima (vermelho), Primary (azul), Secondary (roxo), Accent (verde)
- 📏 **3 Tamanhos**: Pequeno, Médio e Grande
- 💬 **Mensagens Customizáveis**: Personalize o texto exibido
- 🎭 **Backdrop Opcional**: Com ou sem fundo escurecido
- ⚡ **Performance**: Sistema de contador para múltiplas requisições simultâneas

## Instalação

```bash
npm install @muxima-ui/loading-interceptor
```

## Uso Básico

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpLoadingInterceptor, LoadingInterceptorService } from '@muxima-ui/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([HttpLoadingInterceptor])
    ),
    LoadingInterceptorService
  ]
};
```

```html
<!-- app.component.html -->
<muxima-loading-interceptor></muxima-loading-interceptor>
```

## Documentação Completa

Veja a documentação completa em `/components/loading-interceptor` na aplicação de demonstração.
