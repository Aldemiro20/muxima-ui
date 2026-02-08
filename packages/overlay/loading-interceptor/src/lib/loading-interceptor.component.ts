import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingInterceptorService } from './loading-interceptor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'muxima-loading-interceptor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-interceptor.component.html',
  styleUrls: ['./loading-interceptor.component.scss']
})
export class LoadingInterceptorComponent implements OnInit, OnDestroy {
  @Input() message: string = 'Carregando...';
  @Input() showMessage: boolean = true;
  @Input() backdrop: boolean = true;
  @Input() color: 'primary' | 'secondary' | 'accent' | 'muxima' = 'muxima';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  
  isLoading = false;
  private subscription?: Subscription;

  constructor(private loadingService: LoadingInterceptorService) {}

  ngOnInit(): void {
    this.subscription = this.loadingService.loading$.subscribe(
      (loading) => {
        this.isLoading = loading;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
