import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Step {
  label: string;
  description?: string;
  icon?: string;
  completed?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'muxima-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  @Input() steps: Step[] = [];
  @Input() currentStep = 0;
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() clickable = true;

  @Output() stepChange = new EventEmitter<number>();

  isActive(index: number): boolean {
    return this.currentStep === index;
  }

  isCompleted(index: number): boolean {
    return index < this.currentStep || this.steps[index]?.completed === true;
  }

  isDisabled(index: number): boolean {
    return this.steps[index]?.disabled === true;
  }

  goToStep(index: number): void {
    if (!this.clickable || this.isDisabled(index)) {
      return;
    }
    this.currentStep = index;
    this.stepChange.emit(index);
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      const nextIndex = this.currentStep + 1;
      if (!this.isDisabled(nextIndex)) {
        this.currentStep = nextIndex;
        this.stepChange.emit(nextIndex);
      }
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      const prevIndex = this.currentStep - 1;
      if (!this.isDisabled(prevIndex)) {
        this.currentStep = prevIndex;
        this.stepChange.emit(prevIndex);
      }
    }
  }

  canGoNext(): boolean {
    return this.currentStep < this.steps.length - 1 && 
           !this.isDisabled(this.currentStep + 1);
  }

  canGoPrevious(): boolean {
    return this.currentStep > 0 && 
           !this.isDisabled(this.currentStep - 1);
  }
}

