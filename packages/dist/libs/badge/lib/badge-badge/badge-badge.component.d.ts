import * as i0 from "@angular/core";
type BadgeVariant = 'solid' | 'outline' | 'soft' | 'glass' | 'neon';
type BadgeColor = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';
export declare class BadgeBadgeComponent {
    variant: BadgeVariant;
    color: BadgeColor;
    size: BadgeSize;
    dot: boolean;
    pulse: boolean;
    removable: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BadgeBadgeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BadgeBadgeComponent, "muxima-badge", never, { "variant": "variant"; "color": "color"; "size": "size"; "dot": "dot"; "pulse": "pulse"; "removable": "removable"; }, {}, never, ["*"], true, never>;
}
export {};
