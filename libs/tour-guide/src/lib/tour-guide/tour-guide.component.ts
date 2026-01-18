import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TourStep {
  id: string;
  title: string;
  content: string;
  target: string; // CSS selector
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: () => void;
  showBackButton?: boolean;
  showNextButton?: boolean;
  showSkipButton?: boolean;
  highlightPadding?: number;
  disableInteraction?: boolean;
}

@Component({
  selector: 'muxima-tour-guide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tour-guide.component.html',
  styleUrls: ['./tour-guide.component.scss']
})
export class TourGuideComponent implements OnInit, OnDestroy {
  @Input() steps: TourStep[] = [];
  @Input() showProgress: boolean = true;
  @Input() showStepNumbers: boolean = true;
  @Input() backdropColor: string = 'rgba(0, 0, 0, 0.7)';
  @Input() highlightColor: string = '#667eea';
  @Input() autoStart: boolean = false;
  @Input() exitOnEsc: boolean = true;
  @Input() exitOnOverlayClick: boolean = false;
  
  @Output() tourStarted = new EventEmitter<void>();
  @Output() tourCompleted = new EventEmitter<void>();
  @Output() tourSkipped = new EventEmitter<number>();
  @Output() stepChanged = new EventEmitter<{ step: TourStep; index: number }>();

  @ViewChild('tooltipElement', { read: ElementRef }) tooltipElement?: ElementRef;

  isActive = false;
  currentStepIndex = 0;
  currentStep?: TourStep;
  
  tooltipPosition = { top: '0px', left: '0px' };
  highlightPosition = { top: '0px', left: '0px', width: '0px', height: '0px' };
  arrowPosition = '';

  private targetElement?: HTMLElement;
  private resizeObserver?: ResizeObserver;
  private keydownListener?: () => void;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.autoStart && this.steps.length > 0) {
      this.start();
    }

    if (this.exitOnEsc) {
      this.keydownListener = this.renderer.listen('document', 'keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape' && this.isActive) {
          this.skip();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.cleanup();
    if (this.keydownListener) {
      this.keydownListener();
    }
  }

  start(): void {
    if (this.steps.length === 0) return;
    
    this.isActive = true;
    this.currentStepIndex = 0;
    this.showStep(0);
    this.tourStarted.emit();
    
    // Prevent body scroll
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  next(): void {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      this.showStep(this.currentStepIndex);
    } else {
      this.complete();
    }
  }

  previous(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.showStep(this.currentStepIndex);
    }
  }

  skip(): void {
    this.tourSkipped.emit(this.currentStepIndex);
    this.cleanup();
  }

  complete(): void {
    this.tourCompleted.emit();
    this.cleanup();
  }

  goToStep(index: number): void {
    if (index >= 0 && index < this.steps.length) {
      this.currentStepIndex = index;
      this.showStep(index);
    }
  }

  private showStep(index: number): void {
    this.currentStep = this.steps[index];
    
    // Execute step action
    if (this.currentStep.action) {
      this.currentStep.action();
    }

    // Find target element
    if (this.currentStep.target) {
      this.targetElement = document.querySelector(this.currentStep.target) as HTMLElement;
      
      if (this.targetElement) {
        this.highlightTarget();
        this.positionTooltip();
        
        // Scroll target into view
        this.targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Watch for target resize
        this.setupResizeObserver();
      } else {
        console.warn(`Tour Guide: Target element not found: ${this.currentStep.target}`);
      }
    }

    this.stepChanged.emit({ step: this.currentStep, index });
  }

  private highlightTarget(): void {
    if (!this.targetElement) return;

    const rect = this.targetElement.getBoundingClientRect();
    const padding = this.currentStep?.highlightPadding || 8;

    this.highlightPosition = {
      top: `${rect.top - padding}px`,
      left: `${rect.left - padding}px`,
      width: `${rect.width + padding * 2}px`,
      height: `${rect.height + padding * 2}px`
    };
  }

  private positionTooltip(): void {
    if (!this.targetElement || !this.currentStep) return;

    const targetRect = this.targetElement.getBoundingClientRect();
    const padding = 16;
    const placement = this.currentStep.placement || 'bottom';

    setTimeout(() => {
      if (!this.tooltipElement) return;
      
      const tooltipRect = this.tooltipElement.nativeElement.getBoundingClientRect();
      let top = 0;
      let left = 0;

      switch (placement) {
        case 'top':
          top = targetRect.top - tooltipRect.height - padding;
          left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          this.arrowPosition = 'bottom';
          break;
        
        case 'bottom':
          top = targetRect.bottom + padding;
          left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          this.arrowPosition = 'top';
          break;
        
        case 'left':
          top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          left = targetRect.left - tooltipRect.width - padding;
          this.arrowPosition = 'right';
          break;
        
        case 'right':
          top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          left = targetRect.right + padding;
          this.arrowPosition = 'left';
          break;
        
        case 'center':
          top = window.innerHeight / 2 - tooltipRect.height / 2;
          left = window.innerWidth / 2 - tooltipRect.width / 2;
          this.arrowPosition = '';
          break;
      }

      // Keep tooltip within viewport
      top = Math.max(padding, Math.min(top, window.innerHeight - tooltipRect.height - padding));
      left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));

      this.tooltipPosition = {
        top: `${top}px`,
        left: `${left}px`
      };
    }, 0);
  }

  private setupResizeObserver(): void {
    this.cleanupResizeObserver();

    if (this.targetElement && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        this.highlightTarget();
        this.positionTooltip();
      });
      
      this.resizeObserver.observe(this.targetElement);
    }
  }

  private cleanupResizeObserver(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = undefined;
    }
  }

  private cleanup(): void {
    this.isActive = false;
    this.currentStep = undefined;
    this.currentStepIndex = 0;
    this.targetElement = undefined;
    
    this.cleanupResizeObserver();
    
    // Restore body scroll
    this.renderer.removeStyle(document.body, 'overflow');
  }

  onOverlayClick(): void {
    if (this.exitOnOverlayClick) {
      this.skip();
    }
  }

  getProgress(): number {
    return ((this.currentStepIndex + 1) / this.steps.length) * 100;
  }

  getStepNumber(): string {
    return `${this.currentStepIndex + 1} de ${this.steps.length}`;
  }

  hasBackButton(): boolean {
    return this.currentStep?.showBackButton !== false && this.currentStepIndex > 0;
  }

  hasNextButton(): boolean {
    return this.currentStep?.showNextButton !== false;
  }

  hasSkipButton(): boolean {
    return this.currentStep?.showSkipButton !== false;
  }

  isLastStep(): boolean {
    return this.currentStepIndex === this.steps.length - 1;
  }
}
