# Shopping Cart

Componente de carrinho de compras completo para Angular com suporte a ControlValueAccessor.

## Instalação

```bash
npm install @muxima-ui/shopping-cart
```

## Uso Básico

```typescript
import { ShoppingCartComponent, CartItem } from '@muxima-ui/shopping-cart';

@Component({
  standalone: true,
  imports: [ShoppingCartComponent],
  template: `
    <muxima-shopping-cart
      [items]="cartItems"
      (checkout)="onCheckout($event)"
      (itemRemoved)="onItemRemoved($event)">
    </muxima-shopping-cart>
  `
})
export class MyComponent {
  cartItems: CartItem[] = [
    {
      id: '1',
      name: 'Produto 1',
      price: 99.90,
      quantity: 2,
      image: 'url-da-imagem.jpg'
    }
  ];

  onCheckout(items: CartItem[]) {
    console.log('Finalizando compra:', items);
  }

  onItemRemoved(item: CartItem) {
    console.log('Item removido:', item);
  }
}
```

## API

### Inputs
- `items`: CartItem[] - Lista de itens no carrinho
- `config`: CartConfig - Configurações do carrinho
- `disabled`: boolean - Desabilita interações
- `size`: 'small' | 'medium' | 'large' - Tamanho do componente
- `showCheckout`: boolean - Mostra botão de checkout

### Outputs
- `checkout`: EventEmitter<CartItem[]> - Evento de finalização
- `itemRemoved`: EventEmitter<CartItem> - Item removido
- `itemQuantityChanged`: EventEmitter - Quantidade alterada
- `clearCart`: EventEmitter<void> - Carrinho limpo

## Licença

MIT
