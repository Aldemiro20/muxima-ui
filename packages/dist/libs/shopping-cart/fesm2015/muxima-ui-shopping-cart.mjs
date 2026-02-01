import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, Component, Input, Output } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

class ShoppingCartComponent {
    constructor() {
        this.items = [];
        this.config = {
            currency: 'R$',
            showImages: true,
            allowQuantityEdit: true,
            showSubtotal: true,
            taxRate: 0,
            shippingCost: 0
        };
        this.disabled = false;
        this.emptyMessage = 'Seu carrinho está vazio';
        this.showCheckout = true;
        this.size = 'medium';
        this.itemRemoved = new EventEmitter();
        this.itemQuantityChanged = new EventEmitter();
        this.checkout = new EventEmitter();
        this.clearCart = new EventEmitter();
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    get subtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    get tax() {
        return this.subtotal * (this.config.taxRate || 0);
    }
    get shipping() {
        return this.items.length > 0 ? (this.config.shippingCost || 0) : 0;
    }
    get total() {
        return this.subtotal + this.tax + this.shipping;
    }
    get itemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }
    writeValue(value) {
        if (value) {
            this.items = [...value];
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    updateQuantity(item, newQuantity) {
        if (this.disabled || !this.config.allowQuantityEdit)
            return;
        const quantity = Math.max(1, Math.min(newQuantity, item.maxQuantity || 999));
        const itemIndex = this.items.findIndex(i => i.id === item.id);
        if (itemIndex !== -1) {
            this.items[itemIndex].quantity = quantity;
            this.itemQuantityChanged.emit({ item: this.items[itemIndex], quantity });
            this.onChange([...this.items]);
            this.onTouched();
        }
    }
    incrementQuantity(item) {
        this.updateQuantity(item, item.quantity + 1);
    }
    decrementQuantity(item) {
        if (item.quantity > 1) {
            this.updateQuantity(item, item.quantity - 1);
        }
    }
    removeItem(item) {
        if (this.disabled)
            return;
        this.items = this.items.filter(i => i.id !== item.id);
        this.itemRemoved.emit(item);
        this.onChange([...this.items]);
        this.onTouched();
    }
    clearAllItems() {
        if (this.disabled)
            return;
        this.items = [];
        this.clearCart.emit();
        this.onChange([]);
        this.onTouched();
    }
    onCheckout() {
        if (this.disabled || this.items.length === 0)
            return;
        this.checkout.emit([...this.items]);
        this.onTouched();
    }
    formatCurrency(value) {
        const currency = this.config.currency || 'R$';
        return `${currency} ${value.toFixed(2).replace('.', ',')}`;
    }
    getItemImage(item) {
        return item.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Crect fill="%23e5e7eb" width="80" height="80"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E';
    }
    trackByItemId(index, item) {
        return item.id;
    }
}
ShoppingCartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ShoppingCartComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ShoppingCartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: ShoppingCartComponent, isStandalone: true, selector: "muxima-shopping-cart", inputs: { items: "items", config: "config", disabled: "disabled", emptyMessage: "emptyMessage", showCheckout: "showCheckout", size: "size" }, outputs: { itemRemoved: "itemRemoved", itemQuantityChanged: "itemQuantityChanged", checkout: "checkout", clearCart: "clearCart" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ShoppingCartComponent),
            multi: true
        }
    ], ngImport: i0, template: "<div class=\"shopping-cart-wrapper\" [attr.data-size]=\"size\" [class.disabled]=\"disabled\">\r\n  <!-- Cart Header -->\r\n  <div class=\"cart-header\">\r\n    <div class=\"cart-title\">\r\n      <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n        <circle cx=\"9\" cy=\"21\" r=\"1\"/>\r\n        <circle cx=\"20\" cy=\"21\" r=\"1\"/>\r\n        <path d=\"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6\"/>\r\n      </svg>\r\n      <h2>Carrinho de Compras</h2>\r\n      <span class=\"item-count\" *ngIf=\"itemCount > 0\">({{ itemCount }} {{ itemCount === 1 ? 'item' : 'itens' }})</span>\r\n    </div>\r\n    <button \r\n      *ngIf=\"items.length > 0\"\r\n      class=\"clear-btn\"\r\n      (click)=\"clearAllItems()\"\r\n      [disabled]=\"disabled\"\r\n      type=\"button\">\r\n      \uD83D\uDDD1\uFE0F Limpar Carrinho\r\n    </button>\r\n  </div>\r\n\r\n  <!-- Empty State -->\r\n  <div class=\"empty-state\" *ngIf=\"items.length === 0\">\r\n    <svg width=\"120\" height=\"120\" viewBox=\"0 0 120 120\" fill=\"none\">\r\n      <circle cx=\"60\" cy=\"60\" r=\"60\" fill=\"#f3f4f6\"/>\r\n      <path d=\"M40 45h40l-5 25H45l-5-25z\" fill=\"#d1d5db\" stroke=\"#9ca3af\" stroke-width=\"2\"/>\r\n      <circle cx=\"50\" cy=\"80\" r=\"4\" fill=\"#9ca3af\"/>\r\n      <circle cx=\"70\" cy=\"80\" r=\"4\" fill=\"#9ca3af\"/>\r\n    </svg>\r\n    <p>{{ emptyMessage }}</p>\r\n  </div>\r\n\r\n  <!-- Cart Items -->\r\n  <div class=\"cart-items\" *ngIf=\"items.length > 0\">\r\n    <div \r\n      class=\"cart-item\"\r\n      *ngFor=\"let item of items; trackBy: trackByItemId\"\r\n      [@itemAnimation]>\r\n      \r\n      <!-- Item Image -->\r\n      <div class=\"item-image\" *ngIf=\"config.showImages\">\r\n        <img [src]=\"getItemImage(item)\" [alt]=\"item.name\" />\r\n      </div>\r\n\r\n      <!-- Item Details -->\r\n      <div class=\"item-details\">\r\n        <h3 class=\"item-name\">{{ item.name }}</h3>\r\n        <p class=\"item-description\" *ngIf=\"item.description\">{{ item.description }}</p>\r\n        <div class=\"item-price\">{{ formatCurrency(item.price) }}</div>\r\n      </div>\r\n\r\n      <!-- Quantity Controls -->\r\n      <div class=\"quantity-controls\" *ngIf=\"config.allowQuantityEdit\">\r\n        <button \r\n          class=\"qty-btn\"\r\n          (click)=\"decrementQuantity(item)\"\r\n          [disabled]=\"disabled || item.quantity <= 1\"\r\n          type=\"button\">\r\n          \u2212\r\n        </button>\r\n        <input \r\n          type=\"number\"\r\n          class=\"qty-input\"\r\n          [value]=\"item.quantity\"\r\n          (change)=\"updateQuantity(item, +$any($event.target).value)\"\r\n          [disabled]=\"disabled\"\r\n          min=\"1\"\r\n          [max]=\"item.maxQuantity || 999\"\r\n        />\r\n        <button \r\n          class=\"qty-btn\"\r\n          (click)=\"incrementQuantity(item)\"\r\n          [disabled]=\"disabled || (item.maxQuantity && item.quantity >= item.maxQuantity)\"\r\n          type=\"button\">\r\n          +\r\n        </button>\r\n      </div>\r\n\r\n      <!-- Quantity Display (non-editable) -->\r\n      <div class=\"quantity-display\" *ngIf=\"!config.allowQuantityEdit\">\r\n        <span>Qtd: {{ item.quantity }}</span>\r\n      </div>\r\n\r\n      <!-- Item Subtotal -->\r\n      <div class=\"item-subtotal\" *ngIf=\"config.showSubtotal\">\r\n        {{ formatCurrency(item.price * item.quantity) }}\r\n      </div>\r\n\r\n      <!-- Remove Button -->\r\n      <button \r\n        class=\"remove-btn\"\r\n        (click)=\"removeItem(item)\"\r\n        [disabled]=\"disabled\"\r\n        type=\"button\"\r\n        title=\"Remover item\">\r\n        \u00D7\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Cart Summary -->\r\n  <div class=\"cart-summary\" *ngIf=\"items.length > 0\">\r\n    <div class=\"summary-row\">\r\n      <span>Subtotal:</span>\r\n      <span class=\"summary-value\">{{ formatCurrency(subtotal) }}</span>\r\n    </div>\r\n\r\n    <div class=\"summary-row\" *ngIf=\"config.taxRate && config.taxRate > 0\">\r\n      <span>Impostos ({{ (config.taxRate * 100).toFixed(0) }}%):</span>\r\n      <span class=\"summary-value\">{{ formatCurrency(tax) }}</span>\r\n    </div>\r\n\r\n    <div class=\"summary-row\" *ngIf=\"config.shippingCost && config.shippingCost > 0\">\r\n      <span>Frete:</span>\r\n      <span class=\"summary-value\">{{ formatCurrency(shipping) }}</span>\r\n    </div>\r\n\r\n    <div class=\"summary-row total-row\">\r\n      <span>Total:</span>\r\n      <span class=\"summary-value total-value\">{{ formatCurrency(total) }}</span>\r\n    </div>\r\n\r\n    <button \r\n      *ngIf=\"showCheckout\"\r\n      class=\"checkout-btn\"\r\n      (click)=\"onCheckout()\"\r\n      [disabled]=\"disabled\"\r\n      type=\"button\">\r\n      <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n        <rect x=\"1\" y=\"4\" width=\"22\" height=\"16\" rx=\"2\" ry=\"2\"/>\r\n        <line x1=\"1\" y1=\"10\" x2=\"23\" y2=\"10\"/>\r\n      </svg>\r\n      Finalizar Compra\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: ["@keyframes slideIn{0%{opacity:0;transform:translate(-20px)}to{opacity:1;transform:translate(0)}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.shopping-cart-wrapper{background:white;border-radius:16px;box-shadow:0 4px 20px #00000014;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif}.shopping-cart-wrapper[data-size=small]{font-size:.875rem}.shopping-cart-wrapper[data-size=small] .cart-item{padding:.75rem}.shopping-cart-wrapper[data-size=small] .item-image img{width:60px;height:60px}.shopping-cart-wrapper[data-size=large]{font-size:1.125rem}.shopping-cart-wrapper[data-size=large] .cart-item{padding:1.5rem}.shopping-cart-wrapper[data-size=large] .item-image img{width:100px;height:100px}.shopping-cart-wrapper.disabled{opacity:.6;pointer-events:none}.cart-header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:1.5rem;color:#fff;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}.cart-header .cart-title{display:flex;align-items:center;gap:.75rem}.cart-header .cart-title svg{flex-shrink:0}.cart-header .cart-title h2{margin:0;font-size:1.5rem;font-weight:600}.cart-header .cart-title .item-count{font-size:.9rem;opacity:.9}.cart-header .clear-btn{background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.3);color:#fff;padding:.5rem 1rem;border-radius:8px;cursor:pointer;font-size:.9rem;font-weight:500;transition:all .3s ease}.cart-header .clear-btn:hover:not(:disabled){background:rgba(255,255,255,.3);transform:translateY(-2px)}.cart-header .clear-btn:disabled{opacity:.5;cursor:not-allowed}.empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4rem 2rem;text-align:center;animation:fadeIn .5s ease}.empty-state svg{margin-bottom:1.5rem}.empty-state p{color:#6b7280;font-size:1.125rem;margin:0}.cart-items{max-height:500px;overflow-y:auto;padding:1rem}.cart-items::-webkit-scrollbar{width:8px}.cart-items::-webkit-scrollbar-track{background:#f3f4f6;border-radius:4px}.cart-items::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:4px}.cart-items::-webkit-scrollbar-thumb:hover{background:#9ca3af}.cart-item{display:flex;align-items:center;gap:1rem;padding:1rem;border:2px solid #f3f4f6;border-radius:12px;margin-bottom:1rem;transition:all .3s ease;animation:slideIn .3s ease}.cart-item:hover{border-color:#667eea;box-shadow:0 4px 12px #667eea26;transform:translateY(-2px)}.cart-item:last-child{margin-bottom:0}.item-image{flex-shrink:0}.item-image img{width:80px;height:80px;object-fit:cover;border-radius:8px;border:1px solid #e5e7eb}.item-details{flex:1;min-width:0}.item-details .item-name{margin:0 0 .25rem;font-size:1rem;font-weight:600;color:#1f2937;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.item-details .item-description{margin:0 0 .5rem;font-size:.875rem;color:#6b7280;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.item-details .item-price{font-size:.9rem;color:#667eea;font-weight:600}.quantity-controls{display:flex;align-items:center;gap:.5rem;background:#f9fafb;border-radius:8px;padding:.25rem}.quantity-controls .qty-btn{width:32px;height:32px;border:none;background:white;color:#667eea;font-size:1.25rem;font-weight:600;border-radius:6px;cursor:pointer;transition:all .2s ease;display:flex;align-items:center;justify-content:center}.quantity-controls .qty-btn:hover:not(:disabled){background:#667eea;color:#fff;transform:scale(1.1)}.quantity-controls .qty-btn:disabled{opacity:.3;cursor:not-allowed}.quantity-controls .qty-input{width:50px;height:32px;border:1px solid #e5e7eb;border-radius:6px;text-align:center;font-size:1rem;font-weight:600;color:#1f2937;background:white}.quantity-controls .qty-input:focus{outline:none;border-color:#667eea}.quantity-controls .qty-input::-webkit-outer-spin-button,.quantity-controls .qty-input::-webkit-inner-spin-button{appearance:none;margin:0}.quantity-controls .qty-input[type=number]{appearance:textfield}.quantity-display{padding:.5rem 1rem;background:#f3f4f6;border-radius:8px;font-weight:600;color:#6b7280;white-space:nowrap}.item-subtotal{font-size:1.125rem;font-weight:700;color:#1f2937;white-space:nowrap}.remove-btn{width:32px;height:32px;border:none;background:#fee2e2;color:#dc2626;font-size:1.5rem;font-weight:300;border-radius:8px;cursor:pointer;transition:all .2s ease;flex-shrink:0;display:flex;align-items:center;justify-content:center;line-height:1}.remove-btn:hover:not(:disabled){background:#dc2626;color:#fff;transform:scale(1.1) rotate(90deg)}.remove-btn:disabled{opacity:.5;cursor:not-allowed}.cart-summary{background:#f9fafb;padding:1.5rem;border-top:2px solid #e5e7eb}.cart-summary .summary-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;font-size:.95rem;color:#6b7280}.cart-summary .summary-row.total-row{margin-top:1rem;padding-top:1rem;border-top:2px solid #d1d5db;font-size:1.25rem;font-weight:700;color:#1f2937}.cart-summary .summary-row.total-row .total-value{color:#667eea}.cart-summary .summary-row .summary-value{font-weight:600;color:#1f2937}.cart-summary .checkout-btn{width:100%;margin-top:1.5rem;padding:1rem;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;border-radius:12px;font-size:1.125rem;font-weight:600;cursor:pointer;transition:all .3s ease;display:flex;align-items:center;justify-content:center;gap:.75rem;box-shadow:0 4px 12px #667eea4d}.cart-summary .checkout-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 6px 20px #667eea66}.cart-summary .checkout-btn:active:not(:disabled){transform:translateY(0)}.cart-summary .checkout-btn:disabled{opacity:.5;cursor:not-allowed}@media (max-width: 768px){.cart-item{flex-wrap:wrap}.cart-item .item-image{width:100%}.cart-item .item-image img{width:100%;height:200px}.cart-item .item-details{width:100%}.cart-item .quantity-controls,.cart-item .quantity-display{order:1}.cart-item .item-subtotal{order:2;margin-left:auto}.cart-item .remove-btn{order:3}.cart-header .cart-title h2{font-size:1.25rem}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ShoppingCartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-shopping-cart', standalone: true, imports: [CommonModule, FormsModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => ShoppingCartComponent),
                            multi: true
                        }
                    ], template: "<div class=\"shopping-cart-wrapper\" [attr.data-size]=\"size\" [class.disabled]=\"disabled\">\r\n  <!-- Cart Header -->\r\n  <div class=\"cart-header\">\r\n    <div class=\"cart-title\">\r\n      <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n        <circle cx=\"9\" cy=\"21\" r=\"1\"/>\r\n        <circle cx=\"20\" cy=\"21\" r=\"1\"/>\r\n        <path d=\"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6\"/>\r\n      </svg>\r\n      <h2>Carrinho de Compras</h2>\r\n      <span class=\"item-count\" *ngIf=\"itemCount > 0\">({{ itemCount }} {{ itemCount === 1 ? 'item' : 'itens' }})</span>\r\n    </div>\r\n    <button \r\n      *ngIf=\"items.length > 0\"\r\n      class=\"clear-btn\"\r\n      (click)=\"clearAllItems()\"\r\n      [disabled]=\"disabled\"\r\n      type=\"button\">\r\n      \uD83D\uDDD1\uFE0F Limpar Carrinho\r\n    </button>\r\n  </div>\r\n\r\n  <!-- Empty State -->\r\n  <div class=\"empty-state\" *ngIf=\"items.length === 0\">\r\n    <svg width=\"120\" height=\"120\" viewBox=\"0 0 120 120\" fill=\"none\">\r\n      <circle cx=\"60\" cy=\"60\" r=\"60\" fill=\"#f3f4f6\"/>\r\n      <path d=\"M40 45h40l-5 25H45l-5-25z\" fill=\"#d1d5db\" stroke=\"#9ca3af\" stroke-width=\"2\"/>\r\n      <circle cx=\"50\" cy=\"80\" r=\"4\" fill=\"#9ca3af\"/>\r\n      <circle cx=\"70\" cy=\"80\" r=\"4\" fill=\"#9ca3af\"/>\r\n    </svg>\r\n    <p>{{ emptyMessage }}</p>\r\n  </div>\r\n\r\n  <!-- Cart Items -->\r\n  <div class=\"cart-items\" *ngIf=\"items.length > 0\">\r\n    <div \r\n      class=\"cart-item\"\r\n      *ngFor=\"let item of items; trackBy: trackByItemId\"\r\n      [@itemAnimation]>\r\n      \r\n      <!-- Item Image -->\r\n      <div class=\"item-image\" *ngIf=\"config.showImages\">\r\n        <img [src]=\"getItemImage(item)\" [alt]=\"item.name\" />\r\n      </div>\r\n\r\n      <!-- Item Details -->\r\n      <div class=\"item-details\">\r\n        <h3 class=\"item-name\">{{ item.name }}</h3>\r\n        <p class=\"item-description\" *ngIf=\"item.description\">{{ item.description }}</p>\r\n        <div class=\"item-price\">{{ formatCurrency(item.price) }}</div>\r\n      </div>\r\n\r\n      <!-- Quantity Controls -->\r\n      <div class=\"quantity-controls\" *ngIf=\"config.allowQuantityEdit\">\r\n        <button \r\n          class=\"qty-btn\"\r\n          (click)=\"decrementQuantity(item)\"\r\n          [disabled]=\"disabled || item.quantity <= 1\"\r\n          type=\"button\">\r\n          \u2212\r\n        </button>\r\n        <input \r\n          type=\"number\"\r\n          class=\"qty-input\"\r\n          [value]=\"item.quantity\"\r\n          (change)=\"updateQuantity(item, +$any($event.target).value)\"\r\n          [disabled]=\"disabled\"\r\n          min=\"1\"\r\n          [max]=\"item.maxQuantity || 999\"\r\n        />\r\n        <button \r\n          class=\"qty-btn\"\r\n          (click)=\"incrementQuantity(item)\"\r\n          [disabled]=\"disabled || (item.maxQuantity && item.quantity >= item.maxQuantity)\"\r\n          type=\"button\">\r\n          +\r\n        </button>\r\n      </div>\r\n\r\n      <!-- Quantity Display (non-editable) -->\r\n      <div class=\"quantity-display\" *ngIf=\"!config.allowQuantityEdit\">\r\n        <span>Qtd: {{ item.quantity }}</span>\r\n      </div>\r\n\r\n      <!-- Item Subtotal -->\r\n      <div class=\"item-subtotal\" *ngIf=\"config.showSubtotal\">\r\n        {{ formatCurrency(item.price * item.quantity) }}\r\n      </div>\r\n\r\n      <!-- Remove Button -->\r\n      <button \r\n        class=\"remove-btn\"\r\n        (click)=\"removeItem(item)\"\r\n        [disabled]=\"disabled\"\r\n        type=\"button\"\r\n        title=\"Remover item\">\r\n        \u00D7\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Cart Summary -->\r\n  <div class=\"cart-summary\" *ngIf=\"items.length > 0\">\r\n    <div class=\"summary-row\">\r\n      <span>Subtotal:</span>\r\n      <span class=\"summary-value\">{{ formatCurrency(subtotal) }}</span>\r\n    </div>\r\n\r\n    <div class=\"summary-row\" *ngIf=\"config.taxRate && config.taxRate > 0\">\r\n      <span>Impostos ({{ (config.taxRate * 100).toFixed(0) }}%):</span>\r\n      <span class=\"summary-value\">{{ formatCurrency(tax) }}</span>\r\n    </div>\r\n\r\n    <div class=\"summary-row\" *ngIf=\"config.shippingCost && config.shippingCost > 0\">\r\n      <span>Frete:</span>\r\n      <span class=\"summary-value\">{{ formatCurrency(shipping) }}</span>\r\n    </div>\r\n\r\n    <div class=\"summary-row total-row\">\r\n      <span>Total:</span>\r\n      <span class=\"summary-value total-value\">{{ formatCurrency(total) }}</span>\r\n    </div>\r\n\r\n    <button \r\n      *ngIf=\"showCheckout\"\r\n      class=\"checkout-btn\"\r\n      (click)=\"onCheckout()\"\r\n      [disabled]=\"disabled\"\r\n      type=\"button\">\r\n      <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n        <rect x=\"1\" y=\"4\" width=\"22\" height=\"16\" rx=\"2\" ry=\"2\"/>\r\n        <line x1=\"1\" y1=\"10\" x2=\"23\" y2=\"10\"/>\r\n      </svg>\r\n      Finalizar Compra\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: ["@keyframes slideIn{0%{opacity:0;transform:translate(-20px)}to{opacity:1;transform:translate(0)}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.shopping-cart-wrapper{background:white;border-radius:16px;box-shadow:0 4px 20px #00000014;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif}.shopping-cart-wrapper[data-size=small]{font-size:.875rem}.shopping-cart-wrapper[data-size=small] .cart-item{padding:.75rem}.shopping-cart-wrapper[data-size=small] .item-image img{width:60px;height:60px}.shopping-cart-wrapper[data-size=large]{font-size:1.125rem}.shopping-cart-wrapper[data-size=large] .cart-item{padding:1.5rem}.shopping-cart-wrapper[data-size=large] .item-image img{width:100px;height:100px}.shopping-cart-wrapper.disabled{opacity:.6;pointer-events:none}.cart-header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:1.5rem;color:#fff;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}.cart-header .cart-title{display:flex;align-items:center;gap:.75rem}.cart-header .cart-title svg{flex-shrink:0}.cart-header .cart-title h2{margin:0;font-size:1.5rem;font-weight:600}.cart-header .cart-title .item-count{font-size:.9rem;opacity:.9}.cart-header .clear-btn{background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.3);color:#fff;padding:.5rem 1rem;border-radius:8px;cursor:pointer;font-size:.9rem;font-weight:500;transition:all .3s ease}.cart-header .clear-btn:hover:not(:disabled){background:rgba(255,255,255,.3);transform:translateY(-2px)}.cart-header .clear-btn:disabled{opacity:.5;cursor:not-allowed}.empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4rem 2rem;text-align:center;animation:fadeIn .5s ease}.empty-state svg{margin-bottom:1.5rem}.empty-state p{color:#6b7280;font-size:1.125rem;margin:0}.cart-items{max-height:500px;overflow-y:auto;padding:1rem}.cart-items::-webkit-scrollbar{width:8px}.cart-items::-webkit-scrollbar-track{background:#f3f4f6;border-radius:4px}.cart-items::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:4px}.cart-items::-webkit-scrollbar-thumb:hover{background:#9ca3af}.cart-item{display:flex;align-items:center;gap:1rem;padding:1rem;border:2px solid #f3f4f6;border-radius:12px;margin-bottom:1rem;transition:all .3s ease;animation:slideIn .3s ease}.cart-item:hover{border-color:#667eea;box-shadow:0 4px 12px #667eea26;transform:translateY(-2px)}.cart-item:last-child{margin-bottom:0}.item-image{flex-shrink:0}.item-image img{width:80px;height:80px;object-fit:cover;border-radius:8px;border:1px solid #e5e7eb}.item-details{flex:1;min-width:0}.item-details .item-name{margin:0 0 .25rem;font-size:1rem;font-weight:600;color:#1f2937;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.item-details .item-description{margin:0 0 .5rem;font-size:.875rem;color:#6b7280;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.item-details .item-price{font-size:.9rem;color:#667eea;font-weight:600}.quantity-controls{display:flex;align-items:center;gap:.5rem;background:#f9fafb;border-radius:8px;padding:.25rem}.quantity-controls .qty-btn{width:32px;height:32px;border:none;background:white;color:#667eea;font-size:1.25rem;font-weight:600;border-radius:6px;cursor:pointer;transition:all .2s ease;display:flex;align-items:center;justify-content:center}.quantity-controls .qty-btn:hover:not(:disabled){background:#667eea;color:#fff;transform:scale(1.1)}.quantity-controls .qty-btn:disabled{opacity:.3;cursor:not-allowed}.quantity-controls .qty-input{width:50px;height:32px;border:1px solid #e5e7eb;border-radius:6px;text-align:center;font-size:1rem;font-weight:600;color:#1f2937;background:white}.quantity-controls .qty-input:focus{outline:none;border-color:#667eea}.quantity-controls .qty-input::-webkit-outer-spin-button,.quantity-controls .qty-input::-webkit-inner-spin-button{appearance:none;margin:0}.quantity-controls .qty-input[type=number]{appearance:textfield}.quantity-display{padding:.5rem 1rem;background:#f3f4f6;border-radius:8px;font-weight:600;color:#6b7280;white-space:nowrap}.item-subtotal{font-size:1.125rem;font-weight:700;color:#1f2937;white-space:nowrap}.remove-btn{width:32px;height:32px;border:none;background:#fee2e2;color:#dc2626;font-size:1.5rem;font-weight:300;border-radius:8px;cursor:pointer;transition:all .2s ease;flex-shrink:0;display:flex;align-items:center;justify-content:center;line-height:1}.remove-btn:hover:not(:disabled){background:#dc2626;color:#fff;transform:scale(1.1) rotate(90deg)}.remove-btn:disabled{opacity:.5;cursor:not-allowed}.cart-summary{background:#f9fafb;padding:1.5rem;border-top:2px solid #e5e7eb}.cart-summary .summary-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;font-size:.95rem;color:#6b7280}.cart-summary .summary-row.total-row{margin-top:1rem;padding-top:1rem;border-top:2px solid #d1d5db;font-size:1.25rem;font-weight:700;color:#1f2937}.cart-summary .summary-row.total-row .total-value{color:#667eea}.cart-summary .summary-row .summary-value{font-weight:600;color:#1f2937}.cart-summary .checkout-btn{width:100%;margin-top:1.5rem;padding:1rem;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border:none;border-radius:12px;font-size:1.125rem;font-weight:600;cursor:pointer;transition:all .3s ease;display:flex;align-items:center;justify-content:center;gap:.75rem;box-shadow:0 4px 12px #667eea4d}.cart-summary .checkout-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 6px 20px #667eea66}.cart-summary .checkout-btn:active:not(:disabled){transform:translateY(0)}.cart-summary .checkout-btn:disabled{opacity:.5;cursor:not-allowed}@media (max-width: 768px){.cart-item{flex-wrap:wrap}.cart-item .item-image{width:100%}.cart-item .item-image img{width:100%;height:200px}.cart-item .item-details{width:100%}.cart-item .quantity-controls,.cart-item .quantity-display{order:1}.cart-item .item-subtotal{order:2;margin-left:auto}.cart-item .remove-btn{order:3}.cart-header .cart-title h2{font-size:1.25rem}}\n"] }]
        }], propDecorators: { items: [{
                type: Input
            }], config: [{
                type: Input
            }], disabled: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], showCheckout: [{
                type: Input
            }], size: [{
                type: Input
            }], itemRemoved: [{
                type: Output
            }], itemQuantityChanged: [{
                type: Output
            }], checkout: [{
                type: Output
            }], clearCart: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { ShoppingCartComponent };
//# sourceMappingURL=muxima-ui-shopping-cart.mjs.map
