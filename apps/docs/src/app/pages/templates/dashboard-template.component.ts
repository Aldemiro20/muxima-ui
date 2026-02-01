import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ButtonComponent } from '@muxima-ui/button';

@Component({
  selector: 'muxima-dashboard-template',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  template: `
    <div class="dashboard">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="logo">
            <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            <span class="logo-text">MuximaUI</span>
          </div>
        </div>
        
        <nav class="sidebar-nav">
          <div class="nav-section">
            <div class="nav-label">MAIN</div>
            <a class="nav-item" routerLink="/templates/dashboard/overview" routerLinkActive="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span class="nav-text">Dashboard</span>
              <span class="nav-badge">5</span>
            </a>
            <a class="nav-item" routerLink="/templates/dashboard/analytics" routerLinkActive="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              <span class="nav-text">Analytics</span>
            </a>
            <a class="nav-item" routerLink="/templates/dashboard/revenue" routerLinkActive="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              <span class="nav-text">Revenue</span>
              <span class="nav-badge success">+12%</span>
            </a>
          </div>
          
          <div class="nav-section">
            <div class="nav-label">MANAGEMENT</div>
            <a class="nav-item" routerLink="/templates/dashboard/users" routerLinkActive="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span class="nav-text">Users</span>
              <span class="nav-count">2,847</span>
            </a>
            <a class="nav-item" routerLink="/templates/dashboard/products" routerLinkActive="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span class="nav-text">Products</span>
            </a>
            <a class="nav-item" routerLink="/templates/dashboard/orders" routerLinkActive="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              <span class="nav-text">Orders</span>
              <span class="nav-badge warning">15</span>
            </a>
            <a class="nav-item" routerLink="/templates/dashboard/payments" routerLinkActive="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
              <span class="nav-text">Payments</span>
            </a>
          </div>
          
          <div class="nav-section">
            <div class="nav-label">SETTINGS</div>
            <a class="nav-item" routerLink="/templates/dashboard/settings" routerLinkActive="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6m5.5-11.5l-4.2 4.2M10.7 14.3l-4.2 4.2m11.5 0l-4.2-4.2m-4.2-4.2l-4.2-4.2"></path>
              </svg>
              <span class="nav-text">Settings</span>
            </a>
            <a class="nav-item" routerLink="/templates/dashboard/security" routerLinkActive="active">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span class="nav-text">Security</span>
            </a>
          </div>
        </nav>
        
        <div class="sidebar-footer">
          <div class="user-profile">
            <div class="user-avatar">AV</div>
            <div class="user-info">
              <div class="user-name">Aldemiro V.</div>
              <div class="user-role">Admin</div>
            </div>
            <button class="user-menu-btn">⋮</button>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Top Header -->
        <header class="top-header">
          <div class="header-left">
            <button class="menu-toggle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div class="search-bar">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input type="text" placeholder="Search anything..." />
              <kbd class="search-kbd">⌘K</kbd>
            </div>
          </div>
          
          <div class="header-right">
            <button class="header-btn">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span class="text">Jan 01 - Feb 01, 2026</span>
            </button>
            <button class="header-icon-btn">
              <span class="notification-dot"></span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <button class="header-icon-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </button>
            <button class="header-icon-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </header>

        <!-- Router Outlet for Dashboard Pages -->
        <div class="dashboard-content">
          <router-outlet></router-outlet>
        </div>

        <!-- Back Button -->
        <div class="back-button-container">
          <muxima-button 
            text="← Voltar para Templates" 
            variant="outline" 
            size="lg"
            (click)="goBack()">
          </muxima-button>
        </div>
      </main>
    </div>
  `,
  styles: [`
    * { margin: 0; padding: 0; box-sizing: border-box; }
    .dashboard { display: flex; min-height: 100vh; background: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    
    /* Sidebar */
    .sidebar { width: 280px; background: white; border-right: 1px solid #e5e7eb; display: flex; flex-direction: column; position: fixed; height: 100vh; z-index: 100; }
    .sidebar-header { padding: 24px; border-bottom: 1px solid #e5e7eb; }
    .logo { display: flex; align-items: center; gap: 12px; }
    .logo-icon { width: 32px; height: 32px; stroke: url(#gradient); }
    .logo-icon svg { width: 100%; height: 100%; }
    .logo-text { font-size: 24px; font-weight: 800; background: var(--muxima-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .sidebar-nav { flex: 1; overflow-y: auto; padding: 16px; }
    .nav-section { margin-bottom: 32px; }
    .nav-label { font-size: 11px; font-weight: 700; color: #9ca3af; letter-spacing: 0.5px; margin-bottom: 12px; padding: 0 12px; }
    .nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; margin-bottom: 4px; border-radius: 12px; color: #6b7280; text-decoration: none; cursor: pointer; transition: all 0.2s; position: relative; }
    .nav-item:hover { background: #f3f4f6; color: #111827; }
    .nav-item.active { background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)); color: var(--muxima-primary); font-weight: 600; }
    .nav-icon { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .nav-text { flex: 1; font-size: 14px; }
    .nav-badge { background: var(--muxima-gradient); color: white; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 700; }
    .nav-badge.success { background: #10b981; }
    .nav-badge.warning { background: #f59e0b; }
    .nav-count { font-size: 12px; color: #9ca3af; }
    .sidebar-footer { padding: 16px; border-top: 1px solid #e5e7eb; }
    .user-profile { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 12px; background: #f9fafb; cursor: pointer; transition: all 0.2s; }
    .user-profile:hover { background: #f3f4f6; }
    .user-avatar { width: 40px; height: 40px; border-radius: 12px; background: var(--muxima-gradient); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; }
    .user-info { flex: 1; }
    .user-name { font-size: 14px; font-weight: 600; color: #111827; }
    .user-role { font-size: 12px; color: #6b7280; }
    .user-menu-btn { background: none; border: none; font-size: 20px; color: #9ca3af; cursor: pointer; padding: 4px; }
    
    /* Main Content */
    .main-content { flex: 1; margin-left: 280px; display: flex; flex-direction: column; }
    .top-header { background: rgba(255, 255, 255, 0.95); border-bottom: 1px solid #e5e7eb; padding: 16px 32px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; backdrop-filter: blur(10px); }
    .header-left { display: flex; align-items: center; gap: 16px; flex: 1; }
    .menu-toggle { display: none; background: none; border: none; font-size: 24px; color: #6b7280; cursor: pointer; }
    .search-bar { display: flex; align-items: center; gap: 12px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 10px 16px; width: 400px; transition: all 0.2s; }
    .search-bar:focus-within { background: white; border-color: var(--muxima-primary); box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1); }
    .search-icon { color: #9ca3af; flex-shrink: 0; }
    .search-bar input { flex: 1; border: none; background: none; outline: none; font-size: 14px; color: #111827; }
    .search-bar input::placeholder { color: #9ca3af; }
    .search-kbd { background: #e5e7eb; border-radius: 6px; padding: 4px 8px; font-size: 12px; font-weight: 600; color: #6b7280; }
    .header-right { display: flex; align-items: center; gap: 12px; }
    .header-btn { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 10px; border: 1px solid #e5e7eb; background: white; font-size: 14px; color: #374151; cursor: pointer; transition: all 0.2s; }
    .header-btn:hover { background: #f9fafb; border-color: #d1d5db; }
    .header-icon-btn { width: 40px; height: 40px; border-radius: 10px; border: 1px solid #e5e7eb; background: white; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; position: relative; }
    .header-icon-btn:hover { background: #f9fafb; border-color: #d1d5db; }
    .notification-dot { position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; background: #ef4444; border-radius: 50%; border: 2px solid white; }
    
    /* Page Header */
    .page-header { padding: 32px; display: flex; align-items: center; justify-content: space-between; }
    .page-title { font-size: 32px; font-weight: 800; color: #111827; margin: 0 0 8px 0; }
    .page-subtitle { font-size: 16px; color: #6b7280; margin: 0; }
    .page-actions { display: flex; gap: 12px; }
    
    /* Stats */
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; padding: 0 32px 32px; }
    .stat-card { background: white; border-radius: 20px; padding: 24px; border: 1px solid #e5e7eb; position: relative; overflow: hidden; transition: all 0.3s; }
    .stat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08); }
    .stat-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
    .stat-label { font-size: 14px; color: #6b7280; font-weight: 600; }
    .stat-trend { display: flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 8px; font-size: 12px; font-weight: 700; }
    .stat-trend.positive { background: #d1fae5; color: #059669; }
    .stat-trend.negative { background: #fee2e2; color: #dc2626; }
    .stat-value { font-size: 36px; font-weight: 900; color: #111827; margin-bottom: 12px; }
    .stat-bar { height: 8px; background: #f3f4f6; border-radius: 4px; overflow: hidden; margin-bottom: 8px; }
    .stat-bar-fill { height: 100%; background: var(--muxima-gradient); border-radius: 4px; transition: width 1s ease; }
    .stat-bar-fill.success { background: linear-gradient(135deg, #10b981, #059669); }
    .stat-bar-fill.warning { background: linear-gradient(135deg, #f59e0b, #d97706); }
    .stat-text { font-size: 12px; color: #6b7280; }
    .stat-icon-wrapper { position: absolute; bottom: 24px; right: 24px; width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 24px; opacity: 0.15; }
    .stat-icon-wrapper.blue { background: #3b82f6; }
    .stat-icon-wrapper.green { background: #10b981; }
    .stat-icon-wrapper.purple { background: #8b5cf6; }
    .stat-icon-wrapper.orange { background: #f59e0b; }
    
    /* Dashboard Grid */
    .dashboard-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; padding: 0 32px 32px; }
    .card { background: white; border-radius: 20px; border: 1px solid #e5e7eb; overflow: hidden; }
    .card-header { padding: 24px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
    .card-title { font-size: 18px; font-weight: 800; color: #111827; margin: 0 0 4px 0; }
    .card-subtitle { font-size: 14px; color: #6b7280; margin: 0; }
    .card-body { padding: 24px; }
    .chart-card { grid-column: span 8; }
    .transactions-card { grid-column: span 4; }
    .products-card { grid-column: span 5; }
    .activity-card { grid-column: span 7; }
    
    /* Chart */
    .chart-select { padding: 8px 16px; border-radius: 8px; border: 1px solid #e5e7eb; background: white; font-size: 14px; color: #374151; cursor: pointer; outline: none; }
    .chart-container { height: 300px; }
    .chart-bars { display: flex; align-items: flex-end; justify-content: space-around; height: 100%; gap: 8px; }
    .chart-bar { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 12px; }
    .bar-wrapper { flex: 1; width: 100%; display: flex; align-items: flex-end; }
    .bar-fill { width: 100%; background: var(--muxima-gradient); border-radius: 8px 8px 0 0; position: relative; transition: height 0.8s ease; display: flex; align-items: flex-start; justify-content: center; padding-top: 8px; min-height: 40px; }
    .bar-value { font-size: 12px; font-weight: 700; color: white; }
    .bar-label { font-size: 12px; color: #6b7280; font-weight: 600; }
    
    /* Transactions */
    .transactions-list { display: flex; flex-direction: column; gap: 16px; }
    .transaction-item { display: flex; align-items: center; gap: 16px; padding: 16px; border-radius: 12px; background: #f9fafb; transition: all 0.2s; }
    .transaction-item:hover { background: #f3f4f6; }
    .transaction-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
    .transaction-icon.income { background: #d1fae5; }
    .transaction-icon.expense { background: #fee2e2; }
    .transaction-details { flex: 1; }
    .transaction-title { font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 4px; }
    .transaction-meta { display: flex; gap: 8px; font-size: 12px; color: #9ca3af; }
    .transaction-amount { font-size: 16px; font-weight: 700; }
    .transaction-amount.success { color: #059669; }
    .transaction-amount.danger { color: #dc2626; }
    
    /* Products */
    .products-list { display: flex; flex-direction: column; gap: 16px; }
    .product-item { display: flex; align-items: center; gap: 16px; padding: 16px; border-radius: 12px; background: #f9fafb; }
    .product-rank { width: 32px; height: 32px; border-radius: 8px; background: var(--muxima-gradient); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; }
    .product-image { width: 56px; height: 56px; border-radius: 12px; overflow: hidden; }
    .product-image img { width: 100%; height: 100%; object-fit: cover; }
    .product-info { flex: 1; }
    .product-name { font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 4px; }
    .product-category { font-size: 12px; color: #6b7280; }
    .product-stats { text-align: right; }
    .product-sales { font-size: 12px; color: #6b7280; margin-bottom: 4px; }
    .product-revenue { font-size: 16px; font-weight: 700; color: #111827; }
    
    /* Activity */
    .activity-timeline { display: flex; flex-direction: column; gap: 20px; }
    .activity-item { display: flex; gap: 16px; position: relative; }
    .activity-item:not(:last-child)::after { content: ''; position: absolute; left: 11px; top: 32px; width: 2px; height: calc(100% + 4px); background: #e5e7eb; }
    .activity-dot { width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 2px #e5e7eb; flex-shrink: 0; }
    .activity-dot.success { background: #10b981; }
    .activity-dot.warning { background: #f59e0b; }
    .activity-dot.info { background: #3b82f6; }
    .activity-text { font-size: 14px; color: #374151; margin-bottom: 4px; }
    .activity-time { font-size: 12px; color: #9ca3af; }
    .view-all-btn { background: none; border: none; color: var(--muxima-primary); font-size: 14px; font-weight: 600; cursor: pointer; padding: 8px 16px; border-radius: 8px; transition: all 0.2s; }
    .view-all-btn:hover { background: rgba(102, 126, 234, 0.1); }
    .live-badge { background: #fee2e2; color: #dc2626; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; }
    
    /* Back Button */
    .back-button-container { padding: 32px; text-align: center; }
    
    /* Dashboard Content */
    .dashboard-content { flex: 1; overflow-y: auto; }
    
    /* Responsive */
    @media (max-width: 1024px) {
      .sidebar { width: 240px; }
      .main-content { margin-left: 240px; }
      .dashboard-grid { grid-template-columns: 1fr; }
      .chart-card, .transactions-card, .products-card, .activity-card { grid-column: span 1; }
    }
    @media (max-width: 768px) {
      .sidebar { transform: translateX(-100%); }
      .main-content { margin-left: 0; }
      .menu-toggle { display: block; }
      .search-bar { width: 200px; }
      .page-header { flex-direction: column; align-items: flex-start; gap: 16px; }
      .stats-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class DashboardTemplateComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/templates']);
  }
}
