import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarAvatarComponent } from '../../../../../../libs/avatar/avatar/src/lib/avatar-avatar/avatar-avatar.component';

@Component({
  selector: 'muxima-avatar-doc',
  standalone: true,
  imports: [CommonModule, AvatarAvatarComponent],
  templateUrl: './avatar-doc.component.html',
  styleUrls: ['./avatar-doc.component.scss']
})
export class AvatarDocComponent {
  copyCode(code: string) {
    navigator.clipboard.writeText(code);
  }

  get importCode() {
    return `import { AvatarAvatarComponent } from '@muxima/avatar';

@Component({
  imports: [AvatarAvatarComponent]
})`;
  }

  get basicCode() {
    return `<muxima-avatar 
  name="Aldemiro Valentim"
  size="lg">
</muxima-avatar>`;
  }

  get sizesCode() {
    return `<muxima-avatar name="User" size="xs"></muxima-avatar>
<muxima-avatar name="User" size="sm"></muxima-avatar>
<muxima-avatar name="User" size="md"></muxima-avatar>
<muxima-avatar name="User" size="lg"></muxima-avatar>
<muxima-avatar name="User" size="xl"></muxima-avatar>
<muxima-avatar name="User" size="2xl"></muxima-avatar>`;
  }

  get statusCode() {
    return `<muxima-avatar 
  name="João Silva" 
  status="online">
</muxima-avatar>`;
  }
}
