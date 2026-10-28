import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxButton } from '@muxima-ui/core/button';
import { MxFormField, MxHint, MxInput, MxLabel } from '@muxima-ui/core/form-field';

interface Comentario {
  id: number;
  autor: string;
  /** Data ISO, para o <time datetime>. */
  data: string;
  quando: string;
  texto: string;
  gostos: number;
  gosto: boolean;
  respostas: Comentario[];
}

const LIMITE = 500;

/** Conversa: comentários com respostas, gosto e novo comentário. */
@Component({
  selector: 'app-comments-conversa',
  imports: [NgTemplateOutlet, MxAvatar, MxButton, MxFormField, MxLabel, MxInput, MxHint],
  templateUrl: './comments-conversa.html',
  styleUrl: './comments-conversa.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsConversa {
  protected readonly limite = LIMITE;
  protected readonly eu = 'Ana Kiala';
  protected readonly comentarios = signal<Comentario[]>([
    {
      id: 1,
      autor: 'Pedro Neto',
      data: '2026-10-27T09:12',
      quando: 'Há 3 horas',
      texto: 'Já podemos enviar a proposta à Lobito Portos? Falta só confirmar o prazo de entrega.',
      gostos: 2,
      gosto: false,
      respostas: [
        {
          id: 2,
          autor: 'Joana Mbala',
          data: '2026-10-27T10:05',
          quando: 'Há 2 horas',
          texto: 'O armazém confirmou 15 dias. Actualizei o documento.',
          gostos: 1,
          gosto: true,
          respostas: [],
        },
      ],
    },
    {
      id: 3,
      autor: 'Ana Kiala',
      data: '2026-10-27T11:30',
      quando: 'Há 40 minutos',
      texto: 'Perfeito. Envio hoje à tarde, com o desconto de 5% que combinámos.',
      gostos: 0,
      gosto: false,
      respostas: [],
    },
  ]);

  protected readonly novo = signal('');
  protected readonly respondendo = signal<number | null>(null);
  protected readonly resposta = signal('');
  protected readonly aviso = signal('');
  private proximoId = 100;

  protected alternarGosto(c: Comentario): void {
    this.actualizar(c.id, (x) => ({ ...x, gosto: !x.gosto, gostos: x.gostos + (x.gosto ? -1 : 1) }));
  }

  protected comentar(event: Event): void {
    event.preventDefault();
    const texto = this.novo().trim();
    if (!texto) return;
    this.comentarios.update((l) => [...l, this.criar(texto)]);
    this.novo.set('');
    this.aviso.set('Comentário publicado.');
  }

  protected responder(event: Event, c: Comentario): void {
    event.preventDefault();
    const texto = this.resposta().trim();
    if (!texto) return;
    this.actualizar(c.id, (x) => ({ ...x, respostas: [...x.respostas, this.criar(texto)] }));
    this.resposta.set('');
    this.respondendo.set(null);
    this.aviso.set(`Resposta a ${c.autor} publicada.`);
  }

  private criar(texto: string): Comentario {
    return { id: ++this.proximoId, autor: this.eu, data: new Date().toISOString(), quando: 'Agora', texto, gostos: 0, gosto: false, respostas: [] };
  }

  /** Muda um comentário (ou resposta) pelo id, sem mexer nos outros. */
  private actualizar(id: number, fn: (c: Comentario) => Comentario): void {
    const mudar = (l: Comentario[]): Comentario[] =>
      l.map((c) => (c.id === id ? fn(c) : { ...c, respostas: mudar(c.respostas) }));
    this.comentarios.update(mudar);
  }
}
