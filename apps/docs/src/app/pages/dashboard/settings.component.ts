import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent, SelectOption } from '@muxima-ui/select';

@Component({
  selector: 'muxima-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectComponent],
  template: `
    <div class="settings-page">
      <div class="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your application settings and preferences</p>
        </div>
        <button class="save-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
          Save Changes
        </button>
      </div>

      <!-- Tabs -->
      <div class="tabs">
        <button 
          *ngFor="let tab of tabs" 
          class="tab"
          [class.active]="activeTab === tab.id"
          (click)="activeTab = tab.id">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path [attr.d]="tab.icon"></path>
            <ng-container *ngIf="tab.icon2">
              <path [attr.d]="tab.icon2"></path>
            </ng-container>
          </svg>
          {{ tab.label }}
        </button>
      </div>

      <!-- General Tab -->
      <div class="tab-content" *ngIf="activeTab === 'general'">
        <div class="settings-section">
          <h2>General Settings</h2>
          <div class="settings-group">
            <div class="setting-item">
              <div class="setting-info">
                <label>Application Name</label>
                <p>The name displayed across the application</p>
              </div>
              <input type="text" value="Muxima Dashboard" class="setting-input">
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <label>Language</label>
                <p>Select your preferred language</p>
              </div>
              <muxima-select
                [(ngModel)]="selectedLanguage"
                [options]="languageOptions"
                size="sm"
                class="setting-select">
              </muxima-select>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <label>Timezone</label>
                <p>Set your local timezone</p>
              </div>
              <muxima-select
                [(ngModel)]="selectedTimezone"
                [options]="timezoneOptions"
                size="sm"
                class="setting-select">
              </muxima-select>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <label>Date Format</label>
                <p>Choose how dates are displayed</p>
              </div>
              <muxima-select
                [(ngModel)]="selectedDateFormat"
                [options]="dateFormatOptions"
                size="sm"
                class="setting-select">
              </muxima-select>
            </div>
          </div>
        </div>
      </div>

      <!-- Notifications Tab -->
      <div class="tab-content" *ngIf="activeTab === 'notifications'">
        <div class="settings-section">
          <h2>Notification Preferences</h2>
          <div class="settings-group">
            <div class="setting-item toggle-item">
              <div class="setting-info">
                <label>Email Notifications</label>
                <p>Receive notifications via email</p>
              </div>
              <label class="toggle">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="setting-item toggle-item">
              <div class="setting-info">
                <label>Push Notifications</label>
                <p>Receive browser push notifications</p>
              </div>
              <label class="toggle">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="setting-item toggle-item">
              <div class="setting-info">
                <label>Order Updates</label>
                <p>Get notified about order status changes</p>
              </div>
              <label class="toggle">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="setting-item toggle-item">
              <div class="setting-info">
                <label>Payment Alerts</label>
                <p>Receive alerts for payment activities</p>
              </div>
              <label class="toggle">
                <input type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="setting-item toggle-item">
              <div class="setting-info">
                <label>Weekly Reports</label>
                <p>Get weekly summary reports via email</p>
              </div>
              <label class="toggle">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Security Tab -->
      <div class="tab-content" *ngIf="activeTab === 'security'">
        <div class="settings-section">
          <h2>Security Settings</h2>
          <div class="settings-group">
            <div class="setting-item">
              <div class="setting-info">
                <label>Change Password</label>
                <p>Update your account password</p>
              </div>
              <button class="action-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Change
              </button>
            </div>
            <div class="setting-item toggle-item">
              <div class="setting-info">
                <label>Two-Factor Authentication</label>
                <p>Add an extra layer of security to your account</p>
              </div>
              <label class="toggle">
                <input type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="setting-item toggle-item">
              <div class="setting-info">
                <label>Session Timeout</label>
                <p>Automatically log out after inactivity</p>
              </div>
              <label class="toggle">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <label>Active Sessions</label>
                <p>Manage your active login sessions</p>
              </div>
              <button class="action-btn danger">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Revoke All
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Integrations Tab -->
      <div class="tab-content" *ngIf="activeTab === 'integrations'">
        <div class="settings-section">
          <h2>API & Integrations</h2>
          <div class="settings-group">
            <div class="setting-item">
              <div class="setting-info">
                <label>API Key</label>
                <p>Your unique API key for integrations</p>
              </div>
              <div class="api-key-group">
                <code class="api-key">mk_live_xxxxxxxxxxxxxxxxxxxxxxxx</code>
                <button class="icon-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <label>Webhook URL</label>
                <p>Receive real-time event notifications</p>
              </div>
              <input type="text" value="https://yourdomain.com/webhook" class="setting-input">
            </div>
            <div class="integration-cards">
              <div class="integration-card" *ngFor="let integration of integrations">
                <div class="integration-header">
                  <div class="integration-icon" [ngClass]="integration.status">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3>{{ integration.name }}</h3>
                    <span class="status-badge" [ngClass]="integration.status">{{ integration.status }}</span>
                  </div>
                </div>
                <p>{{ integration.description }}</p>
                <button class="toggle-integration-btn" [class.active]="integration.status === 'active'">
                  {{ integration.status === 'active' ? 'Disable' : 'Enable' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-page { padding: 2rem; max-width: 1200px; margin: 0 auto; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
    .page-header h1 { font-size: 2rem; font-weight: 700; margin: 0 0 0.5rem 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .page-header p { color: #6b7280; margin: 0; }
    .save-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; transition: all 0.2s; }
    .save-btn svg { width: 18px; height: 18px; }
    .save-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); }
    
    .tabs { display: flex; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 2px solid #f3f4f6; }
    .tab { display: flex; align-items: center; gap: 0.5rem; padding: 1rem 1.5rem; background: none; border: none; border-bottom: 2px solid transparent; color: #6b7280; cursor: pointer; font-size: 0.875rem; font-weight: 500; transition: all 0.2s; margin-bottom: -2px; }
    .tab svg { width: 18px; height: 18px; }
    .tab:hover { color: #667eea; }
    .tab.active { color: #667eea; border-bottom-color: #667eea; }
    
    .tab-content { animation: fadeIn 0.3s; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    
    .settings-section { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
    .settings-section h2 { font-size: 1.25rem; font-weight: 600; margin: 0 0 1.5rem 0; color: #111827; }
    .settings-group { display: flex; flex-direction: column; gap: 1.5rem; }
    .setting-item { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 8px; }
    .setting-item.toggle-item { padding: 1.25rem 1.5rem; }
    .setting-info { flex: 1; }
    .setting-info label { display: block; font-weight: 600; color: #111827; margin-bottom: 0.25rem; }
    .setting-info p { color: #6b7280; font-size: 0.875rem; margin: 0; }
    .setting-input, .setting-select { padding: 0.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.875rem; min-width: 250px; }
    .setting-input:focus, .setting-select:focus { outline: none; border-color: #667eea; }
    
    .toggle { position: relative; display: inline-block; width: 48px; height: 24px; }
    .toggle input { opacity: 0; width: 0; height: 0; }
    .toggle-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; transition: .3s; border-radius: 24px; }
    .toggle-slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; }
    .toggle input:checked + .toggle-slider { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .toggle input:checked + .toggle-slider:before { transform: translateX(24px); }
    
    .action-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 6px; background: white; font-size: 0.875rem; cursor: pointer; transition: all 0.2s; }
    .action-btn svg { width: 14px; height: 14px; }
    .action-btn:hover { background: #f9fafb; border-color: #667eea; color: #667eea; }
    .action-btn.danger:hover { border-color: #ef4444; color: #ef4444; }
    
    .api-key-group { display: flex; gap: 0.5rem; align-items: center; }
    .api-key { flex: 1; padding: 0.5rem 1rem; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 0.875rem; font-family: monospace; }
    .icon-btn { padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 6px; background: white; cursor: pointer; transition: all 0.2s; }
    .icon-btn svg { width: 14px; height: 14px; stroke: #6b7280; }
    .icon-btn:hover { background: #f9fafb; border-color: #667eea; }
    .icon-btn:hover svg { stroke: #667eea; }
    
    .integration-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; margin-top: 1.5rem; }
    .integration-card { padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 8px; transition: all 0.2s; }
    .integration-card:hover { border-color: #667eea; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15); }
    .integration-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; }
    .integration-icon { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
    .integration-icon.active { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
    .integration-icon.inactive { background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%); }
    .integration-icon svg { width: 20px; height: 20px; stroke: white; }
    .integration-header h3 { font-size: 0.875rem; font-weight: 600; margin: 0 0 0.25rem 0; color: #111827; }
    .status-badge { padding: 0.125rem 0.5rem; border-radius: 12px; font-size: 0.75rem; font-weight: 500; text-transform: capitalize; }
    .status-badge.active { background: #d1fae5; color: #065f46; }
    .status-badge.inactive { background: #f1f5f9; color: #475569; }
    .integration-card p { color: #6b7280; font-size: 0.875rem; margin: 0 0 1rem 0; }
    .toggle-integration-btn { width: 100%; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 6px; background: white; font-size: 0.875rem; cursor: pointer; transition: all 0.2s; }
    .toggle-integration-btn:hover { background: #f9fafb; border-color: #667eea; color: #667eea; }
    .toggle-integration-btn.active { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-color: transparent; }
    
    @media (max-width: 768px) {
      .settings-page { padding: 1rem; }
      .page-header { flex-direction: column; gap: 1rem; }
      .tabs { overflow-x: auto; }
      .setting-item { flex-direction: column; align-items: flex-start; gap: 1rem; }
      .setting-input, .setting-select { min-width: 100%; }
      .integration-cards { grid-template-columns: 1fr; }
    }
  `]
})
export class SettingsComponent {
  activeTab = 'general';
  selectedLanguage = 'en';
  selectedTimezone = 'utc-5';
  selectedDateFormat = 'mm/dd/yyyy';

  languageOptions: SelectOption[] = [
    { label: 'English (US)', value: 'en' },
    { label: 'Portuguese (PT)', value: 'pt' },
    { label: 'Spanish (ES)', value: 'es' }
  ];

  timezoneOptions: SelectOption[] = [
    { label: 'UTC-05:00 Eastern Time', value: 'utc-5' },
    { label: 'UTC+00:00 GMT', value: 'utc+0' },
    { label: 'UTC+01:00 Central European', value: 'utc+1' }
  ];

  dateFormatOptions: SelectOption[] = [
    { label: 'MM/DD/YYYY', value: 'mm/dd/yyyy' },
    { label: 'DD/MM/YYYY', value: 'dd/mm/yyyy' },
    { label: 'YYYY-MM-DD', value: 'yyyy-mm-dd' }
  ];

  tabs = [
    { id: 'general', label: 'General', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', icon2: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    { id: 'notifications', label: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { id: 'security', label: 'Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { id: 'integrations', label: 'Integrations', icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z' }
  ];

  integrations = [
    { name: 'Stripe', description: 'Payment processing and subscription management', status: 'active' },
    { name: 'SendGrid', description: 'Email delivery and marketing automation', status: 'active' },
    { name: 'Slack', description: 'Team communication and notifications', status: 'inactive' },
    { name: 'Google Analytics', description: 'Web analytics and reporting', status: 'active' }
  ];
}

