import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class ProgressDocComponent implements OnInit, OnDestroy {
  // Linear variants
  linearProgress = 45;
  stripedProgress = 60;
  animatedProgress = 75;
  labelProgress = 50;
  
  // Circular variants
  circularProgress = 70;
  circularSmall = 35;
  circularLarge = 85;
  
  // Size variants
  smallProgress = 40;
  mediumProgress = 60;
  largeProgress = 80;
  
  // Dynamic progress
  uploadProgress = 0;
  downloadProgress = 0;
  processingProgress = 0;
  
  // Multi-step progress
  currentStep = 2;
  totalSteps = 4;
  
  private intervals: any[] = [];

  ngOnInit() {
    this.startDynamicAnimations();
  }

  ngOnDestroy() {
    this.clearAllIntervals();
  }

  startDynamicAnimations() {
    // Upload simulation
    const uploadInterval = setInterval(() => {
      this.uploadProgress += Math.random() * 3;
      if (this.uploadProgress >= 100) {
        this.uploadProgress = 0;
      }
    }, 200);
    this.intervals.push(uploadInterval);

    // Download simulation
    const downloadInterval = setInterval(() => {
      this.downloadProgress += Math.random() * 2;
      if (this.downloadProgress >= 100) {
        this.downloadProgress = 0;
      }
    }, 300);
    this.intervals.push(downloadInterval);

    // Processing simulation
    const processingInterval = setInterval(() => {
      this.processingProgress += Math.random() * 1.5;
      if (this.processingProgress >= 100) {
        this.processingProgress = 0;
      }
    }, 250);
    this.intervals.push(processingInterval);
  }

  clearAllIntervals() {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals = [];
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  get stepProgress(): number {
    return ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
  }

  getCodeExample(type: string): string {
    const examples: { [key: string]: string } = {
      install: `npm install @muxima-ui/progress`,
      
      import: `import { ProgressProgressComponent } from '@muxima-ui/progress';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [ProgressProgressComponent],
  template: \`
    <muxima-progress [value]="progress"></muxima-progress>
  \`
})
export class MyComponent {
  progress = 50;
}`,

      linear: `<!-- Progress Linear Básico -->
<muxima-progress 
  [value]="45" 
  [color]="'primary'"
  type="linear">
</muxima-progress>`,

      linearTs: `export class MyComponent {
  linearProgress = 45;
  
  updateProgress(value: number) {
    this.linearProgress = value;
  }
}`,

      striped: `<!-- Progress com Listras -->
<muxima-progress 
  [value]="60" 
  [color]="'primary'"
  type="linear"
  [striped]="true">
</muxima-progress>`,

      animated: `<!-- Progress Animado com Listras -->
<muxima-progress 
  [value]="75" 
  [color]="'success'"
  type="linear"
  [striped]="true"
  [animated]="true">
</muxima-progress>`,

      label: `<!-- Progress com Label -->
<muxima-progress 
  [value]="50" 
  [color]="'primary'"
  type="linear"
  [showLabel]="true">
</muxima-progress>`,

      circular: `<!-- Progress Circular -->
<muxima-progress 
  [value]="70" 
  [color]="'primary'"
  type="circular"
  size="lg">
</muxima-progress>`,

      colors: `<!-- Diferentes Cores -->
<muxima-progress [value]="75" [color]="'primary'"></muxima-progress>
<muxima-progress [value]="75" [color]="'success'"></muxima-progress>
<muxima-progress [value]="75" [color]="'warning'"></muxima-progress>
<muxima-progress [value]="75" [color]="'error'"></muxima-progress>`,

      sizes: `<!-- Diferentes Tamanhos -->
<muxima-progress [value]="40" size="sm"></muxima-progress>
<muxima-progress [value]="60" size="md"></muxima-progress>
<muxima-progress [value]="80" size="lg"></muxima-progress>`,

      dynamic: `<!-- Progress Dinâmico -->
<div class="upload-container">
  <h4>Upload: {{ uploadProgress.toFixed(0) }}%</h4>
  <muxima-progress 
    [value]="uploadProgress" 
    [color]="'primary'"
    [animated]="true">
  </muxima-progress>
</div>`,

      dynamicTs: `export class MyComponent {
  uploadProgress = 0;
  
  simulateUpload() {
    const interval = setInterval(() => {
      this.uploadProgress += Math.random() * 3;
      if (this.uploadProgress >= 100) {
        clearInterval(interval);
        this.uploadProgress = 100;
      }
    }, 200);
  }
}`,

      steps: `<!-- Multi-Step Progress -->
<div class="steps-container">
  <div class="steps-header">
    Passo {{ currentStep }} de {{ totalSteps }}
  </div>
  <muxima-progress 
    [value]="stepProgress" 
    [color]="'success'"
    [showLabel]="true">
  </muxima-progress>
  <div class="steps-actions">
    <button (click)="previousStep()" [disabled]="currentStep === 1">
      Anterior
    </button>
    <button (click)="nextStep()" [disabled]="currentStep === totalSteps">
      Próximo
    </button>
  </div>
</div>`,

      stepsTs: `export class MyComponent {
  currentStep = 1;
  totalSteps = 4;
  
  get stepProgress(): number {
    return ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
  }
  
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }
  
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}`,

      scss: `.custom-progress {
  ::ng-deep muxima-progress {
    .progress-bar {
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }
    
    .progress-container {
      background: #f3f4f6;
      border-radius: 12px;
      padding: 2px;
    }
  }
}

.circular-custom {
  ::ng-deep muxima-progress {
    circle {
      stroke-width: 8;
      filter: drop-shadow(0 2px 8px rgba(102, 126, 234, 0.4));
    }
  }
}`
    };

    return examples[type] || '';
  }
}

