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
      title: 'Tema Unificado',
      description: 'Paleta de cores coesa inspirada na identidade Muxima'
    },
    {
      icon: '♿',
      title: 'Acessível',
      description: 'Componentes pensados para todos os usuários'
    },
    {
      icon: '🚀',
      title: 'Performance',
      description: 'Otimizado para Angular com Standalone Components'
    },
    {
      icon: '🧩',
      title: 'Modular',
      description: 'Importe apenas o que precisa'
    },
    {
      icon: '🌍',
      title: 'Identidade Africana',
      description: 'Padrões e elementos visuais únicos'
    }
  ];

  stats = [
    { value: '20+', label: 'Componentes' },
    { value: '100%', label: 'TypeScript' },
    { value: 'Angular 15+', label: 'Versão' },
    { value: 'MIT', label: 'Licença' }
  ];
}
