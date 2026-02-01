import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent, ChartData } from '@muxima-ui/chart';

@Component({
  selector: 'muxima-dashboard-overview',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  template: `
    <div class="dashboard-overview">
      <div class="page-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your business today.</p>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon revenue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div class="stat-info">
              <p class="stat-label">Total Revenue</p>
              <h2 class="stat-value">$45,231.89</h2>
            </div>
          </div>
          <div class="stat-footer">
            <span class="stat-trend positive">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              +20.1% from last month
            </span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon users">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div class="stat-info">
              <p class="stat-label">Active Users</p>
              <h2 class="stat-value">2,847</h2>
            </div>
          </div>
          <div class="stat-footer">
            <span class="stat-trend positive">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              +18.2% from last month
            </span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon orders">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <div class="stat-info">
              <p class="stat-label">Orders</p>
              <h2 class="stat-value">1,234</h2>
            </div>
          </div>
          <div class="stat-footer">
            <span class="stat-trend negative">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                <polyline points="17 18 23 18 23 12"></polyline>
              </svg>
              -4.3% from last month
            </span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon products">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <div class="stat-info">
              <p class="stat-label">Products Sold</p>
              <h2 class="stat-value">573</h2>
            </div>
          </div>
          <div class="stat-footer">
            <span class="stat-trend positive">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              +8.4% from last month
            </span>
          </div>
        </div>
      </div>

      <!-- Charts and Recent Activity -->
      <div class="content-grid">
        <!-- Revenue Chart -->
        <div class="chart-card">
          <div class="card-header">
            <h3>Revenue Overview</h3>
            <div class="period-selector">
              <button 
                *ngFor="let period of periods" 
                [class.active]="selectedPeriod === period.value"
                (click)="changePeriod(period.value)"
                class="period-btn">
                {{ period.label }}
              </button>
            </div>
          </div>
          <div class="chart-container">
            <muxima-chart
              [data]="revenueChartData"
              [type]="'area'"
              [size]="'lg'"
              [animated]="true"
              [showGrid]="true">
            </muxima-chart>
          </div>
        </div>

        <!-- Recent Activities -->
        <div class="activity-card">
          <div class="card-header">
            <h3>Recent Activities</h3>
            <button class="view-all-btn">View All</button>
          </div>
          <div class="activity-list">
            <div class="activity-item" *ngFor="let activity of recentActivities">
              <div class="activity-icon" [ngClass]="activity.type">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div class="activity-content">
                <p class="activity-title">{{ activity.title }}</p>
                <p class="activity-time">{{ activity.time }}</p>
              </div>
              <span class="activity-badge" [ngClass]="activity.status">{{ activity.status }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sales Comparison and Traffic Sources -->
      <div class="content-grid secondary-grid">
        <!-- Sales Comparison Chart -->
        <div class="chart-card">
          <div class="card-header">
            <h3>Sales Comparison</h3>
            <button class="view-all-btn">Details</button>
          </div>
          <div class="chart-container">
            <muxima-chart
              [data]="salesComparisonData"
              [type]="'bar'"
              [size]="'lg'"
              [animated]="true"
              [showGrid]="true">
            </muxima-chart>
          </div>
        </div>

        <!-- Traffic Sources -->
        <div class="chart-card">
          <div class="card-header">
            <h3>Traffic Sources</h3>
            <button class="view-all-btn">View Report</button>
          </div>
          <div class="chart-container donut-container">
            <muxima-chart
              [data]="trafficSourcesData"
              [type]="'donut'"
              [size]="'md'"
              [animated]="true">
            </muxima-chart>
          </div>
        </div>
      </div>

      <!-- Top Products -->
      <div class="products-card">
        <div class="card-header">
          <h3>Top Products</h3>
          <button class="view-all-btn">View All Products</button>
        </div>
        <div class="products-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Sales</th>
                <th>Revenue</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let product of topProducts">
                <td>
                  <div class="product-info">
                    <div class="product-image">{{ product.icon }}</div>
                    <span>{{ product.name }}</span>
                  </div>
                </td>
                <td>{{ product.category }}</td>
                <td>{{ product.sales }}</td>
                <td>{{ product.revenue }}</td>
                <td>
                  <span class="trend" [ngClass]="product.trend > 0 ? 'positive' : 'negative'">
                    {{ product.trend > 0 ? '+' : '' }}{{ product.trend }}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-overview {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header {
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

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .stat-header {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-icon svg {
      width: 24px;
      height: 24px;
      stroke: white;
    }

    .stat-icon.revenue {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .stat-icon.users {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }

    .stat-icon.orders {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }

    .stat-icon.products {
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    }

    .stat-info {
      flex: 1;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #6b7280;
      margin: 0 0 0.25rem 0;
    }

    .stat-value {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0;
      color: #111827;
    }

    .stat-footer {
      padding-top: 1rem;
      border-top: 1px solid #f3f4f6;
    }

    .stat-trend {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .stat-trend svg {
      width: 16px;
      height: 16px;
    }

    .stat-trend.positive {
      color: #10b981;
    }

    .stat-trend.positive svg {
      stroke: #10b981;
    }

    .stat-trend.negative {
      color: #ef4444;
    }

    .stat-trend.negative svg {
      stroke: #ef4444;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .secondary-grid {
      grid-template-columns: 1fr 1fr;
    }

    .chart-card, .activity-card, .products-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .chart-card:hover, .activity-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .card-header h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
      color: #111827;
    }

    .period-selector {
      display: flex;
      gap: 0.5rem;
      background: #f3f4f6;
      padding: 0.25rem;
      border-radius: 8px;
    }

    .period-btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      font-size: 0.875rem;
      background: transparent;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s;
      font-weight: 500;
    }

    .period-btn:hover {
      color: #667eea;
    }

    .period-btn.active {
      background: white;
      color: #667eea;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .view-all-btn {
      padding: 0.5rem 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      font-size: 0.875rem;
      background: white;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s;
      font-weight: 500;
    }

    .view-all-btn:hover {
      background: #f9fafb;
      color: #667eea;
      border-color: #667eea;
    }

    .chart-container {
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .donut-container {
      min-height: 350px;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      border-radius: 8px;
      transition: background 0.2s;
    }

    .activity-item:hover {
      background: #f9fafb;
    }

    .activity-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .activity-icon svg {
      width: 18px;
      height: 18px;
      stroke: white;
    }

    .activity-content {
      flex: 1;
    }

    .activity-title {
      font-size: 0.875rem;
      font-weight: 500;
      margin: 0 0 0.25rem 0;
      color: #111827;
    }

    .activity-time {
      font-size: 0.75rem;
      color: #9ca3af;
      margin: 0;
    }

    .activity-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .activity-badge.completed {
      background: #d1fae5;
      color: #065f46;
    }

    .activity-badge.pending {
      background: #fef3c7;
      color: #92400e;
    }

    .products-table {
      overflow-x: auto;
    }

    .products-table table {
      width: 100%;
      border-collapse: collapse;
    }

    .products-table th {
      text-align: left;
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #6b7280;
      border-bottom: 2px solid #f3f4f6;
    }

    .products-table td {
      padding: 1rem;
      border-bottom: 1px solid #f3f4f6;
    }

    .product-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .product-image {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }

    .trend {
      padding: 0.25rem 0.5rem;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .trend.positive {
      background: #d1fae5;
      color: #065f46;
    }

    .trend.negative {
      background: #fee2e2;
      color: #991b1b;
    }

    @media (max-width: 1024px) {
      .content-grid, .secondary-grid {
        grid-template-columns: 1fr;
      }

      .period-selector {
        flex-wrap: wrap;
      }
    }

    @media (max-width: 768px) {
      .dashboard-overview {
        padding: 1rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .period-selector {
        width: 100%;
      }

      .period-btn {
        flex: 1;
      }

      .card-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
    }
  `]
})
export class DashboardOverviewComponent {
  selectedPeriod: string = '12months';
  
  periods = [
    { label: '30 Days', value: '30days' },
    { label: '6 Months', value: '6months' },
    { label: '12 Months', value: '12months' }
  ];

  // Revenue Chart Data (Area Chart)
  revenueChartData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Revenue 2024',
      data: [35000, 42000, 38000, 50000, 48000, 55000, 52000, 60000, 58000, 65000, 62000, 70000],
      borderColor: '#667eea',
      backgroundColor: 'rgba(102, 126, 234, 0.1)'
    }]
  };

  // Sales Comparison Data (Bar Chart)
  salesComparisonData: ChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: '2023',
        data: [45000, 52000, 48000, 65000],
        backgroundColor: '#667eea'
      },
      {
        label: '2024',
        data: [48000, 58000, 62000, 75000],
        backgroundColor: '#764ba2'
      }
    ]
  };

  // Traffic Sources Data (Donut Chart)
  trafficSourcesData: ChartData = {
    labels: ['Direct', 'Search', 'Social', 'Email', 'Referral'],
    datasets: [{
      label: 'Traffic Sources',
      data: [35, 28, 20, 12, 5],
      backgroundColor: [
        '#667eea',
        '#764ba2',
        '#f093fb',
        '#4facfe',
        '#43e97b'
      ]
    }]
  };

  changePeriod(period: string) {
    this.selectedPeriod = period;
    
    // Update chart data based on selected period
    switch(period) {
      case '30days':
        this.revenueChartData = {
          labels: Array.from({length: 30}, (_, i) => `Day ${i + 1}`),
          datasets: [{
            label: 'Daily Revenue',
            data: Array.from({length: 30}, () => Math.floor(Math.random() * 5000) + 2000),
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.1)'
          }]
        };
        break;
      case '6months':
        this.revenueChartData = {
          labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Revenue 2024',
            data: [52000, 60000, 58000, 65000, 62000, 70000],
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.1)'
          }]
        };
        break;
      case '12months':
        this.revenueChartData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Revenue 2024',
            data: [35000, 42000, 38000, 50000, 48000, 55000, 52000, 60000, 58000, 65000, 62000, 70000],
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.1)'
          }]
        };
        break;
    }
  }

  recentActivities = [
    { title: 'New order #1234 received', time: '2 minutes ago', status: 'pending', type: 'order' },
    { title: 'Payment processed successfully', time: '15 minutes ago', status: 'completed', type: 'payment' },
    { title: 'New user registered', time: '1 hour ago', status: 'completed', type: 'user' },
    { title: 'Product inventory updated', time: '2 hours ago', status: 'completed', type: 'product' },
    { title: 'System backup completed', time: '3 hours ago', status: 'completed', type: 'system' }
  ];

  topProducts = [
    { icon: '📱', name: 'iPhone 14 Pro', category: 'Electronics', sales: 234, revenue: '$234,000', trend: 12.5 },
    { icon: '💻', name: 'MacBook Pro M2', category: 'Computers', sales: 189, revenue: '$378,000', trend: 8.3 },
    { icon: '🎧', name: 'AirPods Pro', category: 'Audio', sales: 456, revenue: '$91,200', trend: -2.1 },
    { icon: '⌚', name: 'Apple Watch', category: 'Wearables', sales: 312, revenue: '$124,800', trend: 15.7 },
    { icon: '🖥️', name: 'iMac 24"', category: 'Computers', sales: 98, revenue: '$156,800', trend: 5.4 }
  ];
}
