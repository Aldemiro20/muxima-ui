# 🛒 @muxima-ui/shopping-cart# Shopping Cart



> Advanced shopping cart component for Angular 18+ with cart management and checkoutComponente de carrinho de compras completo para Angular com suporte a ControlValueAccessor.



[![npm version](https://img.shields.io/npm/v/@muxima-ui/shopping-cart.svg)](https://www.npmjs.com/package/@muxima-ui/shopping-cart)## Instalação

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

```bash

## 📦 Installationnpm install @muxima-ui/shopping-cart

```

```bash

npm install @muxima-ui/shopping-cart## Uso Básico

```

```typescript

## 🚀 Quick Startimport { ShoppingCartComponent, CartItem } from '@muxima-ui/shopping-cart';



```typescript@Component({

import { Component } from '@angular/core';  standalone: true,

import { ShoppingCartComponent } from '@muxima-ui/shopping-cart';  imports: [ShoppingCartComponent],

  template: `

@Component({    <muxima-shopping-cart

  selector: 'app-root',      [items]="cartItems"

  standalone: true,      (checkout)="onCheckout($event)"

  imports: [ShoppingCartComponent],      (itemRemoved)="onItemRemoved($event)">

  template: `    </muxima-shopping-cart>

    <muxima-shopping-cart  `

      [items]="cartItems"})

      [total]="total"export class MyComponent {

      (checkout)="onCheckout($event)">  cartItems: CartItem[] = [

    </muxima-shopping-cart>    {

  `      id: '1',

})      name: 'Produto 1',

export class AppComponent {      price: 99.90,

  cartItems = [      quantity: 2,

    {      image: 'url-da-imagem.jpg'

      id: '1',    }

      name: 'Product 1',  ];

      price: 29.99,

      quantity: 2,  onCheckout(items: CartItem[]) {

      image: 'product1.jpg'    console.log('Finalizando compra:', items);

    }  }

  ];

  onItemRemoved(item: CartItem) {

  get total() {    console.log('Item removido:', item);

    return this.cartItems.reduce((sum, item) =>   }

      sum + (item.price * item.quantity), 0}

    );```

  }

## API

  onCheckout(items: any[]) {

    console.log('Checkout:', items);### Inputs

  }- `items`: CartItem[] - Lista de itens no carrinho

}- `config`: CartConfig - Configurações do carrinho

```- `disabled`: boolean - Desabilita interações

- `size`: 'small' | 'medium' | 'large' - Tamanho do componente

## ✨ Features- `showCheckout`: boolean - Mostra botão de checkout



- ✅ Gerenciamento de carrinho### Outputs

- ✅ Cálculo automático de totais- `checkout`: EventEmitter<CartItem[]> - Evento de finalização

- ✅ Quantidade de itens- `itemRemoved`: EventEmitter<CartItem> - Item removido

- ✅ Remover itens- `itemQuantityChanged`: EventEmitter - Quantidade alterada

- ✅ Checkout- `clearCart`: EventEmitter<void> - Carrinho limpo

- ✅ TypeScript support

- ✅ Responsive design## Licença



## 📚 DocumentationMIT


**Full documentation:** https://muxima-ui.vercel.app

**Component docs:** https://muxima-ui.vercel.app/components/shopping-cart

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@muxima-ui/shopping-cart)
- [GitHub Repository](https://github.com/Aldemiro20/muxima-ui)
- [Documentation](https://muxima-ui.vercel.app)
- [Report Issues](https://github.com/Aldemiro20/muxima-ui/issues)

## 📝 License

MIT © Muxima UI Team
