import { Component, Input, TemplateRef, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'agt-accordion',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccordionComponent),
      multi: true,
    },
  ],
   animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      state('expanded', style({ height: '*', opacity: 1, overflow: 'hidden' })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ]),
    ]),
  ]
})
export class AccordionComponent implements ControlValueAccessor {
  @Input() title = ''; // Title of the accordion
  @Input() subtitle = ''; // Subtitle of the accordion
  @Input() icon?: TemplateRef<void>; // Optional icon
  @Input() iconUrl: string | null = null;
  @Input() expanded = false; // Whether the accordion is expanded
  @Input() checked = false;
  @Input() disabled = false;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'sm';
  @Input() children: any[] = [];
  @Input() isChild: boolean = false;
@Input() childLevel: number = 0;



  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  toggleCheck() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.onChange(this.checked); // Notify the form control of the change
      this.onTouched(); // Mark as touched
    }
  }

 toggleAccordion(): void {
    this.expanded = !this.expanded;
}


  // ControlValueAccessor methods
  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  getPaddingClass(): string {
  if (!this.isChild || !this.expanded) return '';
  return `padding-level-${this.childLevel || 1}`;
}

}
