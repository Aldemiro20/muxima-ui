import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class DialogService {
    constructor() {
        this.dialogState = {};
    }
    getDialogSubject(id) {
        if (!this.dialogState[id]) {
            this.dialogState[id] = new BehaviorSubject(false);
        }
        return this.dialogState[id];
    }
    isOpen$(id) {
        return this.getDialogSubject(id).asObservable();
    }
    open(id) {
        this.getDialogSubject(id).next(true);
    }
    close(id) {
        this.getDialogSubject(id).next(false);
    }
}
DialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DialogService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DialogService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: DialogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9vdmVybGF5L2RpYWxvZy9zcmMvbGliL2RpYWxvZy9kaWFsb2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUE7O0FBTXRDLE1BQU0sT0FBTyxhQUFhO0lBSjFCO1FBS1UsZ0JBQVcsR0FBNkMsRUFBRSxDQUFBO0tBcUJuRTtJQW5CUyxnQkFBZ0IsQ0FBQyxFQUFVO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUE7U0FDM0Q7UUFFRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDN0IsQ0FBQztJQUVELE9BQU8sQ0FBQyxFQUFVO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFBO0lBQ2pELENBQUM7SUFFRCxJQUFJLENBQUMsRUFBVTtRQUNiLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdEMsQ0FBQztJQUVELEtBQUssQ0FBQyxFQUFVO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN2QyxDQUFDOzsyR0FyQlUsYUFBYTsrR0FBYixhQUFhLGNBSFosTUFBTTs0RkFHUCxhQUFhO2tCQUp6QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJ1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIERpYWxvZ1NlcnZpY2Uge1xyXG4gIHByaXZhdGUgZGlhbG9nU3RhdGU6IFJlY29yZDxzdHJpbmcsIEJlaGF2aW9yU3ViamVjdDxib29sZWFuPj4gPSB7fVxyXG5cclxuICBwcml2YXRlIGdldERpYWxvZ1N1YmplY3QoaWQ6IHN0cmluZyk6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiB7XHJcbiAgICBpZiAoIXRoaXMuZGlhbG9nU3RhdGVbaWRdKSB7XHJcbiAgICAgIHRoaXMuZGlhbG9nU3RhdGVbaWRdID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5kaWFsb2dTdGF0ZVtpZF1cclxuICB9XHJcblxyXG4gIGlzT3BlbiQoaWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0RGlhbG9nU3ViamVjdChpZCkuYXNPYnNlcnZhYmxlKClcclxuICB9XHJcblxyXG4gIG9wZW4oaWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5nZXREaWFsb2dTdWJqZWN0KGlkKS5uZXh0KHRydWUpXHJcbiAgfVxyXG5cclxuICBjbG9zZShpZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmdldERpYWxvZ1N1YmplY3QoaWQpLm5leHQoZmFsc2UpXHJcbiAgfVxyXG59XHJcbiJdfQ==