import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCardComponent } from '@muxima-ui/card';

@Component({
  selector: 'muxima-analytics',
  standalone: true,
  imports: [CommonModule, CardCardComponent],
  template: `
    <div class="analytics-page">
      <div class="page-header">
        <h1>Analytics</h1>
        <p>Track and analyze your business performance metrics</p>
      </div>

      <!-- Key Metrics -->
      <div class="metrics-grid">
        <muxima-card variant="dashboard-stat" [hoverable]="true">
          <div class="metric-header">
            <span class="metric-icon">👁️</span>
            <h3>Page Views</h3>
          </div>
          <div class="metric-value">45,678</div>
          <div class="metric-change positive">+12.5% vs last week</div>
        </muxima-card>

        <muxima-card variant="dashboard-stat" [hoverable]="true">
          <div class="metric-header">
            <span class="metric-icon">⏱️</span>
            <h3>Avg. Session</h3>
          </div>
          <div class="metric-value">3m 24s</div>
          <div class="metric-change positive">+8.2% vs last week</div>
        </muxima-card>

        <muxima-card variant="dashboard-stat" [hoverable]="true">
          <div class="metric-header">
            <span class="metric-icon">📊</span>
            <h3>Bounce Rate</h3>
          </div>
          <div class="metric-value">42.3%</div>
          <div class="metric-change negative">-3.1% vs last week</div>
        </muxima-card>

        <muxima-card variant="dashboard-stat" [hoverable]="true">
          <div class="metric-header">
            <span class="metric-icon">🎯</span>
            <h3>Conversion</h3>
          </div>
          <div class="metric-value">3.8%</div>
          <div class="metric-change positive">+0.5% vs last week</div>
        </muxima-card>
      </div>

      <!-- Charts -->
      <div class="charts-grid">
        <muxima-card variant="dashboard" class="chart-card large">
          <div muximaCardHeader class="card-header">
            <h3>Traffic Overview</h3>
            <div class="filter-tabs">
              <button class="tab active">7 Days</button>
              <button class="tab">30 Days</button>
              <button class="tab">90 Days</button>
            </div>
          </div>
          <div class="chart-content">
            <div class="chart-placeholder">
              <svg viewBox="0 0 600 250" class="traffic-chart">
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#667eea" stop-opacity="0.3" />
                    <stop offset="100%" stop-color="#667eea" stop-opacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,200 L 100,180 L 200,150 L 300,120 L 400,140 L 500,100 L 600,80 L 600,250 L 0,250 Z"
                  fill="url(#areaGradient)"
                />
                <polyline
                  points="0,200 100,180 200,150 300,120 400,140 500,100 600,80"
                  fill="none"
                  stroke="#667eea"
                  stroke-width="3"
                />
              </svg>
            </div>
          </div>
        </muxima-card>

        <muxima-card variant="dashboard" class="chart-card">
          <div muximaCardHeader class="card-header">
            <h3>Traffic Sources</h3>
          </div>
          <div class="sources-list">
            <div class="source-item" *ngFor="let source of trafficSources">
              <div class="source-info">
                <span class="source-icon">{{ source.icon }}</span>
                <span class="source-name">{{ source.name }}</span>
              </div>
              <div class="source-stats">
                <div class="progress-bar">
                  <div class="progress-fill" [style.width.%]="source.percentage"></div>
                </div>
                <span class="source-percentage">{{ source.percentage }}%</span>
              </div>
            </div>
          </div>
        </muxima-card>
      </div>

      <!-- User Behavior -->
      <div class="behavior-grid">
        <muxima-card variant="dashboard" class="behavior-card">
          <div muximaCardHeader class="card-header">
            <h3>Top Pages</h3>
          </div>
          <div class="pages-list">
            <div class="page-item" *ngFor="let page of topPages">
              <div class="page-info">
                <span class="page-path">{{ page.path }}</span>
                <span class="page-views">{{ page.views }} views</span>
              </div>
              <span class="page-time">{{ page.avgTime }}</span>
            </div>
          </div>
        </muxima-card>

        <muxima-card variant="dashboard" class="behavior-card">
          <div muximaCardHeader class="card-header">
            <h3>Device Breakdown</h3>
          </div>
          <div class="devices-chart">
            <div class="device-stat" *ngFor="let device of devices">
              <div class="device-header">
                <span class="device-icon">{{ device.icon }}</span>
                <span class="device-name">{{ device.name }}</span>
              </div>
              <div class="device-bar">
                <div class="device-fill" [style.width.%]="device.percentage"></div>
              </div>
              <span class="device-percentage">{{ device.percentage }}%</span>
            </div>
          </div>
        </muxima-card>
      </div>
    </div>
  `,
  styles: [`
    .analytics-page {
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

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .metric-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .metric-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .metric-icon {
      font-size: 1.5rem;
    }

    .metric-header h3 {
      font-size: 0.875rem;
      font-weight: 500;
      color: #6b7280;
      margin: 0;
    }

    .metric-value {
      font-size: 1.75rem;
      font-weight: 700;
      color: #111827;
      margin-bottom: 0.5rem;
    }

    .metric-change {
      font-size: 0.875rem;
      font-weight: 500;
    }

    .metric-change.positive {
      color: #10b981;
    }

    .metric-change.negative {
      color: #ef4444;
    }

    .charts-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .chart-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .chart-card.large {
      grid-column: 1;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .card-header h3 {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0;
      color: #111827;
    }

    .filter-tabs {
      display: flex;
      gap: 0.5rem;
    }

    .tab {
      padding: 0.5rem 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background: white;
      color: #6b7280;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .tab.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-color: transparent;
    }

    .chart-content {
      height: 300px;
    }

    .chart-placeholder {
      width: 100%;
      height: 100%;
    }

    .traffic-chart {
      width: 100%;
      height: 100%;
    }

    .sources-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .source-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .source-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .source-icon {
      font-size: 1.25rem;
    }

    .source-name {
      font-weight: 500;
      color: #111827;
    }

    .source-stats {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .progress-bar {
      flex: 1;
      height: 8px;
      background: #f3f4f6;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transition: width 0.3s ease;
    }

    .source-percentage {
      font-weight: 600;
      color: #667eea;
      min-width: 45px;
      text-align: right;
    }

    .behavior-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
    }

    .behavior-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .pages-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .page-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      border-radius: 8px;
      transition: background 0.2s;
    }

    .page-item:hover {
      background: #f9fafb;
    }

    .page-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .page-path {
      font-weight: 500;
      color: #111827;
    }

    .page-views {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .page-time {
      font-weight: 500;
      color: #667eea;
    }

    .devices-chart {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .device-stat {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .device-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .device-icon {
      font-size: 1.25rem;
    }

    .device-name {
      font-weight: 500;
      color: #111827;
      flex: 1;
    }

    .device-bar {
      height: 8px;
      background: #f3f4f6;
      border-radius: 4px;
      overflow: hidden;
    }

    .device-fill {
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transition: width 0.3s ease;
    }

    .device-percentage {
      font-weight: 600;
      color: #667eea;
      text-align: right;
    }

    @media (max-width: 1024px) {
      .charts-grid {
        grid-template-columns: 1fr;
      }

      .behavior-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .analytics-page {
        padding: 1rem;
      }

      .metrics-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AnalyticsComponent {
  trafficSources = [
    { icon: '🔍', name: 'Organic Search', percentage: 45 },
    { icon: '🔗', name: 'Direct', percentage: 30 },
    { icon: '📱', name: 'Social Media', percentage: 15 },
    { icon: '📧', name: 'Email', percentage: 10 }
  ];

  topPages = [
    { path: '/products', views: 12543, avgTime: '3m 45s' },
    { path: '/dashboard', views: 9876, avgTime: '5m 12s' },
    { path: '/checkout', views: 7654, avgTime: '2m 30s' },
    { path: '/about', views: 5432, avgTime: '1m 48s' },
    { path: '/contact', views: 3210, avgTime: '1m 15s' }
  ];

  devices = [
    { icon: '💻', name: 'Desktop', percentage: 55 },
    { icon: '📱', name: 'Mobile', percentage: 35 },
    { icon: '📱', name: 'Tablet', percentage: 10 }
  ];
}
