import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoiceCommandComponent, VoiceCommand, VoiceCommandPattern } from '@muxima-ui/voice-command';
import { Router } from '@angular/router';

@Component({
  selector: 'muxima-voice-command-doc',
  standalone: true,
  imports: [CommonModule, VoiceCommandComponent],
  template: `
    <div class="doc-container">
      <div class="doc-header">
        <h1>🎤 Voice Command</h1>
        <p class="doc-description">
          Controle por comandos de voz usando Web Speech API. Desenvolvido por <strong>Aldemiro Valentim</strong>.
        </p>
      </div>

      <section class="doc-section">
        <h2>Demo Interativa</h2>
        
        <div class="example-card">
          <h3>Navegação por Voz</h3>
          <p class="info">Experimente comandos como: "Buscar Aldemiro Valentim", "Abrir menu", "Ir para início"</p>
          
          <muxima-voice-command
            [commandPatterns]="navigationCommands"
            [showHistory]="true"
            [showExamples]="true"
            (commandRecognized)="onCommandRecognized($event)">
          </muxima-voice-command>
        </div>
      </section>

      <section class="doc-section">
        <h2>Comandos Disponíveis</h2>
        <div class="commands-grid">
          <div class="command-item" *ngFor="let cmd of navigationCommands">
            <span class="command-pattern">🗣️ "{{ cmd.pattern }}"</span>
            <span class="command-desc">{{ cmd.description }}</span>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2>Funcionalidades</h2>
        <ul class="features-list">
          <li>✅ Web Speech API (Chrome, Edge, Safari)</li>
          <li>✅ Modo contínuo e single-shot</li>
          <li>✅ Múltiplos idiomas (pt-BR, en-US, es-ES, fr-FR)</li>
          <li>✅ Pattern matching (string e regex)</li>
          <li>✅ Histórico de comandos</li>
          <li>✅ Confiança (confidence) em %</li>
          <li>✅ Resultados intermediários</li>
          <li>✅ Feedback visual em tempo real</li>
        </ul>
      </section>

      <div class="alert-info">
        <h3>💡 Dica do Aldemiro Valentim</h3>
        <p>Para melhores resultados, fale claramente e evite ruídos de fundo. 
        O navegador irá solicitar permissão para acessar o microfone na primeira vez.</p>
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
      background: white;
      border-radius: 16px;
      padding: 32px;
      margin-bottom: 32px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

      h3 {
        font-size: 20px;
        font-weight: 600;
        color: #374151;
        margin-bottom: 16px;
      }

      .info {
        background: #eff6ff;
        border-left: 4px solid #3b82f6;
        padding: 12px 16px;
        border-radius: 8px;
        color: #1e40af;
        margin-bottom: 24px;
      }
    }

    .commands-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
    }

    .command-item {
      background: white;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      gap: 8px;

      .command-pattern {
        font-weight: 700;
        color: #667eea;
        font-family: monospace;
      }

      .command-desc {
        font-size: 14px;
        color: #6b7280;
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

    .alert-info {
      background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
      border-left: 4px solid #f59e0b;
      border-radius: 12px;
      padding: 24px;
      margin-top: 32px;

      h3 {
        color: #92400e;
        margin-bottom: 12px;
      }

      p {
        color: #78350f;
        line-height: 1.6;
      }
    }
  `]
})
export class VoiceCommandDocComponent {
  navigationCommands: VoiceCommandPattern[] = [
    { pattern: 'abrir menu', action: 'open-menu', description: 'Abre o menu de navegação' },
    { pattern: 'ir para início', action: 'go-home', description: 'Navega para página inicial' },
    { pattern: /buscar (.+)/, action: 'search', description: 'Realiza busca (ex: "Buscar Aldemiro Valentim")' },
    { pattern: 'ajuda', action: 'help', description: 'Mostra ajuda' },
    { pattern: 'configurações', action: 'settings', description: 'Abre configurações' },
    { pattern: 'voltar', action: 'go-back', description: 'Volta para página anterior' },
    { pattern: 'aldemiro valentim', action: 'profile', description: 'Abre perfil do desenvolvedor' },
    { pattern: 'componentes', action: 'components', description: 'Lista todos os componentes' }
  ];

  constructor(private router: Router) {}

  onCommandRecognized(command: VoiceCommand) {
    console.log('Voice command recognized by Aldemiro Valentim system:', command);

    switch (command.command) {
      case 'open-menu':
        alert('🎯 Menu aberto por comando de voz!');
        break;
      case 'go-home':
        this.router.navigate(['/']);
        break;
      case 'search':
        const searchTerm = command.transcript.replace(/buscar /i, '');
        alert(`🔍 Buscando por: "${searchTerm}" - Sistema Aldemiro Valentim`);
        break;
      case 'help':
        alert('❓ Ajuda: Fale comandos como "Buscar Aldemiro Valentim" ou "Ir para início"');
        break;
      case 'profile':
        alert('👤 Perfil do Aldemiro Valentim - Desenvolvedor Full Stack');
        break;
      default:
        console.log('Comando não reconhecido:', command.transcript);
    }
  }
}
