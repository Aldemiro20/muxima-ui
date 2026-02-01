import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

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

@Component({
  selector: 'muxima-shopping-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ShoppingCartComponent),
      multi: true
    }
  ]
})
export class ShoppingCartComponent implements ControlValueAccessor {
  @Input() items: CartItem[] = [];
  @Input() config: CartConfig = {
    currency: 'R$',
    showImages: true,
    allowQuantityEdit: true,
    showSubtotal: true,
    taxRate: 0,
    shippingCost: 0
  };
  @Input() disabled: boolean = false;
  @Input() emptyMessage: string = 'Seu carrinho está vazio';
  @Input() showCheckout: boolean = true;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  @Output() itemRemoved = new EventEmitter<CartItem>();
  @Output() itemQuantityChanged = new EventEmitter<{ item: CartItem; quantity: number }>();
  @Output() checkout = new EventEmitter<CartItem[]>();
  @Output() clearCart = new EventEmitter<void>();

  private onChange: (value: CartItem[]) => void = () => {};
  private onTouched: () => void = () => {};

  get subtotal(): number {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  get tax(): number {
    return this.subtotal * (this.config.taxRate || 0);
  }

  get shipping(): number {
    return this.items.length > 0 ? (this.config.shippingCost || 0) : 0;
  }

  get total(): number {
    return this.subtotal + this.tax + this.shipping;
  }

  get itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  writeValue(value: CartItem[]): void {
    if (value) {
      this.items = [...value];
    }
  }

  registerOnChange(fn: (value: CartItem[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  updateQuantity(item: CartItem, newQuantity: number): void {
    if (this.disabled || !this.config.allowQuantityEdit) return;

    const quantity = Math.max(1, Math.min(newQuantity, item.maxQuantity || 999));
    const itemIndex = this.items.findIndex(i => i.id === item.id);
    
    if (itemIndex !== -1) {
      this.items[itemIndex].quantity = quantity;
      this.itemQuantityChanged.emit({ item: this.items[itemIndex], quantity });
      this.onChange([...this.items]);
      this.onTouched();
    }
  }

  incrementQuantity(item: CartItem): void {
    this.updateQuantity(item, item.quantity + 1);
  }

  decrementQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.updateQuantity(item, item.quantity - 1);
    }
  }

  removeItem(item: CartItem): void {
    if (this.disabled) return;

    this.items = this.items.filter(i => i.id !== item.id);
    this.itemRemoved.emit(item);
    this.onChange([...this.items]);
    this.onTouched();
  }

  clearAllItems(): void {
    if (this.disabled) return;

    this.items = [];
    this.clearCart.emit();
    this.onChange([]);
    this.onTouched();
  }

  onCheckout(): void {
    if (this.disabled || this.items.length === 0) return;

    this.checkout.emit([...this.items]);
    this.onTouched();
  }

  formatCurrency(value: number): string {
    const currency = this.config.currency || 'R$';
    return `${currency} ${value.toFixed(2).replace('.', ',')}`;
  }

  getItemImage(item: CartItem): string {
    return item.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Crect fill="%23e5e7eb" width="80" height="80"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E';
  }

  trackByItemId(index: number, item: CartItem): string {
    return item.id;
  }
}
