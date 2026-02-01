import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent, SelectOption } from '@muxima-ui/select';

@Component({
  selector: 'muxima-products',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectComponent],
  template: `
    <div class="products-page">
      <div class="page-header">
        <div>
          <h1>Products Management</h1>
          <p>Manage your product catalog, inventory, and pricing</p>
        </div>
        <button class="add-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          Add Product
        </button>
      </div>

      <!-- Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
          </div>
          <div>
            <p class="stat-label">Total Products</p>
            <h3 class="stat-value">573</h3>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <div>
            <p class="stat-label">In Stock</p>
            <h3 class="stat-value">489</h3>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div>
            <p class="stat-label">Low Stock</p>
            <h3 class="stat-value">42</h3>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon red">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <div>
            <p class="stat-label">Out of Stock</p>
            <h3 class="stat-value">42</h3>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="toolbar">
        <div class="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input type="text" placeholder="Search products...">
        </div>
        <div class="filters">
          <muxima-select
            [(ngModel)]="selectedCategory"
            [options]="categoryOptions"
            placeholder="All Categories"
            size="sm"
            class="filter-select">
          </muxima-select>
          <muxima-select
            [(ngModel)]="selectedStockStatus"
            [options]="stockStatusOptions"
            placeholder="All Status"
            size="sm"
            class="filter-select">
          </muxima-select>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="products-grid">
        <div class="product-card" *ngFor="let product of products">
          <div class="product-image">
            <img [src]="product.image" [alt]="product.name">
            <span class="stock-badge" [ngClass]="product.stockStatus">
              {{ product.stockStatus }}
            </span>
          </div>
          <div class="product-info">
            <div class="product-category">{{ product.category }}</div>
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-meta">
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
            <div class="product-actions">
              <button class="action-btn primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit
              </button>
              <button class="action-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .products-page { padding: 2rem; max-width: 1400px; margin: 0 auto; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
    .page-header h1 { font-size: 2rem; font-weight: 700; margin: 0 0 0.5rem 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .page-header p { color: #6b7280; margin: 0; }
    .add-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; transition: all 0.2s; }
    .add-btn svg { width: 20px; height: 20px; }
    .add-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); }
    
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .stat-card { display: flex; align-items: center; gap: 1rem; background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
    .stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
    .stat-icon svg { width: 24px; height: 24px; stroke: white; }
    .stat-icon.blue { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .stat-icon.green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
    .stat-icon.orange { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
    .stat-icon.red { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
    .stat-label { font-size: 0.875rem; color: #6b7280; margin: 0 0 0.25rem 0; }
    .stat-value { font-size: 1.5rem; font-weight: 700; margin: 0; color: #111827; }
    
    .toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; gap: 1rem; }
    .search-box { display: flex; align-items: center; gap: 0.75rem; background: white; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid #e5e7eb; flex: 1; max-width: 400px; }
    .search-box svg { width: 18px; height: 18px; stroke: #9ca3af; }
    .search-box input { border: none; outline: none; flex: 1; font-size: 0.875rem; }
    .filters { display: flex; gap: 0.75rem; }
    .filters select { padding: 0.75rem 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: white; font-size: 0.875rem; cursor: pointer; }
    
    .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
    .product-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); transition: all 0.3s; }
    .product-card:hover { transform: translateY(-4px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); }
    .product-image { position: relative; width: 100%; height: 200px; overflow: hidden; }
    .product-image img { width: 100%; height: 100%; object-fit: cover; }
    .stock-badge { position: absolute; top: 12px; right: 12px; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; }
    .stock-badge.in-stock { background: #d1fae5; color: #065f46; }
    .stock-badge.low-stock { background: #fef3c7; color: #92400e; }
    .stock-badge.out-of-stock { background: #fee2e2; color: #991b1b; }
    .product-info { padding: 1.5rem; }
    .product-category { font-size: 0.75rem; color: #667eea; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.5rem; }
    .product-name { font-size: 1.125rem; font-weight: 600; margin: 0 0 0.5rem 0; color: #111827; }
    .product-description { font-size: 0.875rem; color: #6b7280; margin: 0 0 1rem 0; line-height: 1.5; }
    .product-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-top: 1rem; border-top: 1px solid #f3f4f6; }
    .product-price { display: flex; align-items: center; gap: 0.5rem; }
    .price-current { font-size: 1.25rem; font-weight: 700; color: #111827; }
    .price-old { font-size: 0.875rem; color: #9ca3af; text-decoration: line-through; }
    .product-stock { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #6b7280; }
    .product-stock svg { width: 16px; height: 16px; }
    .product-actions { display: flex; gap: 0.75rem; }
    .action-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 8px; background: white; font-size: 0.875rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
    .action-btn svg { width: 16px; height: 16px; }
    .action-btn.primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; }
    .action-btn.primary:hover { transform: translateY(-1px); box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4); }
    .action-btn:not(.primary):hover { background: #f9fafb; border-color: #667eea; }
    
    @media (max-width: 768px) {
      .products-page { padding: 1rem; }
      .page-header { flex-direction: column; gap: 1rem; }
      .toolbar { flex-direction: column; align-items: stretch; }
      .search-box { max-width: none; }
      .products-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ProductsComponent {
  selectedCategory: any = null;
  selectedStockStatus: any = null;

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
    { name: 'Wireless Headphones', category: 'Electronics', description: 'Premium noise-canceling headphones', price: '199.99', oldPrice: '249.99', stock: 45, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },
    { name: 'Smart Watch Pro', category: 'Electronics', description: 'Advanced fitness tracking smartwatch', price: '299.99', stock: 23, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' },
    { name: 'Mechanical Keyboard', category: 'Peripherals', description: 'RGB gaming mechanical keyboard', price: '149.99', stock: 12, stockStatus: 'low-stock', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop' },
    { name: 'Ergonomic Mouse', category: 'Peripherals', description: 'Wireless ergonomic mouse', price: '79.99', stock: 67, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop' },
    { name: 'USB-C Hub', category: 'Accessories', description: '7-in-1 USB-C hub adapter', price: '49.99', stock: 0, stockStatus: 'out-of-stock', image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop' },
    { name: 'Laptop Stand', category: 'Accessories', description: 'Adjustable aluminum laptop stand', price: '39.99', stock: 34, stockStatus: 'in-stock', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop' }
  ];
}

