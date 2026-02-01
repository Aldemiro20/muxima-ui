import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'muxima-revenue',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="revenue-page">
      <div class="page-header">
        <div>
          <h1>Revenue Management</h1>
          <p>Track your financial performance and revenue streams</p>
        </div>
        <div class="header-actions">
          <select class="period-select">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
          <button class="export-btn">📊 Export Report</button>
        </div>
      </div>

      <!-- Revenue Summary -->
      <div class="summary-grid">
        <div class="summary-card primary">
          <div class="summary-header">
            <span class="summary-icon">💰</span>
            <span class="summary-label">Total Revenue</span>
          </div>
          <div class="summary-value">$245,678</div>
          <div class="summary-change positive">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            </svg>
            +18.2% from last month
          </div>
        </div>

        <div class="summary-card">
          <div class="summary-header">
            <span class="summary-icon">📈</span>
            <span class="summary-label">Net Profit</span>
          </div>
          <div class="summary-value">$98,234</div>
          <div class="summary-change positive">+12.5%</div>
        </div>

        <div class="summary-card">
          <div class="summary-header">
            <span class="summary-icon">💳</span>
            <span class="summary-label">Transactions</span>
          </div>
          <div class="summary-value">1,234</div>
          <div class="summary-change positive">+8.3%</div>
        </div>

        <div class="summary-card">
          <div class="summary-header">
            <span class="summary-icon">📊</span>
            <span class="summary-label">Avg. Order Value</span>
          </div>
          <div class="summary-value">$198.90</div>
          <div class="summary-change negative">-2.1%</div>
        </div>
      </div>

      <!-- Revenue Chart -->
      <div class="chart-section">
        <div class="section-header">
          <h3>Revenue Trend</h3>
          <div class="chart-legend">
            <span class="legend-item">
              <span class="legend-dot revenue"></span>
              Revenue
            </span>
            <span class="legend-item">
              <span class="legend-dot expenses"></span>
              Expenses
            </span>
          </div>
        </div>
        <div class="chart-container">
          <svg viewBox="0 0 800 300" class="revenue-chart">
            <defs>
              <linearGradient id="revGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#667eea" stop-opacity="0.3" />
                <stop offset="100%" stop-color="#667eea" stop-opacity="0" />
              </linearGradient>
            </defs>
            <!-- Revenue Area -->
            <path
              d="M 0,250 L 100,220 L 200,180 L 300,200 L 400,150 L 500,170 L 600,120 L 700,100 L 800,80 L 800,300 L 0,300 Z"
              fill="url(#revGradient)"
            />
            <!-- Revenue Line -->
            <polyline
              points="0,250 100,220 200,180 300,200 400,150 500,170 600,120 700,100 800,80"
              fill="none"
              stroke="#667eea"
              stroke-width="3"
            />
            <!-- Expenses Line -->
            <polyline
              points="0,270 100,265 200,250 300,255 400,230 500,240 600,210 700,200 800,180"
              fill="none"
              stroke="#f5576c"
              stroke-width="2"
              stroke-dasharray="5,5"
            />
          </svg>
        </div>
      </div>

      <!-- Revenue Breakdown -->
      <div class="breakdown-grid">
        <div class="breakdown-card">
          <div class="section-header">
            <h3>Revenue by Category</h3>
          </div>
          <div class="category-list">
            <div class="category-item" *ngFor="let category of revenueByCategory">
              <div class="category-info">
                <span class="category-icon">{{ category.icon }}</span>
                <div class="category-details">
                  <span class="category-name">{{ category.name }}</span>
                  <span class="category-count">{{ category.count }} sales</span>
                </div>
              </div>
              <div class="category-stats">
                <span class="category-amount">{{ category.amount }}</span>
                <div class="category-bar">
                  <div class="category-fill" [style.width.%]="category.percentage"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="breakdown-card">
          <div class="section-header">
            <h3>Top Revenue Generators</h3>
          </div>
          <div class="generators-list">
            <div class="generator-item" *ngFor="let item of topGenerators; let i = index">
              <span class="generator-rank">#{{ i + 1 }}</span>
              <div class="generator-info">
                <span class="generator-name">{{ item.name }}</span>
                <span class="generator-sales">{{ item.sales }} sales</span>
              </div>
              <span class="generator-amount">{{ item.amount }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="transactions-section">
        <div class="section-header">
          <h3>Recent Transactions</h3>
          <button class="view-all-btn">View All</button>
        </div>
        <div class="transactions-table">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let transaction of recentTransactions">
                <td><code>{{ transaction.id }}</code></td>
                <td>{{ transaction.customer }}</td>
                <td>{{ transaction.date }}</td>
                <td class="amount">{{ transaction.amount }}</td>
                <td>
                  <span class="status" [ngClass]="transaction.status">
                    {{ transaction.status }}
                  </span>
                </td>
                <td>{{ transaction.method }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .revenue-page {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
    }

    .page-header h1 {
      font-size: 2rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .page-header p {
      color: #6b7280;
      margin: 0;
    }

    .header-actions {
      display: flex;
      gap: 1rem;
    }

    .period-select, .export-btn {
      padding: 0.5rem 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background: white;
      color: #374151;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .export-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      font-weight: 500;
    }

    .export-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .summary-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .summary-card.primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .summary-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .summary-icon {
      font-size: 1.5rem;
    }

    .summary-label {
      font-size: 0.875rem;
      opacity: 0.9;
    }

    .summary-value {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .summary-card:not(.primary) .summary-value {
      color: #111827;
    }

    .summary-change {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .summary-change svg {
      width: 16px;
      height: 16px;
    }

    .summary-card.primary .summary-change {
      opacity: 0.9;
    }

    .summary-card:not(.primary) .summary-change.positive {
      color: #10b981;
    }

    .summary-card:not(.primary) .summary-change.negative {
      color: #ef4444;
    }

    .chart-section, .breakdown-card, .transactions-section {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .section-header h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
      color: #111827;
    }

    .chart-legend {
      display: flex;
      gap: 1.5rem;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .legend-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .legend-dot.revenue {
      background: #667eea;
    }

    .legend-dot.expenses {
      background: #f5576c;
    }

    .chart-container {
      height: 300px;
    }

    .revenue-chart {
      width: 100%;
      height: 100%;
    }

    .breakdown-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .category-list, .generators-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .category-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    .category-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .category-icon {
      font-size: 1.5rem;
    }

    .category-details {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .category-name {
      font-weight: 500;
      color: #111827;
    }

    .category-count {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .category-stats {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;
      min-width: 120px;
    }

    .category-amount {
      font-weight: 600;
      color: #667eea;
    }

    .category-bar {
      width: 100%;
      height: 4px;
      background: #f3f4f6;
      border-radius: 2px;
      overflow: hidden;
    }

    .category-fill {
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transition: width 0.3s ease;
    }

    .generator-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      border-radius: 8px;
      transition: background 0.2s;
    }

    .generator-item:hover {
      background: #f9fafb;
    }

    .generator-rank {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .generator-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .generator-name {
      font-weight: 500;
      color: #111827;
    }

    .generator-sales {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .generator-amount {
      font-weight: 600;
      color: #667eea;
    }

    .transactions-table {
      overflow-x: auto;
    }

    .transactions-table table {
      width: 100%;
      border-collapse: collapse;
    }

    .transactions-table th {
      text-align: left;
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #6b7280;
      border-bottom: 2px solid #f3f4f6;
    }

    .transactions-table td {
      padding: 1rem;
      border-bottom: 1px solid #f3f4f6;
    }

    .transactions-table code {
      background: #f3f4f6;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
    }

    .amount {
      font-weight: 600;
      color: #111827;
    }

    .status {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .status.completed {
      background: #d1fae5;
      color: #065f46;
    }

    .status.pending {
      background: #fef3c7;
      color: #92400e;
    }

    .status.failed {
      background: #fee2e2;
      color: #991b1b;
    }

    .view-all-btn {
      padding: 0.5rem 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background: white;
      color: #6b7280;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .view-all-btn:hover {
      background: #f9fafb;
      color: #667eea;
    }

    @media (max-width: 1024px) {
      .breakdown-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .revenue-page {
        padding: 1rem;
      }

      .page-header {
        flex-direction: column;
        gap: 1rem;
      }

      .header-actions {
        width: 100%;
      }

      .summary-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class RevenueComponent {
  revenueByCategory = [
    { icon: '📱', name: 'Electronics', count: 456, amount: '$128,450', percentage: 45 },
    { icon: '👕', name: 'Fashion', count: 324, amount: '$85,230', percentage: 30 },
    { icon: '🏠', name: 'Home & Garden', count: 245, amount: '$42,890', percentage: 15 },
    { icon: '📚', name: 'Books', count: 189, amount: '$28,670', percentage: 10 }
  ];

  topGenerators = [
    { name: 'iPhone 14 Pro Max', sales: 234, amount: '$234,000' },
    { name: 'MacBook Pro M2', sales: 189, amount: '$378,000' },
    { name: 'AirPods Pro 2', sales: 456, amount: '$91,200' },
    { name: 'iPad Air', sales: 156, amount: '$93,600' },
    { name: 'Apple Watch Series 8', sales: 312, amount: '$124,800' }
  ];

  recentTransactions = [
    { id: 'TXN-001234', customer: 'John Doe', date: '2024-02-01', amount: '$1,234.00', status: 'completed', method: 'Credit Card' },
    { id: 'TXN-001235', customer: 'Jane Smith', date: '2024-02-01', amount: '$856.50', status: 'completed', method: 'PayPal' },
    { id: 'TXN-001236', customer: 'Bob Johnson', date: '2024-02-01', amount: '$2,499.99', status: 'pending', method: 'Bank Transfer' },
    { id: 'TXN-001237', customer: 'Alice Brown', date: '2024-01-31', amount: '$567.80', status: 'completed', method: 'Credit Card' },
    { id: 'TXN-001238', customer: 'Charlie Wilson', date: '2024-01-31', amount: '$1,890.00', status: 'failed', method: 'Debit Card' }
  ];
}
