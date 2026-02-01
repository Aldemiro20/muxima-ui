import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, Component, Input, Output } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

class CreditCardComponent {
    constructor() {
        this.showCard = true;
        this.disabled = false;
        this.labels = {
            number: 'Número do Cartão',
            name: 'Nome no Cartão',
            expiry: 'Validade',
            cvv: 'CVV'
        };
        this.cardTypeChange = new EventEmitter();
        this.validationChange = new EventEmitter();
        this.cardData = {
            number: '',
            name: '',
            expiry: '',
            cvv: '',
            type: 'unknown'
        };
        this.isFlipped = false;
        this.focusedField = '';
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    writeValue(value) {
        if (value) {
            this.cardData = { ...value };
            this.detectCardType(this.cardData.number);
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
    onNumberInput(event) {
        const input = event.target;
        let value = input.value.replace(/\s/g, '').replace(/\D/g, '');
        // Limit to 16 digits (19 for Amex)
        const maxLength = this.cardData.type === 'amex' ? 15 : 16;
        value = value.substring(0, maxLength);
        // Format with spaces
        const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
        input.value = formatted;
        this.cardData.number = value;
        this.detectCardType(value);
        this.emitValue();
        this.validateField('number');
    }
    onNameInput(event) {
        const input = event.target;
        // Allow only letters and spaces
        const value = input.value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
        input.value = value;
        this.cardData.name = value;
        this.emitValue();
        this.validateField('name');
    }
    onExpiryInput(event) {
        const input = event.target;
        let value = input.value.replace(/\D/g, '');
        // Format as MM/YY
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        input.value = value;
        this.cardData.expiry = value;
        this.emitValue();
        this.validateField('expiry');
    }
    onCvvInput(event) {
        const input = event.target;
        const maxLength = this.cardData.type === 'amex' ? 4 : 3;
        let value = input.value.replace(/\D/g, '').substring(0, maxLength);
        input.value = value;
        this.cardData.cvv = value;
        this.emitValue();
        this.validateField('cvv');
    }
    onFieldFocus(field) {
        this.focusedField = field;
        if (field === 'cvv') {
            this.isFlipped = true;
        }
        else {
            this.isFlipped = false;
        }
        this.onTouched();
    }
    onFieldBlur() {
        this.focusedField = '';
    }
    detectCardType(number) {
        const patterns = {
            visa: /^4/,
            mastercard: /^5[1-5]|^2[2-7]/,
            amex: /^3[47]/,
            discover: /^6(?:011|5)/
        };
        let type = 'unknown';
        for (const [cardType, pattern] of Object.entries(patterns)) {
            if (pattern.test(number)) {
                type = cardType;
                break;
            }
        }
        if (this.cardData.type !== type) {
            this.cardData.type = type;
            this.cardTypeChange.emit(type);
        }
    }
    validateField(field) {
        let valid = false;
        switch (field) {
            case 'number':
                valid = this.luhnCheck(this.cardData.number);
                break;
            case 'name':
                valid = this.cardData.name.length >= 3;
                break;
            case 'expiry':
                valid = this.validateExpiry(this.cardData.expiry);
                break;
            case 'cvv':
                const expectedLength = this.cardData.type === 'amex' ? 4 : 3;
                valid = this.cardData.cvv.length === expectedLength;
                break;
        }
        this.validationChange.emit({ field, valid });
    }
    luhnCheck(number) {
        if (!number || number.length < 13)
            return false;
        let sum = 0;
        let isEven = false;
        for (let i = number.length - 1; i >= 0; i--) {
            let digit = parseInt(number[i]);
            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            isEven = !isEven;
        }
        return sum % 10 === 0;
    }
    validateExpiry(expiry) {
        if (!expiry || expiry.length !== 5)
            return false;
        const [month, year] = expiry.split('/').map(v => parseInt(v));
        if (month < 1 || month > 12)
            return false;
        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;
        if (year < currentYear)
            return false;
        if (year === currentYear && month < currentMonth)
            return false;
        return true;
    }
    emitValue() {
        this.onChange(this.cardData);
    }
    getCardLogo() {
        const logos = {
            visa: '💳',
            mastercard: '💳',
            amex: '💳',
            discover: '💳',
            unknown: '💳'
        };
        return logos[this.cardData.type || 'unknown'];
    }
    getMaskedNumber() {
        if (!this.cardData.number)
            return '•••• •••• •••• ••••';
        const number = this.cardData.number;
        if (number.length <= 4) {
            return number.padEnd(19, '•').match(/.{1,4}/g)?.join(' ') || '';
        }
        const last4 = number.slice(-4);
        const masked = '•'.repeat(Math.max(0, number.length - 4));
        return (masked + last4).match(/.{1,4}/g)?.join(' ') || '';
    }
}
CreditCardComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CreditCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CreditCardComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: CreditCardComponent, isStandalone: true, selector: "muxima-credit-card", inputs: { showCard: "showCard", disabled: "disabled", labels: "labels" }, outputs: { cardTypeChange: "cardTypeChange", validationChange: "validationChange" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CreditCardComponent),
            multi: true
        }
    ], ngImport: i0, template: "<div class=\"credit-card-container\" [class.disabled]=\"disabled\">\r\n  <!-- Visual Card -->\r\n  <div class=\"card-visual\" *ngIf=\"showCard\" [class.flipped]=\"isFlipped\">\r\n    <div class=\"card-inner\">\r\n      <!-- Card Front -->\r\n      <div class=\"card-face card-front\" [attr.data-type]=\"cardData.type\">\r\n        <div class=\"card-background\"></div>\r\n        <div class=\"card-content\">\r\n          <div class=\"card-header\">\r\n            <span class=\"card-logo\">{{ getCardLogo() }}</span>\r\n            <span class=\"card-type\">{{ cardData.type?.toUpperCase() || 'CARD' }}</span>\r\n          </div>\r\n          \r\n          <div class=\"card-number\" [class.focused]=\"focusedField === 'number'\">\r\n            {{ getMaskedNumber() }}\r\n          </div>\r\n          \r\n          <div class=\"card-footer\">\r\n            <div class=\"card-holder\" [class.focused]=\"focusedField === 'name'\">\r\n              <div class=\"card-label\">NOME</div>\r\n              <div class=\"card-value\">{{ cardData.name || 'SEU NOME' }}</div>\r\n            </div>\r\n            <div class=\"card-expiry\" [class.focused]=\"focusedField === 'expiry'\">\r\n              <div class=\"card-label\">VALIDADE</div>\r\n              <div class=\"card-value\">{{ cardData.expiry || 'MM/AA' }}</div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      \r\n      <!-- Card Back -->\r\n      <div class=\"card-face card-back\">\r\n        <div class=\"card-background\"></div>\r\n        <div class=\"magnetic-strip\"></div>\r\n        <div class=\"cvv-strip\">\r\n          <div class=\"cvv-label\">CVV</div>\r\n          <div class=\"cvv-value\" [class.focused]=\"focusedField === 'cvv'\">\r\n            {{ cardData.cvv || '\u2022\u2022\u2022' }}\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Form Inputs -->\r\n  <div class=\"card-form\">\r\n    <div class=\"form-group\">\r\n      <label>{{ labels.number }}</label>\r\n      <input\r\n        type=\"text\"\r\n        [disabled]=\"disabled\"\r\n        placeholder=\"1234 5678 9012 3456\"\r\n        maxlength=\"19\"\r\n        (input)=\"onNumberInput($event)\"\r\n        (focus)=\"onFieldFocus('number')\"\r\n        (blur)=\"onFieldBlur()\"\r\n        autocomplete=\"cc-number\"\r\n      />\r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n      <label>{{ labels.name }}</label>\r\n      <input\r\n        type=\"text\"\r\n        [disabled]=\"disabled\"\r\n        placeholder=\"Nome como est\u00E1 no cart\u00E3o\"\r\n        (input)=\"onNameInput($event)\"\r\n        (focus)=\"onFieldFocus('name')\"\r\n        (blur)=\"onFieldBlur()\"\r\n        autocomplete=\"cc-name\"\r\n      />\r\n    </div>\r\n\r\n    <div class=\"form-row\">\r\n      <div class=\"form-group\">\r\n        <label>{{ labels.expiry }}</label>\r\n        <input\r\n          type=\"text\"\r\n          [disabled]=\"disabled\"\r\n          placeholder=\"MM/AA\"\r\n          maxlength=\"5\"\r\n          (input)=\"onExpiryInput($event)\"\r\n          (focus)=\"onFieldFocus('expiry')\"\r\n          (blur)=\"onFieldBlur()\"\r\n          autocomplete=\"cc-exp\"\r\n        />\r\n      </div>\r\n\r\n      <div class=\"form-group\">\r\n        <label>{{ labels.cvv }}</label>\r\n        <input\r\n          type=\"text\"\r\n          [disabled]=\"disabled\"\r\n          placeholder=\"123\"\r\n          [maxLength]=\"cardData.type === 'amex' ? 4 : 3\"\r\n          (input)=\"onCvvInput($event)\"\r\n          (focus)=\"onFieldFocus('cvv')\"\r\n          (blur)=\"onFieldBlur()\"\r\n          autocomplete=\"cc-csc\"\r\n        />\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".credit-card-container{max-width:400px;margin:0 auto}.credit-card-container.disabled{opacity:.6;pointer-events:none}.card-visual{perspective:1000px;margin-bottom:2rem;height:220px}.card-inner{position:relative;width:100%;height:100%;transition:transform .6s;transform-style:preserve-3d}.flipped .card-inner{transform:rotateY(180deg)}.card-face{position:absolute;width:100%;height:100%;backface-visibility:hidden;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px #0003}.card-front{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.card-front[data-type=visa]{background:linear-gradient(135deg,#1e3a8a 0%,#3b82f6 100%)}.card-front[data-type=mastercard]{background:linear-gradient(135deg,#dc2626 0%,#f59e0b 100%)}.card-front[data-type=amex]{background:linear-gradient(135deg,#059669 0%,#10b981 100%)}.card-front[data-type=discover]{background:linear-gradient(135deg,#ea580c 0%,#f97316 100%)}.card-back{background:linear-gradient(135deg,#4b5563 0%,#1f2937 100%);transform:rotateY(180deg)}.card-background{position:absolute;inset:0;opacity:.1;background-image:repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,.05) 10px,rgba(255,255,255,.05) 20px)}.card-content{position:relative;height:100%;padding:1.5rem;display:flex;flex-direction:column;color:#fff}.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem}.card-logo{font-size:2rem}.card-type{font-size:.75rem;font-weight:700;opacity:.8;letter-spacing:.05em}.card-number{font-size:1.5rem;font-family:Courier New,monospace;letter-spacing:.1em;margin-bottom:auto;transition:all .3s ease}.card-number.focused{transform:scale(1.05);text-shadow:0 0 10px rgba(255,255,255,.5)}.card-footer{display:flex;gap:2rem}.card-holder,.card-expiry{flex:1;transition:all .3s ease}.card-holder.focused,.card-expiry.focused{transform:translateY(-2px);text-shadow:0 0 10px rgba(255,255,255,.5)}.card-label{font-size:.625rem;opacity:.7;letter-spacing:.05em;margin-bottom:.25rem}.card-value{font-size:.875rem;font-weight:600;text-transform:uppercase}.magnetic-strip{width:100%;height:50px;background:#000;margin-top:1.5rem;margin-bottom:1rem}.cvv-strip{margin:0 1.5rem;background:white;border-radius:4px;padding:.75rem 1rem;display:flex;justify-content:space-between;align-items:center}.cvv-label{font-size:.75rem;font-weight:700;color:#1f2937}.cvv-value{font-family:Courier New,monospace;font-size:1rem;font-weight:600;color:#1f2937;letter-spacing:.2em;transition:all .3s ease}.cvv-value.focused{color:#667eea;transform:scale(1.1)}.card-form{display:flex;flex-direction:column;gap:1rem}.form-group{display:flex;flex-direction:column;gap:.5rem}.form-group label{font-size:.875rem;font-weight:600;color:#1f2937}.form-group input{padding:.75rem 1rem;border:2px solid #d1d5db;border-radius:8px;font-size:1rem;transition:all .3s ease;outline:none}.form-group input:focus{border-color:#667eea;box-shadow:0 0 0 3px #667eea1a}.form-group input:disabled{background:#f3f4f6;cursor:not-allowed}.form-group input::placeholder{color:#9ca3af}.form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}@media (prefers-color-scheme: dark){.form-group label{color:#f3f4f6}.form-group input{background:#1f2937;border-color:#4b5563;color:#f3f4f6}.form-group input:focus{border-color:#818cf8;box-shadow:0 0 0 3px #818cf81a}.form-group input:disabled{background:#111827}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CreditCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-credit-card', standalone: true, imports: [CommonModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => CreditCardComponent),
                            multi: true
                        }
                    ], template: "<div class=\"credit-card-container\" [class.disabled]=\"disabled\">\r\n  <!-- Visual Card -->\r\n  <div class=\"card-visual\" *ngIf=\"showCard\" [class.flipped]=\"isFlipped\">\r\n    <div class=\"card-inner\">\r\n      <!-- Card Front -->\r\n      <div class=\"card-face card-front\" [attr.data-type]=\"cardData.type\">\r\n        <div class=\"card-background\"></div>\r\n        <div class=\"card-content\">\r\n          <div class=\"card-header\">\r\n            <span class=\"card-logo\">{{ getCardLogo() }}</span>\r\n            <span class=\"card-type\">{{ cardData.type?.toUpperCase() || 'CARD' }}</span>\r\n          </div>\r\n          \r\n          <div class=\"card-number\" [class.focused]=\"focusedField === 'number'\">\r\n            {{ getMaskedNumber() }}\r\n          </div>\r\n          \r\n          <div class=\"card-footer\">\r\n            <div class=\"card-holder\" [class.focused]=\"focusedField === 'name'\">\r\n              <div class=\"card-label\">NOME</div>\r\n              <div class=\"card-value\">{{ cardData.name || 'SEU NOME' }}</div>\r\n            </div>\r\n            <div class=\"card-expiry\" [class.focused]=\"focusedField === 'expiry'\">\r\n              <div class=\"card-label\">VALIDADE</div>\r\n              <div class=\"card-value\">{{ cardData.expiry || 'MM/AA' }}</div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      \r\n      <!-- Card Back -->\r\n      <div class=\"card-face card-back\">\r\n        <div class=\"card-background\"></div>\r\n        <div class=\"magnetic-strip\"></div>\r\n        <div class=\"cvv-strip\">\r\n          <div class=\"cvv-label\">CVV</div>\r\n          <div class=\"cvv-value\" [class.focused]=\"focusedField === 'cvv'\">\r\n            {{ cardData.cvv || '\u2022\u2022\u2022' }}\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Form Inputs -->\r\n  <div class=\"card-form\">\r\n    <div class=\"form-group\">\r\n      <label>{{ labels.number }}</label>\r\n      <input\r\n        type=\"text\"\r\n        [disabled]=\"disabled\"\r\n        placeholder=\"1234 5678 9012 3456\"\r\n        maxlength=\"19\"\r\n        (input)=\"onNumberInput($event)\"\r\n        (focus)=\"onFieldFocus('number')\"\r\n        (blur)=\"onFieldBlur()\"\r\n        autocomplete=\"cc-number\"\r\n      />\r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n      <label>{{ labels.name }}</label>\r\n      <input\r\n        type=\"text\"\r\n        [disabled]=\"disabled\"\r\n        placeholder=\"Nome como est\u00E1 no cart\u00E3o\"\r\n        (input)=\"onNameInput($event)\"\r\n        (focus)=\"onFieldFocus('name')\"\r\n        (blur)=\"onFieldBlur()\"\r\n        autocomplete=\"cc-name\"\r\n      />\r\n    </div>\r\n\r\n    <div class=\"form-row\">\r\n      <div class=\"form-group\">\r\n        <label>{{ labels.expiry }}</label>\r\n        <input\r\n          type=\"text\"\r\n          [disabled]=\"disabled\"\r\n          placeholder=\"MM/AA\"\r\n          maxlength=\"5\"\r\n          (input)=\"onExpiryInput($event)\"\r\n          (focus)=\"onFieldFocus('expiry')\"\r\n          (blur)=\"onFieldBlur()\"\r\n          autocomplete=\"cc-exp\"\r\n        />\r\n      </div>\r\n\r\n      <div class=\"form-group\">\r\n        <label>{{ labels.cvv }}</label>\r\n        <input\r\n          type=\"text\"\r\n          [disabled]=\"disabled\"\r\n          placeholder=\"123\"\r\n          [maxLength]=\"cardData.type === 'amex' ? 4 : 3\"\r\n          (input)=\"onCvvInput($event)\"\r\n          (focus)=\"onFieldFocus('cvv')\"\r\n          (blur)=\"onFieldBlur()\"\r\n          autocomplete=\"cc-csc\"\r\n        />\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".credit-card-container{max-width:400px;margin:0 auto}.credit-card-container.disabled{opacity:.6;pointer-events:none}.card-visual{perspective:1000px;margin-bottom:2rem;height:220px}.card-inner{position:relative;width:100%;height:100%;transition:transform .6s;transform-style:preserve-3d}.flipped .card-inner{transform:rotateY(180deg)}.card-face{position:absolute;width:100%;height:100%;backface-visibility:hidden;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px #0003}.card-front{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.card-front[data-type=visa]{background:linear-gradient(135deg,#1e3a8a 0%,#3b82f6 100%)}.card-front[data-type=mastercard]{background:linear-gradient(135deg,#dc2626 0%,#f59e0b 100%)}.card-front[data-type=amex]{background:linear-gradient(135deg,#059669 0%,#10b981 100%)}.card-front[data-type=discover]{background:linear-gradient(135deg,#ea580c 0%,#f97316 100%)}.card-back{background:linear-gradient(135deg,#4b5563 0%,#1f2937 100%);transform:rotateY(180deg)}.card-background{position:absolute;inset:0;opacity:.1;background-image:repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,.05) 10px,rgba(255,255,255,.05) 20px)}.card-content{position:relative;height:100%;padding:1.5rem;display:flex;flex-direction:column;color:#fff}.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem}.card-logo{font-size:2rem}.card-type{font-size:.75rem;font-weight:700;opacity:.8;letter-spacing:.05em}.card-number{font-size:1.5rem;font-family:Courier New,monospace;letter-spacing:.1em;margin-bottom:auto;transition:all .3s ease}.card-number.focused{transform:scale(1.05);text-shadow:0 0 10px rgba(255,255,255,.5)}.card-footer{display:flex;gap:2rem}.card-holder,.card-expiry{flex:1;transition:all .3s ease}.card-holder.focused,.card-expiry.focused{transform:translateY(-2px);text-shadow:0 0 10px rgba(255,255,255,.5)}.card-label{font-size:.625rem;opacity:.7;letter-spacing:.05em;margin-bottom:.25rem}.card-value{font-size:.875rem;font-weight:600;text-transform:uppercase}.magnetic-strip{width:100%;height:50px;background:#000;margin-top:1.5rem;margin-bottom:1rem}.cvv-strip{margin:0 1.5rem;background:white;border-radius:4px;padding:.75rem 1rem;display:flex;justify-content:space-between;align-items:center}.cvv-label{font-size:.75rem;font-weight:700;color:#1f2937}.cvv-value{font-family:Courier New,monospace;font-size:1rem;font-weight:600;color:#1f2937;letter-spacing:.2em;transition:all .3s ease}.cvv-value.focused{color:#667eea;transform:scale(1.1)}.card-form{display:flex;flex-direction:column;gap:1rem}.form-group{display:flex;flex-direction:column;gap:.5rem}.form-group label{font-size:.875rem;font-weight:600;color:#1f2937}.form-group input{padding:.75rem 1rem;border:2px solid #d1d5db;border-radius:8px;font-size:1rem;transition:all .3s ease;outline:none}.form-group input:focus{border-color:#667eea;box-shadow:0 0 0 3px #667eea1a}.form-group input:disabled{background:#f3f4f6;cursor:not-allowed}.form-group input::placeholder{color:#9ca3af}.form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}@media (prefers-color-scheme: dark){.form-group label{color:#f3f4f6}.form-group input{background:#1f2937;border-color:#4b5563;color:#f3f4f6}.form-group input:focus{border-color:#818cf8;box-shadow:0 0 0 3px #818cf81a}.form-group input:disabled{background:#111827}}\n"] }]
        }], propDecorators: { showCard: [{
                type: Input
            }], disabled: [{
                type: Input
            }], labels: [{
                type: Input
            }], cardTypeChange: [{
                type: Output
            }], validationChange: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { CreditCardComponent };
//# sourceMappingURL=muxima-ui-credit-card.mjs.map
