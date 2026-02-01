import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    description?: string;
    maxQuantity?: number;
}
export interface CartConfig {
    currency?: string;
    showImages?: boolean;
    allowQuantityEdit?: boolean;
    showSubtotal?: boolean;
    taxRate?: number;
    shippingCost?: number;
}
export declare class ShoppingCartComponent implements ControlValueAccessor {
    items: CartItem[];
    config: CartConfig;
    disabled: boolean;
    emptyMessage: string;
    showCheckout: boolean;
    size: 'small' | 'medium' | 'large';
    itemRemoved: EventEmitter<CartItem>;
    itemQuantityChanged: EventEmitter<{
        item: CartItem;
        quantity: number;
    }>;
    checkout: EventEmitter<CartItem[]>;
    clearCart: EventEmitter<void>;
    private onChange;
    private onTouched;
    get subtotal(): number;
    get tax(): number;
    get shipping(): number;
    get total(): number;
    get itemCount(): number;
    writeValue(value: CartItem[]): void;
    registerOnChange(fn: (value: CartItem[]) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    updateQuantity(item: CartItem, newQuantity: number): void;
    incrementQuantity(item: CartItem): void;
    decrementQuantity(item: CartItem): void;
    removeItem(item: CartItem): void;
    clearAllItems(): void;
    onCheckout(): void;
    formatCurrency(value: number): string;
    getItemImage(item: CartItem): string;
    trackByItemId(index: number, item: CartItem): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ShoppingCartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ShoppingCartComponent, "muxima-shopping-cart", never, { "items": "items"; "config": "config"; "disabled": "disabled"; "emptyMessage": "emptyMessage"; "showCheckout": "showCheckout"; "size": "size"; }, { "itemRemoved": "itemRemoved"; "itemQuantityChanged": "itemQuantityChanged"; "checkout": "checkout"; "clearCart": "clearCart"; }, never, never, true, never>;
}
