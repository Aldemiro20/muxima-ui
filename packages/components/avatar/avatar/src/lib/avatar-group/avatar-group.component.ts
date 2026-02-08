import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'muxima-avatar-group',
  standalone: true,
  imports: [CommonModule],
  template: `
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
  `,
  styles: [`
    .muxima-avatar-group {
      display: flex;
      align-items: center;
      position: relative;

      ::ng-deep muxima-avatar {
        margin-left: -0.5rem;
        transition: all 0.2s;
        position: relative;

        &:first-child {
          margin-left: 0;
        }

        &:hover {
          transform: translateY(-4px);
          z-index: 10;
        }
      }

      .muxima-avatar-more {
        background: linear-gradient(135deg, #64748B, #475569);
        cursor: pointer;

        &:hover {
          transform: translateY(-4px) scale(1.05);
        }
      }
    }

    .muxima-avatar-group-xs ::ng-deep muxima-avatar {
      margin-left: -0.375rem;
    }

    .muxima-avatar-group-sm ::ng-deep muxima-avatar {
      margin-left: -0.5rem;
    }

    .muxima-avatar-group-md ::ng-deep muxima-avatar {
      margin-left: -0.625rem;
    }

    .muxima-avatar-group-lg ::ng-deep muxima-avatar {
      margin-left: -0.75rem;
    }

    .muxima-avatar-group-xl ::ng-deep muxima-avatar {
      margin-left: -1rem;
    }

    .muxima-avatar-group-2xl ::ng-deep muxima-avatar {
      margin-left: -1.25rem;
    }
  `]
})
export class AvatarGroupComponent {
  @Input() max?: number;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md';
  @Input() totalCount: number = 0;
}
