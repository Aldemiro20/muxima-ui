import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeBadgeComponent } from '@muxima-ui/badge';


@Component({
  selector: 'muxima-badge-doc',
  standalone: true,
  imports: [CommonModule, BadgeBadgeComponent],
  templateUrl: './badge-doc.component.html',
  styleUrls: ['./badge-doc.component.scss']
})
export class BadgeDocComponent {
  copyCode(code: string) {
    navigator.clipboard.writeText(code);
  }

  get importCode() {
    return `import { BadgeBadgeComponent } from '@muxima-ui/badge';

@Component({
  imports: [BadgeBadgeComponent]
})`;
  }

  get basicCode() {
    return `<muxima-badge variant="solid" color="primary">
  Novo
</muxima-badge>`;
  }

  get variantsCode() {
    return `<!-- Solid -->
<muxima-badge variant="solid" color="primary">Solid</muxima-badge>

<!-- Outline -->
<muxima-badge variant="outline" color="primary">Outline</muxima-badge>

<!-- Soft -->
<muxima-badge variant="soft" color="primary">Soft</muxima-badge>`;
  }

  get colorsCode() {
    return `<muxima-badge color="primary">Primary</muxima-badge>
<muxima-badge color="success">Success</muxima-badge>
<muxima-badge color="warning">Warning</muxima-badge>
<muxima-badge color="error">Error</muxima-badge>
<muxima-badge color="info">Info</muxima-badge>
<muxima-badge color="neutral">Neutral</muxima-badge>`;
  }

  get glassCode() {
    return `<!-- Glass variant with glassmorphism effect -->
<muxima-badge variant="glass" color="primary">PREMIUM</muxima-badge>
<muxima-badge variant="glass" color="success">VERIFIED</muxima-badge>
<muxima-badge variant="glass" color="warning">TRENDING</muxima-badge>
<muxima-badge variant="glass" color="error">LIVE</muxima-badge>
<muxima-badge variant="glass" color="info">NEW</muxima-badge>
<muxima-badge variant="glass" color="primary" size="lg">FEATURED</muxima-badge>`;
  }

  get neonCode() {
    return `<!-- Neon variant with cyberpunk glow effects -->
<muxima-badge variant="neon" color="primary">CYBERPUNK</muxima-badge>
<muxima-badge variant="neon" color="success">ONLINE</muxima-badge>
<muxima-badge variant="neon" color="warning">ALERT</muxima-badge>
<muxima-badge variant="neon" color="error">CRITICAL</muxima-badge>
<muxima-badge variant="neon" color="info">SYSTEM</muxima-badge>
<muxima-badge variant="neon" color="error" size="lg">EMERGENCY</muxima-badge>`;
  }

  get pulseCode() {
    return `<!-- Badge with animated pulse dot for live status -->
<muxima-badge variant="glass" color="primary" [dot]="true" [pulse]="true">
  LIVE STREAM
</muxima-badge>

<muxima-badge variant="neon" color="error" [dot]="true" [pulse]="true">
  BROADCASTING
</muxima-badge>

<muxima-badge variant="glass" color="success" [dot]="true" [pulse]="true">
  RECORDING
</muxima-badge>

<muxima-badge variant="neon" color="warning" [dot]="true" [pulse]="true">
  ON AIR
</muxima-badge>`;
  }

  get removableCode() {
    return `<!-- Template -->
<div class="tags-container">
  @for (tag of tags; track tag.id) {
    <muxima-badge
      [variant]="tag.variant"
      [color]="tag.color"
      [removable]="true"
      (remove)="removeTag(tag.id)">
      {{ tag.label }}
    </muxima-badge>
  }
</div>

<!-- Component TypeScript -->
export class MyComponent {
  tags = [
    { id: 1, label: 'Angular', variant: 'solid', color: 'primary' },
    { id: 2, label: 'TypeScript', variant: 'outline', color: 'success' },
    { id: 3, label: 'SCSS', variant: 'soft', color: 'info' }
  ];

  removeTag(id: number) {
    this.tags = this.tags.filter(tag => tag.id !== id);
    console.log('Tag removed:', id);
  }
}`;
  }

  get buttonBadgeCode() {
    return `<!-- Button with notification badge -->
<button style="position: relative; padding: 0.75rem 1.5rem; background: #3B82F6; color: white; 
  border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
  Notificações
  <span style="position: absolute; top: -8px; right: -8px;">
    <muxima-badge variant="solid" color="error" size="sm">12</muxima-badge>
  </span>
</button>

<!-- Button with pulse status -->
<button style="position: relative; padding: 0.75rem 1.5rem; background: white; color: #1E293B; 
  border: 2px solid #E2E8F0; border-radius: 8px; font-weight: 600;">
  Mensagens
  <span style="position: absolute; top: -8px; right: -8px;">
    <muxima-badge variant="solid" color="success" size="sm" [dot]="true" [pulse]="true"></muxima-badge>
  </span>
</button>

<!-- Button with inline badge -->
<button style="padding: 0.75rem 1.5rem; background: #10B981; color: white; 
  border: none; border-radius: 8px; font-weight: 600;">
  Atualizações
  <muxima-badge variant="solid" color="warning" size="sm" style="margin-left: 0.5rem;">NEW</muxima-badge>
</button>`;
  }

  get userStatusCode() {
    return `<!-- User list with status badges -->
<div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; 
  background: #F8FAFC; border-radius: 8px;">
  <div style="width: 48px; height: 48px; border-radius: 50%; 
    background: linear-gradient(135deg, #3B82F6, #6366F1); 
    display: flex; align-items: center; justify-content: center; 
    color: white; font-weight: 700;">JD</div>
  <div style="flex: 1;">
    <div style="font-weight: 600; color: #1E293B;">John Doe</div>
    <div style="font-size: 0.875rem; color: #64748B;">john@example.com</div>
  </div>
  <muxima-badge variant="soft" color="success" [dot]="true">Online</muxima-badge>
</div>

<!-- With Away status -->
<muxima-badge variant="soft" color="warning" [dot]="true">Away</muxima-badge>

<!-- With Busy status -->
<muxima-badge variant="soft" color="error" [dot]="true">Busy</muxima-badge>`;
  }

  get productCardCode() {
    return `<!-- Product card with promotional badge -->
<div style="position: relative; background: white; border: 1px solid #E2E8F0; 
  border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
  
  <!-- Badge on top right corner -->
  <div style="position: absolute; top: 12px; right: 12px;">
    <muxima-badge variant="solid" color="error" size="sm">-30%</muxima-badge>
  </div>

  <div style="width: 100%; height: 150px; 
    background: linear-gradient(135deg, #667eea, #764ba2); 
    border-radius: 8px; margin-bottom: 1rem;"></div>
  
  <h4 style="font-weight: 600; margin-bottom: 0.5rem;">Premium Template</h4>
  <p style="font-size: 0.875rem; color: #64748B; margin-bottom: 1rem;">Landing page moderna</p>
  
  <!-- Technology badges -->
  <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
    <muxima-badge variant="soft" color="primary" size="sm">Angular</muxima-badge>
    <muxima-badge variant="soft" color="info" size="sm">TypeScript</muxima-badge>
  </div>
  
  <div style="font-size: 1.5rem; font-weight: 700; color: #1E293B;">$49</div>
</div>

<!-- Other badge types for products -->
<muxima-badge variant="solid" color="success" size="sm">NEW</muxima-badge>
<muxima-badge variant="solid" color="warning" size="sm">HOT</muxima-badge>
<muxima-badge variant="solid" color="error" size="sm">SALE</muxima-badge>`;
  }

  get notificationListCode() {
    return `<!-- Notification list with status badges -->
<div style="background: white; border-radius: 12px; border: 1px solid #E2E8F0;">
  
  <!-- New notification with pulse -->
  <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; 
    border-bottom: 1px solid #E2E8F0;">
    <div style="width: 40px; height: 40px; background: #DBEAFE; border-radius: 50%; 
      display: flex; align-items: center; justify-content: center; 
      font-size: 1.25rem;">💬</div>
    <div style="flex: 1;">
      <div style="font-weight: 600; color: #1E293B; margin-bottom: 0.25rem;">Nova mensagem</div>
      <div style="font-size: 0.875rem; color: #64748B;">Maria enviou uma mensagem</div>
    </div>
    <muxima-badge variant="soft" color="primary" [dot]="true" [pulse]="true">Novo</muxima-badge>
  </div>

  <!-- Completed notification -->
  <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; 
    border-bottom: 1px solid #E2E8F0;">
    <div style="width: 40px; height: 40px; background: #D1FAE5; border-radius: 50%; 
      display: flex; align-items: center; justify-content: center; 
      font-size: 1.25rem;">✅</div>
    <div style="flex: 1;">
      <div style="font-weight: 600; color: #1E293B; margin-bottom: 0.25rem;">Pedido aprovado</div>
      <div style="font-size: 0.875rem; color: #64748B;">Seu pedido #1234 foi aprovado</div>
    </div>
    <muxima-badge variant="outline" color="success">Concluído</muxima-badge>
  </div>

  <!-- Pending notification -->
  <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem;">
    <div style="width: 40px; height: 40px; background: #FEF3C7; border-radius: 50%; 
      display: flex; align-items: center; justify-content: center; 
      font-size: 1.25rem;">⚠️</div>
    <div style="flex: 1;">
      <div style="font-weight: 600; color: #1E293B; margin-bottom: 0.25rem;">Ação necessária</div>
      <div style="font-size: 0.875rem; color: #64748B;">Atualize suas informações</div>
    </div>
    <muxima-badge variant="soft" color="warning">Pendente</muxima-badge>
  </div>
</div>`;
  }
}

