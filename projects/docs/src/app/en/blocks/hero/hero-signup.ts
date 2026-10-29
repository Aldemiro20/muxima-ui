import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFormField, MxInput, MxLabel } from '@muxima-ui/core/form-field';

/** Hero with an email signup (waiting list, newsletter, invite). */
@Component({
  selector: 'app-hero-signup',
  imports: [ReactiveFormsModule, MxButton, MxFormField, MxLabel, MxInput, MxError],
  templateUrl: './hero-signup.html',
  styleUrl: './hero-signup.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSignup {
  protected readonly email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
  protected readonly sending = signal(false);
  protected readonly signedUp = signal('');

  protected signUp(): void {
    if (this.email.invalid) {
      this.email.markAsTouched();
      return;
    }
    this.sending.set(true);
    // replace this delay with the request to your server
    setTimeout(() => {
      this.signedUp.set(this.email.value);
      this.email.reset();
      this.sending.set(false);
    }, 600);
  }
}
