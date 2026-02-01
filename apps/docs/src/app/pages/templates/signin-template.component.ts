import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@muxima-ui/button';
import { InputComponent } from '@muxima-ui/input';
import { CheckboxComponent } from '@muxima-ui/checkbox';

@Component({
  selector: 'muxima-signin-template',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ButtonComponent,
    InputComponent,
    CheckboxComponent
  ],
  template: `
    <div class="signin-page">
      <div class="signin-container">
        <!-- Left Side - Branding -->
        <div class="signin-branding">
          <div class="branding-content">
            <div class="logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>Muxima UI</span>
            </div>
            <h1>Bem-vindo de volta!</h1>
            <p>Acesse sua conta e continue de onde parou. Gerencie seus projetos e explore novas funcionalidades.</p>
            
            <div class="features">
              <div class="feature-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Interface intuitiva e moderna</span>
              </div>
              <div class="feature-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Componentes reutilizáveis</span>
              </div>
              <div class="feature-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Segurança e performance</span>
              </div>
            </div>

            <div class="testimonial">
              <div class="testimonial-content">
                <p>"Muxima UI transformou completamente a forma como desenvolvemos interfaces. Simplicidade e elegância em cada componente."</p>
                <div class="testimonial-author">
                  <div class="author-avatar">👤</div>
                  <div class="author-info">
                    <strong>João Silva</strong>
                    <span>CEO, Tech Solutions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Sign In Form -->
        <div class="signin-form-section">
          <div class="form-container">
            <div class="form-header">
              <h2>Entrar na sua conta</h2>
              <p>Digite suas credenciais para acessar</p>
            </div>

            <!-- Social Sign In -->
            <div class="social-signin">
              <button class="social-btn google" (click)="signInWithGoogle()">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              <button class="social-btn github" (click)="signInWithGithub()">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                Continue with GitHub
              </button>
            </div>

            <div class="divider">
              <span>ou continue com email</span>
            </div>

            <!-- Sign In Form -->
            <form class="signin-form" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label for="email">Email</label>
                <muxima-input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  [(ngModel)]="email"
                  name="email"
                  [required]="true">
                  <svg slot="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </muxima-input>
              </div>

              <div class="form-group">
                <label for="password">Senha</label>
                <muxima-input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  [(ngModel)]="password"
                  name="password"
                  [required]="true">
                  <svg slot="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </muxima-input>
              </div>

              <div class="form-options">
                <muxima-checkbox
                  [(ngModel)]="rememberMe"
                  name="rememberMe"
                  label="Lembrar de mim">
                </muxima-checkbox>
                <a routerLink="/forgot-password" class="forgot-link">Esqueceu a senha?</a>
              </div>

              <muxima-button
                type="submit"
                text="Entrar"
                variant="purple"
                class="submit-btn">
              </muxima-button>

              <div class="signup-link">
                <span>Não tem uma conta?</span>
                <a routerLink="/templates/signup">Criar conta</a>
              </div>
            </form>

            <!-- Footer -->
            <div class="form-footer">
              <p>Ao continuar, você concorda com nossos <a href="#">Termos de Serviço</a> e <a href="#">Política de Privacidade</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .signin-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .signin-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-width: 1200px;
      width: 100%;
      background: white;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    /* Left Side - Branding */
    .signin-branding {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 4rem;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .branding-content {
      max-width: 500px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 3rem;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .logo svg {
      width: 32px;
      height: 32px;
    }

    .signin-branding h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 1rem 0;
      line-height: 1.2;
    }

    .signin-branding > p {
      font-size: 1.125rem;
      opacity: 0.9;
      margin-bottom: 3rem;
      line-height: 1.6;
    }

    .features {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 3rem;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1rem;
    }

    .feature-item svg {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .testimonial {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .testimonial-content p {
      font-size: 0.95rem;
      line-height: 1.6;
      margin: 0 0 1rem 0;
      font-style: italic;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .author-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }

    .author-info {
      display: flex;
      flex-direction: column;
    }

    .author-info strong {
      font-size: 0.875rem;
      font-weight: 600;
    }

    .author-info span {
      font-size: 0.75rem;
      opacity: 0.8;
    }

    /* Right Side - Form */
    .signin-form-section {
      padding: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fafafa;
    }

    .form-container {
      width: 100%;
      max-width: 420px;
    }

    .form-header {
      margin-bottom: 2rem;
    }

    .form-header h2 {
      font-size: 1.875rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      color: #111827;
    }

    .form-header p {
      color: #6b7280;
      margin: 0;
    }

    /* Social Sign In */
    .social-signin {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }

    .social-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 0.875rem 1.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      background: white;
      font-size: 0.9375rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      color: #374151;
    }

    .social-btn:hover {
      background: #f9fafb;
      border-color: #d1d5db;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .social-btn svg {
      width: 20px;
      height: 20px;
    }

    .divider {
      position: relative;
      text-align: center;
      margin: 2rem 0;
    }

    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: #e5e7eb;
    }

    .divider span {
      position: relative;
      background: #fafafa;
      padding: 0 1rem;
      font-size: 0.875rem;
      color: #6b7280;
    }

    /* Sign In Form */
    .signin-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: -0.5rem;
    }

    .forgot-link {
      font-size: 0.875rem;
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .forgot-link:hover {
      text-decoration: underline;
    }

    .signup-link {
      text-align: center;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .signup-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
      margin-left: 0.25rem;
    }

    .signup-link a:hover {
      text-decoration: underline;
    }

    .submit-btn {
      width: 100%;
    }

    .form-footer {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #e5e7eb;
    }

    .form-footer p {
      font-size: 0.75rem;
      color: #9ca3af;
      text-align: center;
      margin: 0;
      line-height: 1.5;
    }

    .form-footer a {
      color: #667eea;
      text-decoration: none;
    }

    .form-footer a:hover {
      text-decoration: underline;
    }

    @media (max-width: 1024px) {
      .signin-container {
        grid-template-columns: 1fr;
      }

      .signin-branding {
        display: none;
      }

      .signin-form-section {
        padding: 3rem 2rem;
      }
    }

    @media (max-width: 640px) {
      .signin-page {
        padding: 1rem;
      }

      .signin-form-section {
        padding: 2rem 1.5rem;
      }

      .form-header h2 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class SignInTemplateComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isLoading: boolean = false;

  onSubmit() {
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      console.log('Sign In:', { email: this.email, password: this.password, rememberMe: this.rememberMe });
      this.isLoading = false;
      // Navigate to dashboard or show success message
    }, 2000);
  }

  signInWithGoogle() {
    console.log('Sign in with Google');
    // Implement Google OAuth
  }

  signInWithGithub() {
    console.log('Sign in with GitHub');
    // Implement GitHub OAuth
  }
}
