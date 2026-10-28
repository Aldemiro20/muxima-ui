import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFormField, MxHint, MxInput, MxLabel } from '@muxima-ui/core/form-field';

/** Formulário de perfil: fotografia, nome, e-mail, cargo e biografia. */
@Component({
  selector: 'app-settings-perfil',
  imports: [ReactiveFormsModule, MxAvatar, MxButton, MxFormField, MxLabel, MxInput, MxHint, MxError],
  templateUrl: './settings-perfil.html',
  styleUrl: './settings-perfil.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPerfil {
  private readonly inicial = {
    nome: 'Ana Kiala',
    email: 'ana@kianda.ao',
    cargo: 'Directora financeira',
    bio: 'Trato da facturação e das contas da Kianda desde 2019.',
  };

  protected readonly form = new FormGroup({
    nome: new FormControl(this.inicial.nome, { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl(this.inicial.email, {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    cargo: new FormControl(this.inicial.cargo, { nonNullable: true }),
    bio: new FormControl(this.inicial.bio, { nonNullable: true, validators: [Validators.maxLength(160)] }),
  });

  protected readonly foto = signal<string | null>(null);
  protected readonly aGuardar = signal(false);
  protected readonly estado = signal('');

  constructor() {
    // liberta o URL temporário da fotografia
    inject(DestroyRef).onDestroy(() => this.foto() && URL.revokeObjectURL(this.foto()!));
  }

  protected escolherFoto(event: Event): void {
    const ficheiro = (event.target as HTMLInputElement).files?.[0];
    if (!ficheiro) return;
    if (this.foto()) URL.revokeObjectURL(this.foto()!);
    this.foto.set(URL.createObjectURL(ficheiro));
    this.estado.set('Fotografia escolhida. Guarda as alterações para a manter.');
  }

  protected removerFoto(): void {
    if (this.foto()) URL.revokeObjectURL(this.foto()!);
    this.foto.set(null);
  }

  protected cancelar(): void {
    this.form.reset(this.inicial);
    this.removerFoto();
    this.estado.set('');
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.estado.set('Há campos por corrigir.');
      return;
    }
    this.aGuardar.set(true);
    // troca este tempo pelo pedido ao servidor
    setTimeout(() => {
      this.aGuardar.set(false);
      this.form.markAsPristine();
      this.estado.set('Perfil guardado.');
    }, 700);
  }
}
