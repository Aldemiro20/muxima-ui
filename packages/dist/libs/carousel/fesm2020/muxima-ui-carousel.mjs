import * as i0 from '@angular/core';
import { Component, Input } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

class CarouselCarouselComponent {
    constructor() {
        this.items = [];
        this.autoPlay = true;
        this.interval = 5000;
        this.showArrows = true;
        this.showDots = true;
        this.height = '400px';
        this.animationType = 'slide';
        this.currentIndex = 0;
        this.isTransitioning = false;
    }
    ngOnInit() {
        if (this.autoPlay && this.items.length > 1) {
            this.startAutoPlay();
        }
    }
    ngOnDestroy() {
        this.stopAutoPlay();
    }
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, this.interval);
    }
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
    next() {
        if (this.isTransitioning)
            return;
        this.isTransitioning = true;
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        setTimeout(() => (this.isTransitioning = false), 500);
    }
    prev() {
        if (this.isTransitioning)
            return;
        this.isTransitioning = true;
        this.currentIndex = this.currentIndex === 0 ? this.items.length - 1 : this.currentIndex - 1;
        setTimeout(() => (this.isTransitioning = false), 500);
    }
    goToSlide(index) {
        if (this.isTransitioning || index === this.currentIndex)
            return;
        this.isTransitioning = true;
        this.currentIndex = index;
        setTimeout(() => (this.isTransitioning = false), 500);
    }
    onMouseEnter() {
        if (this.autoPlay) {
            this.stopAutoPlay();
        }
    }
    onMouseLeave() {
        if (this.autoPlay && this.items.length > 1) {
            this.startAutoPlay();
        }
    }
}
CarouselCarouselComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CarouselCarouselComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CarouselCarouselComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: CarouselCarouselComponent, isStandalone: true, selector: "muxima-carousel", inputs: { items: "items", autoPlay: "autoPlay", interval: "interval", showArrows: "showArrows", showDots: "showDots", height: "height", animationType: "animationType" }, ngImport: i0, template: "<div \n  class=\"muxima-carousel\" \n  [style.height]=\"height\"\n  (mouseenter)=\"onMouseEnter()\"\n  (mouseleave)=\"onMouseLeave()\">\n  \n  <div class=\"carousel-slides\">\n    <div \n      *ngFor=\"let item of items; let i = index\"\n      class=\"carousel-slide\"\n      [class.active]=\"i === currentIndex\"\n      [class.fade]=\"animationType === 'fade'\">\n      \n      <div class=\"slide-image\" [style.background-image]=\"'url(' + item.image + ')'\"></div>\n      \n      <div class=\"slide-content\" *ngIf=\"item.title || item.description\">\n        <h3 *ngIf=\"item.title\" class=\"slide-title\">{{ item.title }}</h3>\n        <p *ngIf=\"item.description\" class=\"slide-description\">{{ item.description }}</p>\n        <a *ngIf=\"item.link\" [href]=\"item.link\" class=\"slide-link\">Saiba Mais </a>\n      </div>\n    </div>\n  </div>\n\n  <button \n    *ngIf=\"showArrows && items.length > 1\"\n    class=\"carousel-arrow carousel-arrow-left\"\n    (click)=\"prev()\"\n    type=\"button\">\n    <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n      <path d=\"M15 18l-6-6 6-6\"/>\n    </svg>\n  </button>\n\n  <button \n    *ngIf=\"showArrows && items.length > 1\"\n    class=\"carousel-arrow carousel-arrow-right\"\n    (click)=\"next()\"\n    type=\"button\">\n    <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n      <path d=\"M9 18l6-6-6-6\"/>\n    </svg>\n  </button>\n\n  <div *ngIf=\"showDots && items.length > 1\" class=\"carousel-dots\">\n    <button\n      *ngFor=\"let item of items; let i = index\"\n      class=\"carousel-dot\"\n      [class.active]=\"i === currentIndex\"\n      (click)=\"goToSlide(i)\"\n      type=\"button\">\n    </button>\n  </div>\n</div>\r\n", styles: [".muxima-carousel{position:relative;width:100%;overflow:hidden;border-radius:16px;box-shadow:0 10px 40px #00000026;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.muxima-carousel .carousel-slides{position:relative;width:100%;height:100%}.muxima-carousel .carousel-slide{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;transform:translate(100%);transition:all .6s cubic-bezier(.4,0,.2,1);pointer-events:none}.muxima-carousel .carousel-slide.active{opacity:1;transform:translate(0);pointer-events:all}.muxima-carousel .carousel-slide.fade{transform:translate(0)}.muxima-carousel .carousel-slide.fade.active{opacity:1}.muxima-carousel .slide-image{width:100%;height:100%;background-size:cover;background-position:center;background-repeat:no-repeat;position:relative}.muxima-carousel .slide-image:before{content:\"\";position:absolute;inset:0;background:linear-gradient(180deg,transparent 0%,rgba(0,0,0,.3) 50%,rgba(0,0,0,.7) 100%)}.muxima-carousel .slide-content{position:absolute;bottom:0;left:0;right:0;padding:3rem 2rem;color:#fff;z-index:1;animation:slideUp .8s ease-out}.muxima-carousel .slide-title{font-size:2.5rem;font-weight:800;margin:0 0 1rem;text-shadow:2px 2px 8px rgba(0,0,0,.3);line-height:1.2}.muxima-carousel .slide-description{font-size:1.125rem;margin:0 0 1.5rem;max-width:600px;opacity:.95;text-shadow:1px 1px 4px rgba(0,0,0,.3)}.muxima-carousel .slide-link{display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.5rem;background:rgba(255,255,255,.2);backdrop-filter:blur(10px);border:2px solid rgba(255,255,255,.3);border-radius:50px;color:#fff;text-decoration:none;font-weight:600;transition:all .3s ease}.muxima-carousel .slide-link:hover{background:rgba(255,255,255,.3);transform:translateY(-2px);box-shadow:0 8px 16px #0003}.muxima-carousel .carousel-arrow{position:absolute;top:50%;transform:translateY(-50%);width:3.5rem;height:3.5rem;border:none;background:rgba(255,255,255,.2);backdrop-filter:blur(10px);border-radius:50%;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .3s ease;z-index:2;border:2px solid rgba(255,255,255,.3)}.muxima-carousel .carousel-arrow:hover{background:rgba(255,255,255,.3);transform:translateY(-50%) scale(1.1);box-shadow:0 8px 16px #0003}.muxima-carousel .carousel-arrow:active{transform:translateY(-50%) scale(.95)}.muxima-carousel .carousel-arrow svg{width:24px;height:24px}.muxima-carousel .carousel-arrow-left{left:1.5rem}.muxima-carousel .carousel-arrow-right{right:1.5rem}.muxima-carousel .carousel-dots{position:absolute;bottom:1.5rem;left:50%;transform:translate(-50%);display:flex;gap:.75rem;z-index:2}.muxima-carousel .carousel-dot{width:12px;height:12px;border-radius:50%;border:2px solid rgba(255,255,255,.6);background:transparent;cursor:pointer;transition:all .3s ease;padding:0}.muxima-carousel .carousel-dot:hover{background:rgba(255,255,255,.4);transform:scale(1.2)}.muxima-carousel .carousel-dot.active{background:white;width:32px;border-radius:6px;box-shadow:0 2px 8px #0000004d}@keyframes slideUp{0%{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@media (max-width: 768px){.muxima-carousel{border-radius:12px}.muxima-carousel .slide-content{padding:2rem 1.5rem}.muxima-carousel .slide-title{font-size:1.75rem}.muxima-carousel .slide-description{font-size:1rem}.muxima-carousel .carousel-arrow{width:2.5rem;height:2.5rem}.muxima-carousel .carousel-arrow svg{width:20px;height:20px}.muxima-carousel .carousel-arrow-left{left:1rem}.muxima-carousel .carousel-arrow-right{right:1rem}.muxima-carousel .carousel-dots{bottom:1rem}}@media (max-width: 480px){.muxima-carousel .slide-title{font-size:1.5rem}.muxima-carousel .carousel-arrow{width:2rem;height:2rem}.muxima-carousel .carousel-arrow svg{width:16px;height:16px}.muxima-carousel .carousel-dot{width:8px;height:8px}.muxima-carousel .carousel-dot.active{width:24px}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CarouselCarouselComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-carousel', standalone: true, imports: [CommonModule], template: "<div \n  class=\"muxima-carousel\" \n  [style.height]=\"height\"\n  (mouseenter)=\"onMouseEnter()\"\n  (mouseleave)=\"onMouseLeave()\">\n  \n  <div class=\"carousel-slides\">\n    <div \n      *ngFor=\"let item of items; let i = index\"\n      class=\"carousel-slide\"\n      [class.active]=\"i === currentIndex\"\n      [class.fade]=\"animationType === 'fade'\">\n      \n      <div class=\"slide-image\" [style.background-image]=\"'url(' + item.image + ')'\"></div>\n      \n      <div class=\"slide-content\" *ngIf=\"item.title || item.description\">\n        <h3 *ngIf=\"item.title\" class=\"slide-title\">{{ item.title }}</h3>\n        <p *ngIf=\"item.description\" class=\"slide-description\">{{ item.description }}</p>\n        <a *ngIf=\"item.link\" [href]=\"item.link\" class=\"slide-link\">Saiba Mais </a>\n      </div>\n    </div>\n  </div>\n\n  <button \n    *ngIf=\"showArrows && items.length > 1\"\n    class=\"carousel-arrow carousel-arrow-left\"\n    (click)=\"prev()\"\n    type=\"button\">\n    <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n      <path d=\"M15 18l-6-6 6-6\"/>\n    </svg>\n  </button>\n\n  <button \n    *ngIf=\"showArrows && items.length > 1\"\n    class=\"carousel-arrow carousel-arrow-right\"\n    (click)=\"next()\"\n    type=\"button\">\n    <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n      <path d=\"M9 18l6-6-6-6\"/>\n    </svg>\n  </button>\n\n  <div *ngIf=\"showDots && items.length > 1\" class=\"carousel-dots\">\n    <button\n      *ngFor=\"let item of items; let i = index\"\n      class=\"carousel-dot\"\n      [class.active]=\"i === currentIndex\"\n      (click)=\"goToSlide(i)\"\n      type=\"button\">\n    </button>\n  </div>\n</div>\r\n", styles: [".muxima-carousel{position:relative;width:100%;overflow:hidden;border-radius:16px;box-shadow:0 10px 40px #00000026;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.muxima-carousel .carousel-slides{position:relative;width:100%;height:100%}.muxima-carousel .carousel-slide{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;transform:translate(100%);transition:all .6s cubic-bezier(.4,0,.2,1);pointer-events:none}.muxima-carousel .carousel-slide.active{opacity:1;transform:translate(0);pointer-events:all}.muxima-carousel .carousel-slide.fade{transform:translate(0)}.muxima-carousel .carousel-slide.fade.active{opacity:1}.muxima-carousel .slide-image{width:100%;height:100%;background-size:cover;background-position:center;background-repeat:no-repeat;position:relative}.muxima-carousel .slide-image:before{content:\"\";position:absolute;inset:0;background:linear-gradient(180deg,transparent 0%,rgba(0,0,0,.3) 50%,rgba(0,0,0,.7) 100%)}.muxima-carousel .slide-content{position:absolute;bottom:0;left:0;right:0;padding:3rem 2rem;color:#fff;z-index:1;animation:slideUp .8s ease-out}.muxima-carousel .slide-title{font-size:2.5rem;font-weight:800;margin:0 0 1rem;text-shadow:2px 2px 8px rgba(0,0,0,.3);line-height:1.2}.muxima-carousel .slide-description{font-size:1.125rem;margin:0 0 1.5rem;max-width:600px;opacity:.95;text-shadow:1px 1px 4px rgba(0,0,0,.3)}.muxima-carousel .slide-link{display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.5rem;background:rgba(255,255,255,.2);backdrop-filter:blur(10px);border:2px solid rgba(255,255,255,.3);border-radius:50px;color:#fff;text-decoration:none;font-weight:600;transition:all .3s ease}.muxima-carousel .slide-link:hover{background:rgba(255,255,255,.3);transform:translateY(-2px);box-shadow:0 8px 16px #0003}.muxima-carousel .carousel-arrow{position:absolute;top:50%;transform:translateY(-50%);width:3.5rem;height:3.5rem;border:none;background:rgba(255,255,255,.2);backdrop-filter:blur(10px);border-radius:50%;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .3s ease;z-index:2;border:2px solid rgba(255,255,255,.3)}.muxima-carousel .carousel-arrow:hover{background:rgba(255,255,255,.3);transform:translateY(-50%) scale(1.1);box-shadow:0 8px 16px #0003}.muxima-carousel .carousel-arrow:active{transform:translateY(-50%) scale(.95)}.muxima-carousel .carousel-arrow svg{width:24px;height:24px}.muxima-carousel .carousel-arrow-left{left:1.5rem}.muxima-carousel .carousel-arrow-right{right:1.5rem}.muxima-carousel .carousel-dots{position:absolute;bottom:1.5rem;left:50%;transform:translate(-50%);display:flex;gap:.75rem;z-index:2}.muxima-carousel .carousel-dot{width:12px;height:12px;border-radius:50%;border:2px solid rgba(255,255,255,.6);background:transparent;cursor:pointer;transition:all .3s ease;padding:0}.muxima-carousel .carousel-dot:hover{background:rgba(255,255,255,.4);transform:scale(1.2)}.muxima-carousel .carousel-dot.active{background:white;width:32px;border-radius:6px;box-shadow:0 2px 8px #0000004d}@keyframes slideUp{0%{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@media (max-width: 768px){.muxima-carousel{border-radius:12px}.muxima-carousel .slide-content{padding:2rem 1.5rem}.muxima-carousel .slide-title{font-size:1.75rem}.muxima-carousel .slide-description{font-size:1rem}.muxima-carousel .carousel-arrow{width:2.5rem;height:2.5rem}.muxima-carousel .carousel-arrow svg{width:20px;height:20px}.muxima-carousel .carousel-arrow-left{left:1rem}.muxima-carousel .carousel-arrow-right{right:1rem}.muxima-carousel .carousel-dots{bottom:1rem}}@media (max-width: 480px){.muxima-carousel .slide-title{font-size:1.5rem}.muxima-carousel .carousel-arrow{width:2rem;height:2rem}.muxima-carousel .carousel-arrow svg{width:16px;height:16px}.muxima-carousel .carousel-dot{width:8px;height:8px}.muxima-carousel .carousel-dot.active{width:24px}}\n"] }]
        }], propDecorators: { items: [{
                type: Input
            }], autoPlay: [{
                type: Input
            }], interval: [{
                type: Input
            }], showArrows: [{
                type: Input
            }], showDots: [{
                type: Input
            }], height: [{
                type: Input
            }], animationType: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { CarouselCarouselComponent };
//# sourceMappingURL=muxima-ui-carousel.mjs.map
