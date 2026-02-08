import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarAvatarComponent, AvatarGroupComponent } from '@muxima-ui/avatar';

interface User {
  name: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  badge?: number;
}

@Component({
  selector: 'muxima-avatar-doc',
  standalone: true,
  imports: [CommonModule, AvatarAvatarComponent, AvatarGroupComponent],
  templateUrl: './avatar-doc.component.html',
  styleUrls: ['./avatar-doc.component.scss']
})
export class AvatarDocComponent {
  users: User[] = [
    { name: 'Aldemiro Valentim', status: 'online' },
    { name: 'João Silva', status: 'away' },
    { name: 'Maria Santos', status: 'busy' },
    { name: 'Pedro Costa', status: 'offline' },
    { name: 'Ana Ferreira', status: 'online', badge: 3 }
  ];

  teamMembers: User[] = [
    { name: 'Alice Johnson' },
    { name: 'Bob Smith' },
    { name: 'Carol Williams' },
    { name: 'David Brown' },
    { name: 'Eve Davis' }
  ];

  onAvatarClick(name: string): void {
    console.log(`Avatar clicked: ${name}`);
  }

  // Code examples
  installCode = `npm install @muxima-ui/avatar`;

  importCode = `import { AvatarAvatarComponent, AvatarGroupComponent } from '@muxima-ui/avatar';

@Component({
  imports: [AvatarAvatarComponent, AvatarGroupComponent]
})`;

  basicCode = `<muxima-avatar 
  name="Aldemiro Valentim"
  size="lg">
</muxima-avatar>`;

  sizesCode = `<muxima-avatar name="User" size="xs"></muxima-avatar>
<muxima-avatar name="User" size="sm"></muxima-avatar>
<muxima-avatar name="User" size="md"></muxima-avatar>
<muxima-avatar name="User" size="lg"></muxima-avatar>
<muxima-avatar name="User" size="xl"></muxima-avatar>
<muxima-avatar name="User" size="2xl"></muxima-avatar>`;

  shapesCode = `<muxima-avatar name="User" shape="circle"></muxima-avatar>
<muxima-avatar name="User" shape="rounded"></muxima-avatar>
<muxima-avatar name="User" shape="square"></muxima-avatar>`;

  statusCode = `<muxima-avatar name="John" status="online"></muxima-avatar>
<muxima-avatar name="Jane" status="away"></muxima-avatar>
<muxima-avatar name="Bob" status="busy"></muxima-avatar>
<muxima-avatar name="Alice" status="offline"></muxima-avatar>`;

  badgeCode = `<muxima-avatar name="User" [badge]="5"></muxima-avatar>
<muxima-avatar name="User" [badge]="12"></muxima-avatar>
<muxima-avatar name="User" [badge]="99"></muxima-avatar>`;

  colorsCode = `<muxima-avatar name="User" bgColor="#3B82F6"></muxima-avatar>
<muxima-avatar name="User" bgColor="#10B981"></muxima-avatar>
<muxima-avatar name="User" bgColor="#8B5CF6"></muxima-avatar>`;

  clickableCode = `<muxima-avatar 
  name="John Doe"
  [clickable]="true"
  (avatarClick)="onAvatarClick($event)">
</muxima-avatar>

// TypeScript
onAvatarClick(event: MouseEvent): void {
  console.log('Avatar clicked!', event);
}`;

  tooltipCode = `<muxima-avatar 
  name="John Doe"
  tooltip="Click to view profile">
</muxima-avatar>`;

  groupCode = `<muxima-avatar-group size="lg" [max]="3" [totalCount]="5">
  <muxima-avatar name="Alice Johnson"></muxima-avatar>
  <muxima-avatar name="Bob Smith"></muxima-avatar>
  <muxima-avatar name="Carol Williams"></muxima-avatar>
</muxima-avatar-group>`;

  imageCode = `<muxima-avatar 
  src="https://i.pravatar.cc/150?img=1"
  name="John Doe"
  size="xl">
</muxima-avatar>`;

  copiedStates: { [key: string]: boolean } = {};

  copyCode(code: string, key: string = 'default'): void {
    navigator.clipboard.writeText(code).then(() => {
      this.copiedStates[key] = true;
      setTimeout(() => {
        this.copiedStates[key] = false;
      }, 2000);
    });
  }

  isCopied(key: string = 'default'): boolean {
    return this.copiedStates[key] || false;
  }
}

