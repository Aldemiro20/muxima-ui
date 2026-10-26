import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SIDEBAR } from '../data/site';
import { Icon } from '../ui/icon';

/** Layout com barra lateral, usado na documentação, no catálogo e nos templates. */
@Component({
  selector: 'doc-docs-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-shell">
      <aside class="sidebar" aria-label="Documentação">
        @for (group of groups; track group.title) {
          <div class="sidebar-group">
            <p class="sidebar-title">{{ group.title }}</p>
            <ul>
              @for (item of group.items; track item.label) {
                <li>
                  <a
                    [routerLink]="item.path"
                    [queryParams]="item.query ?? null"
                    routerLinkActive="active"
                    ariaCurrentWhenActive="page"
                    [routerLinkActiveOptions]="{ exact: true }"
                    class="sidebar-link"
                  >
                    <doc-icon [name]="item.icon" />
                    <span>{{ item.label }}</span>
                    @if (item.pro) {
                      <span class="pro-badge">Pro</span>
                    }
                  </a>
                </li>
              }
            </ul>
          </div>
        }
      </aside>
      <main class="docs-main" id="conteudo">
        <router-outlet />
      </main>
    </div>
  `,
})
export class DocsLayout {
  protected readonly groups = SIDEBAR;
}
