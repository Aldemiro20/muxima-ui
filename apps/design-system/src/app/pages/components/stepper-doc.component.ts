import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent, Step } from '@muxima-ui/stepper';

@Component({
  selector: 'app-stepper-doc',
  standalone: true,
  imports: [CommonModule, StepperComponent],
  templateUrl: './stepper-doc.component.html',
  styleUrls: ['./stepper-doc.component.scss']
})
export class StepperDocComponent {
  currentStep = 0;
  currentStepVertical = 0;
  currentStepIcons = 0;
  currentStepForm = 0;

  basicSteps: Step[] = [
    { label: 'Personal Information', description: 'Enter your details' },
    { label: 'Address', description: 'Enter your address' },
    { label: 'Payment', description: 'Payment information' },
    { label: 'Review', description: 'Review and confirm' }
  ];

  verticalSteps: Step[] = [
    { label: 'Account Setup', description: 'Create your account with email and password' },
    { label: 'Profile Details', description: 'Add your personal information and profile picture' },
    { label: 'Preferences', description: 'Set your notification and privacy preferences' },
    { label: 'Verification', description: 'Verify your email address' }
  ];

  iconSteps: Step[] = [
    { label: 'Choose Plan', description: 'Select your subscription', icon: '📦' },
    { label: 'Payment', description: 'Enter payment details', icon: '💳' },
    { label: 'Confirm', description: 'Review your order', icon: '✓' },
    { label: 'Complete', description: 'All done!', icon: '🎉' }
  ];

  formSteps: Step[] = [
    { label: 'Email', description: 'Enter your email address', completed: false },
    { label: 'Password', description: 'Create a secure password', completed: false },
    { label: 'Profile', description: 'Complete your profile', completed: false, disabled: true },
    { label: 'Done', description: 'Registration complete', completed: false, disabled: true }
  ];

  onStepChange(step: number): void {
    this.currentStep = step;
    console.log('Step changed to:', step);
  }

  nextStep(): void {
    if (this.currentStep < this.basicSteps.length - 1) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  nextFormStep(): void {
    if (this.currentStepForm < this.formSteps.length - 1) {
      // Mark current step as completed
      this.formSteps[this.currentStepForm].completed = true;
      
      // Enable next step
      if (this.currentStepForm + 1 < this.formSteps.length) {
        this.formSteps[this.currentStepForm + 1].disabled = false;
      }
      
      this.currentStepForm++;
    }
  }

  previousFormStep(): void {
    if (this.currentStepForm > 0) {
      this.currentStepForm--;
    }
  }

  getCodeExample(type: string): string {
    const examples: Record<string, string> = {
      import: `import { StepperComponent, Step } from '@muxima-ui/stepper';

@Component({
  standalone: true,
  imports: [StepperComponent]
})`,
      basic: `<muxima-stepper
  [steps]="steps"
  [currentStep]="currentStep"
  (stepChange)="onStepChange($event)"
></muxima-stepper>`,
      basicSteps: `steps: Step[] = [
  { label: 'Personal Information', description: 'Enter your details' },
  { label: 'Address', description: 'Enter your address' },
  { label: 'Payment', description: 'Payment information' },
  { label: 'Review', description: 'Review and confirm' }
];

currentStep = 0;

onStepChange(step: number) {
  this.currentStep = step;
}`,
      vertical: `<muxima-stepper
  [steps]="steps"
  [currentStep]="currentStep"
  orientation="vertical"
></muxima-stepper>`,
      icons: `<muxima-stepper
  [steps]="iconSteps"
  [currentStep]="currentStep"
></muxima-stepper>

iconSteps: Step[] = [
  { label: 'Choose Plan', description: 'Select subscription', icon: '📦' },
  { label: 'Payment', description: 'Enter payment details', icon: '💳' },
  { label: 'Confirm', description: 'Review your order', icon: '✓' },
  { label: 'Complete', description: 'All done!', icon: '🎉' }
];`,
      disabled: `steps: Step[] = [
  { label: 'Step 1', completed: false },
  { label: 'Step 2', completed: false, disabled: true },
  { label: 'Step 3', completed: false, disabled: true }
];

// Enable next step after completing current
completeStep() {
  this.steps[this.currentStep].completed = true;
  if (this.currentStep + 1 < this.steps.length) {
    this.steps[this.currentStep + 1].disabled = false;
  }
}`
    };
    return examples[type] || '';
  }
}
