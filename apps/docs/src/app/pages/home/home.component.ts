import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'muxima-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  codeExample = `import { MuximaAlertComponent } from '@muxima-ui/alert';

@Component({
  standalone: true,
  imports: [MuximaAlertComponent],
  template: \`
    <muxima-alert type="success" appearance="fill">
      🎉 Bem-vindo ao Muxima UI!
      <br>
      <small>Desenvolvido por Aldemiro Valentim, mais conhecido por JokerScript</small>
    </muxima-alert>
  \`
})
export class AppComponent {}`;

  features = [
    {
      icon: '✨',
      title: 'Design Elegante',
      description: 'Gradientes vibrantes, animações suaves e atenção aos detalhes'
    },
    {
      icon: '🎨',
      title: 'Tema Purple Gradient',
      description: 'Paleta de cores coesa (#667eea → #764ba2) característica do Muxima UI'
    },
    {
      icon: '♿',
      title: 'Acessível',
      description: 'Componentes WCAG 2.1 AA compliant pensados para todos os usuários'
    },
    {
      icon: '🚀',
      title: 'Performance',
      description: 'Otimizado com Standalone Components e OnPush change detection'
    },
    {
      icon: '🧩',
      title: 'Modular & Tree-shakeable',
      description: 'Importe apenas o que precisa, bundle otimizado automaticamente'
    },
    {
      icon: '💜',
      title: 'Feito com Muxima',
      description: 'Desenvolvido com coração (Muxima em Kimbundu)'
    }
  ];

  stats = [
    { value: '80+', label: 'Componentes' },
    { value: '100%', label: 'TypeScript' },
    { value: 'Angular 15+', label: 'Versão' },
    { value: '💜', label: 'Muxima' }
  ];
}
