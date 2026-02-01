import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent, SelectOption } from '@muxima-ui/select';

@Component({
  selector: 'muxima-payments',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectComponent],
  template: `
    <div class="payments-page">
      <div class="page-header">
        <div>
          <h1>Payments & Transactions</h1>
          <p>Monitor payment activities and financial transactions</p>
        </div>
        <button class="export-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Export Report
        </button>
      </div>

      <!-- Stats -->
      <div class="stats-grid">
        <div class="stat-card primary">
          <div class="stat-content">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div>
              <p class="stat-label">Total Revenue</p>
              <h3 class="stat-value">\$245,678</h3>
              <span class="stat-trend">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                </svg>
                +18.2% from last month
              </span>
            </div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div>
            <p class="stat-label">Completed</p>
            <h3 class="stat-value">1,156</h3>
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
            <h3 class="stat-value">45</h3>
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
            <p class="stat-label">Failed</p>
            <h3 class="stat-value">12</h3>
          </div>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="methods-section">
        <div class="section-header">
          <h2>Payment Methods</h2>
          <button class="add-method-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            Add Method
          </button>
        </div>
        <div class="methods-grid">
          <div class="method-card" *ngFor="let method of paymentMethods">
            <div class="method-type" [ngClass]="method.type">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
            <div class="method-info">
              <h3>{{ method.name }}</h3>
              <p>{{ method.details }}</p>
            </div>
            <div class="method-actions">
              <button class="icon-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button class="icon-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="transactions-section">
        <div class="section-header">
          <h2>Recent Transactions</h2>
          <muxima-select
            [(ngModel)]="selectedTransactionFilter"
            [options]="transactionFilterOptions"
            placeholder="All Transactions"
            size="sm"
            class="filter-select">
          </muxima-select>
        </div>
        <div class="transactions-table">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let transaction of transactions">
                <td><code>{{ transaction.id }}</code></td>
                <td>
                  <div class="customer-info">
                    <div class="avatar" [style.background]="transaction.avatarColor">
                      {{ transaction.initials }}
                    </div>
                    <span>{{ transaction.customer }}</span>
                  </div>
                </td>
                <td>
                  <div class="payment-method">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    {{ transaction.method }}
                  </div>
                </td>
                <td class="amount">\${{ transaction.amount }}</td>
                <td>
                  <span class="status" [ngClass]="transaction.status.toLowerCase()">
                    {{ transaction.status }}
                  </span>
                </td>
                <td>{{ transaction.date }}</td>
                <td>
                  <button class="view-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .payments-page { padding: 2rem; max-width: 1400px; margin: 0 auto; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
    .page-header h1 { font-size: 2rem; font-weight: 700; margin: 0 0 0.5rem 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .page-header p { color: #6b7280; margin: 0; }
    .export-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; transition: all 0.2s; }
    .export-btn svg { width: 18px; height: 18px; }
    .export-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); }
    
    .stats-grid { display: grid; grid-template-columns: 2fr repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
    .stat-card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); display: flex; align-items: center; gap: 1rem; }
    .stat-card.primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; grid-column: 1; }
    .stat-content { display: flex; align-items: center; gap: 1.5rem; width: 100%; }
    .stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
    .stat-icon svg { width: 24px; height: 24px; }
    .stat-card.primary .stat-icon { background: rgba(255, 255, 255, 0.2); }
    .stat-card.primary .stat-icon svg { stroke: white; }
    .stat-icon.green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
    .stat-icon.yellow { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); }
    .stat-icon.red { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
    .stat-icon:not(.green):not(.yellow):not(.red) svg { stroke: white; }
    .stat-label { font-size: 0.875rem; margin: 0 0 0.5rem 0; opacity: 0.9; }
    .stat-card:not(.primary) .stat-label { color: #6b7280; }
    .stat-value { font-size: 1.75rem; font-weight: 700; margin: 0 0 0.25rem 0; }
    .stat-card:not(.primary) .stat-value { color: #111827; }
    .stat-trend { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; opacity: 0.9; }
    .stat-trend svg { width: 14px; height: 14px; }
    
    .methods-section, .transactions-section { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); margin-bottom: 2rem; }
    .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .section-header h2 { font-size: 1.25rem; font-weight: 600; margin: 0; color: #111827; }
    .add-method-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 0.875rem; font-weight: 500; }
    .add-method-btn svg { width: 16px; height: 16px; }
    .filter-select { padding: 0.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: white; font-size: 0.875rem; cursor: pointer; }
    
    .methods-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; }
    .method-card { display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; transition: all 0.2s; }
    .method-card:hover { border-color: #667eea; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15); }
    .method-type { width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .method-type svg { width: 24px; height: 24px; stroke: white; }
    .method-info { flex: 1; }
    .method-info h3 { font-size: 0.875rem; font-weight: 600; margin: 0 0 0.25rem 0; color: #111827; }
    .method-info p { font-size: 0.75rem; color: #6b7280; margin: 0; }
    .method-actions { display: flex; gap: 0.5rem; }
    .icon-btn { padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 6px; background: white; cursor: pointer; transition: all 0.2s; }
    .icon-btn svg { width: 14px; height: 14px; stroke: #6b7280; }
    .icon-btn:hover { background: #f9fafb; border-color: #667eea; }
    .icon-btn:hover svg { stroke: #667eea; }
    
    .transactions-table { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 0.75rem 1rem; font-size: 0.875rem; font-weight: 600; color: #6b7280; border-bottom: 2px solid #f3f4f6; }
    td { padding: 1rem; border-bottom: 1px solid #f3f4f6; }
    code { background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem; font-family: monospace; }
    .customer-info { display: flex; align-items: center; gap: 0.75rem; }
    .avatar { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 0.75rem; }
    .payment-method { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; }
    .payment-method svg { width: 16px; height: 16px; stroke: #6b7280; }
    .amount { font-weight: 600; color: #111827; }
    .status { padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 500; text-transform: capitalize; }
    .status.completed { background: #d1fae5; color: #065f46; }
    .status.pending { background: #fef3c7; color: #92400e; }
    .status.failed { background: #fee2e2; color: #991b1b; }
    .view-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 6px; background: white; font-size: 0.875rem; cursor: pointer; transition: all 0.2s; }
    .view-btn svg { width: 14px; height: 14px; }
    .view-btn:hover { background: #f9fafb; border-color: #667eea; color: #667eea; }
    
    @media (max-width: 1024px) {
      .stats-grid { grid-template-columns: 1fr 1fr; }
      .stat-card.primary { grid-column: 1 / -1; }
    }
    @media (max-width: 768px) {
      .payments-page { padding: 1rem; }
      .page-header { flex-direction: column; gap: 1rem; }
      .stats-grid { grid-template-columns: 1fr; }
      .methods-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class PaymentsComponent {
  selectedTransactionFilter: any = null;

  transactionFilterOptions: SelectOption[] = [
    { label: 'All Transactions', value: null },
    { label: 'Completed', value: 'completed' },
    { label: 'Pending', value: 'pending' },
    { label: 'Failed', value: 'failed' }
  ];

  paymentMethods = [
    { name: 'Credit Card', details: '**** 4532', type: 'card' },
    { name: 'PayPal', details: 'joker@muxima.com', type: 'paypal' },
    { name: 'Bank Transfer', details: 'BOA ****1234', type: 'bank' }
  ];

  transactions = [
    { id: 'TXN-001234', customer: 'Aldemiro Valentim', initials: 'AV', method: 'Visa ****4532', amount: '1,250.00', status: 'Completed', date: '2024-02-01', avatarColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 'TXN-001235', customer: 'jokerScript', initials: 'JS', method: 'PayPal', amount: '856.50', status: 'Completed', date: '2024-02-01', avatarColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: 'TXN-001236', customer: 'Bob Johnson', initials: 'BJ', method: 'Mastercard ****7890', amount: '2,499.99', status: 'Pending', date: '2024-01-31', avatarColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { id: 'TXN-001237', customer: 'Alice Brown', initials: 'AB', method: 'Bank Transfer', amount: '567.80', status: 'Failed', date: '2024-01-31', avatarColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { id: 'TXN-001238', customer: 'Charlie Wilson', initials: 'CW', method: 'Amex ****3456', amount: '1,890.00', status: 'Completed', date: '2024-01-30', avatarColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }
  ];
}

