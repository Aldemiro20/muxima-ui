import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1 from '@angular/platform-browser';

class TabsTabsComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.tabs = [];
        this.activeTab = '';
        this.variant = 'underline';
        this.activeTabChange = new EventEmitter();
        this.tabChange = new EventEmitter();
    }
    selectTab(tab) {
        if (tab.disabled)
            return;
        this.activeTab = tab.id;
        this.activeTabChange.emit(tab.id);
        this.tabChange.emit(tab);
    }
    isActive(tabId) {
        return this.activeTab === tabId;
    }
    getSafeIcon(icon) {
        return this.sanitizer.bypassSecurityTrustHtml(icon);
    }
}
TabsTabsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TabsTabsComponent, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
TabsTabsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: TabsTabsComponent, isStandalone: true, selector: "muxima-tabs", inputs: { tabs: "tabs", activeTab: "activeTab", variant: "variant" }, outputs: { activeTabChange: "activeTabChange", tabChange: "tabChange" }, ngImport: i0, template: "<div class=\"muxima-tabs\" [class]=\"'muxima-tabs-' + variant\">\n  <div class=\"tabs-nav\">\n    <button \n      *ngFor=\"let tab of tabs\" \n      class=\"tab\"\n      [class.active]=\"isActive(tab.id)\"\n      [class.disabled]=\"tab.disabled\"\n      [disabled]=\"tab.disabled\"\n      (click)=\"selectTab(tab)\">\n      <svg \n        *ngIf=\"tab.icon\" \n        class=\"tab-icon\"\n        viewBox=\"0 0 24 24\" \n        fill=\"none\" \n        stroke=\"currentColor\" \n        stroke-width=\"2\">\n        <path [attr.d]=\"tab.icon\"></path>\n        <path *ngIf=\"tab.icon2\" [attr.d]=\"tab.icon2\"></path>\n      </svg>\n      <span class=\"tab-label\">{{ tab.label }}</span>\n    </button>\n  </div>\n  <div class=\"tabs-content\">\n    <ng-content></ng-content>\n  </div>\n</div>\n", styles: [".muxima-tabs{width:100%}.tabs-nav{display:flex;gap:.5rem;margin-bottom:2rem;border-bottom:2px solid #f3f4f6}.tab{display:flex;align-items:center;gap:.5rem;padding:1rem 1.5rem;background:none;border:none;border-bottom:2px solid transparent;color:#6b7280;cursor:pointer;font-size:.875rem;font-weight:500;transition:all .2s;margin-bottom:-2px;white-space:nowrap;font-family:inherit}.tab:hover:not(.disabled){color:#667eea}.tab.active{color:#667eea;border-bottom-color:#667eea}.tab.disabled{opacity:.5;cursor:not-allowed}.tab-icon{width:18px;height:18px;flex-shrink:0}.tab-label{flex-shrink:0}.tabs-content{animation:fadeIn .3s}@keyframes fadeIn{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.muxima-tabs-pills .tabs-nav{border-bottom:none;gap:.5rem}.muxima-tabs-pills .tab{border-radius:8px;border-bottom:none;margin-bottom:0}.muxima-tabs-pills .tab:hover:not(.disabled){background:rgba(102,126,234,.1)}.muxima-tabs-pills .tab.active{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border-bottom:none}.muxima-tabs-bordered .tabs-nav{border:1px solid #e5e7eb;border-radius:8px;padding:.25rem;background:#f9fafb;border-bottom:none}.muxima-tabs-bordered .tab{border-radius:6px;border-bottom:none;margin-bottom:0}.muxima-tabs-bordered .tab:hover:not(.disabled){background:white}.muxima-tabs-bordered .tab.active{background:white;color:#667eea;box-shadow:0 1px 3px #0000001a;border-bottom:none}.muxima-tabs-default .tabs-nav{border-bottom:1px solid #e5e7eb}.muxima-tabs-default .tab{border-bottom:2px solid transparent}.muxima-tabs-default .tab.active{color:#111827;border-bottom-color:#111827}@media (max-width: 768px){.tabs-nav{overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}.tabs-nav::-webkit-scrollbar{display:none}.tab{padding:.75rem 1rem;font-size:.8125rem}.tab-icon{width:16px;height:16px}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TabsTabsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-tabs', standalone: true, imports: [CommonModule], template: "<div class=\"muxima-tabs\" [class]=\"'muxima-tabs-' + variant\">\n  <div class=\"tabs-nav\">\n    <button \n      *ngFor=\"let tab of tabs\" \n      class=\"tab\"\n      [class.active]=\"isActive(tab.id)\"\n      [class.disabled]=\"tab.disabled\"\n      [disabled]=\"tab.disabled\"\n      (click)=\"selectTab(tab)\">\n      <svg \n        *ngIf=\"tab.icon\" \n        class=\"tab-icon\"\n        viewBox=\"0 0 24 24\" \n        fill=\"none\" \n        stroke=\"currentColor\" \n        stroke-width=\"2\">\n        <path [attr.d]=\"tab.icon\"></path>\n        <path *ngIf=\"tab.icon2\" [attr.d]=\"tab.icon2\"></path>\n      </svg>\n      <span class=\"tab-label\">{{ tab.label }}</span>\n    </button>\n  </div>\n  <div class=\"tabs-content\">\n    <ng-content></ng-content>\n  </div>\n</div>\n", styles: [".muxima-tabs{width:100%}.tabs-nav{display:flex;gap:.5rem;margin-bottom:2rem;border-bottom:2px solid #f3f4f6}.tab{display:flex;align-items:center;gap:.5rem;padding:1rem 1.5rem;background:none;border:none;border-bottom:2px solid transparent;color:#6b7280;cursor:pointer;font-size:.875rem;font-weight:500;transition:all .2s;margin-bottom:-2px;white-space:nowrap;font-family:inherit}.tab:hover:not(.disabled){color:#667eea}.tab.active{color:#667eea;border-bottom-color:#667eea}.tab.disabled{opacity:.5;cursor:not-allowed}.tab-icon{width:18px;height:18px;flex-shrink:0}.tab-label{flex-shrink:0}.tabs-content{animation:fadeIn .3s}@keyframes fadeIn{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.muxima-tabs-pills .tabs-nav{border-bottom:none;gap:.5rem}.muxima-tabs-pills .tab{border-radius:8px;border-bottom:none;margin-bottom:0}.muxima-tabs-pills .tab:hover:not(.disabled){background:rgba(102,126,234,.1)}.muxima-tabs-pills .tab.active{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border-bottom:none}.muxima-tabs-bordered .tabs-nav{border:1px solid #e5e7eb;border-radius:8px;padding:.25rem;background:#f9fafb;border-bottom:none}.muxima-tabs-bordered .tab{border-radius:6px;border-bottom:none;margin-bottom:0}.muxima-tabs-bordered .tab:hover:not(.disabled){background:white}.muxima-tabs-bordered .tab.active{background:white;color:#667eea;box-shadow:0 1px 3px #0000001a;border-bottom:none}.muxima-tabs-default .tabs-nav{border-bottom:1px solid #e5e7eb}.muxima-tabs-default .tab{border-bottom:2px solid transparent}.muxima-tabs-default .tab.active{color:#111827;border-bottom-color:#111827}@media (max-width: 768px){.tabs-nav{overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}.tabs-nav::-webkit-scrollbar{display:none}.tab{padding:.75rem 1rem;font-size:.8125rem}.tab-icon{width:16px;height:16px}}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; }, propDecorators: { tabs: [{
                type: Input
            }], activeTab: [{
                type: Input
            }], variant: [{
                type: Input
            }], activeTabChange: [{
                type: Output
            }], tabChange: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { TabsTabsComponent };
//# sourceMappingURL=muxima-ui-tabs.mjs.map
