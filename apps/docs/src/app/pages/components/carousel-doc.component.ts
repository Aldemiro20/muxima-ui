import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselCarouselComponent, CarouselItem } from '@muxima-ui/carousel';

@Component({
  selector: 'app-carousel-doc',
  standalone: true,
  imports: [CommonModule, CarouselCarouselComponent],
  templateUrl: './carousel-doc.component.html',
  styleUrls: ['./carousel-doc.component.scss']
})
export class CarouselDocComponent {
  copiedStates: { [key: string]: boolean } = {};

  demoItems: CarouselItem[] = [
    {
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1920',
      title: 'Tecnologia Moderna',
      description: 'Explore as últimas inovações em desenvolvimento web com design elegante.',
      link: '#'
    },
    {
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920',
      title: 'Design Responsivo',
      description: 'Componentes que se adaptam perfeitamente a qualquer dispositivo.',
      link: '#'
    },
    {
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1920',
      title: 'Interface Intuitiva',
      description: 'Experiência do usuário fluida e agradável em cada interação.',
      link: '#'
    }
  ];

  smallItems: CarouselItem[] = [
    { image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800', title: 'Slide 1' },
    { image: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=800', title: 'Slide 2' },
    { image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800', title: 'Slide 3' }
  ];

  productItems: CarouselItem[] = [
    {
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1920',
      title: 'Headphones Premium',
      description: 'Som de alta qualidade com cancelamento de ruído ativo.',
      link: '#produtos'
    },
    {
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1920',
      title: 'Relógio Smart',
      description: 'Acompanhe sua saúde e notificações no pulso.',
      link: '#produtos'
    },
    {
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1920',
      title: 'Óculos de Sol',
      description: 'Estilo e proteção UV em um único acessório.',
      link: '#produtos'
    },
    {
      image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1920',
      title: 'Tênis Esportivo',
      description: 'Conforto e performance para seus treinos.',
      link: '#produtos'
    }
  ];

  testimonialsItems: CarouselItem[] = [
    {
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1920',
      title: 'Maria Silva',
      description: '"Excelente qualidade! Os componentes são modernos e fáceis de usar. Recomendo muito!"'
    },
    {
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1920',
      title: 'João Santos',
      description: '"Interface intuitiva e documentação completa. Economizou muito tempo no nosso projeto."'
    },
    {
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1920',
      title: 'Ana Costa',
      description: '"Design elegante e responsivo. Perfeito para aplicações profissionais."'
    }
  ];

  portfolioItems: CarouselItem[] = [
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920',
      title: 'Dashboard Analytics',
      description: 'Sistema completo de análise de dados com gráficos interativos.',
      link: '#portfolio'
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920',
      title: 'E-commerce Platform',
      description: 'Plataforma de vendas online com carrinho e checkout integrado.',
      link: '#portfolio'
    },
    {
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920',
      title: 'Mobile Banking App',
      description: 'Aplicativo bancário moderno com biometria e PIX.',
      link: '#portfolio'
    }
  ];

  copyCode(code: string, key: string): void {
    navigator.clipboard.writeText(code);
    this.copiedStates[key] = true;
    setTimeout(() => {
      this.copiedStates[key] = false;
    }, 2000);
  }

  getCodeExample(type: string): string {
    const examples: { [key: string]: string } = {
      import: `import { CarouselCarouselComponent } from '@muxima-ui/carousel';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CarouselCarouselComponent],
  template: \`...\`
})
export class ExampleComponent {}`,
      basic: `<muxima-carousel 
  [items]="carouselItems"
  [autoPlay]="true"
  [interval]="5000">
</muxima-carousel>`,
      items: `import { CarouselItem } from '@muxima-ui/carousel';

carouselItems: CarouselItem[] = [
  {
    image: 'https://example.com/image1.jpg',
    title: 'Título do Slide',
    description: 'Descrição detalhada do conteúdo',
    link: '/saiba-mais'
  },
  {
    image: 'https://example.com/image2.jpg',
    title: 'Segundo Slide',
    description: 'Mais conteúdo interessante'
  }
];`,
      custom: `<!-- Altura personalizada -->
<muxima-carousel 
  [items]="items"
  [height]="'600px'">
</muxima-carousel>

<!-- Sem autoPlay -->
<muxima-carousel 
  [items]="items"
  [autoPlay]="false">
</muxima-carousel>

<!-- Transição fade -->
<muxima-carousel 
  [items]="items"
  [animationType]="'fade'">
</muxima-carousel>`,
      navigation: `<!-- Sem setas -->
<muxima-carousel 
  [items]="items"
  [showArrows]="false">
</muxima-carousel>

<!-- Sem indicadores -->
<muxima-carousel 
  [items]="items"
  [showDots]="false">
</muxima-carousel>

<!-- Navegação mínima -->
<muxima-carousel 
  [items]="items"
  [showArrows]="false"
  [showDots]="false">
</muxima-carousel>`,
      products: `// Showcase de Produtos
productItems: CarouselItem[] = [
  {
    image: 'produto1.jpg',
    title: 'Nome do Produto',
    description: 'Descrição atraente do produto',
    link: '/produtos/detalhes'
  },
  // ... mais produtos
];

// Template
<muxima-carousel 
  [items]="productItems"
  [autoPlay]="true"
  [interval]="4000"
  [height]="'450px'">
</muxima-carousel>`,
      testimonials: `// Depoimentos de Clientes
testimonialsItems: CarouselItem[] = [
  {
    image: 'cliente1.jpg',
    title: 'Nome do Cliente',
    description: '"Depoimento do cliente aqui..."'
  },
  // ... mais depoimentos
];

// Template com transição fade
<muxima-carousel 
  [items]="testimonialsItems"
  [autoPlay]="true"
  [interval]="6000"
  [animationType]="'fade'"
  [showArrows]="false">
</muxima-carousel>`,
      portfolio: `// Portfólio de Projetos
portfolioItems: CarouselItem[] = [
  {
    image: 'projeto1.jpg',
    title: 'Nome do Projeto',
    description: 'Descrição do projeto e tecnologias',
    link: '/portfolio/detalhes'
  },
  // ... mais projetos
];

// Template
<muxima-carousel 
  [items]="portfolioItems"
  [autoPlay]="true"
  [interval]="5000"
  [height]="'500px'">
</muxima-carousel>`
    };
    return examples[type] || '';
  }
}
