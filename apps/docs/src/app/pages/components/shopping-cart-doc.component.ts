import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingCartComponent, CartItem, CartConfig } from '@muxima-ui/shopping-cart';

@Component({
  selector: 'app-shopping-cart-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, ShoppingCartComponent],
  templateUrl: './shopping-cart-doc.component.html',
  styleUrls: ['./shopping-cart-doc.component.scss']
})
export class ShoppingCartDocComponent {
  // Example 1: Basic Cart
  basicCart: CartItem[] = [
    {
      id: '1',
      name: 'Camiseta Premium',
      price: 89.90,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
      description: 'Camiseta de algodão 100% orgânico'
    },
    {
      id: '2',
      name: 'Calça Jeans',
      price: 159.90,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop',
      description: 'Jeans de alta qualidade com fit moderno'
    },
    {
      id: '3',
      name: 'Tênis Esportivo',
      price: 299.90,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
      description: 'Tênis para corrida e caminhada',
      maxQuantity: 5
    }
  ];

  // Example 2: With Tax and Shipping
  taxCart: CartItem[] = [
    {
      id: '4',
      name: 'Notebook Ultrabook',
      price: 4999.90,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop',
      description: 'Intel i7, 16GB RAM, SSD 512GB'
    },
    {
      id: '5',
      name: 'Mouse Wireless',
      price: 149.90,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop',
      description: 'Conexão Bluetooth 5.0'
    }
  ];

  taxConfig: CartConfig = {
    currency: 'R$',
    showImages: true,
    allowQuantityEdit: true,
    showSubtotal: true,
    taxRate: 0.15, // 15%
    shippingCost: 25.00
  };

  // Example 3: Minimal Cart (No Images)
  minimalCart: CartItem[] = [
    {
      id: '6',
      name: 'eBook - Angular Avançado',
      price: 49.90,
      quantity: 1,
      description: 'Guia completo de Angular'
    },
    {
      id: '7',
      name: 'Curso Online - TypeScript',
      price: 199.90,
      quantity: 1,
      description: '40 horas de conteúdo'
    }
  ];

  minimalConfig: CartConfig = {
    currency: 'R$',
    showImages: false,
    allowQuantityEdit: true,
    showSubtotal: true
  };

  // Example 4: Read-only Cart
  readonlyCart: CartItem[] = [
    {
      id: '8',
      name: 'Produto A',
      price: 99.90,
      quantity: 3
    },
    {
      id: '9',
      name: 'Produto B',
      price: 149.90,
      quantity: 1
    }
  ];

  readonlyConfig: CartConfig = {
    currency: 'R$',
    showImages: false,
    allowQuantityEdit: false,
    showSubtotal: true
  };

  // Example 5: Forms Integration
  formCart: CartItem[] = [];

  // Size options
  selectedSize: 'small' | 'medium' | 'large' = 'medium';

  onCheckout(items: CartItem[], cartName: string) {
    console.log(`Checkout ${cartName}:`, items);
    alert(`Finalizando compra com ${items.length} itens!\nTotal de produtos: ${items.reduce((sum, item) => sum + item.quantity, 0)}`);
  }

  onItemRemoved(item: CartItem) {
    console.log('Item removido:', item);
  }

  onQuantityChanged(event: { item: CartItem; quantity: number }) {
    console.log('Quantidade alterada:', event);
  }

  onClearCart() {
    console.log('Carrinho limpo');
  }

  addSampleItem() {
    const newItem: CartItem = {
      id: `item-${Date.now()}`,
      name: `Produto ${this.formCart.length + 1}`,
      price: Math.random() * 100 + 50,
      quantity: 1,
      description: 'Produto de exemplo adicionado dinamicamente'
    };
    this.formCart = [...this.formCart, newItem];
  }

  // Code examples for display
  codeExamples = {
    basic: `<muxima-shopping-cart
  [items]="cartItems"
  (checkout)="onCheckout($event)"
  (itemRemoved)="onItemRemoved($event)">
</muxima-shopping-cart>`,

    withConfig: `<muxima-shopping-cart
  [items]="cartItems"
  [config]="{
    currency: 'R$',
    taxRate: 0.15,
    shippingCost: 25.00
  }"
  (checkout)="onCheckout($event)">
</muxima-shopping-cart>`,

    minimal: `<muxima-shopping-cart
  [items]="cartItems"
  [config]="{
    showImages: false,
    allowQuantityEdit: false
  }"
  size="small">
</muxima-shopping-cart>`,

    typescript: `import { ShoppingCartComponent, CartItem } from '@muxima-ui/shopping-cart';

cartItems: CartItem[] = [
  {
    id: '1',
    name: 'Produto',
    price: 99.90,
    quantity: 2,
    image: 'url-da-imagem.jpg',
    description: 'Descrição do produto',
    maxQuantity: 10
  }
];

onCheckout(items: CartItem[]) {
  console.log('Checkout:', items);
}`
  };
}
