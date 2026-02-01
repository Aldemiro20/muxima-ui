import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartFormBuilderComponent, FormSchema } from '@muxima-ui/smart-form-builder';

@Component({
  selector: 'muxima-smart-form-builder-doc',
  standalone: true,
  imports: [CommonModule, SmartFormBuilderComponent],
  template: `
    <div class="doc-container">
      <div class="doc-header">
        <h1>🎯 Smart Form Builder</h1>
        <p class="doc-description">
          Construtor de formulários inteligente que gera forms automaticamente a partir de schemas JSON/TypeScript.
          Sistema revolucionário com componentes Muxima UI integrados - desenvolvido por <strong>Aldemiro Valentim</strong>.
        </p>
        <div class="tech-badges">
          <span class="badge">🎨 Componentes Muxima UI</span>
          <span class="badge">✨ Auto-validação</span>
          <span class="badge">📱 Responsive</span>
          <span class="badge">🔧 TypeScript</span>
        </div>
      </div>

      <section class="doc-section">
        <h2>📋 Exemplos Interativos</h2>

        <div class="example-card">
          <h3>👨‍💻 Cadastro de Desenvolvedor</h3>
          <p class="example-description">
            Formulário completo com campos de diferentes tipos: text, email, select, radio, range, checkbox e textarea.
          </p>
          <muxima-smart-form-builder
            [schema]="developerSchema"
            [showCancel]="true"
            (formSubmit)="onDeveloperSubmit($event)"
            (formCancel)="onCancel()">
          </muxima-smart-form-builder>
        </div>

        <div class="example-card">
          <h3>📧 Formulário de Contato</h3>
          <p class="example-description">
            Formulário de contato com validações, prioridades e opção de newsletter.
          </p>
          <muxima-smart-form-builder
            [schema]="contactSchema"
            (formSubmit)="onContactSubmit($event)">
          </muxima-smart-form-builder>
        </div>

        <div class="example-card">
          <h3>⚙️ Configurações de Perfil</h3>
          <p class="example-description">
            Configurações com validações personalizadas e modo debug ativado.
          </p>
          <muxima-smart-form-builder
            [schema]="profileSchema"
            [showDebug]="true"
            (formSubmit)="onProfileSubmit($event)">
          </muxima-smart-form-builder>
        </div>
      </section>

      <section class="doc-section">
        <h2>💻 Schema Interface</h2>
        <pre><code>{{schemaCode}}</code></pre>
      </section>

      <section class="doc-section">
        <h2>🚀 Funcionalidades</h2>
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">🎨</div>
            <h4>Componentes Muxima UI</h4>
            <p>Usa os componentes nativos da biblioteca para consistência visual</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">📝</div>
            <h4>15+ Tipos de Campos</h4>
            <p>Text, email, select, radio, checkbox, date, time, file, range, color e mais</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">✅</div>
            <h4>Validação Automática</h4>
            <p>Required, email, min/max, pattern e validadores customizados</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🔀</div>
            <h4>Campos Condicionais</h4>
            <p>Campos que aparecem baseados em outros valores (dependsOn)</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">📐</div>
            <h4>Layouts Flexíveis</h4>
            <p>Vertical, horizontal, inline com widths customizáveis</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🔍</div>
            <h4>Modo Debug</h4>
            <p>Visualize valores e estado do formulário em tempo real</p>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2>💡 Casos de Uso</h2>
        <ul class="features-list">
          <li>📝 <strong>Forms Dinâmicos</strong> - CMS, admin panels, backoffice</li>
          <li>🔐 <strong>Cadastros e Login</strong> - Registro, onboarding, autenticação</li>
          <li>⚙️ <strong>Configurações</strong> - Preferências do usuário, settings</li>
          <li>📊 <strong>Surveys e Pesquisas</strong> - Questionários e formulários de feedback</li>
          <li>🎨 <strong>Form Builders</strong> - Criadores de formulários drag-and-drop</li>
          <li>🚀 <strong>Prototipagem Rápida</strong> - MVP, POC e demos</li>
        </ul>
      </section>

      <div class="success-message" *ngIf="lastSubmittedData">
        <h3>✅ Último envio processado</h3>
        <p class="success-author">Dados recebidos por Aldemiro Valentim</p>
        <pre>{{ lastSubmittedData | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .doc-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 24px;
    }

    .doc-header {
      margin-bottom: 48px;
      text-align: center;

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
        margin-bottom: 24px;

        strong {
          color: #667eea;
        }
      }

      .tech-badges {
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;

        .badge {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          border: 2px solid #667eea;
          color: #667eea;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
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
      background: white;
      border-radius: 16px;
      padding: 32px;
      margin-bottom: 32px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border: 2px solid transparent;
      transition: all 0.3s ease;

      &:hover {
        border-color: #667eea;
        box-shadow: 0 10px 20px -5px rgba(102, 126, 234, 0.2);
      }

      h3 {
        font-size: 24px;
        font-weight: 700;
        color: #374151;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .example-description {
        color: #6b7280;
        font-size: 15px;
        margin-bottom: 24px;
        line-height: 1.5;
      }
    }

    pre {
      background: #1f2937;
      color: #f3f4f6;
      padding: 24px;
      border-radius: 12px;
      overflow-x: auto;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 14px;
      line-height: 1.6;
    }

    .features-list {
      list-style: none;
      padding: 0;

      li {
        padding: 12px 0;
        color: #374151;
        font-size: 16px;
        line-height: 1.6;

        strong {
          color: #667eea;
        }
      }
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-top: 24px;

      .feature-item {
        background: white;
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        border: 2px solid transparent;

        &:hover {
          border-color: #667eea;
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(102, 126, 234, 0.2);
        }

        .feature-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        h4 {
          font-size: 18px;
          font-weight: 700;
          color: #374151;
          margin-bottom: 8px;
        }

        p {
          color: #6b7280;
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
        }
      }
    }

    .success-message {
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);
      border-left: 4px solid #10b981;
      border-radius: 12px;
      padding: 24px;
      margin-top: 32px;
      animation: slideIn 0.3s ease;

      h3 {
        color: #065f46;
        margin-bottom: 8px;
        font-size: 20px;
        font-weight: 700;
      }

      .success-author {
        color: #059669;
        font-size: 14px;
        margin-bottom: 16px;
        font-weight: 600;
      }

      pre {
        background: white;
        color: #1f2937;
        border: 2px solid #10b981;
        margin: 0;
      }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class SmartFormBuilderDocComponent {
  lastSubmittedData: any = null;

  developerSchema: FormSchema = {
    title: 'Cadastro de Desenvolvedor',
    description: 'Preencha os dados abaixo - Exemplo por Aldemiro Valentim',
    submitLabel: 'Cadastrar Desenvolvedor',
    cancelLabel: 'Limpar Formulário',
    layout: 'vertical',
    fields: [
      {
        key: 'name',
        label: 'Nome Completo',
        type: 'text',
        placeholder: 'Ex: Aldemiro Valentim',
        required: true,
        minLength: 3,
        width: 'half',
        order: 1,
        defaultValue: 'Aldemiro Valentim'
      },
      {
        key: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'aldemiro.valentim@exemplo.com',
        required: true,
        width: 'half',
        order: 2,
        helpText: 'Usaremos este email para contato'
      },
      {
        key: 'role',
        label: 'Cargo',
        type: 'select',
        required: true,
        width: 'half',
        order: 3,
        options: [
          { label: 'Frontend Developer', value: 'frontend' },
          { label: 'Backend Developer', value: 'backend' },
          { label: 'Full Stack Developer', value: 'fullstack' },
          { label: 'DevOps Engineer', value: 'devops' },
          { label: 'UI/UX Designer', value: 'designer' }
        ]
      },
      {
        key: 'experience',
        label: 'Anos de Experiência',
        type: 'number',
        min: 0,
        max: 50,
        defaultValue: 5,
        width: 'half',
        order: 4
      },
      {
        key: 'skills',
        label: 'Stack Principal',
        type: 'radio',
        required: true,
        width: 'full',
        order: 5,
        options: [
          { label: 'Angular + TypeScript', value: 'angular' },
          { label: 'React + TypeScript', value: 'react' },
          { label: 'Vue.js + TypeScript', value: 'vue' },
          { label: 'Node.js + NestJS', value: 'nodejs' }
        ]
      },
      {
        key: 'availability',
        label: 'Disponibilidade',
        type: 'range',
        min: 0,
        max: 40,
        defaultValue: 20,
        width: 'full',
        order: 6,
        helpText: 'Horas por semana disponíveis'
      },
      {
        key: 'remote',
        label: 'Aceito trabalho remoto',
        type: 'checkbox',
        defaultValue: true,
        width: 'full',
        order: 7,
        helpText: 'Estou disponível para trabalhar remotamente'
      },
      {
        key: 'bio',
        label: 'Bio',
        type: 'textarea',
        placeholder: 'Conte um pouco sobre você...',
        maxLength: 500,
        width: 'full',
        order: 8,
        defaultValue: 'Desenvolvedor apaixonado por criar soluções inovadoras'
      }
    ]
  };

  contactSchema: FormSchema = {
    title: 'Entre em Contato',
    description: 'Envie uma mensagem para Aldemiro Valentim',
    submitLabel: 'Enviar Mensagem',
    layout: 'vertical',
    fields: [
      {
        key: 'contactName',
        label: 'Seu Nome',
        type: 'text',
        required: true,
        placeholder: 'Digite seu nome',
        width: 'half',
        order: 1
      },
      {
        key: 'contactEmail',
        label: 'Seu Email',
        type: 'email',
        required: true,
        placeholder: 'seu@email.com',
        width: 'half',
        order: 2
      },
      {
        key: 'subject',
        label: 'Assunto',
        type: 'select',
        required: true,
        width: 'full',
        order: 3,
        options: [
          { label: 'Dúvida Técnica', value: 'tech' },
          { label: 'Proposta Comercial', value: 'business' },
          { label: 'Suporte', value: 'support' },
          { label: 'Parceria', value: 'partnership' },
          { label: 'Outro', value: 'other' }
        ]
      },
      {
        key: 'priority',
        label: 'Prioridade',
        type: 'radio',
        required: true,
        width: 'full',
        order: 4,
        options: [
          { label: '🔴 Urgente', value: 'urgent' },
          { label: '🟡 Normal', value: 'normal' },
          { label: '🟢 Baixa', value: 'low' }
        ]
      },
      {
        key: 'message',
        label: 'Mensagem',
        type: 'textarea',
        required: true,
        minLength: 10,
        placeholder: 'Digite sua mensagem para Aldemiro Valentim...',
        width: 'full',
        order: 5
      },
      {
        key: 'subscribe',
        label: 'Desejo receber atualizações',
        type: 'checkbox',
        defaultValue: true,
        width: 'full',
        order: 6,
        helpText: 'Receba novidades sobre Muxima UI'
      }
    ]
  };

  profileSchema: FormSchema = {
    title: 'Configurações de Perfil',
    description: 'Personalize seu perfil - Aldemiro Valentim',
    submitLabel: 'Salvar Alterações',
    layout: 'vertical',
    fields: [
      {
        key: 'username',
        label: 'Username',
        type: 'text',
        required: true,
        pattern: '^[a-zA-Z0-9_]{3,20}$',
        helpText: 'Apenas letras, números e underscore',
        defaultValue: 'aldemiro_valentim'
      },
      {
        key: 'phone',
        label: 'Telefone',
        type: 'tel',
        pattern: '^\\([0-9]{2}\\) [0-9]{5}-[0-9]{4}$',
        placeholder: '(99) 99999-9999'
      },
      {
        key: 'birthdate',
        label: 'Data de Nascimento',
        type: 'date',
        required: true
      },
      {
        key: 'favoriteColor',
        label: 'Cor Favorita',
        type: 'color',
        defaultValue: '#667eea'
      },
      {
        key: 'notifications',
        label: 'Receber notificações',
        type: 'checkbox',
        defaultValue: true,
        helpText: 'Enviaremos atualizações importantes'
      }
    ]
  };

  schemaCode = `interface FormSchema {
  title?: string;
  description?: string;
  fields: FormFieldSchema[];
  submitLabel?: string;
  cancelLabel?: string;
  layout?: 'vertical' | 'horizontal' | 'inline';
}

interface FormFieldSchema {
  key: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 
        'url' | 'textarea' | 'select' | 'radio' | 'checkbox' | 
        'date' | 'time' | 'file' | 'range' | 'color';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{ label: string; value: any }>;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  customValidators?: Array<(control: AbstractControl) => ValidationErrors | null>;
  defaultValue?: any;
  helpText?: string;
  dependsOn?: string;
  conditionalDisplay?: (formValue: any) => boolean;
  width?: 'full' | 'half' | 'third' | 'quarter';
  order?: number;
}`;

  onDeveloperSubmit(data: any) {
    console.log('Developer data submitted by Aldemiro Valentim:', data);
    this.lastSubmittedData = data;
    alert(`Cadastro de ${data.name} realizado com sucesso!`);
  }

  onContactSubmit(data: any) {
    console.log('Contact form submitted:', data);
    this.lastSubmittedData = data;
    alert(`Mensagem de ${data.contactName} enviada para Aldemiro Valentim!`);
  }

  onProfileSubmit(data: any) {
    console.log('Profile updated:', data);
    this.lastSubmittedData = data;
    alert(`Perfil de ${data.username} atualizado por Aldemiro Valentim!`);
  }

  onCancel() {
    console.log('Form cancelled');
    alert('Formulário cancelado');
  }
}
