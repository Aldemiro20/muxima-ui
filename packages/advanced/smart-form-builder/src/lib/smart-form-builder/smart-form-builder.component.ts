import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { InputComponent } from '@muxima-ui/input';
import { SelectComponent } from '@muxima-ui/select';
import { RadioButtonComponent } from '@muxima-ui/radio-button';
import { CheckboxComponent } from '@muxima-ui/checkbox';

export interface FormFieldSchema {
  key: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'time' | 'file' | 'range' | 'color';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{ label: string; value: any }>;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  customValidators?: Array<(control: AbstractControl) => ValidationErrors | null>;
  defaultValue?: any;
  helpText?: string;
  dependsOn?: string; // Show field only if another field has value
  conditionalDisplay?: (formValue: any) => boolean;
  width?: 'full' | 'half' | 'third' | 'quarter';
  order?: number;
}

export interface FormSchema {
  title?: string;
  description?: string;
  fields: FormFieldSchema[];
  submitLabel?: string;
  cancelLabel?: string;
  layout?: 'vertical' | 'horizontal' | 'inline';
}

@Component({
  selector: 'muxima-smart-form-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, SelectComponent, RadioButtonComponent, CheckboxComponent],
  template: `
    <div class="smart-form-builder" [class.horizontal]="schema.layout === 'horizontal'" [class.inline]="schema.layout === 'inline'">
      <div class="form-header" *ngIf="schema.title || schema.description">
        <h2 *ngIf="schema.title">{{ schema.title }}</h2>
        <p *ngIf="schema.description">{{ schema.description }}</p>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-content">
        <div class="form-fields">
          <div 
            *ngFor="let field of sortedFields" 
            class="form-field"
            [class.field-full]="field.width === 'full'"
            [class.field-half]="field.width === 'half'"
            [class.field-third]="field.width === 'third'"
            [class.field-quarter]="field.width === 'quarter'"
            [class.field-hidden]="!isFieldVisible(field)">
            
            <!-- Text-based inputs using Muxima Input -->
            <muxima-input
              *ngIf="['text', 'email', 'password', 'tel', 'url', 'number'].includes(field.type)"
              [type]="getInputType(field.type)"
              [formControlName]="field.key"
              [placeholder]="field.placeholder || ''"
              [label]="field.label"
              [helperText]="field.helpText || ''"
              [hasError]="isFieldInvalid(field.key)"
              [errorMessage]="getErrorMessage(field)"
              [disabled]="field.disabled || false"
              [readonly]="false"
              variant="outlined">
            </muxima-input>

            <!-- Textarea -->
            <div *ngIf="field.type === 'textarea'" class="field-group">
              <label [for]="field.key" class="field-label">
                {{ field.label }}
                <span class="required-mark" *ngIf="field.required">*</span>
              </label>
              <textarea
                [id]="field.key"
                [formControlName]="field.key"
                [placeholder]="field.placeholder || ''"
                class="field-textarea"
                [class.error]="isFieldInvalid(field.key)"
                rows="4"></textarea>
              <small *ngIf="field.helpText && !isFieldInvalid(field.key)" class="help-text">
                {{ field.helpText }}
              </small>
              <small *ngIf="isFieldInvalid(field.key)" class="error-text">
                {{ getErrorMessage(field) }}
              </small>
            </div>

            <!-- Select using Muxima Select -->
            <muxima-select
              *ngIf="field.type === 'select'"
              [formControlName]="field.key"
              [placeholder]="field.placeholder || 'Selecione...'"
              [label]="field.label"
              [helperText]="field.helpText"
              [options]="field.options || []"
              [disabled]="field.disabled || false"
              variant="outlined">
            </muxima-select>

            <!-- Radio buttons using Muxima Radio Button -->
            <div *ngIf="field.type === 'radio'" class="field-radio-group">
              <label class="field-label">
                {{ field.label }}
                <span class="required-mark" *ngIf="field.required">*</span>
              </label>
              <div class="radio-options">
                <muxima-radio-button
                  *ngFor="let option of field.options"
                  [value]="option.value"
                  [label]="option.label"
                  [name]="field.key"
                  [formControlName]="field.key"
                  [disabled]="field.disabled || false"
                  size="md"
                  color="primary">
                </muxima-radio-button>
              </div>
              <small *ngIf="field.helpText && !isFieldInvalid(field.key)" class="help-text">
                {{ field.helpText }}
              </small>
              <small *ngIf="isFieldInvalid(field.key)" class="error-text">
                {{ getErrorMessage(field) }}
              </small>
            </div>

            <!-- Checkbox using Muxima Checkbox -->
            <muxima-checkbox
              *ngIf="field.type === 'checkbox'"
              [formControlName]="field.key"
              [label]="field.label"
              [description]="field.helpText || ''"
              [disabled]="field.disabled || false"
              variant="primary"
              size="md">
            </muxima-checkbox>

            <!-- Date/Time inputs using Muxima Input -->
            <muxima-input
              *ngIf="field.type === 'date' || field.type === 'time'"
              [type]="getInputType(field.type)"
              [formControlName]="field.key"
              [label]="field.label"
              [helperText]="field.helpText || ''"
              [hasError]="isFieldInvalid(field.key)"
              [errorMessage]="getErrorMessage(field)"
              [disabled]="field.disabled || false"
              variant="outlined">
            </muxima-input>

            <!-- Range slider -->
            <div *ngIf="field.type === 'range'" class="field-range">
              <input
                type="range"
                [id]="field.key"
                [formControlName]="field.key"
                [min]="field.min || 0"
                [max]="field.max || 100"
                class="range-input">
              <span class="range-value">{{ form.get(field.key)?.value }}</span>
            </div>

            <!-- Color picker -->
            <input
              *ngIf="field.type === 'color'"
              type="color"
              [id]="field.key"
              [formControlName]="field.key"
              class="field-color">

            <!-- File upload -->
            <input
              *ngIf="field.type === 'file'"
              type="file"
              [id]="field.key"
              (change)="onFileChange($event, field.key)"
              class="field-file">

            <!-- Help text -->
            <small *ngIf="field.helpText && field.type !== 'checkbox'" class="help-text">
              {{ field.helpText }}
            </small>

            <!-- Error messages -->
            <div *ngIf="isFieldInvalid(field.key)" class="error-messages">
              <small *ngIf="form.get(field.key)?.errors?.['required']">
                {{ field.label }} é obrigatório
              </small>
              <small *ngIf="form.get(field.key)?.errors?.['email']">
                Email inválido
              </small>
              <small *ngIf="form.get(field.key)?.errors?.['minlength']">
                Mínimo de {{ field.minLength }} caracteres
              </small>
              <small *ngIf="form.get(field.key)?.errors?.['maxlength']">
                Máximo de {{ field.maxLength }} caracteres
              </small>
              <small *ngIf="form.get(field.key)?.errors?.['min']">
                Valor mínimo: {{ field.min }}
              </small>
              <small *ngIf="form.get(field.key)?.errors?.['max']">
                Valor máximo: {{ field.max }}
              </small>
              <small *ngIf="form.get(field.key)?.errors?.['pattern']">
                Formato inválido
              </small>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button 
            type="button" 
            class="btn-cancel" 
            *ngIf="showCancel"
            (click)="onCancel()">
            {{ schema.cancelLabel || 'Cancelar' }}
          </button>
          <button 
            type="submit" 
            class="btn-submit"
            [disabled]="!form.valid || isSubmitting">
            <span *ngIf="!isSubmitting">{{ schema.submitLabel || 'Enviar' }}</span>
            <span *ngIf="isSubmitting">Enviando...</span>
          </button>
        </div>
      </form>

      <div class="form-debug" *ngIf="showDebug">
        <h3>Debug Info</h3>
        <pre>{{ form.value | json }}</pre>
        <p>Valid: {{ form.valid }}</p>
      </div>
    </div>
  `,
  styles: [`
    .smart-form-builder {
      max-width: 800px;
      margin: 0 auto;
    }

    .form-header {
      margin-bottom: 32px;

      h2 {
        font-size: 28px;
        font-weight: 700;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 8px;
      }

      p {
        color: #6b7280;
        font-size: 16px;
      }
    }

    .form-content {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .form-fields {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      margin-bottom: 32px;
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
      min-width: 0;

      &.field-full {
        flex-basis: 100%;
      }

      &.field-half {
        flex-basis: calc(50% - 12px);
      }

      &.field-third {
        flex-basis: calc(33.333% - 16px);
      }

      &.field-quarter {
        flex-basis: calc(25% - 18px);
      }

      &.field-hidden {
        display: none;
      }
    }

    .field-radio-group {
      .field-label {
        font-weight: 600;
        color: #374151;
        font-size: 14px;
        margin-bottom: 12px;
        display: block;

        .required-mark {
          color: #ef4444;
          margin-left: 4px;
        }
      }

      .radio-options {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
    }

    .field-group {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .field-label {
        font-weight: 600;
        color: #374151;
        font-size: 14px;

        .required-mark {
          color: #ef4444;
          margin-left: 4px;
        }
      }
    }

    .help-text {
      color: #6b7280;
      font-size: 12px;
      font-style: italic;
      margin-top: 4px;
    }

    .error-text {
      color: #ef4444;
      font-size: 12px;
      margin-top: 4px;
      display: block;
    }

    .field-textarea {
      resize: vertical;
      min-height: 100px;
      padding: 12px 16px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.2s;
      font-family: inherit;

      &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }

      &.error {
        border-color: #ef4444;
      }

      &:disabled {
        background: #f3f4f6;
        cursor: not-allowed;
      }
    }

    .field-range {
      display: flex;
      align-items: center;
      gap: 12px;

      .range-input {
        flex: 1;
        height: 6px;
      }

      .range-value {
        min-width: 40px;
        text-align: center;
        font-weight: 600;
        color: #667eea;
      }
    }

    .field-color {
      width: 80px;
      height: 40px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      cursor: pointer;
    }

    .field-file {
      padding: 8px;
      border: 2px dashed #e5e7eb;
      border-radius: 8px;
      cursor: pointer;

      &:hover {
        border-color: #667eea;
      }
    }

    .help-text {
      color: #6b7280;
      font-size: 12px;
      font-style: italic;
    }

    .error-messages {
      small {
        display: block;
        color: #ef4444;
        font-size: 12px;
        margin-top: 4px;
      }
    }

    .form-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      padding-top: 24px;
      border-top: 2px solid #e5e7eb;
    }

    .btn-cancel,
    .btn-submit {
      padding: 12px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-cancel {
      background: #f3f4f6;
      color: #374151;

      &:hover {
        background: #e5e7eb;
      }
    }

    .btn-submit {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
    }

    .horizontal {
      .form-field {
        flex-direction: row;
        align-items: center;

        .field-label {
          min-width: 150px;
        }
      }
    }

    .inline {
      .form-fields {
        flex-direction: row;
      }

      .form-field {
        flex-direction: column;
      }
    }

    .form-debug {
      margin-top: 24px;
      padding: 16px;
      background: #1f2937;
      color: #f3f4f6;
      border-radius: 8px;

      h3 {
        color: #667eea;
        margin-bottom: 12px;
      }

      pre {
        overflow-x: auto;
        font-size: 12px;
      }
    }

    @media (max-width: 768px) {
      .form-field.field-half,
      .form-field.field-third,
      .form-field.field-quarter {
        flex-basis: 100%;
      }
    }
  `]
})
export class SmartFormBuilderComponent implements OnInit {
  @Input() schema!: FormSchema;
  @Input() showCancel = false;
  @Input() showDebug = false;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  form!: FormGroup;
  isSubmitting = false;
  sortedFields: FormFieldSchema[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.sortedFields = [...this.schema.fields].sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  private buildForm() {
    const group: any = {};

    this.schema.fields.forEach(field => {
      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.type === 'email') {
        validators.push(Validators.email);
      }

      if (field.minLength) {
        validators.push(Validators.minLength(field.minLength));
      }

      if (field.maxLength) {
        validators.push(Validators.maxLength(field.maxLength));
      }

      if (field.min !== undefined) {
        validators.push(Validators.min(field.min));
      }

      if (field.max !== undefined) {
        validators.push(Validators.max(field.max));
      }

      if (field.pattern) {
        validators.push(Validators.pattern(field.pattern));
      }

      if (field.customValidators) {
        validators.push(...field.customValidators);
      }

      group[field.key] = [
        { value: field.defaultValue || this.getDefaultValue(field.type), disabled: field.disabled },
        validators
      ];
    });

    this.form = this.fb.group(group);
  }

  private getDefaultValue(type: string): any {
    switch (type) {
      case 'checkbox': return false;
      case 'number': return 0;
      case 'range': return 50;
      default: return '';
    }
  }

  isFieldVisible(field: FormFieldSchema): boolean {
    if (field.conditionalDisplay) {
      return field.conditionalDisplay(this.form.value);
    }

    if (field.dependsOn) {
      const dependentValue = this.form.get(field.dependsOn)?.value;
      return !!dependentValue;
    }

    return true;
  }

  isFieldInvalid(fieldKey: string): boolean {
    const field = this.form.get(fieldKey);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(field: FormFieldSchema): string {
    const control = this.form.get(field.key);
    if (!control || !control.errors) return '';

    if (control.errors['required']) {
      return `${field.label} é obrigatório`;
    }
    if (control.errors['email']) {
      return 'Email inválido';
    }
    if (control.errors['minlength']) {
      return `Mínimo de ${field.minLength} caracteres`;
    }
    if (control.errors['maxlength']) {
      return `Máximo de ${field.maxLength} caracteres`;
    }
    if (control.errors['min']) {
      return `Valor mínimo: ${field.min}`;
    }
    if (control.errors['max']) {
      return `Valor máximo: ${field.max}`;
    }
    if (control.errors['pattern']) {
      return 'Formato inválido';
    }

    return 'Campo inválido';
  }

  getInputType(type: string): any {
    // Converte o tipo do schema para o tipo do InputComponent
    const validTypes = ['text', 'email', 'password', 'tel', 'url', 'number', 'date', 'time'];
    return validTypes.includes(type) ? type : 'text';
  }

  onFileChange(event: any, fieldKey: string) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ [fieldKey]: file });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.formSubmit.emit(this.form.value);
      
      // Reset submitting state after 2 seconds
      setTimeout(() => {
        this.isSubmitting = false;
      }, 2000);
    } else {
      // Mark all fields as touched to show errors
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }

  onCancel() {
    this.formCancel.emit();
    this.form.reset();
  }

  // Public API methods
  resetForm() {
    this.form.reset();
  }

  getFormValue() {
    return this.form.value;
  }

  setFormValue(value: any) {
    this.form.patchValue(value);
  }

  isFormValid(): boolean {
    return this.form.valid;
  }
}

