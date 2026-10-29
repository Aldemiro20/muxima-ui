import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';

/** Centered hero: news, title, sentence and two actions. */
@Component({
  selector: 'app-hero-centered',
  imports: [MxBadge, MxButton],
  templateUrl: './hero-centered.html',
  styleUrl: './hero-centered.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCentered {}
