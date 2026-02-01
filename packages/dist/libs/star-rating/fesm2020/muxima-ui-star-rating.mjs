import * as i0 from '@angular/core';
import { EventEmitter, forwardRef, Component, Input, Output } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

class StarRatingComponent {
    constructor() {
        this.maxStars = 5;
        this.allowHalf = true;
        this.readonly = false;
        this.disabled = false;
        this.size = 'medium';
        this.color = '#fbbf24';
        this.emptyColor = '#d1d5db';
        this.showCount = true;
        this.showLabel = false;
        this.customLabels = ['Péssimo', 'Ruim', 'Regular', 'Bom', 'Excelente'];
        this.ratingChange = new EventEmitter();
        this.ratingHover = new EventEmitter();
        this._rating = 0;
        this.hoverRating = 0;
        this.stars = [];
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    set rating(value) {
        this._rating = value;
        this.onChange(value);
    }
    get rating() {
        return this._rating;
    }
    ngOnInit() {
        this.stars = Array(this.maxStars).fill(0).map((_, i) => i + 1);
    }
    writeValue(value) {
        this._rating = value || 0;
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
    onStarClick(star, event) {
        if (this.readonly || this.disabled)
            return;
        const rect = event.target.getBoundingClientRect();
        const clickPosition = event.clientX - rect.left;
        const starWidth = rect.width;
        let newRating = star;
        if (this.allowHalf && clickPosition < starWidth / 2) {
            newRating = star - 0.5;
        }
        // Toggle off if clicking the same rating
        if (this._rating === newRating) {
            newRating = 0;
        }
        this._rating = newRating;
        this.onChange(this._rating);
        this.onTouched();
        this.ratingChange.emit(this._rating);
    }
    onStarHover(star, event) {
        if (this.readonly || this.disabled)
            return;
        const rect = event.target.getBoundingClientRect();
        const hoverPosition = event.clientX - rect.left;
        const starWidth = rect.width;
        if (this.allowHalf && hoverPosition < starWidth / 2) {
            this.hoverRating = star - 0.5;
        }
        else {
            this.hoverRating = star;
        }
        this.ratingHover.emit(this.hoverRating);
    }
    onMouseLeave() {
        this.hoverRating = 0;
        this.ratingHover.emit(0);
    }
    getStarFill(star) {
        const currentRating = this.hoverRating || this._rating;
        if (currentRating >= star) {
            return 'full';
        }
        else if (this.allowHalf && currentRating >= star - 0.5) {
            return 'half';
        }
        return 'empty';
    }
    getCurrentLabel() {
        const currentRating = Math.ceil(this.hoverRating || this._rating);
        if (currentRating > 0 && currentRating <= this.customLabels.length) {
            return this.customLabels[currentRating - 1];
        }
        return '';
    }
    trackByStar(index) {
        return index;
    }
}
StarRatingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: StarRatingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
StarRatingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: StarRatingComponent, isStandalone: true, selector: "muxima-star-rating", inputs: { maxStars: "maxStars", allowHalf: "allowHalf", readonly: "readonly", disabled: "disabled", size: "size", color: "color", emptyColor: "emptyColor", showCount: "showCount", showLabel: "showLabel", customLabels: "customLabels", rating: "rating" }, outputs: { ratingChange: "ratingChange", ratingHover: "ratingHover" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => StarRatingComponent),
            multi: true
        }
    ], ngImport: i0, template: "<div class=\"star-rating-container\" \r\n     [class.star-rating-readonly]=\"readonly\"\r\n     [class.star-rating-disabled]=\"disabled\"\r\n     [attr.data-size]=\"size\">\r\n  \r\n  <div class=\"stars-wrapper\" (mouseleave)=\"onMouseLeave()\">\r\n    <span\r\n      *ngFor=\"let star of stars; trackBy: trackByStar\"\r\n      class=\"star\"\r\n      [class.star-full]=\"getStarFill(star) === 'full'\"\r\n      [class.star-half]=\"getStarFill(star) === 'half'\"\r\n      [class.star-empty]=\"getStarFill(star) === 'empty'\"\r\n      [style.color]=\"getStarFill(star) !== 'empty' ? color : emptyColor\"\r\n      (click)=\"onStarClick(star, $event)\"\r\n      (mousemove)=\"onStarHover(star, $event)\"\r\n    >\r\n      <svg\r\n        class=\"star-icon\"\r\n        xmlns=\"http://www.w3.org/2000/svg\"\r\n        viewBox=\"0 0 24 24\"\r\n        fill=\"currentColor\"\r\n      >\r\n        <defs>\r\n          <linearGradient [id]=\"'half-grad-' + star\">\r\n            <stop offset=\"50%\" [attr.stop-color]=\"color\" />\r\n            <stop offset=\"50%\" [attr.stop-color]=\"emptyColor\" />\r\n          </linearGradient>\r\n        </defs>\r\n        <path\r\n          [attr.fill]=\"getStarFill(star) === 'half' ? 'url(#half-grad-' + star + ')' : 'currentColor'\"\r\n          d=\"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z\"\r\n        />\r\n      </svg>\r\n    </span>\r\n  </div>\r\n\r\n  <div class=\"rating-info\" *ngIf=\"showCount || showLabel\">\r\n    <span class=\"rating-count\" *ngIf=\"showCount\">\r\n      {{ (hoverRating || rating).toFixed(allowHalf ? 1 : 0) }} / {{ maxStars }}\r\n    </span>\r\n    <span class=\"rating-label\" *ngIf=\"showLabel && getCurrentLabel()\">\r\n      {{ getCurrentLabel() }}\r\n    </span>\r\n  </div>\r\n</div>\r\n", styles: [".star-rating-container{display:inline-flex;flex-direction:column;gap:.5rem}.star-rating-container.star-rating-readonly .star{cursor:default}.star-rating-container.star-rating-disabled{opacity:.5;pointer-events:none}.star-rating-container[data-size=small] .star-icon{width:1.25rem;height:1.25rem}.star-rating-container[data-size=small] .rating-count,.star-rating-container[data-size=small] .rating-label{font-size:.75rem}.star-rating-container[data-size=medium] .star-icon{width:1.75rem;height:1.75rem}.star-rating-container[data-size=medium] .rating-count,.star-rating-container[data-size=medium] .rating-label{font-size:.875rem}.star-rating-container[data-size=large] .star-icon{width:2.5rem;height:2.5rem}.star-rating-container[data-size=large] .rating-count,.star-rating-container[data-size=large] .rating-label{font-size:1rem}.stars-wrapper{display:flex;gap:.25rem}.star{cursor:pointer;transition:all .2s ease;display:inline-flex;align-items:center;justify-content:center}.star:hover:not(.star-rating-readonly .star){transform:scale(1.15)}.star:active:not(.star-rating-readonly .star){transform:scale(.95)}.star-icon{width:1.75rem;height:1.75rem;transition:all .2s ease;filter:drop-shadow(0 1px 2px rgba(0,0,0,.1))}.star-empty{opacity:.4}.star-full,.star-half{opacity:1}.rating-info{display:flex;align-items:center;gap:.75rem;margin-top:.25rem}.rating-count{font-size:.875rem;font-weight:600;color:#6b7280}.rating-label{font-size:.875rem;font-weight:500;color:#1f2937;padding:.25rem .75rem;background:linear-gradient(135deg,#f3f4f6 0%,#e5e7eb 100%);border-radius:6px;transition:all .2s ease}@keyframes pulse{0%,to{transform:scale(1)}50%{transform:scale(1.2)}}.star-full .star-icon{animation:pulse .3s ease-in-out}@media (prefers-color-scheme: dark){.rating-count{color:#9ca3af}.rating-label{color:#f3f4f6;background:linear-gradient(135deg,#374151 0%,#4b5563 100%)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: StarRatingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-star-rating', standalone: true, imports: [CommonModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => StarRatingComponent),
                            multi: true
                        }
                    ], template: "<div class=\"star-rating-container\" \r\n     [class.star-rating-readonly]=\"readonly\"\r\n     [class.star-rating-disabled]=\"disabled\"\r\n     [attr.data-size]=\"size\">\r\n  \r\n  <div class=\"stars-wrapper\" (mouseleave)=\"onMouseLeave()\">\r\n    <span\r\n      *ngFor=\"let star of stars; trackBy: trackByStar\"\r\n      class=\"star\"\r\n      [class.star-full]=\"getStarFill(star) === 'full'\"\r\n      [class.star-half]=\"getStarFill(star) === 'half'\"\r\n      [class.star-empty]=\"getStarFill(star) === 'empty'\"\r\n      [style.color]=\"getStarFill(star) !== 'empty' ? color : emptyColor\"\r\n      (click)=\"onStarClick(star, $event)\"\r\n      (mousemove)=\"onStarHover(star, $event)\"\r\n    >\r\n      <svg\r\n        class=\"star-icon\"\r\n        xmlns=\"http://www.w3.org/2000/svg\"\r\n        viewBox=\"0 0 24 24\"\r\n        fill=\"currentColor\"\r\n      >\r\n        <defs>\r\n          <linearGradient [id]=\"'half-grad-' + star\">\r\n            <stop offset=\"50%\" [attr.stop-color]=\"color\" />\r\n            <stop offset=\"50%\" [attr.stop-color]=\"emptyColor\" />\r\n          </linearGradient>\r\n        </defs>\r\n        <path\r\n          [attr.fill]=\"getStarFill(star) === 'half' ? 'url(#half-grad-' + star + ')' : 'currentColor'\"\r\n          d=\"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z\"\r\n        />\r\n      </svg>\r\n    </span>\r\n  </div>\r\n\r\n  <div class=\"rating-info\" *ngIf=\"showCount || showLabel\">\r\n    <span class=\"rating-count\" *ngIf=\"showCount\">\r\n      {{ (hoverRating || rating).toFixed(allowHalf ? 1 : 0) }} / {{ maxStars }}\r\n    </span>\r\n    <span class=\"rating-label\" *ngIf=\"showLabel && getCurrentLabel()\">\r\n      {{ getCurrentLabel() }}\r\n    </span>\r\n  </div>\r\n</div>\r\n", styles: [".star-rating-container{display:inline-flex;flex-direction:column;gap:.5rem}.star-rating-container.star-rating-readonly .star{cursor:default}.star-rating-container.star-rating-disabled{opacity:.5;pointer-events:none}.star-rating-container[data-size=small] .star-icon{width:1.25rem;height:1.25rem}.star-rating-container[data-size=small] .rating-count,.star-rating-container[data-size=small] .rating-label{font-size:.75rem}.star-rating-container[data-size=medium] .star-icon{width:1.75rem;height:1.75rem}.star-rating-container[data-size=medium] .rating-count,.star-rating-container[data-size=medium] .rating-label{font-size:.875rem}.star-rating-container[data-size=large] .star-icon{width:2.5rem;height:2.5rem}.star-rating-container[data-size=large] .rating-count,.star-rating-container[data-size=large] .rating-label{font-size:1rem}.stars-wrapper{display:flex;gap:.25rem}.star{cursor:pointer;transition:all .2s ease;display:inline-flex;align-items:center;justify-content:center}.star:hover:not(.star-rating-readonly .star){transform:scale(1.15)}.star:active:not(.star-rating-readonly .star){transform:scale(.95)}.star-icon{width:1.75rem;height:1.75rem;transition:all .2s ease;filter:drop-shadow(0 1px 2px rgba(0,0,0,.1))}.star-empty{opacity:.4}.star-full,.star-half{opacity:1}.rating-info{display:flex;align-items:center;gap:.75rem;margin-top:.25rem}.rating-count{font-size:.875rem;font-weight:600;color:#6b7280}.rating-label{font-size:.875rem;font-weight:500;color:#1f2937;padding:.25rem .75rem;background:linear-gradient(135deg,#f3f4f6 0%,#e5e7eb 100%);border-radius:6px;transition:all .2s ease}@keyframes pulse{0%,to{transform:scale(1)}50%{transform:scale(1.2)}}.star-full .star-icon{animation:pulse .3s ease-in-out}@media (prefers-color-scheme: dark){.rating-count{color:#9ca3af}.rating-label{color:#f3f4f6;background:linear-gradient(135deg,#374151 0%,#4b5563 100%)}}\n"] }]
        }], propDecorators: { maxStars: [{
                type: Input
            }], allowHalf: [{
                type: Input
            }], readonly: [{
                type: Input
            }], disabled: [{
                type: Input
            }], size: [{
                type: Input
            }], color: [{
                type: Input
            }], emptyColor: [{
                type: Input
            }], showCount: [{
                type: Input
            }], showLabel: [{
                type: Input
            }], customLabels: [{
                type: Input
            }], rating: [{
                type: Input
            }], ratingChange: [{
                type: Output
            }], ratingHover: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { StarRatingComponent };
//# sourceMappingURL=muxima-ui-star-rating.mjs.map
