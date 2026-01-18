import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-in', style({ opacity: 1 }))
  ])
]);

@Component({
  selector: 'muxima-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'muximaAlert',
  imports: [CommonModule],
  animations:[fadeIn],
  standalone: true
})
export class MuximaAlertComponent implements OnChanges, OnInit, OnDestroy {
  static ngAcceptInputType_dismissible: boolean;
  static ngAcceptInputType_dismissed: boolean;
  static ngAcceptInputType_showIcon: boolean;

  @Input() appearance: 'soft' | 'border' | 'fill' | 'outline' = 'soft';
  @Input() dismissed: boolean = false;
  @Input() dismissible: boolean = false;
  @Input() name: string = Math.random().toString(36).substring(2, 15);
  @Input() showIcon: boolean = true;
  @Input() type: 'primary' | 'accent' | 'warn' | 'basic' | 'info' | 'success' | 'warning' | 'error' = 'primary';
  @Output() readonly dismissedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  @HostBinding('class') get classList(): any {
    return {
      'muxima-alert-appearance-border': this.appearance === 'border',
      'muxima-alert-appearance-fill': this.appearance === 'fill',
      'muxima-alert-appearance-outline': this.appearance === 'outline',
      'muxima-alert-appearance-soft': this.appearance === 'soft',
      'muxima-alert-dismissed': this.dismissed,
      'muxima-alert-dismissible': this.dismissible,
      'muxima-alert-show-icon': this.showIcon,
      'muxima-alert-type-primary': this.type === 'primary',
      'muxima-alert-type-accent': this.type === 'accent',
      'muxima-alert-type-warn': this.type === 'warn',
      'muxima-alert-type-basic': this.type === 'basic',
      'muxima-alert-type-info': this.type === 'info',
      'muxima-alert-type-success': this.type === 'success',
      'muxima-alert-type-warning': this.type === 'warning',
      'muxima-alert-type-error': this.type === 'error'
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('dismissed' in changes) {
      this.dismissed = !!changes['dismissed'].currentValue;
      this._toggleDismiss(this.dismissed);
    }
    if ('dismissible' in changes) {
      this.dismissible = !!changes['dismissible'].currentValue;
    }
    if ('showIcon' in changes) {
      this.showIcon = !!changes['showIcon'].currentValue;
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  dismiss(): void {
    if (this.dismissed) {
      return;
    }
    this._toggleDismiss(true);
  }

  show(): void {
    if (!this.dismissed) {
      return;
    }
    this._toggleDismiss(false);
  }

  private _toggleDismiss(dismissed: boolean): void {
    if (!this.dismissible) {
      return;
    }
    this.dismissed = dismissed;
    this.dismissedChanged.next(this.dismissed);
    this._changeDetectorRef.markForCheck();
  }
}