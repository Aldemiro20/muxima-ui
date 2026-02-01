import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface DrawerConfig {
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: string;
  hasBackdrop?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
}

export interface DrawerRef {
  close: () => void;
  afterClosed: Subject<any>;
}

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private openDrawerSubject = new Subject<{ config: DrawerConfig; content?: any }>();
  private closeDrawerSubject = new Subject<void>();

  openDrawer$ = this.openDrawerSubject.asObservable();
  closeDrawer$ = this.closeDrawerSubject.asObservable();

  open(config: DrawerConfig = {}, content?: any): DrawerRef {
    const afterClosed = new Subject<any>();
    
    this.openDrawerSubject.next({ config, content });

    return {
      close: () => {
        this.closeDrawerSubject.next();
        afterClosed.complete();
      },
      afterClosed
    };
  }

  close(): void {
    this.closeDrawerSubject.next();
  }
}
