import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class AvatarGroupComponent {
    constructor() {
        this.size = 'md';
        this.totalCount = 0;
    }
}
AvatarGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AvatarGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AvatarGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: AvatarGroupComponent, isStandalone: true, selector: "muxima-avatar-group", inputs: { max: "max", size: "size", totalCount: "totalCount" }, ngImport: i0, template: `
    <div class="muxima-avatar-group" [ngClass]="'muxima-avatar-group-' + size">
      <ng-content></ng-content>
      <div *ngIf="max && max < totalCount" 
           class="muxima-avatar muxima-avatar-more"
           [ngClass]="'muxima-avatar-' + size">
        <div class="muxima-avatar-initials">
          +{{ totalCount - max }}
        </div>
      </div>
    </div>
  `, isInline: true, styles: [".muxima-avatar-group{display:flex;align-items:center;position:relative;::ng-deep muxima-avatar {margin-left: -.5rem; transition: all .2s; position: relative; &:first-child {margin-left: 0;} &:hover {transform: translateY(-4px); z-index: 10;}} .muxima-avatar-more {background: linear-gradient(135deg,#64748B,#475569); cursor: pointer; &:hover {transform: translateY(-4px) scale(1.05);}}}.muxima-avatar-group-xs ::ng-deep muxima-avatar{margin-left:-.375rem}.muxima-avatar-group-sm ::ng-deep muxima-avatar{margin-left:-.5rem}.muxima-avatar-group-md ::ng-deep muxima-avatar{margin-left:-.625rem}.muxima-avatar-group-lg ::ng-deep muxima-avatar{margin-left:-.75rem}.muxima-avatar-group-xl ::ng-deep muxima-avatar{margin-left:-1rem}.muxima-avatar-group-2xl ::ng-deep muxima-avatar{margin-left:-1.25rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: AvatarGroupComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-avatar-group', standalone: true, imports: [CommonModule], template: `
    <div class="muxima-avatar-group" [ngClass]="'muxima-avatar-group-' + size">
      <ng-content></ng-content>
      <div *ngIf="max && max < totalCount" 
           class="muxima-avatar muxima-avatar-more"
           [ngClass]="'muxima-avatar-' + size">
        <div class="muxima-avatar-initials">
          +{{ totalCount - max }}
        </div>
      </div>
    </div>
  `, styles: [".muxima-avatar-group{display:flex;align-items:center;position:relative;::ng-deep muxima-avatar {margin-left: -.5rem; transition: all .2s; position: relative; &:first-child {margin-left: 0;} &:hover {transform: translateY(-4px); z-index: 10;}} .muxima-avatar-more {background: linear-gradient(135deg,#64748B,#475569); cursor: pointer; &:hover {transform: translateY(-4px) scale(1.05);}}}.muxima-avatar-group-xs ::ng-deep muxima-avatar{margin-left:-.375rem}.muxima-avatar-group-sm ::ng-deep muxima-avatar{margin-left:-.5rem}.muxima-avatar-group-md ::ng-deep muxima-avatar{margin-left:-.625rem}.muxima-avatar-group-lg ::ng-deep muxima-avatar{margin-left:-.75rem}.muxima-avatar-group-xl ::ng-deep muxima-avatar{margin-left:-1rem}.muxima-avatar-group-2xl ::ng-deep muxima-avatar{margin-left:-1.25rem}\n"] }]
        }], propDecorators: { max: [{
                type: Input
            }], size: [{
                type: Input
            }], totalCount: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudHMvYXZhdGFyL2F2YXRhci9zcmMvbGliL2F2YXRhci1ncm91cC9hdmF0YXItZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBMEUvQyxNQUFNLE9BQU8sb0JBQW9CO0lBeEVqQztRQTBFVyxTQUFJLEdBQTZDLElBQUksQ0FBQztRQUN0RCxlQUFVLEdBQVcsQ0FBQyxDQUFDO0tBQ2pDOztrSEFKWSxvQkFBb0I7c0dBQXBCLG9CQUFvQiwrSUFwRXJCOzs7Ozs7Ozs7OztHQVdULHMyQkFaUyxZQUFZOzRGQXFFWCxvQkFBb0I7a0JBeEVoQyxTQUFTOytCQUNFLHFCQUFxQixjQUNuQixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsWUFDYjs7Ozs7Ozs7Ozs7R0FXVDs4QkEwRFEsR0FBRztzQkFBWCxLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtdXhpbWEtYXZhdGFyLWdyb3VwJyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwibXV4aW1hLWF2YXRhci1ncm91cFwiIFtuZ0NsYXNzXT1cIidtdXhpbWEtYXZhdGFyLWdyb3VwLScgKyBzaXplXCI+XHJcbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgPGRpdiAqbmdJZj1cIm1heCAmJiBtYXggPCB0b3RhbENvdW50XCIgXHJcbiAgICAgICAgICAgY2xhc3M9XCJtdXhpbWEtYXZhdGFyIG11eGltYS1hdmF0YXItbW9yZVwiXHJcbiAgICAgICAgICAgW25nQ2xhc3NdPVwiJ211eGltYS1hdmF0YXItJyArIHNpemVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibXV4aW1hLWF2YXRhci1pbml0aWFsc1wiPlxyXG4gICAgICAgICAgK3t7IHRvdGFsQ291bnQgLSBtYXggfX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIHN0eWxlczogW2BcclxuICAgIC5tdXhpbWEtYXZhdGFyLWdyb3VwIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG5cclxuICAgICAgOjpuZy1kZWVwIG11eGltYS1hdmF0YXIge1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtMC41cmVtO1xyXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjJzO1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHJcbiAgICAgICAgJjpmaXJzdC1jaGlsZCB7XHJcbiAgICAgICAgICBtYXJnaW4tbGVmdDogMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICY6aG92ZXIge1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC00cHgpO1xyXG4gICAgICAgICAgei1pbmRleDogMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAubXV4aW1hLWF2YXRhci1tb3JlIHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNjQ3NDhCLCAjNDc1NTY5KTtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcblxyXG4gICAgICAgICY6aG92ZXIge1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC00cHgpIHNjYWxlKDEuMDUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5tdXhpbWEtYXZhdGFyLWdyb3VwLXhzIDo6bmctZGVlcCBtdXhpbWEtYXZhdGFyIHtcclxuICAgICAgbWFyZ2luLWxlZnQ6IC0wLjM3NXJlbTtcclxuICAgIH1cclxuXHJcbiAgICAubXV4aW1hLWF2YXRhci1ncm91cC1zbSA6Om5nLWRlZXAgbXV4aW1hLWF2YXRhciB7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAtMC41cmVtO1xyXG4gICAgfVxyXG5cclxuICAgIC5tdXhpbWEtYXZhdGFyLWdyb3VwLW1kIDo6bmctZGVlcCBtdXhpbWEtYXZhdGFyIHtcclxuICAgICAgbWFyZ2luLWxlZnQ6IC0wLjYyNXJlbTtcclxuICAgIH1cclxuXHJcbiAgICAubXV4aW1hLWF2YXRhci1ncm91cC1sZyA6Om5nLWRlZXAgbXV4aW1hLWF2YXRhciB7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAtMC43NXJlbTtcclxuICAgIH1cclxuXHJcbiAgICAubXV4aW1hLWF2YXRhci1ncm91cC14bCA6Om5nLWRlZXAgbXV4aW1hLWF2YXRhciB7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAtMXJlbTtcclxuICAgIH1cclxuXHJcbiAgICAubXV4aW1hLWF2YXRhci1ncm91cC0yeGwgOjpuZy1kZWVwIG11eGltYS1hdmF0YXIge1xyXG4gICAgICBtYXJnaW4tbGVmdDogLTEuMjVyZW07XHJcbiAgICB9XHJcbiAgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEF2YXRhckdyb3VwQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBtYXg/OiBudW1iZXI7XHJcbiAgQElucHV0KCkgc2l6ZTogJ3hzJyB8ICdzbScgfCAnbWQnIHwgJ2xnJyB8ICd4bCcgfCAnMnhsJyA9ICdtZCc7XHJcbiAgQElucHV0KCkgdG90YWxDb3VudDogbnVtYmVyID0gMDtcclxufVxyXG4iXX0=