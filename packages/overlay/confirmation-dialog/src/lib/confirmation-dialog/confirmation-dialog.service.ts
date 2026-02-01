import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type ConfirmationVariant = 'info' | 'warning' | 'danger' | 'success';

export interface ConfirmationConfig {
  title: string;
  message: string;
  variant?: ConfirmationVariant;
  confirmText?: string;
  cancelText?: string;
  icon?: string;
}

export interface ConfirmationResult {
  confirmed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  private openDialogSubject = new Subject<ConfirmationConfig>();
  private dialogResultSubject = new Subject<ConfirmationResult>();

  openDialog$ = this.openDialogSubject.asObservable();
  dialogResult$ = this.dialogResultSubject.asObservable();

  confirm(config: ConfirmationConfig): Promise<boolean> {
    return new Promise((resolve) => {
      this.openDialogSubject.next(config);

      const subscription = this.dialogResult$.subscribe((result) => {
        resolve(result.confirmed);
        subscription.unsubscribe();
      });
    });
  }

  sendResult(confirmed: boolean): void {
    this.dialogResultSubject.next({ confirmed });
  }
}
