import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class ConfirmationDialogService {
    constructor() {
        this.openDialogSubject = new Subject();
        this.dialogResultSubject = new Subject();
        this.openDialog$ = this.openDialogSubject.asObservable();
        this.dialogResult$ = this.dialogResultSubject.asObservable();
    }
    confirm(config) {
        return new Promise((resolve) => {
            this.openDialogSubject.next(config);
            const subscription = this.dialogResult$.subscribe((result) => {
                resolve(result.confirmed);
                subscription.unsubscribe();
            });
        });
    }
    sendResult(confirmed) {
        this.dialogResultSubject.next({ confirmed });
    }
}
ConfirmationDialogService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ConfirmationDialogService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfirmationDialogService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ConfirmationDialogService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ConfirmationDialogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWF0aW9uLWRpYWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vb3ZlcmxheS9jb25maXJtYXRpb24tZGlhbG9nL3NyYy9saWIvY29uZmlybWF0aW9uLWRpYWxvZy9jb25maXJtYXRpb24tZGlhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQW9CL0IsTUFBTSxPQUFPLHlCQUF5QjtJQUh0QztRQUlVLHNCQUFpQixHQUFHLElBQUksT0FBTyxFQUFzQixDQUFDO1FBQ3RELHdCQUFtQixHQUFHLElBQUksT0FBTyxFQUFzQixDQUFDO1FBRWhFLGdCQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BELGtCQUFhLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxDQUFDO0tBZ0J6RDtJQWRDLE9BQU8sQ0FBQyxNQUEwQjtRQUNoQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVwQyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUMzRCxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMxQixZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxVQUFVLENBQUMsU0FBa0I7UUFDM0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7dUhBcEJVLHlCQUF5QjsySEFBekIseUJBQXlCLGNBRnhCLE1BQU07NEZBRVAseUJBQXlCO2tCQUhyQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuZXhwb3J0IHR5cGUgQ29uZmlybWF0aW9uVmFyaWFudCA9ICdpbmZvJyB8ICd3YXJuaW5nJyB8ICdkYW5nZXInIHwgJ3N1Y2Nlc3MnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb25maXJtYXRpb25Db25maWcge1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgbWVzc2FnZTogc3RyaW5nO1xyXG4gIHZhcmlhbnQ/OiBDb25maXJtYXRpb25WYXJpYW50O1xyXG4gIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xyXG4gIGNhbmNlbFRleHQ/OiBzdHJpbmc7XHJcbiAgaWNvbj86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb25maXJtYXRpb25SZXN1bHQge1xyXG4gIGNvbmZpcm1lZDogYm9vbGVhbjtcclxufVxyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29uZmlybWF0aW9uRGlhbG9nU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBvcGVuRGlhbG9nU3ViamVjdCA9IG5ldyBTdWJqZWN0PENvbmZpcm1hdGlvbkNvbmZpZz4oKTtcclxuICBwcml2YXRlIGRpYWxvZ1Jlc3VsdFN1YmplY3QgPSBuZXcgU3ViamVjdDxDb25maXJtYXRpb25SZXN1bHQ+KCk7XHJcblxyXG4gIG9wZW5EaWFsb2ckID0gdGhpcy5vcGVuRGlhbG9nU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICBkaWFsb2dSZXN1bHQkID0gdGhpcy5kaWFsb2dSZXN1bHRTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICBjb25maXJtKGNvbmZpZzogQ29uZmlybWF0aW9uQ29uZmlnKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgdGhpcy5vcGVuRGlhbG9nU3ViamVjdC5uZXh0KGNvbmZpZyk7XHJcblxyXG4gICAgICBjb25zdCBzdWJzY3JpcHRpb24gPSB0aGlzLmRpYWxvZ1Jlc3VsdCQuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcclxuICAgICAgICByZXNvbHZlKHJlc3VsdC5jb25maXJtZWQpO1xyXG4gICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2VuZFJlc3VsdChjb25maXJtZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuZGlhbG9nUmVzdWx0U3ViamVjdC5uZXh0KHsgY29uZmlybWVkIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=