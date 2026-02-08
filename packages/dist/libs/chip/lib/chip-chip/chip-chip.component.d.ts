import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ChipChipComponent {
    label: string;
    icon: string;
    iconPosition: 'left' | 'right';
    avatar: string;
    removable: boolean;
    disabled: boolean;
    selected: boolean;
    clickable: boolean;
    size: 'sm' | 'md' | 'lg';
    variant: 'filled' | 'outlined' | 'light';
    color: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
    removed: EventEmitter<void>;
    clicked: EventEmitter<void>;
    getClasses(): string[];
    handleClick(): void;
    handleRemove(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChipChipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChipChipComponent, "muxima-chip", never, { "label": "label"; "icon": "icon"; "iconPosition": "iconPosition"; "avatar": "avatar"; "removable": "removable"; "disabled": "disabled"; "selected": "selected"; "clickable": "clickable"; "size": "size"; "variant": "variant"; "color": "color"; }, { "removed": "removed"; "clicked": "clicked"; }, never, never, true, never>;
}
