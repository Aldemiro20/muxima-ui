import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationDialogService, ConfirmationVariant } from './confirmation-dialog.service';
import * as i0 from "@angular/core";
export declare class ConfirmationDialogComponent implements OnInit, OnDestroy {
    private confirmationService;
    title: string;
    message: string;
    variant: ConfirmationVariant;
    confirmText: string;
    cancelText: string;
    icon?: string;
    isOpen: boolean;
    confirmed: EventEmitter<void>;
    cancelled: EventEmitter<void>;
    closed: EventEmitter<void>;
    private subscription?;
    constructor(confirmationService: ConfirmationDialogService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onEscapeKey(): void;
    open(): void;
    close(): void;
    confirm(): void;
    cancel(): void;
    private applyConfig;
    getVariantIcon(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfirmationDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfirmationDialogComponent, "muxima-confirmation-dialog", never, { "title": "title"; "message": "message"; "variant": "variant"; "confirmText": "confirmText"; "cancelText": "cancelText"; "icon": "icon"; "isOpen": "isOpen"; }, { "confirmed": "confirmed"; "cancelled": "cancelled"; "closed": "closed"; }, never, never, true, never>;
}
