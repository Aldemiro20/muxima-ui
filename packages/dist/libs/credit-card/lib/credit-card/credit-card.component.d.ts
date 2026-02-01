import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export interface CreditCardData {
    number: string;
    name: string;
    expiry: string;
    cvv: string;
    type?: 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';
}
export declare class CreditCardComponent implements ControlValueAccessor {
    showCard: boolean;
    disabled: boolean;
    labels: {
        number: string;
        name: string;
        expiry: string;
        cvv: string;
    };
    cardTypeChange: EventEmitter<string>;
    validationChange: EventEmitter<{
        field: string;
        valid: boolean;
    }>;
    cardData: CreditCardData;
    isFlipped: boolean;
    focusedField: string;
    private onChange;
    private onTouched;
    writeValue(value: CreditCardData): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    onNumberInput(event: Event): void;
    onNameInput(event: Event): void;
    onExpiryInput(event: Event): void;
    onCvvInput(event: Event): void;
    onFieldFocus(field: string): void;
    onFieldBlur(): void;
    private detectCardType;
    private validateField;
    private luhnCheck;
    private validateExpiry;
    private emitValue;
    getCardLogo(): string;
    getMaskedNumber(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CreditCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CreditCardComponent, "muxima-credit-card", never, { "showCard": "showCard"; "disabled": "disabled"; "labels": "labels"; }, { "cardTypeChange": "cardTypeChange"; "validationChange": "validationChange"; }, never, never, true, never>;
}
