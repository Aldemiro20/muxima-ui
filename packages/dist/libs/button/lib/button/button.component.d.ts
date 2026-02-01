import * as i0 from "@angular/core";
type ButtonType = 'submit' | 'reset' | 'button' | '';
export declare class ButtonComponent {
    text?: string;
    disabled: boolean;
    type: ButtonType;
    icon?: string;
    wFull: boolean;
    iconSvg: boolean;
    iconPosition: 'left' | 'right';
    /** How large should the button be? */
    size: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    /** Button variants with modern styles */
    variant: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'gradient' | 'purple' | 'glass' | 'outline' | 'ghost' | 'neon';
    /** Hover effect style */
    hoverEffect: 'shadow' | 'gradient' | 'lift' | 'scale' | 'none';
    getClasses(): string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonComponent, "muxima-button", never, { "text": "text"; "disabled": "disabled"; "type": "type"; "icon": "icon"; "wFull": "wFull"; "iconSvg": "iconSvg"; "iconPosition": "iconPosition"; "size": "size"; "variant": "variant"; "hoverEffect": "hoverEffect"; }, {}, never, ["[slot='icon-left']", "*", "[slot='icon-right']"], true, never>;
}
export {};
