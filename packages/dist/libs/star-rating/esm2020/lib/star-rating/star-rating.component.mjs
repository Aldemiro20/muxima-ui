import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class StarRatingComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rhci1yYXRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3Rhci1yYXRpbmcvc3JjL2xpYi9zdGFyLXJhdGluZy9zdGFyLXJhdGluZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zdGFyLXJhdGluZy9zcmMvbGliL3N0YXItcmF0aW5nL3N0YXItcmF0aW5nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQWdCekUsTUFBTSxPQUFPLG1CQUFtQjtJQWRoQztRQWVXLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFDckIsY0FBUyxHQUFZLElBQUksQ0FBQztRQUMxQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsU0FBSSxHQUFpQyxRQUFRLENBQUM7UUFDOUMsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUMxQixlQUFVLEdBQVcsU0FBUyxDQUFDO1FBQy9CLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixpQkFBWSxHQUFhLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBVzNFLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUMxQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFM0MsWUFBTyxHQUFXLENBQUMsQ0FBQztRQUM1QixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixV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QTZDQSx3NEREdENZLFlBQVk7NEZBV1gsbUJBQW1CO2tCQWQvQixTQUFTOytCQUNFLG9CQUFvQixjQUNsQixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsYUFHWjt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQzs0QkFDbEQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7OEJBR1EsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBR0YsTUFBTTtzQkFEVCxLQUFLO2dCQVNJLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbXV4aW1hLXN0YXItcmF0aW5nJyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zdGFyLXJhdGluZy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc3Rhci1yYXRpbmcuY29tcG9uZW50LnNjc3MnXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFN0YXJSYXRpbmdDb21wb25lbnQpLFxyXG4gICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0YXJSYXRpbmdDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgQElucHV0KCkgbWF4U3RhcnM6IG51bWJlciA9IDU7XHJcbiAgQElucHV0KCkgYWxsb3dIYWxmOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgc2l6ZTogJ3NtYWxsJyB8ICdtZWRpdW0nIHwgJ2xhcmdlJyA9ICdtZWRpdW0nO1xyXG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmcgPSAnI2ZiYmYyNCc7XHJcbiAgQElucHV0KCkgZW1wdHlDb2xvcjogc3RyaW5nID0gJyNkMWQ1ZGInO1xyXG4gIEBJbnB1dCgpIHNob3dDb3VudDogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgc2hvd0xhYmVsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgY3VzdG9tTGFiZWxzOiBzdHJpbmdbXSA9IFsnUMOpc3NpbW8nLCAnUnVpbScsICdSZWd1bGFyJywgJ0JvbScsICdFeGNlbGVudGUnXTtcclxuICBcclxuICBASW5wdXQoKVxyXG4gIHNldCByYXRpbmcodmFsdWU6IG51bWJlcikge1xyXG4gICAgdGhpcy5fcmF0aW5nID0gdmFsdWU7XHJcbiAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcclxuICB9XHJcbiAgZ2V0IHJhdGluZygpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3JhdGluZztcclxuICB9XHJcbiAgXHJcbiAgQE91dHB1dCgpIHJhdGluZ0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG4gIEBPdXRwdXQoKSByYXRpbmdIb3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG4gIFxyXG4gIHByaXZhdGUgX3JhdGluZzogbnVtYmVyID0gMDtcclxuICBob3ZlclJhdGluZzogbnVtYmVyID0gMDtcclxuICBzdGFyczogbnVtYmVyW10gPSBbXTtcclxuICBcclxuICBwcml2YXRlIG9uQ2hhbmdlOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZCA9ICgpID0+IHt9O1xyXG4gIHByaXZhdGUgb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zdGFycyA9IEFycmF5KHRoaXMubWF4U3RhcnMpLmZpbGwoMCkubWFwKChfLCBpKSA9PiBpICsgMSk7XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuX3JhdGluZyA9IHZhbHVlIHx8IDA7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgb25TdGFyQ2xpY2soc3RhcjogbnVtYmVyLCBldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucmVhZG9ubHkgfHwgdGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHJlY3QgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IGNsaWNrUG9zaXRpb24gPSBldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0O1xyXG4gICAgY29uc3Qgc3RhcldpZHRoID0gcmVjdC53aWR0aDtcclxuICAgIFxyXG4gICAgbGV0IG5ld1JhdGluZyA9IHN0YXI7XHJcbiAgICBcclxuICAgIGlmICh0aGlzLmFsbG93SGFsZiAmJiBjbGlja1Bvc2l0aW9uIDwgc3RhcldpZHRoIC8gMikge1xyXG4gICAgICBuZXdSYXRpbmcgPSBzdGFyIC0gMC41O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRvZ2dsZSBvZmYgaWYgY2xpY2tpbmcgdGhlIHNhbWUgcmF0aW5nXHJcbiAgICBpZiAodGhpcy5fcmF0aW5nID09PSBuZXdSYXRpbmcpIHtcclxuICAgICAgbmV3UmF0aW5nID0gMDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9yYXRpbmcgPSBuZXdSYXRpbmc7XHJcbiAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuX3JhdGluZyk7XHJcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgdGhpcy5yYXRpbmdDaGFuZ2UuZW1pdCh0aGlzLl9yYXRpbmcpO1xyXG4gIH1cclxuXHJcbiAgb25TdGFySG92ZXIoc3RhcjogbnVtYmVyLCBldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucmVhZG9ubHkgfHwgdGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHJlY3QgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IGhvdmVyUG9zaXRpb24gPSBldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0O1xyXG4gICAgY29uc3Qgc3RhcldpZHRoID0gcmVjdC53aWR0aDtcclxuICAgIFxyXG4gICAgaWYgKHRoaXMuYWxsb3dIYWxmICYmIGhvdmVyUG9zaXRpb24gPCBzdGFyV2lkdGggLyAyKSB7XHJcbiAgICAgIHRoaXMuaG92ZXJSYXRpbmcgPSBzdGFyIC0gMC41O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ob3ZlclJhdGluZyA9IHN0YXI7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yYXRpbmdIb3Zlci5lbWl0KHRoaXMuaG92ZXJSYXRpbmcpO1xyXG4gIH1cclxuXHJcbiAgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5ob3ZlclJhdGluZyA9IDA7XHJcbiAgICB0aGlzLnJhdGluZ0hvdmVyLmVtaXQoMCk7XHJcbiAgfVxyXG5cclxuICBnZXRTdGFyRmlsbChzdGFyOiBudW1iZXIpOiAnZnVsbCcgfCAnaGFsZicgfCAnZW1wdHknIHtcclxuICAgIGNvbnN0IGN1cnJlbnRSYXRpbmcgPSB0aGlzLmhvdmVyUmF0aW5nIHx8IHRoaXMuX3JhdGluZztcclxuICAgIFxyXG4gICAgaWYgKGN1cnJlbnRSYXRpbmcgPj0gc3Rhcikge1xyXG4gICAgICByZXR1cm4gJ2Z1bGwnO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmFsbG93SGFsZiAmJiBjdXJyZW50UmF0aW5nID49IHN0YXIgLSAwLjUpIHtcclxuICAgICAgcmV0dXJuICdoYWxmJztcclxuICAgIH1cclxuICAgIHJldHVybiAnZW1wdHknO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q3VycmVudExhYmVsKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBjdXJyZW50UmF0aW5nID0gTWF0aC5jZWlsKHRoaXMuaG92ZXJSYXRpbmcgfHwgdGhpcy5fcmF0aW5nKTtcclxuICAgIGlmIChjdXJyZW50UmF0aW5nID4gMCAmJiBjdXJyZW50UmF0aW5nIDw9IHRoaXMuY3VzdG9tTGFiZWxzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jdXN0b21MYWJlbHNbY3VycmVudFJhdGluZyAtIDFdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeVN0YXIoaW5kZXg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gaW5kZXg7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJzdGFyLXJhdGluZy1jb250YWluZXJcIiBcclxuICAgICBbY2xhc3Muc3Rhci1yYXRpbmctcmVhZG9ubHldPVwicmVhZG9ubHlcIlxyXG4gICAgIFtjbGFzcy5zdGFyLXJhdGluZy1kaXNhYmxlZF09XCJkaXNhYmxlZFwiXHJcbiAgICAgW2F0dHIuZGF0YS1zaXplXT1cInNpemVcIj5cclxuICBcclxuICA8ZGl2IGNsYXNzPVwic3RhcnMtd3JhcHBlclwiIChtb3VzZWxlYXZlKT1cIm9uTW91c2VMZWF2ZSgpXCI+XHJcbiAgICA8c3BhblxyXG4gICAgICAqbmdGb3I9XCJsZXQgc3RhciBvZiBzdGFyczsgdHJhY2tCeTogdHJhY2tCeVN0YXJcIlxyXG4gICAgICBjbGFzcz1cInN0YXJcIlxyXG4gICAgICBbY2xhc3Muc3Rhci1mdWxsXT1cImdldFN0YXJGaWxsKHN0YXIpID09PSAnZnVsbCdcIlxyXG4gICAgICBbY2xhc3Muc3Rhci1oYWxmXT1cImdldFN0YXJGaWxsKHN0YXIpID09PSAnaGFsZidcIlxyXG4gICAgICBbY2xhc3Muc3Rhci1lbXB0eV09XCJnZXRTdGFyRmlsbChzdGFyKSA9PT0gJ2VtcHR5J1wiXHJcbiAgICAgIFtzdHlsZS5jb2xvcl09XCJnZXRTdGFyRmlsbChzdGFyKSAhPT0gJ2VtcHR5JyA/IGNvbG9yIDogZW1wdHlDb2xvclwiXHJcbiAgICAgIChjbGljayk9XCJvblN0YXJDbGljayhzdGFyLCAkZXZlbnQpXCJcclxuICAgICAgKG1vdXNlbW92ZSk9XCJvblN0YXJIb3ZlcihzdGFyLCAkZXZlbnQpXCJcclxuICAgID5cclxuICAgICAgPHN2Z1xyXG4gICAgICAgIGNsYXNzPVwic3Rhci1pY29uXCJcclxuICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxkZWZzPlxyXG4gICAgICAgICAgPGxpbmVhckdyYWRpZW50IFtpZF09XCInaGFsZi1ncmFkLScgKyBzdGFyXCI+XHJcbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjUwJVwiIFthdHRyLnN0b3AtY29sb3JdPVwiY29sb3JcIiAvPlxyXG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCI1MCVcIiBbYXR0ci5zdG9wLWNvbG9yXT1cImVtcHR5Q29sb3JcIiAvPlxyXG4gICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cclxuICAgICAgICA8L2RlZnM+XHJcbiAgICAgICAgPHBhdGhcclxuICAgICAgICAgIFthdHRyLmZpbGxdPVwiZ2V0U3RhckZpbGwoc3RhcikgPT09ICdoYWxmJyA/ICd1cmwoI2hhbGYtZ3JhZC0nICsgc3RhciArICcpJyA6ICdjdXJyZW50Q29sb3InXCJcclxuICAgICAgICAgIGQ9XCJNMTIgMmwzLjA5IDYuMjZMMjIgOS4yN2wtNSA0Ljg3IDEuMTggNi44OEwxMiAxNy43N2wtNi4xOCAzLjI1TDcgMTQuMTQgMiA5LjI3bDYuOTEtMS4wMUwxMiAyelwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9zdmc+XHJcbiAgICA8L3NwYW4+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJyYXRpbmctaW5mb1wiICpuZ0lmPVwic2hvd0NvdW50IHx8IHNob3dMYWJlbFwiPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJyYXRpbmctY291bnRcIiAqbmdJZj1cInNob3dDb3VudFwiPlxyXG4gICAgICB7eyAoaG92ZXJSYXRpbmcgfHwgcmF0aW5nKS50b0ZpeGVkKGFsbG93SGFsZiA/IDEgOiAwKSB9fSAvIHt7IG1heFN0YXJzIH19XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8c3BhbiBjbGFzcz1cInJhdGluZy1sYWJlbFwiICpuZ0lmPVwic2hvd0xhYmVsICYmIGdldEN1cnJlbnRMYWJlbCgpXCI+XHJcbiAgICAgIHt7IGdldEN1cnJlbnRMYWJlbCgpIH19XHJcbiAgICA8L3NwYW4+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=