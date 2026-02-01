import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'muxima-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline-timeline.component.html',
  styleUrls: ['./timeline-timeline.component.scss'],
})
export class TimelineTimelineComponent {
  @Input() items: TimelineItem[] = [];
  @Input() mode: 'vertical' | 'horizontal' = 'vertical';
  @Input() align: 'left' | 'alternate' | 'right' = 'left';
  @Input() showConnector = true;
  @Input() animated = true;
}
