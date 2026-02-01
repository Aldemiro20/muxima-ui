# 🧭 Muxima Sidebar Component

Componente de navegação lateral elegante com menu colapsável, sub-menus e múltiplas variantes.

## ✨ Características

- 🎨 **3 Variantes**: default, compact, floating
- 🔽 **Sub-menus**: Itens expansíveis com animação
- ↔️ **Colapsável**: Toggle entre expandido/colapsado
- 🏷️ **Badges**: Notificações e contadores
- 🎯 **Item Ativo**: Indicador visual elegante
- 🎨 **Gradiente Roxo**: #667eea → #764ba2
- 🖱️ **Hover Effects**: Transições suaves
- 📱 **Responsivo**: Adapta-se a mobile
- ♿ **Acessível**: Semântico e navegável
- ⚡ **Performance**: Otimizado e leve

## 📦 Instalação

```typescript
import { SidebarComponent, SidebarItem } from '@muxima-ui/sidebar';

@Component({
  standalone: true,
  imports: [SidebarComponent]
})
```

## 🚀 Uso Básico

```typescript
export class MyComponent {
  menuItems: SidebarItem[] = [
    { label: 'Dashboard', icon: '📊', active: true },
    { label: 'Usuários', icon: '👥' },
    { label: 'Configurações', icon: '⚙️' }
  ];

  onItemClick(item: SidebarItem) {
    console.log('Clicked:', item);
  }
}
```

```html
<muxima-sidebar
  [items]="menuItems"
  header="Minha App"
  footer="© 2024"
  (itemClick)="onItemClick($event)">
</muxima-sidebar>
```

## 🎨 Variantes

### Default
Sidebar padrão com largura de 280px.

```html
<muxima-sidebar
  [items]="menuItems"
  variant="default">
</muxima-sidebar>
```

### Compact
Sidebar com largura reduzida (240px).

```html
<muxima-sidebar
  [items]="menuItems"
  variant="compact">
</muxima-sidebar>
```

### Floating
Sidebar com visual flutuante, sombra e bordas arredondadas.

```html
<muxima-sidebar
  [items]="menuItems"
  variant="floating">
</muxima-sidebar>
```

## 🔽 Sub-menus

```typescript
menuWithChildren: SidebarItem[] = [
  { label: 'Dashboard', icon: '📊', active: true },
  {
    label: 'Produtos',
    icon: '📦',
    children: [
      { label: 'Todos Produtos', icon: '📋' },
      { label: 'Adicionar', icon: '➕' },
      { label: 'Categorias', icon: '🏷️' }
    ]
  },
  { label: 'Clientes', icon: '👥', badge: '12' }
];
```

```html
<muxima-sidebar [items]="menuWithChildren"></muxima-sidebar>
```

## ↔️ Estado Colapsado

```typescript
export class MyComponent {
  isCollapsed = false;

  onCollapsedChange(collapsed: boolean) {
    this.isCollapsed = collapsed;
  }
}
```

```html
<muxima-sidebar
  [items]="menuItems"
  [collapsed]="isCollapsed"
  (collapsedChange)="onCollapsedChange($event)">
</muxima-sidebar>
```

Quando colapsado:
- Largura reduzida para 80px (default) ou 64px (compact)
- Mostra apenas ícones
- Sub-menus ficam ocultos
- Header e footer minimizados

## 🏷️ Badges

Adicione badges para notificações e contadores:

```typescript
menuItems: SidebarItem[] = [
  {
    label: 'Mensagens',
    icon: '💬',
    badge: '5'  // String ou number
  },
  {
    label: 'Notificações',
    icon: '🔔',
    badge: 12
  }
];
```

## 🎯 Item Ativo

Marque o item atual como ativo:

```typescript
menuItems: SidebarItem[] = [
  { label: 'Dashboard', icon: '📊', active: true },
  { label: 'Usuários', icon: '👥', active: false }
];
```

Efeitos visuais do item ativo:
- Barra lateral roxa (#667eea → #764ba2)
- Background com gradiente sutil
- Cor do texto em roxo
- Ícone com escala aumentada

## ⚙️ API

### Inputs

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `items` | `SidebarItem[]` | `[]` | Array de itens do menu |
| `collapsed` | `boolean` | `false` | Estado colapsado |
| `variant` | `'default' \| 'compact' \| 'floating'` | `'default'` | Variante visual |
| `header` | `string` | `''` | Texto do cabeçalho |
| `footer` | `string` | `''` | Texto do rodapé |

### Outputs

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `itemClick` | `EventEmitter<SidebarItem>` | Emitido ao clicar em item |
| `collapsedChange` | `EventEmitter<boolean>` | Emitido ao mudar estado |

### Interfaces

```typescript
export interface SidebarItem {
  label: string;
  icon?: string;
  route?: string;
  children?: SidebarItem[];
  badge?: string | number;
  active?: boolean;
}

export type SidebarVariant = 'default' | 'compact' | 'floating';
```

## 💡 Casos de Uso

### Dashboard Administrativo
```typescript
adminItems: SidebarItem[] = [
  { label: 'Painel', icon: '🏠', active: true },
  {
    label: 'Usuários',
    icon: '👥',
    badge: '8',
    children: [
      { label: 'Todos Usuários', icon: '👤' },
      { label: 'Adicionar Usuário', icon: '➕' },
      { label: 'Perfis', icon: '🔐' }
    ]
  },
  { label: 'Analytics', icon: '📈' },
  { label: 'Configurações', icon: '⚙️' }
];
```

### E-commerce
```typescript
ecommerceItems: SidebarItem[] = [
  { label: 'Dashboard', icon: '📊', active: true },
  {
    label: 'Produtos',
    icon: '📦',
    children: [
      { label: 'Todos Produtos', icon: '📋' },
      { label: 'Adicionar Produto', icon: '➕' },
      { label: 'Categorias', icon: '🏷️' },
      { label: 'Estoque', icon: '📊' }
    ]
  },
  {
    label: 'Vendas',
    icon: '💰',
    children: [
      { label: 'Todas Vendas', icon: '💳' },
      { label: 'Nova Venda', icon: '🆕' }
    ]
  },
  { label: 'Clientes', icon: '👥', badge: '12' }
];
```

### Aplicativo
```typescript
appItems: SidebarItem[] = [
  { label: 'Início', icon: '🏠', active: true },
  { label: 'Explorar', icon: '🔍' },
  { label: 'Mensagens', icon: '💬', badge: '5' },
  { label: 'Notificações', icon: '🔔', badge: '12' },
  { label: 'Perfil', icon: '👤' }
];
```

## 🎨 Personalização

### Cores
O componente usa o gradiente roxo padrão:
- Primário: `#667eea` → `#764ba2`
- Item ativo: Background com gradiente sutil
- Hover: Efeito roxo translúcido

### Animações
- **Expand/Collapse**: 0.3s cubic-bezier
- **Sub-menus**: slideDown animation
- **Hover**: Scale transform 1.1
- **Active**: Barra lateral com scaleY

## 📱 Responsividade

### Mobile (<768px)
- Sidebar ocupa largura total
- Quando colapsado, altura reduz para 64px
- Sub-menus adaptados para mobile
- Navigation escondida quando colapsado

## 🔧 Integração com Router

```typescript
import { Router } from '@angular/router';

export class MyComponent {
  constructor(private router: Router) {}

  onItemClick(item: SidebarItem) {
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }
}
```

## ⚡ Performance

- Standalone component (sem módulo)
- Change detection otimizada
- CSS animations (sem JavaScript)
- Virtual scrolling para listas grandes
- Lazy loading de sub-menus

## ♿ Acessibilidade

- Elementos semânticos (nav, ul, li)
- ARIA labels apropriados
- Navegação por teclado
- Focus visible indicators
- Screen reader friendly

## 🎯 Best Practices

1. **Ícones**: Use emojis ou bibliotecas de ícones
2. **Badges**: Mantenha números curtos (< 100)
3. **Sub-menus**: Máximo 2 níveis de profundidade
4. **Labels**: Curtos e descritivos
5. **Active State**: Sempre marque o item atual
6. **Mobile**: Teste o comportamento colapsado
