import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingInterceptorService } from './loading-interceptor.service';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  private excludedUrls: string[] = [];

  constructor(private loadingService: LoadingInterceptorService) {}

  /**
   * Adiciona URLs que devem ser excluídas do loading automático
   * @param urls Array de URLs ou padrões a serem excluídos
   */
  excludeUrls(urls: string[]): void {
    this.excludedUrls = urls;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Verifica se a URL deve ser excluída
    const shouldExclude = this.excludedUrls.some(url => req.url.includes(url));
    
    // Verifica se o request tem header customizado para desabilitar loading
    const skipLoading = req.headers.has('X-Skip-Loading');

    if (shouldExclude || skipLoading) {
      return next.handle(req);
    }

    // Mostra o loading
    this.loadingService.show();

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Você pode adicionar lógica adicional de erro aqui
        console.error('HTTP Error:', error);
        return throwError(() => error);
      }),
      finalize(() => {
        // Esconde o loading quando a requisição terminar (sucesso ou erro)
        this.loadingService.hide();
      })
    );
  }
}
