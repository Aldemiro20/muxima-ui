# User Profile Menu Component

Menu dropdown de perfil de usuário com avatar, informações, status online e ações personalizáveis.

## Características

- 👤 **Avatar Inteligente**: Exibe imagem ou gera iniciais automaticamente
- 🟢 **Status Online**: Indicador visual de presença (verde/cinza)
- 🔔 **Badges**: Contadores para notificações e mensagens
- ⚠️ **Ações Perigosas**: Estilo vermelho para logout/delete
- 📍 **4 Posições**: Bottom/Top, Right/Left
- 🎨 **Divideres**: Separe grupos de ações
- 🎨 **Tema Roxo**: Gradiente #667eea → #764ba2
- 📱 **Responsivo**: Adaptação automática

## Instalação

```typescript
import { UserProfileMenuComponent, UserInfo, MenuItem } from '@muxima-ui/user-profile-menu';

@Component({
  standalone: true,
  imports: [UserProfileMenuComponent],
  // ...
})
```

## Uso Básico

```typescript
// Component
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

onMenuItemClick(item: MenuItem) {
  if (item.id === 'logout') {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
```

```html
<muxima-user-profile-menu
  [user]="user"
  [menuItems]="menuItems"
  (menuItemClick)="onMenuItemClick($event)">
</muxima-user-profile-menu>
```

## Com Avatar

```typescript
user: UserInfo = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://i.pravatar.cc/150?img=12',
  role: 'Administrator'
};
```

## Sem Avatar (Iniciais)

```typescript
user: UserInfo = {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  role: 'Editor'
};
// Renderiza: "JS" com gradiente roxo
```

## Props

### @Input

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `user` | UserInfo | - | Objeto com informações do usuário (obrigatório) |
| `menuItems` | MenuItem[] | [] | Array de itens do menu |
| `position` | 'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left' | 'bottom-right' | Posição do dropdown |
| `showOnlineStatus` | boolean | true | Exibe indicador de status online |
| `isOnline` | boolean | true | Estado online (verde) ou offline (cinza) |

### @Output

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `menuItemClick` | EventEmitter<MenuItem> | Emitido quando um item do menu é clicado |
| `avatarClick` | EventEmitter<void> | Emitido quando o avatar é clicado |

## Interfaces

```typescript
export interface UserInfo {
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
}
```

## Status Online

```html
<!-- Online (Green) -->
<muxima-user-profile-menu
  [user]="user"
  [isOnline]="true">
</muxima-user-profile-menu>

<!-- Offline (Gray) -->
<muxima-user-profile-menu
  [user]="user"
  [isOnline]="false">
</muxima-user-profile-menu>
```

## Com Badges

```typescript
menuItems: MenuItem[] = [
  { id: 'notifications', label: 'Notifications', icon: '🔔', badge: 5 },
  { id: 'messages', label: 'Messages', icon: '💬', badge: 12 },
  { id: 'profile', label: 'Profile', icon: '👤' }
];
```

## Posições

```html
<!-- Bottom Right (Default) -->
<muxima-user-profile-menu position="bottom-right"></muxima-user-profile-menu>

<!-- Bottom Left -->
<muxima-user-profile-menu position="bottom-left"></muxima-user-profile-menu>

<!-- Top Right -->
<muxima-user-profile-menu position="top-right"></muxima-user-profile-menu>

<!-- Top Left -->
<muxima-user-profile-menu position="top-left"></muxima-user-profile-menu>
```

## Divideres

```typescript
menuItems: MenuItem[] = [
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
  { id: 'divider1', label: '', icon: '', divider: true }, // Divider
  { id: 'help', label: 'Help', icon: '❓' },
  { id: 'logout', label: 'Logout', icon: '🚪', danger: true }
];
```

## Casos de Uso

- **Autenticação**: Login, logout, gerenciamento de conta
- **Painel Admin**: Acesso a áreas administrativas
- **Social/Chat**: Notificações, mensagens, status de presença
- **E-commerce**: Pedidos, lista de desejos, preferências
- **SaaS**: Configurações de conta, billing, suporte

## Boas Práticas

- ✅ Limite a 5-8 itens principais
- ✅ Use divideres para agrupar ações relacionadas
- ✅ Marque ações destrutivas com `danger: true`
- ✅ Use badges apenas para contadores importantes
- ✅ Mantenha ícones consistentes
- ✅ Posicione adequadamente (top para rodapé, bottom para navbar)
- ✅ Implemente status online em apps colaborativos
- ✅ Use avatars otimizados (< 50KB)
