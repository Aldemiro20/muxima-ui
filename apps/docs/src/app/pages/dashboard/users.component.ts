import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent, SelectOption } from '@muxima-ui/select';
import { ButtonComponent } from '@muxima-ui/button';

@Component({
  selector: 'muxima-users',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectComponent, ButtonComponent],
  template: `
    <div class="users-page">
      <div class="page-header">
        <div>
          <h1>Users Management</h1>
          <p>Manage your users, roles, and permissions</p>
        </div>
        <muxima-button 
          text="Add New User" 
          variant="purple" 
          hoverEffect="shadow"
          [iconSvg]="true">
          <svg slot="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
        </muxima-button>
      </div>

      <!-- Stats -->
      <div class="stats-row">
        <div class="stat-card">
          <span class="stat-icon">ðŸ‘¥</span>
          <div>
            <p class="stat-label">Total Users</p>
            <h3 class="stat-value">2,847</h3>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">âœ…</span>
          <div>
            <p class="stat-label">Active</p>
            <h3 class="stat-value">2,456</h3>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">â¸ï¸</span>
          <div>
            <p class="stat-label">Inactive</p>
            <h3 class="stat-value">391</h3>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">ðŸ†•</span>
          <div>
            <p class="stat-label">New Today</p>
            <h3 class="stat-value">24</h3>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="toolbar">
        <div class="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input type="text" placeholder="Search users...">
        </div>
        <div class="filters">
          <muxima-select
            [(ngModel)]="selectedRole"
            [options]="roleOptions"
            placeholder="All Roles"
            size="sm"
            class="filter-select">
          </muxima-select>
          <muxima-select
            [(ngModel)]="selectedStatus"
            [options]="statusOptions"
            placeholder="All Status"
            size="sm"
            class="filter-select">
          </muxima-select>
        </div>
      </div>

      <!-- Users Table -->
      <div class="users-table">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox">
              </th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td>
                <input type="checkbox">
              </td>
              <td>
                <div class="user-cell">
                  <div class="user-avatar" [style.background]="user.avatarColor">
                    {{ user.initials }}
                  </div>
                  <span class="user-name">{{ user.name }}</span>
                </div>
              </td>
              <td>{{ user.email }}</td>
              <td>
                <span class="role-badge" [ngClass]="user.role.toLowerCase()">
                  {{ user.role }}
                </span>
              </td>
              <td>
                <span class="status-badge" [ngClass]="user.status.toLowerCase()">
                  {{ user.status }}
                </span>
              </td>
              <td>{{ user.joined }}</td>
              <td>
                <div class="actions">
                  <button class="action-btn" title="Edit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button class="action-btn" title="Delete">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
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
        <span class="page-info">Showing 1-10 of 2,847</span>
        <div class="page-controls">
          <button class="page-btn">Previous</button>
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <button class="page-btn">Next</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .users-page {
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

    .stats-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .stat-icon {
      font-size: 2rem;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #6b7280;
      margin: 0 0 0.25rem 0;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
      color: #111827;
    }

    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      gap: 1rem;
    }

    .search-box {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: white;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      flex: 1;
      max-width: 400px;
    }

    .search-box svg {
      width: 18px;
      height: 18px;
      stroke: #9ca3af;
    }

    .search-box input {
      border: none;
      outline: none;
      flex: 1;
      font-size: 0.875rem;
    }

    .filters {
      display: flex;
      gap: 0.75rem;
    }

    .filters select {
      padding: 0.75rem 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background: white;
      font-size: 0.875rem;
      cursor: pointer;
    }

    .users-table {
      background: white;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      text-align: left;
      padding: 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #6b7280;
      background: #f9fafb;
      border-bottom: 2px solid #e5e7eb;
    }

    td {
      padding: 1rem;
      border-bottom: 1px solid #f3f4f6;
    }

    .user-cell {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .user-name {
      font-weight: 500;
      color: #111827;
    }

    .role-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .role-badge.admin {
      background: #fef3c7;
      color: #92400e;
    }

    .role-badge.editor {
      background: #dbeafe;
      color: #1e40af;
    }

    .role-badge.viewer {
      background: #e5e7eb;
      color: #374151;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .status-badge.active {
      background: #d1fae5;
      color: #065f46;
    }

    .status-badge.inactive {
      background: #fee2e2;
      color: #991b1b;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      padding: 0.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      transition: all 0.2s;
    }

    .action-btn svg {
      width: 16px;
      height: 16px;
      stroke: #6b7280;
    }

    .action-btn:hover {
      background: #f9fafb;
      border-color: #667eea;
    }

    .action-btn:hover svg {
      stroke: #667eea;
    }

    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.5rem;
      padding: 1rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .page-info {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .page-controls {
      display: flex;
      gap: 0.5rem;
    }

    .page-btn {
      padding: 0.5rem 0.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      background: white;
      color: #374151;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .page-btn.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-color: transparent;
    }

    .page-btn:hover:not(.active) {
      background: #f9fafb;
    }

    @media (max-width: 768px) {
      .users-page {
        padding: 1rem;
      }

      .page-header {
        flex-direction: column;
        gap: 1rem;
      }

      .toolbar {
        flex-direction: column;
        align-items: stretch;
      }

      .search-box {
        max-width: none;
      }
    }
  `]
})
export class UsersComponent {
  selectedRole: any = null;
  selectedStatus: any = null;

  roleOptions: SelectOption[] = [
    { label: 'All Roles', value: null },
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' }
  ];

  statusOptions: SelectOption[] = [
    { label: 'All Status', value: null },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' }
  ];

  users = [
    { name: 'Aldemiro Valentim', email: 'aldemiro@muxima.com', role: 'Admin', status: 'Active', joined: '2023-01-15', initials: 'AV', avatarColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { name: 'jokerScript', email: 'joker@muxima.com', role: 'Admin', status: 'Active', joined: '2023-01-20', initials: 'JS', avatarColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', joined: '2023-02-20', initials: 'JS', avatarColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive', joined: '2023-03-10', initials: 'BJ', avatarColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active', joined: '2023-04-05', initials: 'AB', avatarColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Viewer', status: 'Active', joined: '2023-05-12', initials: 'CW', avatarColor: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
    { name: 'Diana Prince', email: 'diana@example.com', role: 'Editor', status: 'Active', joined: '2023-06-18', initials: 'DP', avatarColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    { name: 'Ethan Hunt', email: 'ethan@example.com', role: 'Admin', status: 'Inactive', joined: '2023-07-22', initials: 'EH', avatarColor: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' }
  ];
}

