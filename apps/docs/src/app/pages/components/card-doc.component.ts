import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCardComponent } from '@muxima-ui/card';


@Component({
  selector: 'muxima-card-doc',
  standalone: true,
  imports: [CommonModule, CardCardComponent],
  templateUrl: './card-doc.component.html',
  styleUrls: ['./card-doc.component.scss']
})
export class CardDocComponent {
  copyCode(code: string): void {
    navigator.clipboard.writeText(code);
  }

  get importCode(): string {
    return `import { CardCardComponent } from '@muxima-ui/card/card';

@Component({
  imports: [CardCardComponent]
})`;
  }

  get basicCode(): string {
    return `<muxima-card title="Card Title" subtitle="Card subtitle">
  <p>Card content goes here...</p>
</muxima-card>`;
  }

  get variantsCode(): string {
    return `<!-- Default -->
<muxima-card variant="default">
  Content here
</muxima-card>

<!-- Bordered -->
<muxima-card variant="bordered">
  Content here
</muxima-card>

<!-- Elevated -->
<muxima-card variant="elevated">
  Content here
</muxima-card>

<!-- African Pattern -->
<muxima-card variant="african-pattern">
  Content here
</muxima-card>

<!-- Gradient Blue -->
<muxima-card variant="gradient-blue">
  Content here
</muxima-card>

<!-- Gradient Purple -->
<muxima-card variant="gradient-purple">
  Content here
</muxima-card>

<!-- Gradient Sunset -->
<muxima-card variant="gradient-sunset">
  Content here
</muxima-card>

<!-- Glassmorphism -->
<muxima-card variant="glassmorphism">
  Content here
</muxima-card>

<!-- Neon -->
<muxima-card variant="neon">
  Content here
</muxima-card>

<!-- Minimal -->
<muxima-card variant="minimal">
  Content here
</muxima-card>

<!-- Shadow Large -->
<muxima-card variant="shadow-lg">
  Content here
</muxima-card>

<!-- Outline Gradient -->
<muxima-card variant="outline-gradient">
  Content here
</muxima-card>

<!-- Dark -->
<muxima-card variant="dark">
  Content here
</muxima-card>`;
  }

  get headerActionsCode(): string {
    return `<muxima-card title="Card with Actions" subtitle="Has header and footer">
  <div header-actions>
    <button>Edit</button>
    <button>Delete</button>
  </div>
  
  <p>Card content...</p>
  
  <div footer-actions>
    <button>Cancel</button>
    <button>Save</button>
  </div>
</muxima-card>`;
  }

  get exampleGalleryCode(): string {
    return `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
  <muxima-card 
    *ngFor="let item of items" 
    [title]="item.title"
    variant="african-pattern">
    {{ item.content }}
  </muxima-card>
</div>`;
  }
}
