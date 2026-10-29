import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFormField, MxHint, MxInput, MxLabel } from '@muxima-ui/core/form-field';

/** Profile form: photo, name, email, job title and bio. */
@Component({
  selector: 'app-settings-profile',
  imports: [ReactiveFormsModule, MxAvatar, MxButton, MxFormField, MxLabel, MxInput, MxHint, MxError],
  templateUrl: './settings-profile.html',
  styleUrl: './settings-profile.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsProfile {
  private readonly initial = {
    name: 'Ana Kiala',
    email: 'ana@kianda.ao',
    jobTitle: 'Chief financial officer',
    bio: 'I\'ve handled Kianda\'s invoicing and accounts since 2019.',
  };

  protected readonly form = new FormGroup({
    name: new FormControl(this.initial.name, { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl(this.initial.email, {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    jobTitle: new FormControl(this.initial.jobTitle, { nonNullable: true }),
    bio: new FormControl(this.initial.bio, { nonNullable: true, validators: [Validators.maxLength(160)] }),
  });

  protected readonly photo = signal<string | null>(null);
  protected readonly saving = signal(false);
  protected readonly status = signal('');

  constructor() {
    // release the photo's temporary URL
    inject(DestroyRef).onDestroy(() => this.photo() && URL.revokeObjectURL(this.photo()!));
  }

  protected choosePhoto(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (this.photo()) URL.revokeObjectURL(this.photo()!);
    this.photo.set(URL.createObjectURL(file));
    this.status.set('Photo chosen. Save your changes to keep it.');
  }

  protected removePhoto(): void {
    if (this.photo()) URL.revokeObjectURL(this.photo()!);
    this.photo.set(null);
  }

  protected cancel(): void {
    this.form.reset(this.initial);
    this.removePhoto();
    this.status.set('');
  }

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.status.set('Some fields need fixing.');
      return;
    }
    this.saving.set(true);
    // replace this delay with the request to the server
    setTimeout(() => {
      this.saving.set(false);
      this.form.markAsPristine();
      this.status.set('Profile saved.');
    }, 700);
  }
}
