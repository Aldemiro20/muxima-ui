import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from '@agt-ui/checkbox';

@Component({
  selector: 'app-checkbox-doc',
  standalone: true,
  imports: [CommonModule, CheckboxComponent],
  templateUrl: './checkbox-doc.component.html',
  styleUrls: ['./checkbox-doc.component.scss'],
})
export class CheckboxDocComponent implements OnInit {
  copiedStates: { [key: string]: boolean } = {};
  codeExamples: { [key: string]: string } = {};
  
  // Estados dos checkboxes para exemplos interativos
  basicChecked = false;
  agreeTerms = false;
  subscribeNewsletter = true;
  notifications = {
    email: true,
    sms: false,
    push: true,
  };
  selectAll = false;
  items = [
    { id: 1, name: 'Item 1', checked: false },
    { id: 2, name: 'Item 2', checked: false },
    { id: 3, name: 'Item 3', checked: false },
  ];

  ngOnInit() {
    this.initializeCodeExamples();
  }

  initializeCodeExamples() {
    this.codeExamples = {
      basic: `<muxima-checkbox 
  [checked]="basicChecked"
  (click)="basicChecked = !basicChecked">
</muxima-checkbox>`,
      
      withLabel: `<muxima-checkbox 
  label="Aceito os termos e condições"
  [checked]="agreeTerms"
  (click)="agreeTerms = !agreeTerms">
</muxima-checkbox>`,

      withDescription: `<muxima-checkbox 
  label="Receber notificações"
  description="Você receberá atualizações sobre novos recursos e ofertas"
  [checked]="subscribeNewsletter"
  (click)="subscribeNewsletter = !subscribeNewsletter">
</muxima-checkbox>`,

      sizes: `<!-- Small -->
<muxima-checkbox label="Small" size="sm" [checked]="true"></muxima-checkbox>

<!-- Medium (padrão) -->
<muxima-checkbox label="Medium" size="md" [checked]="true"></muxima-checkbox>

<!-- Large -->
<muxima-checkbox label="Large" size="lg" [checked]="true"></muxima-checkbox>

<!-- Extra Large -->
<muxima-checkbox label="Extra Large" size="xl" [checked]="true"></muxima-checkbox>`,

      variants: `<!-- Default -->
<muxima-checkbox label="Default" variant="default" [checked]="true"></muxima-checkbox>

<!-- Primary -->
<muxima-checkbox label="Primary" variant="primary" [checked]="true"></muxima-checkbox>

<!-- Success -->
<muxima-checkbox label="Success" variant="success" [checked]="true"></muxima-checkbox>

<!-- Danger -->
<muxima-checkbox label="Danger" variant="danger" [checked]="true"></muxima-checkbox>

<!-- Warning -->
<muxima-checkbox label="Warning" variant="warning" [checked]="true"></muxima-checkbox>`,

      states: `<!-- Normal -->
<muxima-checkbox label="Normal State" [checked]="true"></muxima-checkbox>

<!-- Desabilitado (Unchecked) -->
<muxima-checkbox label="Disabled Unchecked" [disabled]="true"></muxima-checkbox>

<!-- Desabilitado (Checked) -->
<muxima-checkbox label="Disabled Checked" [checked]="true" [disabled]="true"></muxima-checkbox>

<!-- Indeterminado -->
<muxima-checkbox label="Indeterminate" [indeterminate]="true"></muxima-checkbox>`,

      group: `<div class="checkbox-group">
  <h3>Notificações</h3>
  <muxima-checkbox 
    label="E-mail" 
    description="Receber notificações por e-mail"
    [(checked)]="notifications.email">
  </muxima-checkbox>
  <muxima-checkbox 
    label="SMS" 
    description="Receber notificações por SMS"
    [(checked)]="notifications.sms">
  </muxima-checkbox>
  <muxima-checkbox 
    label="Push" 
    description="Receber notificações push"
    [(checked)]="notifications.push">
  </muxima-checkbox>
</div>`,

      selectAllPattern: `<div class="select-all-pattern">
  <muxima-checkbox 
    label="Selecionar Todos"
    [checked]="selectAll"
    [indeterminate]="someItemsSelected()"
    (click)="toggleSelectAll()">
  </muxima-checkbox>
  
  <div class="items-list">
    <muxima-checkbox 
      *ngFor="let item of items"
      [label]="item.name"
      [checked]="item.checked"
      (click)="toggleItem(item)">
    </muxima-checkbox>
  </div>
</div>`,

      forms: `import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

export class MyComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      agreeTerms: [false],
      subscribe: [true],
    });
  }
}

<!-- Template -->
<form [formGroup]="form">
  <muxima-checkbox 
    label="Aceito os termos"
    formControlName="agreeTerms">
  </muxima-checkbox>
  
  <muxima-checkbox 
    label="Receber newsletter"
    formControlName="subscribe">
  </muxima-checkbox>
</form>`,
    };
  }

  copyCode(example: string) {
    const code = this.codeExamples[example as string];
    navigator.clipboard.writeText(code);
    this.copiedStates[example] = true;
    setTimeout(() => {
      this.copiedStates[example] = false;
    }, 2000);
  }

  toggleSelectAll() {
    const newValue = !this.selectAll;
    this.selectAll = newValue;
    this.items.forEach(item => item.checked = newValue);
  }

  toggleItem(item: any) {
    item.checked = !item.checked;
    this.updateSelectAll();
  }

  updateSelectAll() {
    const checkedCount = this.items.filter(i => i.checked).length;
    this.selectAll = checkedCount === this.items.length;
  }

  someItemsSelected(): boolean {
    const checkedCount = this.items.filter(i => i.checked).length;
    return checkedCount > 0 && checkedCount < this.items.length;
  }
}
