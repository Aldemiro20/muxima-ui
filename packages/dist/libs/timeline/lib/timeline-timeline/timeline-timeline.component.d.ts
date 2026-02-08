import * as i0 from "@angular/core";
export interface TimelineItem {
    title: string;
    description?: string;
    date?: string;
    time?: string;
    icon?: string;
    status?: 'completed' | 'current' | 'upcoming' | 'error';
    color?: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'gray';
    customColor?: string;
}
export declare class TimelineTimelineComponent {
    items: TimelineItem[];
    mode: 'vertical' | 'horizontal';
    align: 'left' | 'alternate' | 'right';
    showConnector: boolean;
    animated: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimelineTimelineComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TimelineTimelineComponent, "muxima-timeline", never, { "items": "items"; "mode": "mode"; "align": "align"; "showConnector": "showConnector"; "animated": "animated"; }, {}, never, never, true, never>;
}
