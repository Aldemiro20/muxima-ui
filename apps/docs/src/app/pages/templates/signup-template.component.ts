import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@muxima-ui/button';
import { InputComponent } from '@muxima-ui/input';
import { CheckboxComponent } from '@muxima-ui/checkbox';

@Component({
  selector: 'muxima-signup-template',
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
    <div class="signup-page">
      <div class="signup-container">
        <!-- Left Side - Form -->
        <div class="signup-form-section">
          <div class="form-container">
            <div class="form-header">
              <div class="logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>Muxima UI</span>
              </div>
              <h2>Criar sua conta</h2>
              <p>Comece sua jornada hoje</p>
            </div>

            <!-- Social Sign Up -->
            <div class="social-signup">
              <button class="social-btn google" (click)="signUpWithGoogle()">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              <button class="social-btn github" (click)="signUpWithGithub()">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                Continue with GitHub
              </button>
            </div>

            <div class="divider">
              <span>ou registre-se com email</span>
            </div>

            <!-- Sign Up Form -->
            <form class="signup-form" (ngSubmit)="onSubmit()">
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">Nome</label>
                  <muxima-input
                    id="firstName"
                    type="text"
                    placeholder="João"
                    [(ngModel)]="firstName"
                    name="firstName"
                    [required]="true">
                    <svg slot="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </muxima-input>
                </div>

                <div class="form-group">
                  <label for="lastName">Sobrenome</label>
                  <muxima-input
                    id="lastName"
                    type="text"
                    placeholder="Silva"
                    [(ngModel)]="lastName"
                    name="lastName"
                    [required]="true">
                    <svg slot="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </muxima-input>
                </div>
              </div>

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
                <span class="password-hint">Mínimo 8 caracteres</span>
              </div>

              <div class="form-group">
                <label for="confirmPassword">Confirmar Senha</label>
                <muxima-input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  [(ngModel)]="confirmPassword"
                  name="confirmPassword"
                  [required]="true">
                  <svg slot="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </muxima-input>
              </div>

              <div class="form-group checkbox-group">
                <muxima-checkbox
                  [(ngModel)]="acceptTerms"
                  name="acceptTerms"
                  label="Eu aceito os Termos de Serviço e Política de Privacidade">
                </muxima-checkbox>
              </div>

              <muxima-button
                type="submit"
                text="Criar conta"
                variant="purple"
                class="submit-btn">
              </muxima-button>

              <div class="signin-link">
                <span>Já tem uma conta?</span>
                <a routerLink="/templates/signin">Entrar</a>
              </div>
            </form>
          </div>
        </div>

        <!-- Right Side - Branding -->
        <div class="signup-branding">
          <div class="branding-content">
            <h1>Junte-se a milhares de desenvolvedores</h1>
            <p>Crie interfaces incríveis com os melhores componentes do mercado. Comece gratuitamente hoje.</p>
            
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-value">50K+</div>
                <div class="stat-label">Desenvolvedores</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">100+</div>
                <div class="stat-label">Componentes</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">4.9</div>
                <div class="stat-label">Avaliação</div>
              </div>
            </div>

            <div class="benefits">
              <h3>O que você ganha:</h3>
              <div class="benefit-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <div>
                  <strong>Acesso completo</strong>
                  <span>Todos os componentes e recursos premium</span>
                </div>
              </div>
              <div class="benefit-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <div>
                  <strong>Atualizações gratuitas</strong>
                  <span>Novos componentes e melhorias constantes</span>
                </div>
              </div>
              <div class="benefit-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <div>
                  <strong>Suporte dedicado</strong>
                  <span>Ajuda quando você precisar</span>
                </div>
              </div>
            </div>

            <div class="user-showcase">
              <div class="user-avatars">
                <div class="avatar">👨‍💻</div>
                <div class="avatar">👩‍💻</div>
                <div class="avatar">👨‍🎨</div>
                <div class="avatar">👩‍🎨</div>
              </div>
              <p>Junte-se a desenvolvedores de empresas como Google, Microsoft e Amazon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .signup-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .signup-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-width: 1200px;
      width: 100%;
      background: white;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    /* Left Side - Form */
    .signup-form-section {
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

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 2rem;
      font-size: 1.5rem;
      font-weight: 700;
      color: #667eea;
    }

    .logo svg {
      width: 32px;
      height: 32px;
      stroke: #667eea;
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

    /* Social Sign Up */
    .social-signup {
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

    /* Sign Up Form */
    .signup-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
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

    .password-hint {
      font-size: 0.75rem;
      color: #9ca3af;
    }

    .checkbox-group {
      margin-top: -0.5rem;
    }

    .submit-btn {
      width: 100%;
      margin-top: 0.5rem;
    }

    .signin-link {
      text-align: center;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .signin-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
      margin-left: 0.25rem;
    }

    .signin-link a:hover {
      text-decoration: underline;
    }

    /* Right Side - Branding */
    .signup-branding {
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

    .signup-branding h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 1rem 0;
      line-height: 1.2;
    }

    .signup-branding > .branding-content > p {
      font-size: 1.125rem;
      opacity: 0.9;
      margin-bottom: 3rem;
      line-height: 1.6;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-bottom: 3rem;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .stat-item {
      text-align: center;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 0.875rem;
      opacity: 0.8;
    }

    .benefits {
      margin-bottom: 3rem;
    }

    .benefits h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 1.5rem 0;
    }

    .benefit-item {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.25rem;
    }

    .benefit-item svg {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      margin-top: 0.125rem;
    }

    .benefit-item div {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .benefit-item strong {
      font-size: 1rem;
      font-weight: 600;
    }

    .benefit-item span {
      font-size: 0.875rem;
      opacity: 0.8;
    }

    .user-showcase {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .user-avatars {
      display: flex;
      margin-bottom: 1rem;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      margin-left: -12px;
    }

    .avatar:first-child {
      margin-left: 0;
    }

    .user-showcase p {
      font-size: 0.875rem;
      opacity: 0.9;
      margin: 0;
      line-height: 1.5;
    }

    @media (max-width: 1024px) {
      .signup-container {
        grid-template-columns: 1fr;
      }

      .signup-branding {
        display: none;
      }

      .signup-form-section {
        padding: 3rem 2rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .signup-page {
        padding: 1rem;
      }

      .signup-form-section {
        padding: 2rem 1.5rem;
      }

      .form-header h2 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class SignUpTemplateComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptTerms: boolean = false;

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    if (!this.acceptTerms) {
      console.error('Please accept terms and conditions');
      return;
    }

    console.log('Sign Up:', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    });
    
    // Navigate to dashboard or show success message
  }

  signUpWithGoogle() {
    console.log('Sign up with Google');
    // Implement Google OAuth
  }

  signUpWithGithub() {
    console.log('Sign up with GitHub');
    // Implement GitHub OAuth
  }
}
