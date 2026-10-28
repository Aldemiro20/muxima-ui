import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';

/** Hero centrado: novidade, título, frase e duas acções. */
@Component({
  selector: 'app-hero-centrado',
  imports: [MxBadge, MxButton],
  templateUrl: './hero-centrado.html',
  styleUrl: './hero-centrado.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCentrado {}
