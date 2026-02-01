import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent, SelectOption } from '@muxima-ui/select';

@Component({
  selector: 'muxima-security',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectComponent],
  template: `
    <div class="security-page">
      <div class="page-header">
        <div>
          <h1>Security & Permissions</h1>
          <p>Manage access control, sessions, and security monitoring</p>
        </div>
        <button class="audit-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>
          View Audit Log
        </button>
      </div>

      <!-- Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <div>
            <p class="stat-label">Active Sessions</p>
            <h3 class="stat-value">8</h3>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <div>
            <p class="stat-label">API Keys</p>
            <h3 class="stat-value">3</h3>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon purple">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <div>
            <p class="stat-label">2FA Enabled</p>
            <h3 class="stat-value">Yes</h3>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div>
            <p class="stat-label">Failed Logins</p>
            <h3 class="stat-value">2</h3>
          </div>
        </div>
      </div>

      <!-- Active Sessions -->
      <div class="section">
        <div class="section-header">
          <h2>Active Sessions</h2>
          <button class="revoke-all-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Revoke All
          </button>
        </div>
        <div class="sessions-grid">
          <div class="session-card" *ngFor="let session of activeSessions">
            <div class="session-device">
              <div class="device-icon" [ngClass]="session.type">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect *ngIf="session.type === 'desktop'" x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line *ngIf="session.type === 'desktop'" x1="8" y1="21" x2="16" y2="21"></line>
                  <line *ngIf="session.type === 'desktop'" x1="12" y1="17" x2="12" y2="21"></line>
                  <rect *ngIf="session.type === 'mobile'" x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line *ngIf="session.type === 'mobile'" x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </div>
              <div class="session-info">
                <h3>{{ session.device }}</h3>
                <p>{{ session.location }}</p>
                <span class="session-time">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {{ session.lastActive }}
                </span>
              </div>
            </div>
            <div class="session-actions">
              <span class="current-badge" *ngIf="session.current">Current</span>
              <button class="revoke-btn" *ngIf="!session.current">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                Revoke
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Security Activity Log -->
      <div class="section">
        <div class="section-header">
          <h2>Security Activity Log</h2>
          <muxima-select
            [(ngModel)]="selectedActivityFilter"
            [options]="activityFilterOptions"
            placeholder="All Events"
            size="sm"
            class="filter-select">
          </muxima-select>
        </div>
        <div class="activity-list">
          <div class="activity-item" *ngFor="let activity of securityActivity">
            <div class="activity-icon" [ngClass]="activity.type">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle *ngIf="activity.type === 'success'" cx="12" cy="12" r="10"></circle>
                <polyline *ngIf="activity.type === 'success'" points="16 8 9 15 4 10"></polyline>
                <path *ngIf="activity.type === 'warning'" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
                <line *ngIf="activity.type === 'warning'" x1="12" y1="9" x2="12" y2="13"></line>
                <line *ngIf="activity.type === 'warning'" x1="12" y1="17" x2="12.01" y2="17"></line>
                <circle *ngIf="activity.type === 'info'" cx="12" cy="12" r="10"></circle>
                <line *ngIf="activity.type === 'info'" x1="12" y1="16" x2="12" y2="12"></line>
                <line *ngIf="activity.type === 'info'" x1="12" y1="8" x2="12.01" y2="8"></line>
                <circle *ngIf="activity.type === 'danger'" cx="12" cy="12" r="10"></circle>
                <line *ngIf="activity.type === 'danger'" x1="15" y1="9" x2="9" y2="15"></line>
                <line *ngIf="activity.type === 'danger'" x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            <div class="activity-content">
              <h4>{{ activity.action }}</h4>
              <p>{{ activity.description }}</p>
              <div class="activity-meta">
                <span>{{ activity.user }}</span>
                <span class="dot">â€¢</span>
                <span>{{ activity.ip }}</span>
                <span class="dot">â€¢</span>
                <span>{{ activity.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .security-page { padding: 2rem; max-width: 1400px; margin: 0 auto; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
    .page-header h1 { font-size: 2rem; font-weight: 700; margin: 0 0 0.5rem 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .page-header p { color: #6b7280; margin: 0; }
    .audit-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; font-weight: 500; transition: all 0.2s; }
    .audit-btn svg { width: 18px; height: 18px; stroke: #667eea; }
    .audit-btn:hover { background: #f9fafb; border-color: #667eea; color: #667eea; }
    
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
    .stat-card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); display: flex; align-items: center; gap: 1rem; }
    .stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
    .stat-icon svg { width: 24px; height: 24px; stroke: white; }
    .stat-icon.blue { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .stat-icon.green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
    .stat-icon.purple { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); }
    .stat-icon.orange { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
    .stat-label { font-size: 0.875rem; color: #6b7280; margin: 0 0 0.5rem 0; }
    .stat-value { font-size: 1.75rem; font-weight: 700; color: #111827; margin: 0; }
    
    .section { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); margin-bottom: 2rem; }
    .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .section-header h2 { font-size: 1.25rem; font-weight: 600; margin: 0; color: #111827; }
    .revoke-all-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: white; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; font-size: 0.875rem; font-weight: 500; color: #ef4444; transition: all 0.2s; }
    .revoke-all-btn svg { width: 16px; height: 16px; }
    .revoke-all-btn:hover { background: #fef2f2; border-color: #ef4444; }
    .filter-select { padding: 0.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: white; font-size: 0.875rem; cursor: pointer; }
    
    .sessions-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 1rem; }
    .session-card { display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; transition: all 0.2s; }
    .session-card:hover { border-color: #667eea; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15); }
    .session-device { display: flex; align-items: center; gap: 1rem; }
    .device-icon { width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .device-icon svg { width: 24px; height: 24px; stroke: white; }
    .session-info h3 { font-size: 0.875rem; font-weight: 600; margin: 0 0 0.25rem 0; color: #111827; }
    .session-info p { font-size: 0.75rem; color: #6b7280; margin: 0 0 0.5rem 0; }
    .session-time { display: flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; color: #9ca3af; }
    .session-time svg { width: 12px; height: 12px; }
    .session-actions { display: flex; gap: 0.5rem; align-items: center; }
    .current-badge { padding: 0.25rem 0.75rem; background: #d1fae5; color: #065f46; border-radius: 12px; font-size: 0.75rem; font-weight: 500; }
    .revoke-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 6px; background: white; font-size: 0.875rem; cursor: pointer; transition: all 0.2s; color: #ef4444; }
    .revoke-btn svg { width: 14px; height: 14px; }
    .revoke-btn:hover { background: #fef2f2; border-color: #ef4444; }
    
    .activity-list { display: flex; flex-direction: column; gap: 1rem; }
    .activity-item { display: flex; gap: 1rem; padding: 1rem; border: 1px solid #f3f4f6; border-radius: 8px; transition: all 0.2s; }
    .activity-item:hover { background: #f9fafb; }
    .activity-icon { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .activity-icon svg { width: 20px; height: 20px; }
    .activity-icon.success { background: #d1fae5; }
    .activity-icon.success svg { stroke: #065f46; }
    .activity-icon.warning { background: #fef3c7; }
    .activity-icon.warning svg { stroke: #92400e; }
    .activity-icon.info { background: #dbeafe; }
    .activity-icon.info svg { stroke: #1e40af; }
    .activity-icon.danger { background: #fee2e2; }
    .activity-icon.danger svg { stroke: #991b1b; }
    .activity-content { flex: 1; }
    .activity-content h4 { font-size: 0.875rem; font-weight: 600; margin: 0 0 0.25rem 0; color: #111827; }
    .activity-content p { font-size: 0.875rem; color: #6b7280; margin: 0 0 0.5rem 0; }
    .activity-meta { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; color: #9ca3af; }
    .dot { color: #d1d5db; }
    
    @media (max-width: 1024px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .sessions-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) {
      .security-page { padding: 1rem; }
      .page-header { flex-direction: column; gap: 1rem; }
      .stats-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class SecurityComponent {
  selectedActivityFilter: any = null;

  activityFilterOptions: SelectOption[] = [
    { label: 'All Events', value: null },
    { label: 'Login Events', value: 'login' },
    { label: 'Permission Changes', value: 'permission' },
    { label: 'Security Alerts', value: 'alert' }
  ];

  activeSessions = [
    { device: 'Chrome on Windows', location: 'New York, USA', lastActive: 'Active now', type: 'desktop', current: true },
    { device: 'Safari on iPhone', location: 'San Francisco, USA', lastActive: '2 hours ago', type: 'mobile', current: false },
    { device: 'Firefox on Mac', location: 'London, UK', lastActive: '1 day ago', type: 'desktop', current: false }
  ];

  securityActivity = [
    { action: 'Successful Login', description: 'User logged in from a new device', user: 'Aldemiro Valentim', ip: '192.168.1.1', time: '5 minutes ago', type: 'success' },
    { action: 'Failed Login Attempt', description: 'Invalid password entered 3 times', user: 'Unknown', ip: '10.0.0.15', time: '1 hour ago', type: 'warning' },
    { action: 'API Key Generated', description: 'New API key created for production environment', user: 'jokerScript', ip: '192.168.1.2', time: '3 hours ago', type: 'info' },
    { action: 'Permission Changed', description: 'User role updated from Editor to Admin', user: 'Jane Smith', ip: '192.168.1.1', time: '5 hours ago', type: 'info' },
    { action: 'Suspicious Activity Detected', description: 'Multiple failed login attempts from same IP', user: 'System', ip: '45.76.89.12', time: '1 day ago', type: 'danger' },
    { action: '2FA Enabled', description: 'Two-factor authentication activated', user: 'Aldemiro Valentim', ip: '192.168.1.1', time: '2 days ago', type: 'success' }
  ];
}

