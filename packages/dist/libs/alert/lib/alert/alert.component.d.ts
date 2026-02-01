import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class MuximaAlertComponent implements OnChanges, OnInit, OnDestroy {
    private _changeDetectorRef;
    static ngAcceptInputType_dismissible: boolean;
    static ngAcceptInputType_dismissed: boolean;
    static ngAcceptInputType_showIcon: boolean;
    appearance: 'soft' | 'border' | 'fill' | 'outline';
    dismissed: boolean;
    dismissible: boolean;
    name: string;
    showIcon: boolean;
    type: 'primary' | 'accent' | 'warn' | 'basic' | 'info' | 'success' | 'warning' | 'error';
    readonly dismissedChanged: EventEmitter<boolean>;
    private _unsubscribeAll;
    constructor(_changeDetectorRef: ChangeDetectorRef);
    get classList(): any;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    dismiss(): void;
    show(): void;
    private _toggleDismiss;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuximaAlertComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MuximaAlertComponent, "muxima-alert", ["muximaAlert"], { "appearance": "appearance"; "dismissed": "dismissed"; "dismissible": "dismissible"; "name": "name"; "showIcon": "showIcon"; "type": "type"; }, { "dismissedChanged": "dismissedChanged"; }, never, ["[muximaAlertIcon]", "[muximaAlertTitle]", "*"], true, never>;
}
