import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFormField, MxInput, MxLabel } from '@muxima-ui/core/form-field';

/** Hero com inscrição por e-mail (lista de espera, newsletter, convite). */
@Component({
  selector: 'app-hero-inscricao',
  imports: [ReactiveFormsModule, MxButton, MxFormField, MxLabel, MxInput, MxError],
  templateUrl: './hero-inscricao.html',
  styleUrl: './hero-inscricao.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroInscricao {
  protected readonly email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
  protected readonly enviando = signal(false);
  protected readonly inscrito = signal('');

  protected inscrever(): void {
    if (this.email.invalid) {
      this.email.markAsTouched();
      return;
    }
    this.enviando.set(true);
    // troca este tempo pelo pedido ao teu servidor
    setTimeout(() => {
      this.inscrito.set(this.email.value);
      this.email.reset();
      this.enviando.set(false);
    }, 600);
  }
}
