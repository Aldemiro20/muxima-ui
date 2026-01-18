import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeBadgeComponent } from '../../../../../../libs/badge/badge/src/lib/badge-badge/badge-badge.component';

@Component({
  selector: 'muxima-badge-doc',
  standalone: true,
  imports: [CommonModule, BadgeBadgeComponent],
  templateUrl: './badge-doc.component.html',
  styleUrls: ['./badge-doc.component.scss']
})
export class BadgeDocComponent {
  copyCode(code: string) {
    navigator.clipboard.writeText(code);
  }

  get importCode() {
    return `import { BadgeBadgeComponent } from '@muxima/badge';

@Component({
  imports: [BadgeBadgeComponent]
})`;
  }

  get basicCode() {
    return `<muxima-badge variant="solid" color="primary">
  Novo
</muxima-badge>`;
  }

  get variantsCode() {
    return `<!-- Solid -->
<muxima-badge variant="solid" color="primary">Solid</muxima-badge>

<!-- Outline -->
<muxima-badge variant="outline" color="primary">Outline</muxima-badge>

<!-- Soft -->
<muxima-badge variant="soft" color="primary">Soft</muxima-badge>`;
  }

  get colorsCode() {
    return `<muxima-badge color="primary">Primary</muxima-badge>
<muxima-badge color="success">Success</muxima-badge>
<muxima-badge color="warning">Warning</muxima-badge>
<muxima-badge color="error">Error</muxima-badge>
<muxima-badge color="info">Info</muxima-badge>
<muxima-badge color="neutral">Neutral</muxima-badge>`;
  }
}
