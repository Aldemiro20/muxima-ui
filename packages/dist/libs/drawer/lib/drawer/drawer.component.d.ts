import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { DrawerService } from './drawer.service';
import * as i0 from "@angular/core";
export declare class DrawerComponent implements OnInit, OnDestroy {
    private drawerService;
    position: 'left' | 'right' | 'top' | 'bottom';
    size: string;
    hasBackdrop: boolean;
    closeOnBackdropClick: boolean;
    closeOnEscape: boolean;
    isOpen: boolean;
    opened: EventEmitter<void>;
    closed: EventEmitter<void>;
    private subscriptions;
    constructor(drawerService: DrawerService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onEscapeKey(): void;
    open(): void;
    close(): void;
    onBackdropClick(): void;
    private applyConfig;
    getDrawerStyle(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<DrawerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DrawerComponent, "muxima-drawer", never, { "position": "position"; "size": "size"; "hasBackdrop": "hasBackdrop"; "closeOnBackdropClick": "closeOnBackdropClick"; "closeOnEscape": "closeOnEscape"; "isOpen": "isOpen"; }, { "opened": "opened"; "closed": "closed"; }, never, ["[drawer-header]", "*", "[drawer-footer]"], true, never>;
}
