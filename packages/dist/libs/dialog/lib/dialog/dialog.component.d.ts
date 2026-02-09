import { DialogService } from './dialog.service';
import * as i0 from "@angular/core";
export declare class DialogComponent {
    private dialogService;
    id: string;
    title: string;
    subtitle?: string;
    icon?: string;
    isOpen: boolean;
    constructor(dialogService: DialogService);
    ngOnInit(): void;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DialogComponent, "muxima-dialog", never, { "id": "id"; "title": "title"; "subtitle": "subtitle"; "icon": "icon"; }, {}, never, ["*"], true, never>;
}
