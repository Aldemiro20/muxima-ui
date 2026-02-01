import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeDiffViewerComponent } from '@muxima-ui/code-diff-viewer';

@Component({
  selector: 'muxima-code-diff-viewer-doc',
  standalone: true,
  imports: [CommonModule, CodeDiffViewerComponent],
  template: `
    <div class="doc-container">
      <div class="doc-header">
        <h1>📊 Code Diff Viewer</h1>
        <p class="doc-description">
          Visualizador de diferenças de código com syntax highlighting.
          Desenvolvido por <strong>Aldemiro Valentim</strong>.
        </p>
      </div>

      <section class="doc-section">
        <h2>Exemplos</h2>

        <div class="example-card">
          <h3>Componente Angular - Antes vs Depois</h3>
          <muxima-code-diff-viewer
            [title]="'user.component.ts - Refatoração por Aldemiro Valentim'"
            [oldCode]="oldComponentCode"
            [newCode]="newComponentCode"
            [oldFileName]="'user.component.ts (v1.0)'"
            [newFileName]="'user.component.ts (v2.0)'"
            [showStats]="true">
          </muxima-code-diff-viewer>
        </div>

        <div class="example-card">
          <h3>Service TypeScript</h3>
          <muxima-code-diff-viewer
            [title]="'auth.service.ts - Melhorias de Segurança'"
            [oldCode]="oldServiceCode"
            [newCode]="newServiceCode"
            [language]="'typescript'">
          </muxima-code-diff-viewer>
        </div>
      </section>

      <section class="doc-section">
        <h2>Funcionalidades</h2>
        <ul class="features-list">
          <li>✅ Split view e Unified view</li>
          <li>✅ Syntax highlighting automático</li>
          <li>✅ Números de linha</li>
          <li>✅ Estatísticas (additions, deletions, modifications)</li>
          <li>✅ Indicadores visuais (+, -, ~)</li>
          <li>✅ Cores diferenciadas por tipo de mudança</li>
          <li>✅ Scroll sincronizado</li>
          <li>✅ Responsivo</li>
        </ul>
      </section>

      <div class="pro-tip">
        <h3>💡 Dica Profissional - Aldemiro Valentim</h3>
        <p>Use este componente para code reviews, documentação de mudanças, 
        e visualização de histórico Git. Perfeito para DevOps e equipes de desenvolvimento!</p>
      </div>
    </div>
  `,
  styles: [`
    .doc-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 40px 24px;
    }

    .doc-header {
      margin-bottom: 48px;

      h1 {
        font-size: 48px;
        font-weight: 800;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 16px;
      }

      .doc-description {
        font-size: 20px;
        color: #6b7280;
        line-height: 1.6;

        strong {
          color: #667eea;
        }
      }
    }

    .doc-section {
      margin-bottom: 48px;

      h2 {
        font-size: 32px;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 24px;
        padding-bottom: 12px;
        border-bottom: 3px solid #667eea;
      }
    }

    .example-card {
      margin-bottom: 48px;

      h3 {
        font-size: 20px;
        font-weight: 600;
        color: #374151;
        margin-bottom: 24px;
      }
    }

    .features-list {
      list-style: none;
      padding: 0;

      li {
        padding: 12px 0;
        color: #374151;
        font-size: 16px;
        line-height: 1.6;
      }
    }

    .pro-tip {
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
      border-left: 4px solid #8b5cf6;
      border-radius: 12px;
      padding: 24px;
      margin-top: 32px;

      h3 {
        color: #5b21b6;
        margin-bottom: 12px;
      }

      p {
        color: #6b21a8;
        line-height: 1.6;
      }
    }
  `]
})
export class CodeDiffViewerDocComponent {
  oldComponentCode = `import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  template: '<div>{{ user.name }}</div>'
})
export class UserComponent {
  user = {
    name: 'João Silva',
    email: 'joao@email.com'
  };
  
  constructor() {
    console.log('User loaded');
  }
}`;

  newComponentCode = `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="user-card">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <small>Desenvolvido por Aldemiro Valentim</small>
    </div>
  \`
})
export class UserComponent {
  user = {
    name: 'Aldemiro Valentim',
    email: 'aldemiro.valentim@exemplo.com',
    role: 'Full Stack Developer'
  };
  
  constructor() {
    console.log('User component initialized');
    this.loadUserPreferences();
  }
  
  private loadUserPreferences() {
    // Load user settings
  }
}`;

  oldServiceCode = `import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  login(username: string, password: string) {
    return fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
  }
}`;

  newServiceCode = `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    // Improved by Aldemiro Valentim with better type safety
    return this.http.post<LoginResponse>('/api/login', credentials);
  }
  
  logout(): void {
    localStorage.removeItem('authToken');
  }
}`;
}
