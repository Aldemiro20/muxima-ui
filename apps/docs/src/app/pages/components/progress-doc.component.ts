import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressProgressComponent } from '@muxima-ui/progress';

@Component({
  selector: 'muxima-progress-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, ProgressProgressComponent],
  templateUrl: './progress-doc.component.html',
  styleUrls: ['./progress-doc.component.scss']
})
export class ProgressDocComponent {
  linearProgress = 45;
  circularProgress = 70;
  dynamicProgress = 0;
  isAnimating = false;

  copyCode(code: string) {
    navigator.clipboard.writeText(code);
  }

  animateProgress() {
    this.isAnimating = true;
    this.dynamicProgress = 0;
    const interval = setInterval(() => {
      this.dynamicProgress += 5;
      if (this.dynamicProgress >= 100) {
        clearInterval(interval);
        this.isAnimating = false;
      }
    }, 100);
  }

  get importCode() {
    return `import { ProgressProgressComponent } from '@muxima-ui/progress';

@Component({
  imports: [ProgressProgressComponent]
})`;
  }

  get basicLinearCode() {
    return `<muxima-progress 
  [value]="45" 
  [color]="'primary'"
  type="linear">
</muxima-progress>`;
  }

  get circularCode() {
    return `<muxima-progress 
  [value]="70" 
  [color]="'success'"
  type="circular"
  size="lg">
</muxima-progress>`;
  }
}

