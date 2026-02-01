import * as i0 from "@angular/core";
export declare class DialogService {
    private dialogState;
    private getDialogSubject;
    isOpen$(id: string): import("rxjs").Observable<boolean>;
    open(id: string): void;
    close(id: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DialogService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DialogService>;
}
