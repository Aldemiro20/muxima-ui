import { Component, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SliderRangeValue {
  min: number;
  max: number;
}

@Component({
  selector: 'muxima-slider-range',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider-range.component.html',
  styleUrls: ['./slider-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderRangeComponent),
      multi: true
    }
  ]
})
export class SliderRangeComponent implements ControlValueAccessor {
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() disabled = false;
  @Input() showTooltip = true;
  @Input() showTicks = false;
  @Input() ticksCount = 10;
  
  @Output() rangeChange = new EventEmitter<SliderRangeValue>();
  
  value: SliderRangeValue = { min: 0, max: 100 };
  isDraggingMin = false;
  isDraggingMax = false;
  
  private onChange: (value: SliderRangeValue) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: SliderRangeValue): void {
    if (value) {
      this.value = value;
    }
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

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.disabled || (!this.isDraggingMin && !this.isDraggingMax)) return;

    const slider = event.currentTarget as HTMLElement;
    const sliderElement = document.querySelector('.slider-track') as HTMLElement;
    if (!sliderElement) return;

    const rect = sliderElement.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    const value = this.percentToValue(percent);

    if (this.isDraggingMin) {
      this.value.min = Math.min(value, this.value.max - this.step);
    } else if (this.isDraggingMax) {
      this.value.max = Math.max(value, this.value.min + this.step);
    }

    this.emitValue();
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (this.isDraggingMin || this.isDraggingMax) {
      this.isDraggingMin = false;
      this.isDraggingMax = false;
      this.onTouched();
    }
  }

  onMinMouseDown(): void {
    if (!this.disabled) {
      this.isDraggingMin = true;
    }
  }

  onMaxMouseDown(): void {
    if (!this.disabled) {
      this.isDraggingMax = true;
    }
  }

  getMinPosition(): number {
    return ((this.value.min - this.min) / (this.max - this.min)) * 100;
  }

  getMaxPosition(): number {
    return ((this.value.max - this.min) / (this.max - this.min)) * 100;
  }

  getTicks(): number[] {
    const ticks: number[] = [];
    const tickStep = (this.max - this.min) / (this.ticksCount - 1);
    
    for (let i = 0; i < this.ticksCount; i++) {
      ticks.push(this.min + (tickStep * i));
    }
    
    return ticks;
  }

  getTickPosition(tickValue: number): number {
    return ((tickValue - this.min) / (this.max - this.min)) * 100;
  }

  private percentToValue(percent: number): number {
    const value = this.min + ((percent / 100) * (this.max - this.min));
    return Math.round(value / this.step) * this.step;
  }

  private emitValue(): void {
    this.onChange(this.value);
    this.rangeChange.emit(this.value);
  }
}
