import * as i0 from "@angular/core";
type CardVariant = 'default' | 'bordered' | 'elevated' | 'african-pattern' | 'gradient-blue' | 'gradient-purple' | 'gradient-sunset' | 'glassmorphism' | 'neon' | 'minimal' | 'shadow-lg' | 'outline-gradient' | 'dark' | 'dashboard' | 'dashboard-stat';
type CardSize = 'sm' | 'md' | 'lg';
export declare class CardCardComponent {
    variant: CardVariant;
    size: CardSize;
    hoverable: boolean;
    clickable: boolean;
    loading: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardCardComponent, "muxima-card", never, { "variant": "variant"; "size": "size"; "hoverable": "hoverable"; "clickable": "clickable"; "loading": "loading"; }, {}, never, ["[muximaCardHeader]", "*", "[muximaCardFooter]"], true, never>;
}
export {};
