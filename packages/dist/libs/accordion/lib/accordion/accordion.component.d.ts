import { TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class AccordionComponent implements ControlValueAccessor {
    title: string;
    subtitle: string;
    icon?: TemplateRef<void>;
    iconUrl: string | null;
    expanded: boolean;
    checked: boolean;
    disabled: boolean;
    size: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    children: any[];
    isChild: boolean;
    childLevel: number;
    private onChange;
    private onTouched;
    toggleCheck(): void;
    toggleAccordion(): void;
    writeValue(value: boolean): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    getPaddingClass(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccordionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AccordionComponent, "muxima-accordion", never, { "title": "title"; "subtitle": "subtitle"; "icon": "icon"; "iconUrl": "iconUrl"; "expanded": "expanded"; "checked": "checked"; "disabled": "disabled"; "size": "size"; "children": "children"; "isChild": "isChild"; "childLevel": "childLevel"; }, {}, never, ["*"], true, never>;
}
