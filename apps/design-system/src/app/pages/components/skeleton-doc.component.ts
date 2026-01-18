import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '@muxima-ui/skeleton';

@Component({
  selector: 'muxima-skeleton-doc',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  templateUrl: './skeleton-doc.component.html',
  styleUrls: ['./skeleton-doc.component.scss']
})
export class SkeletonDocComponent {
  showContent = false;

  toggleContent() {
    this.showContent = !this.showContent;
  }
}
