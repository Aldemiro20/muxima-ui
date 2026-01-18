import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerDatepickerComponent, DateRange } from '@muxima-ui/datepicker';

@Component({
  selector: 'app-datepicker-doc',
  standalone: true,
  imports: [CommonModule, DatepickerDatepickerComponent],
  templateUrl: './datepicker-doc.component.html',
  styleUrls: ['./datepicker-doc.component.scss']
})
export class DatepickerDocComponent {
  copiedStates: { [key: string]: boolean } = {};

  selectedDate?: Date;
  selectedRange?: DateRange;
  minDate = new Date();
  maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

  constructor() {
    // Set minDate to yesterday to allow today
    this.minDate.setDate(this.minDate.getDate() - 1);
  }

  copyCode(code: string, key: string): void {
    navigator.clipboard.writeText(code);
    this.copiedStates[key] = true;
    setTimeout(() => {
      this.copiedStates[key] = false;
    }, 2000);
  }

  onDateSelect(date: Date): void {
    console.log('Data selecionada:', date);
  }

  onSingleDateChange(value: Date | DateRange): void {
    if (value instanceof Date) {
      this.selectedDate = value;
    }
  }

  onRangeDateChange(value: Date | DateRange): void {
    if (value && 'start' in value) {
      this.selectedRange = value as DateRange;
    }
  }

  getCodeExample(type: string): string {
    const examples: { [key: string]: string } = {
      import: `import { DatepickerDatepickerComponent } from '@muxima-ui/datepicker';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [DatepickerDatepickerComponent],
  template: \`...\`
})
export class ExampleComponent {}`,
      basic: `<muxima-datepicker
  [(value)]="selectedDate"
  placeholder="Selecione uma data"
  (dateSelect)="onDateSelect($event)">
</muxima-datepicker>`,
      range: `<muxima-datepicker
  mode="range"
  [(value)]="selectedRange"
  placeholder="Selecione um período"
  (valueChange)="onRangeChange($event)">
</muxima-datepicker>`,
      minmax: `<muxima-datepicker
  [(value)]="selectedDate"
  [minDate]="minDate"
  [maxDate]="maxDate"
  placeholder="Selecione dentro do período">
</muxima-datepicker>

// No TypeScript
minDate = new Date(); // Hoje
maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // +30 dias`,
      types: `import { DateRange } from '@muxima-ui/datepicker';

// Data única
selectedDate: Date | undefined;

// Período de datas
selectedRange: DateRange | undefined;

// Interface DateRange
interface DateRange {
  start: Date | null;
  end: Date | null;
}`,
      events: `<muxima-datepicker
  [(value)]="selectedDate"
  (valueChange)="onValueChange($event)"
  (dateSelect)="onDateSelect($event)">
</muxima-datepicker>

// No TypeScript
onValueChange(value: Date | DateRange): void {
  console.log('Valor alterado:', value);
}

onDateSelect(date: Date): void {
  console.log('Data clicada:', date);
}`
    };
    return examples[type] || '';
  }
}
