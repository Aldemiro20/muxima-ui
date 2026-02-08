import { EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export interface TabItem {
    id: string;
    label: string;
    icon?: string;
    icon2?: string;
    disabled?: boolean;
}
export type TabVariant = 'default' | 'pills' | 'underline' | 'bordered';
export declare class TabsTabsComponent {
    private sanitizer;
    tabs: TabItem[];
    activeTab: string;
    variant: TabVariant;
    activeTabChange: EventEmitter<string>;
    tabChange: EventEmitter<TabItem>;
    constructor(sanitizer: DomSanitizer);
    selectTab(tab: TabItem): void;
    isActive(tabId: string): boolean;
    getSafeIcon(icon: string): SafeHtml;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabsTabsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabsTabsComponent, "muxima-tabs", never, { "tabs": "tabs"; "activeTab": "activeTab"; "variant": "variant"; }, { "activeTabChange": "activeTabChange"; "tabChange": "tabChange"; }, never, ["*"], true, never>;
}
