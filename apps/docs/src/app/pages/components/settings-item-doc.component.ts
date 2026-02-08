import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilitySettingsItemSettingsItemComponent } from '@muxima-ui/settings-item';
import { ToggleToggleComponent } from '@muxima-ui/toggle';
import { SelectComponent, SelectOption } from '@muxima-ui/select';

@Component({
  selector: 'app-settings-item-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, UtilitySettingsItemSettingsItemComponent, ToggleToggleComponent, SelectComponent],
  templateUrl: './settings-item-doc.component.html',
  styleUrls: ['./settings-item-doc.component.scss']
})
export class SettingsItemDocComponent {
  // Form values
  appName = 'Muxima Dashboard';
  emailNotifications = true;
  pushNotifications = false;
  darkMode = false;
  selectedLanguage = 'en';
  selectedTheme = 'light';

  languageOptions: SelectOption[] = [
    { label: 'English', value: 'en' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Spanish', value: 'es' }
  ];

  themeOptions: SelectOption[] = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'Auto', value: 'auto' }
  ];

  onChangePassword(): void {
    console.log('Change password clicked');
  }

  onRevokeAllSessions(): void {
    console.log('Revoke all sessions clicked');
  }

  getCodeExample(type: string): string {
    const examples: Record<string, string> = {
      import: `import { UtilitySettingsItemSettingsItemComponent } from '@muxima-ui/settings-item';

@Component({
  standalone: true,
  imports: [UtilitySettingsItemSettingsItemComponent]
})`,
      basic: `<muxima-settings-item
  label="Application Name"
  description="The name displayed across the application">
  <input type="text" [(ngModel)]="appName" class="input">
</muxima-settings-item>`,
      toggle: `<muxima-settings-item
  label="Email Notifications"
  description="Receive notifications via email"
  variant="toggle">
  <muxima-toggle [(checked)]="emailEnabled" size="md"></muxima-toggle>
</muxima-settings-item>`,
      action: `<muxima-settings-item
  label="Change Password"
  description="Update your account password"
  variant="action">
  <button class="btn btn-primary" (click)="onChangePassword()">
    Change
  </button>
</muxima-settings-item>`,
      select: `<muxima-settings-item
  label="Language"
  description="Select your preferred language">
  <muxima-select
    [(ngModel)]="selectedLanguage"
    [options]="languageOptions"
    size="sm">
  </muxima-select>
</muxima-settings-item>`,
      multiple: `<div class="settings-group">
  <muxima-settings-item
    label="Application Name"
    description="The name displayed across the application">
    <input type="text" [(ngModel)]="appName">
  </muxima-settings-item>

  <muxima-settings-item
    label="Email Notifications"
    description="Receive notifications via email"
    variant="toggle">
    <muxima-toggle [(checked)]="emailEnabled"></muxima-toggle>
  </muxima-settings-item>

  <muxima-settings-item
    label="Language"
    description="Select your preferred language">
    <muxima-select [(ngModel)]="language" [options]="options"></muxima-select>
  </muxima-settings-item>
</div>`,
      styling: `.settings-group {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

// Custom input styling
.input {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
  min-width: 250px;
}

.input:focus {
  outline: none;
  border-color: #667eea;
}

// Custom button styling
.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover {
  background: #f9fafb;
  border-color: #667eea;
  color: #667eea;
}`
    };
    return examples[type] || '';
  }
}
