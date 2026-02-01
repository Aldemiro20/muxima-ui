import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
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
export declare class DrawerService {
    private openDrawerSubject;
    private closeDrawerSubject;
    openDrawer$: import("rxjs").Observable<{
        config: DrawerConfig;
        content?: any;
    }>;
    closeDrawer$: import("rxjs").Observable<void>;
    open(config?: DrawerConfig, content?: any): DrawerRef;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DrawerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DrawerService>;
}
