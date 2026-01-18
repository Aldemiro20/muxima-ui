import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'muxima-coming-soon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="coming-soon">
      <div class="content">
        <span class="icon">🚧</span>
        <h1>{{ title }}</h1>
        <p>Documentação em construção</p>
        <p class="subtitle">Esta página estará disponível em breve com exemplos e demonstrações completas.</p>
      </div>
    </div>
  `,
  styles: [`
    .coming-soon {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      padding: 2rem;
    }
    
    .content {
      text-align: center;
      max-width: 600px;
    }
    
    .icon {
      font-size: 5rem;
      display: block;
      margin-bottom: 2rem;
    }
    
    h1 {
      font-size: 3rem;
      font-weight: 700;
      background: linear-gradient(135deg, #3B82F6, #6366F1, #8B5CF6);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1rem;
    }
    
    p {
      font-size: 1.25rem;
      color: #64748B;
      margin-bottom: 0.5rem;
    }
    
    .subtitle {
      font-size: 1rem;
      color: #94A3B8;
    }
  `]
})
export class ComingSoonComponent {
  title = 'Em Breve';
}

// Componentes específicos
@Component({
  selector: 'muxima-avatar-doc',
  standalone: true,
  template: '<muxima-coming-soon/>',
  imports: [ComingSoonComponent]
})
export class AvatarDocComponent {}

@Component({
  selector: 'muxima-badge-doc',
  standalone: true,
  template: '<muxima-coming-soon/>',
  imports: [ComingSoonComponent]
})
export class BadgeDocComponent {}

@Component({
  selector: 'muxima-card-doc',
  standalone: true,
  template: '<muxima-coming-soon/>',
  imports: [ComingSoonComponent]
})
export class CardDocComponent {}

@Component({
  selector: 'muxima-checkbox-doc',
  standalone: true,
  template: '<muxima-coming-soon/>',
  imports: [ComingSoonComponent]
})
export class CheckboxDocComponent {}

@Component({
  selector: 'muxima-input-doc',
  standalone: true,
  template: '<muxima-coming-soon/>',
  imports: [ComingSoonComponent]
})
export class InputDocComponent {}

@Component({
  selector: 'muxima-radio-doc',
  standalone: true,
  template: '<muxima-coming-soon/>',
  imports: [ComingSoonComponent]
})
export class RadioDocComponent {}

@Component({
  selector: 'muxima-select-doc',
  standalone: true,
  template: '<muxima-coming-soon/>',
  imports: [ComingSoonComponent]
})
export class SelectDocComponent {}

@Component({
  selector: 'muxima-table-doc',
  standalone: true,
  template: '<muxima-coming-soon/>',
  imports: [ComingSoonComponent]
})
export class TableDocComponent {}

@Component({
  selector: 'muxima-timeline-doc',
  standalone: true,
  template: '<muxima-coming-soon/>',
  imports: [ComingSoonComponent]
})
export class TimelineDocComponent {}
