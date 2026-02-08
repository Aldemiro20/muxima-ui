import { OnInit, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export interface CarouselItem {
    image?: string;
    title?: string;
    description?: string;
    link?: string;
}
export declare class CarouselCarouselComponent implements OnInit, OnDestroy {
    items: CarouselItem[];
    autoPlay: boolean;
    interval: number;
    showArrows: boolean;
    showDots: boolean;
    height: string;
    animationType: 'slide' | 'fade';
    currentIndex: number;
    private autoPlayInterval;
    isTransitioning: boolean;
    ngOnInit(): void;
    ngOnDestroy(): void;
    startAutoPlay(): void;
    stopAutoPlay(): void;
    next(): void;
    prev(): void;
    goToSlide(index: number): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CarouselCarouselComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CarouselCarouselComponent, "muxima-carousel", never, { "items": "items"; "autoPlay": "autoPlay"; "interval": "interval"; "showArrows": "showArrows"; "showDots": "showDots"; "height": "height"; "animationType": "animationType"; }, {}, never, never, true, never>;
}
