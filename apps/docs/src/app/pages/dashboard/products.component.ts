import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent, SelectOption } from '@muxima-ui/select';
import { StatsCardComponent } from '@muxima-ui/stats-card';
import { SearchBoxComponent } from '@muxima-ui/search-box';
import { CardItemComponent } from '@muxima-ui/card-item';
import { ToolbarComponent } from '@muxima-ui/toolbar';
import { ButtonComponent } from '@muxima-ui/button';

@Component({
  selector: 'muxima-products',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    SelectComponent,
    StatsCardComponent,
    SearchBoxComponent,
    CardItemComponent,
    ToolbarComponent,
    ButtonComponent
  ],
  template: `
    <div class="products-page">
      <!-- Page Header with Toolbar -->
      <muxima-toolbar 
        title="Products Management" 
        subtitle="Manage your product catalog, inventory, and pricing"
        [shadow]="false">
        <div actions>
          <muxima-button 
            variant="gradient" 
            (click)="addProduct()">
            <svg slot="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            Add Product
          </muxima-button>
        </div>
      </muxima-toolbar>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <muxima-stats-card
          label="Total Products"
          value="573"
          color="primary"
          variant="compact"
          [iconSvg]="icons.box">
        </muxima-stats-card>
        
        <muxima-stats-card
          label="In Stock"
          value="489"
          color="green"
          variant="compact"
          [iconSvg]="icons.activity">
        </muxima-stats-card>
        
        <muxima-stats-card
          label="Low Stock"
          value="42"
          color="orange"
          variant="compact"
          [iconSvg]="icons.alert">
        </muxima-stats-card>
        
        <muxima-stats-card
          label="Out of Stock"
          value="42"
          color="red"
          variant="compact"
          [iconSvg]="icons.xCircle">
        </muxima-stats-card>
      </div>

      <!-- Filters Toolbar -->
      <muxima-toolbar variant="compact">
        <div left>
          <muxima-search-box
            placeholder="Search products..."
            [(ngModel)]="searchQuery"
            (search)="onSearch($event)"
            style="min-width: 300px;">
          </muxima-search-box>
        </div>
        <div right>
          <muxima-select
            [(ngModel)]="selectedCategory"
            [options]="categoryOptions"
            placeholder="All Categories"
            size="sm">
          </muxima-select>
          <muxima-select
            [(ngModel)]="selectedStockStatus"
            [options]="stockStatusOptions"
            placeholder="All Status"
            size="sm">
          </muxima-select>
        </div>
      </muxima-toolbar>

      <!-- Products Grid -->
      <div class="products-grid">
        <muxima-card-item
          *ngFor="let product of filteredProducts"
          [image]="product.image"
          [imageAlt]="product.name"
          [badge]="product.stockStatus"
          [badgeColor]="getStockBadgeColor(product.stockStatus)"
          [title]="product.name"
          [subtitle]="product.category"
          [description]="product.description"
          (click)="viewProduct(product)">
          
          <div metadata class="product-metadata">
            <div class="product-price">
              <span class="price-current">\${{ product.price }}</span>
              <span class="price-old" *ngIf="product.oldPrice">\${{ product.oldPrice }}</span>
            </div>
            <div class="product-stock">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              </svg>
              {{ product.stock }} units
            </div>
          </div>

          <div actions class="product-actions">
            <muxima-button 
              variant="gradient" 
              size="sm" 
              (click)="editProduct(product); $event.stopPropagation()">
              <svg slot="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Edit
            </muxima-button>
            <muxima-button 
              variant="outline" 
              size="sm" 
              (click)="viewProductDetails(product); $event.stopPropagation()">
              <svg slot="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              View
            </muxima-button>
          </div>
        </muxima-card-item>
      </div>
    </div>
  `,
  styles: [`
    .products-page { 
      padding: 2rem; 
      max-width: 1400px; 
      margin: 0 auto; 
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .stats-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
      gap: 1rem; 
    }
    
    .products-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); 
      gap: 1.5rem; 
    }
    
    .product-metadata {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 0.75rem;
      border-top: 1px solid #f3f4f6;
    }
    
    .product-price { 
      display: flex; 
      align-items: center; 
      gap: 0.5rem; 
    }
    
    .price-current { 
      font-size: 1.25rem; 
      font-weight: 700; 
      color: #111827; 
    }
    
    .price-old { 
      font-size: 0.875rem; 
      color: #9ca3af; 
      text-decoration: line-through; 
    }
    
    .product-stock { 
      display: flex; 
      align-items: center; 
      gap: 0.5rem; 
      font-size: 0.875rem; 
      color: #6b7280; 
    }
    
    .product-stock svg { 
      width: 16px; 
      height: 16px; 
    }
    
    .product-actions { 
      display: flex; 
      gap: 0.75rem; 
    }
    
    @media (max-width: 768px) {
      .products-page { 
        padding: 1rem; 
      }
      
      .stats-grid { 
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
      }
      
      .products-grid { 
        grid-template-columns: 1fr; 
      }
    }
  `]
})
export class ProductsComponent {
  searchQuery: string = '';
  selectedCategory: any = null;
  selectedStockStatus: any = null;

  // SVG Icons
  icons = {
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>',
    activity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
    xCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>'
  };

  categoryOptions: SelectOption[] = [
    { label: 'All Categories', value: null },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Peripherals', value: 'peripherals' },
    { label: 'Accessories', value: 'accessories' }
  ];

  stockStatusOptions: SelectOption[] = [
    { label: 'All Status', value: null },
    { label: 'In Stock', value: 'in-stock' },
    { label: 'Low Stock', value: 'low-stock' },
    { label: 'Out of Stock', value: 'out-of-stock' }
  ];

  products = [
    { name: 'Wireless Headphones', category: 'Electronics', description: 'Premium noise-canceling headphones with superior sound quality', price: '199.99', oldPrice: '249.99', stock: 45, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },
    { name: 'Smart Watch Pro', category: 'Electronics', description: 'Advanced fitness tracking smartwatch with heart rate monitor', price: '299.99', stock: 23, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' },
    { name: 'Mechanical Keyboard', category: 'Peripherals', description: 'RGB gaming mechanical keyboard with tactile switches', price: '149.99', stock: 12, stockStatus: 'low-stock', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop' },
    { name: 'Ergonomic Mouse', category: 'Peripherals', description: 'Wireless ergonomic mouse for comfort and productivity', price: '79.99', stock: 67, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop' },
    { name: 'USB-C Hub', category: 'Accessories', description: '7-in-1 USB-C hub adapter with multiple ports', price: '49.99', stock: 0, stockStatus: 'out-of-stock', image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop' },
    { name: 'Laptop Stand', category: 'Accessories', description: 'Adjustable aluminum laptop stand for better ergonomics', price: '39.99', stock: 34, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop' }
  ];

  get filteredProducts() {
    return this.products.filter(product => {
      const matchesSearch = !this.searchQuery || 
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || 
        product.category.toLowerCase() === this.categoryOptions.find(opt => opt.value === this.selectedCategory)?.label.toLowerCase();
      
      const matchesStatus = !this.selectedStockStatus || 
        product.stockStatus === this.selectedStockStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  getStockBadgeColor(status: string): 'success' | 'warning' | 'danger' | 'info' {
    switch (status) {
      case 'in-stock': return 'success';
      case 'low-stock': return 'warning';
      case 'out-of-stock': return 'danger';
      default: return 'info';
    }
  }

  onSearch(query: string): void {
    console.log('Searching for:', query);
  }

  addProduct(): void {
    console.log('Add product clicked');
  }

  viewProduct(product: any): void {
    console.log('View product:', product);
  }

  editProduct(product: any): void {
    console.log('Edit product:', product);
  }

  viewProductDetails(product: any): void {
    console.log('View product details:', product);
  }
}
