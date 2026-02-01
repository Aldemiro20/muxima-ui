import * as i0 from "@angular/core";
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
export declare class ConfirmationDialogService {
    private openDialogSubject;
    private dialogResultSubject;
    openDialog$: import("rxjs").Observable<ConfirmationConfig>;
    dialogResult$: import("rxjs").Observable<ConfirmationResult>;
    confirm(config: ConfirmationConfig): Promise<boolean>;
    sendResult(confirmed: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmationDialogService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfirmationDialogService>;
}
