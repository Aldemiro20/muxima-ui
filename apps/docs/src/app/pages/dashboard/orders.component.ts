import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent, SelectOption } from '@muxima-ui/select';

@Component({
  selector: 'muxima-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectComponent],
  template: `
    <div class="orders-page">
      <div class="page-header">
        <div>
          <h1>Orders Management</h1>
          <p>Track and manage customer orders and shipments</p>
        </div>
        <button class="export-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Export Orders
        </button>
      </div>

      <!-- Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon purple">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <div>
            <p class="stat-label">Total Orders</p>
            <h3 class="stat-value">1,234</h3>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon yellow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div>
            <p class="stat-label">Pending</p>
            <h3 class="stat-value">89</h3>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
          </div>
          <div>
            <p class="stat-label">Shipped</p>
            <h3 class="stat-value">156</h3>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div>
            <p class="stat-label">Delivered</p>
            <h3 class="stat-value">989</h3>
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
          <input type="text" placeholder="Search orders...">
        </div>
        <div class="filters">
          <muxima-select
            [(ngModel)]="selectedStatus"
            [options]="statusOptions"
            placeholder="All Status"
            size="sm"
            class="filter-select">
          </muxima-select>
          <muxima-select
            [(ngModel)]="selectedPeriod"
            [options]="periodOptions"
            placeholder="Last 30 days"
            size="sm"
            class="filter-select">
          </muxima-select>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="orders-table">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox">
              </th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Products</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let order of orders">
              <td>
                <input type="checkbox">
              </td>
              <td>
                <code class="order-id">{{ order.id }}</code>
              </td>
              <td>
                <div class="customer-cell">
                  <div class="customer-avatar" [style.background]="order.avatarColor">
                    {{ order.initials }}
                  </div>
                  <div>
                    <div class="customer-name">{{ order.customer }}</div>
                    <div class="customer-email">{{ order.email }}</div>
                  </div>
                </div>
              </td>
              <td>
                <span class="products-count">{{ order.products }} items</span>
              </td>
              <td>
                <span class="amount">\${{ order.amount }}</span>
              </td>
              <td>
                <span class="status-badge" [ngClass]="order.status.toLowerCase()">
                  <svg viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" fill="currentColor"></circle>
                  </svg>
                  {{ order.status }}
                </span>
              </td>
              <td>
                <span class="date">{{ order.date }}</span>
              </td>
              <td>
                <div class="actions">
                  <button class="action-btn" title="View">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button class="action-btn" title="Track">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </button>
                  <button class="action-btn" title="More">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="5" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <span class="page-info">Showing 1-10 of 1,234</span>
        <div class="page-controls">
          <button class="page-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <button class="page-btn">...</button>
          <button class="page-btn">45</button>
          <button class="page-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .orders-page { padding: 2rem; max-width: 1400px; margin: 0 auto; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
    .page-header h1 { font-size: 2rem; font-weight: 700; margin: 0 0 0.5rem 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .page-header p { color: #6b7280; margin: 0; }
    .export-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; font-weight: 500; transition: all 0.2s; }
    .export-btn svg { width: 18px; height: 18px; }
    .export-btn:hover { background: #f9fafb; border-color: #667eea; color: #667eea; }
    
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .stat-card { display: flex; align-items: center; gap: 1rem; background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
    .stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
    .stat-icon svg { width: 24px; height: 24px; stroke: white; }
    .stat-icon.purple { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .stat-icon.yellow { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); }
    .stat-icon.blue { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }
    .stat-icon.green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
    .stat-label { font-size: 0.875rem; color: #6b7280; margin: 0 0 0.25rem 0; }
    .stat-value { font-size: 1.5rem; font-weight: 700; margin: 0; color: #111827; }
    
    .toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; gap: 1rem; }
    .search-box { display: flex; align-items: center; gap: 0.75rem; background: white; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid #e5e7eb; flex: 1; max-width: 400px; }
    .search-box svg { width: 18px; height: 18px; stroke: #9ca3af; }
    .search-box input { border: none; outline: none; flex: 1; font-size: 0.875rem; }
    .filters { display: flex; gap: 0.75rem; }
    .filters select { padding: 0.75rem 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: white; font-size: 0.875rem; cursor: pointer; }
    
    .orders-table { background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); overflow: hidden; margin-bottom: 1.5rem; }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 1rem; font-size: 0.875rem; font-weight: 600; color: #6b7280; background: #f9fafb; border-bottom: 2px solid #e5e7eb; }
    td { padding: 1rem; border-bottom: 1px solid #f3f4f6; }
    .order-id { background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem; font-family: monospace; }
    .customer-cell { display: flex; align-items: center; gap: 0.75rem; }
    .customer-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 0.875rem; }
    .customer-name { font-weight: 500; color: #111827; font-size: 0.875rem; }
    .customer-email { font-size: 0.75rem; color: #6b7280; }
    .products-count { font-size: 0.875rem; color: #6b7280; }
    .amount { font-weight: 600; color: #111827; }
    .status-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 500; text-transform: capitalize; }
    .status-badge svg { width: 8px; height: 8px; }
    .status-badge.pending { background: #fef3c7; color: #92400e; }
    .status-badge.processing { background: #dbeafe; color: #1e40af; }
    .status-badge.shipped { background: #e0e7ff; color: #3730a3; }
    .status-badge.delivered { background: #d1fae5; color: #065f46; }
    .date { font-size: 0.875rem; color: #6b7280; }
    .actions { display: flex; gap: 0.5rem; }
    .action-btn { padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 6px; background: white; cursor: pointer; transition: all 0.2s; }
    .action-btn svg { width: 16px; height: 16px; stroke: #6b7280; }
    .action-btn:hover { background: #f9fafb; border-color: #667eea; }
    .action-btn:hover svg { stroke: #667eea; }
    
    .pagination { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
    .page-info { color: #6b7280; font-size: 0.875rem; }
    .page-controls { display: flex; gap: 0.5rem; }
    .page-btn { padding: 0.5rem 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; background: white; color: #374151; font-size: 0.875rem; cursor: pointer; transition: all 0.2s; min-width: 36px; display: flex; align-items: center; justify-content: center; }
    .page-btn svg { width: 16px; height: 16px; }
    .page-btn.active { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-color: transparent; }
    .page-btn:hover:not(.active) { background: #f9fafb; }
    
    @media (max-width: 768px) {
      .orders-page { padding: 1rem; }
      .page-header { flex-direction: column; gap: 1rem; }
      .toolbar { flex-direction: column; align-items: stretch; }
      .search-box { max-width: none; }
      .orders-table { overflow-x: auto; }
    }
  `]
})
export class OrdersComponent {
  selectedStatus: any = null;
  selectedPeriod: any = null;

  statusOptions: SelectOption[] = [
    { label: 'All Status', value: null },
    { label: 'Pending', value: 'pending' },
    { label: 'Processing', value: 'processing' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Delivered', value: 'delivered' }
  ];

  periodOptions: SelectOption[] = [
    { label: 'Last 30 days', value: '30' },
    { label: 'Last 7 days', value: '7' },
    { label: 'Today', value: '1' }
  ];

  orders = [
    { id: '#ORD-1234', customer: 'Aldemiro Valentim', email: 'aldemiro@muxima.com', products: 3, amount: '1,250.00', status: 'Delivered', date: '2024-01-28', initials: 'AV', avatarColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: '#ORD-1235', customer: 'jokerScript', email: 'joker@muxima.com', products: 2, amount: '890.50', status: 'Shipped', date: '2024-01-29', initials: 'JS', avatarColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: '#ORD-1236', customer: 'Bob Johnson', email: 'bob@example.com', products: 5, amount: '2,499.99', status: 'Processing', date: '2024-01-30', initials: 'BJ', avatarColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { id: '#ORD-1237', customer: 'Alice Brown', email: 'alice@example.com', products: 1, amount: '567.80', status: 'Pending', date: '2024-01-31', initials: 'AB', avatarColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { id: '#ORD-1238', customer: 'Charlie Wilson', email: 'charlie@example.com', products: 4, amount: '1,890.00', status: 'Delivered', date: '2024-02-01', initials: 'CW', avatarColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }
  ];
}

