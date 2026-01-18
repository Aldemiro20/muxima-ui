import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileMenuComponent, UserInfo, MenuItem } from '@muxima-ui/user-profile-menu';

@Component({
  selector: 'app-user-profile-menu-doc',
  standalone: true,
  imports: [CommonModule, UserProfileMenuComponent],
  templateUrl: './user-profile-menu-doc.component.html',
  styleUrls: ['./user-profile-menu-doc.component.scss']
})
export class UserProfileMenuDocComponent {
  // Sample users
  userWithAvatar: UserInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
    role: 'Administrator'
  };

  userWithoutAvatar: UserInfo = {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor'
  };

  userSimple: UserInfo = {
    name: 'Robert Johnson',
    email: 'robert.j@example.com'
  };

  // Sample menu items
  defaultMenuItems: MenuItem[] = [
    { id: 'profile', label: 'My Profile', icon: '👤', route: '/profile' },
    { id: 'settings', label: 'Settings', icon: '⚙️', route: '/settings' },
    { id: 'billing', label: 'Billing', icon: '💳', route: '/billing' },
    { id: 'divider1', label: '', icon: '', divider: true },
    { id: 'help', label: 'Help & Support', icon: '❓', route: '/help' },
    { id: 'logout', label: 'Logout', icon: '🚪', danger: true }
  ];

  adminMenuItems: MenuItem[] = [
    { id: 'profile', label: 'My Profile', icon: '👤', route: '/profile' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊', route: '/admin/dashboard' },
    { id: 'users', label: 'Manage Users', icon: '👥', route: '/admin/users' },
    { id: 'settings', label: 'Settings', icon: '⚙️', route: '/admin/settings' },
    { id: 'divider1', label: '', icon: '', divider: true },
    { id: 'help', label: 'Help Center', icon: '❓', route: '/help' },
    { id: 'logout', label: 'Logout', icon: '🚪', danger: true }
  ];

  notificationMenuItems: MenuItem[] = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔', badge: 5 },
    { id: 'messages', label: 'Messages', icon: '💬', badge: 12 },
    { id: 'divider1', label: '', icon: '', divider: true },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'logout', label: 'Logout', icon: '🚪', danger: true }
  ];

  isOnline: boolean = true;
  isOffline: boolean = false;

  codeExamples: { [key: string]: string } = {
    import: `import { UserProfileMenuComponent, UserInfo, MenuItem } from '@muxima-ui/user-profile-menu';

@Component({
  standalone: true,
  imports: [UserProfileMenuComponent],
  // ...
})`,
    basic: `// Component
user: UserInfo = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://avatar.com/john.jpg',
  role: 'Administrator'
};

menuItems: MenuItem[] = [
  { id: 'profile', label: 'My Profile', icon: '👤', route: '/profile' },
  { id: 'settings', label: 'Settings', icon: '⚙️', route: '/settings' },
  { id: 'divider1', label: '', icon: '', divider: true },
  { id: 'logout', label: 'Logout', icon: '🚪', danger: true }
];

// Template
<muxima-user-profile-menu
  [user]="user"
  [menuItems]="menuItems"
  (menuItemClick)="onMenuItemClick($event)">
</muxima-user-profile-menu>`,
    withAvatar: `user: UserInfo = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://i.pravatar.cc/150?img=12',
  role: 'Administrator'
};

<muxima-user-profile-menu
  [user]="user"
  [menuItems]="menuItems">
</muxima-user-profile-menu>`,
    withoutAvatar: `user: UserInfo = {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  role: 'Editor'
};

<muxima-user-profile-menu
  [user]="user"
  [menuItems]="menuItems">
</muxima-user-profile-menu>`,
    position: `<!-- Bottom Right (Default) -->
<muxima-user-profile-menu position="bottom-right" ...></muxima-user-profile-menu>

<!-- Bottom Left -->
<muxima-user-profile-menu position="bottom-left" ...></muxima-user-profile-menu>

<!-- Top Right -->
<muxima-user-profile-menu position="top-right" ...></muxima-user-profile-menu>

<!-- Top Left -->
<muxima-user-profile-menu position="top-left" ...></muxima-user-profile-menu>`,
    onlineStatus: `<!-- Online (Green) -->
<muxima-user-profile-menu
  [user]="user"
  [showOnlineStatus]="true"
  [isOnline]="true">
</muxima-user-profile-menu>

<!-- Offline (Gray) -->
<muxima-user-profile-menu
  [user]="user"
  [showOnlineStatus]="true"
  [isOnline]="false">
</muxima-user-profile-menu>`,
    badges: `menuItems: MenuItem[] = [
  { id: 'notifications', label: 'Notifications', icon: '🔔', badge: 5 },
  { id: 'messages', label: 'Messages', icon: '💬', badge: 12 },
  { id: 'profile', label: 'Profile', icon: '👤' }
];`,
    handlers: `onMenuItemClick(item: MenuItem) {
  console.log('Menu item clicked:', item);
  
  switch(item.id) {
    case 'profile':
      this.router.navigate(['/profile']);
      break;
    case 'settings':
      this.router.navigate(['/settings']);
      break;
    case 'logout':
      this.authService.logout();
      this.router.navigate(['/login']);
      break;
  }
}

onAvatarClick() {
  console.log('Avatar clicked');
  // Track analytics or perform action
}`,
    interfaces: `export interface UserInfo {
  name: string;          // User's full name
  email: string;         // User's email address
  avatar?: string;       // Optional avatar URL
  role?: string;         // Optional role/title
}

export interface MenuItem {
  id: string;            // Unique identifier
  label: string;         // Display text
  icon: string;          // Emoji or icon
  route?: string;        // Optional navigation route
  badge?: string | number; // Optional badge (notifications)
  divider?: boolean;     // Renders as divider line
  danger?: boolean;      // Red styling for dangerous actions
}`
  };

  onMenuItemClick(item: MenuItem) {
    console.log('Menu item clicked:', item);
    alert(`Clicked: ${item.label}`);
  }

  onAvatarClick() {
    console.log('Avatar clicked');
  }

  getCodeExample(key: string): string {
    return this.codeExamples[key] || '';
  }
}
