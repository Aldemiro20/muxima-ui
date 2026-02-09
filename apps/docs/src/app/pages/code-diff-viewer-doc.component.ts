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
          Code difference viewer with syntax highlighting.
          Perfect for code reviews and documentation.
        </p>
      </div>

      <section class="doc-section">
        <h2>Exemplos</h2>

        <div class="example-card">
          <h3>Angular Component - Before vs After</h3>
          <muxima-code-diff-viewer
            [title]="'user.component.ts - Refactoring Example'"
            [oldCode]="oldComponentCode"
            [newCode]="newComponentCode"
            [oldFileName]="'user.component.ts (v1.0)'"
            [newFileName]="'user.component.ts (v2.0)'"
            [showStats]="true">
          </muxima-code-diff-viewer>
        </div>

        <div class="example-card">
          <h3>TypeScript Service</h3>
          <muxima-code-diff-viewer
            [title]="'auth.service.ts - Security Improvements'"
            [oldCode]="oldServiceCode"
            [newCode]="newServiceCode"
            [language]="'typescript'">
          </muxima-code-diff-viewer>
        </div>
      </section>

      <section class="doc-section">
        <h2>Features</h2>
        <ul class="features-list">
          <li>✅ Split view and Unified view</li>
          <li>✅ Automatic syntax highlighting</li>
          <li>✅ Line numbers</li>
          <li>✅ Statistics (additions, deletions, modifications)</li>
          <li>✅ Visual indicators (+, -, ~)</li>
          <li>✅ Color-coded changes</li>
          <li>✅ Synchronized scrolling</li>
          <li>✅ Responsive design</li>
        </ul>
      </section>

      <div class="pro-tip">
        <h3>💡 Pro Tip</h3>
        <p>Use this component for code reviews, change documentation, 
        and Git history visualization. Perfect for DevOps and development teams!</p>
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
    name: 'John Doe',
    email: 'john@example.com'
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
      <small>Muxima UI Component Library</small>
    </div>
  \`
})
export class UserComponent {
  user = {
    name: 'John Doe',
    email: 'john@example.com',
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
