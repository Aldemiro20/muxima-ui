import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class DrawerService {
    constructor() {
        this.openDrawerSubject = new Subject();
        this.closeDrawerSubject = new Subject();
        this.openDrawer$ = this.openDrawerSubject.asObservable();
        this.closeDrawer$ = this.closeDrawerSubject.asObservable();
    }
    open(config = {}, content) {
        const afterClosed = new Subject();
        this.openDrawerSubject.next({ config, content });
        return {
            close: () => {
                this.closeDrawerSubject.next();
                afterClosed.complete();
            },
            afterClosed
        };
    }
    close() {
        this.closeDrawerSubject.next();
    }
}
DrawerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DrawerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DrawerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DrawerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DrawerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9vdmVybGF5L2RyYXdlci9zcmMvbGliL2RyYXdlci9kcmF3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBa0IvQixNQUFNLE9BQU8sYUFBYTtJQUgxQjtRQUlVLHNCQUFpQixHQUFHLElBQUksT0FBTyxFQUEyQyxDQUFDO1FBQzNFLHVCQUFrQixHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFFakQsZ0JBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEQsaUJBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7S0FtQnZEO0lBakJDLElBQUksQ0FBQyxTQUF1QixFQUFFLEVBQUUsT0FBYTtRQUMzQyxNQUFNLFdBQVcsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBRXZDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUVqRCxPQUFPO1lBQ0wsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDVixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQy9CLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN6QixDQUFDO1lBQ0QsV0FBVztTQUNaLENBQUM7SUFDSixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzsyR0F2QlUsYUFBYTsrR0FBYixhQUFhLGNBRlosTUFBTTs0RkFFUCxhQUFhO2tCQUh6QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEcmF3ZXJDb25maWcge1xyXG4gIHBvc2l0aW9uPzogJ2xlZnQnIHwgJ3JpZ2h0JyB8ICd0b3AnIHwgJ2JvdHRvbSc7XHJcbiAgc2l6ZT86IHN0cmluZztcclxuICBoYXNCYWNrZHJvcD86IGJvb2xlYW47XHJcbiAgY2xvc2VPbkJhY2tkcm9wQ2xpY2s/OiBib29sZWFuO1xyXG4gIGNsb3NlT25Fc2NhcGU/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERyYXdlclJlZiB7XHJcbiAgY2xvc2U6ICgpID0+IHZvaWQ7XHJcbiAgYWZ0ZXJDbG9zZWQ6IFN1YmplY3Q8YW55PjtcclxufVxyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRHJhd2VyU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBvcGVuRHJhd2VyU3ViamVjdCA9IG5ldyBTdWJqZWN0PHsgY29uZmlnOiBEcmF3ZXJDb25maWc7IGNvbnRlbnQ/OiBhbnkgfT4oKTtcclxuICBwcml2YXRlIGNsb3NlRHJhd2VyU3ViamVjdCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIG9wZW5EcmF3ZXIkID0gdGhpcy5vcGVuRHJhd2VyU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICBjbG9zZURyYXdlciQgPSB0aGlzLmNsb3NlRHJhd2VyU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgb3Blbihjb25maWc6IERyYXdlckNvbmZpZyA9IHt9LCBjb250ZW50PzogYW55KTogRHJhd2VyUmVmIHtcclxuICAgIGNvbnN0IGFmdGVyQ2xvc2VkID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgXHJcbiAgICB0aGlzLm9wZW5EcmF3ZXJTdWJqZWN0Lm5leHQoeyBjb25maWcsIGNvbnRlbnQgfSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2xvc2U6ICgpID0+IHtcclxuICAgICAgICB0aGlzLmNsb3NlRHJhd2VyU3ViamVjdC5uZXh0KCk7XHJcbiAgICAgICAgYWZ0ZXJDbG9zZWQuY29tcGxldGUoKTtcclxuICAgICAgfSxcclxuICAgICAgYWZ0ZXJDbG9zZWRcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2xvc2VEcmF3ZXJTdWJqZWN0Lm5leHQoKTtcclxuICB9XHJcbn1cclxuIl19