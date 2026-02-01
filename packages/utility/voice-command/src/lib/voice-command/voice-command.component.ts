import { Component, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface VoiceCommand {
  command: string;
  transcript: string;
  confidence: number;
  timestamp: Date;
}

export interface VoiceCommandConfig {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
  commands?: VoiceCommandPattern[];
}

export interface VoiceCommandPattern {
  pattern: string | RegExp;
  action: string;
  description: string;
}

@Component({
  selector: 'muxima-voice-command',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="voice-command-container">
      <div class="voice-status" [class.active]="isListening" [class.error]="hasError">
        <div class="status-icon">
          <span *ngIf="!isListening && !hasError">🎤</span>
          <span *ngIf="isListening && !hasError" class="pulse">🔴</span>
          <span *ngIf="hasError">⚠️</span>
        </div>
        
        <div class="status-text">
          <h3>{{ getStatusTitle() }}</h3>
          <p>{{ getStatusMessage() }}</p>
        </div>
      </div>

      <div class="voice-controls">
        <button 
          type="button"
          class="btn-voice"
          [class.listening]="isListening"
          (click)="toggleListening()"
          [disabled]="!isSupported">
          <span *ngIf="!isListening">🎙️ Iniciar Comando de Voz</span>
          <span *ngIf="isListening">⏹️ Parar</span>
        </button>

        <button 
          type="button"
          class="btn-settings"
          (click)="showSettings = !showSettings">
          ⚙️ Configurações
        </button>
      </div>

      <div class="voice-transcript" *ngIf="currentTranscript || finalTranscript">
        <div class="transcript-current" *ngIf="currentTranscript">
          <small>Ouvindo...</small>
          <p>{{ currentTranscript }}</p>
        </div>
        
        <div class="transcript-final" *ngIf="finalTranscript">
          <small>✓ Reconhecido</small>
          <p>{{ finalTranscript }}</p>
          <span class="confidence">{{ (lastConfidence * 100).toFixed(0) }}% confiança</span>
        </div>
      </div>

      <div class="voice-settings" *ngIf="showSettings">
        <h4>Configurações de Voz</h4>
        
        <div class="setting-item">
          <label>
            <input 
              type="checkbox" 
              [(ngModel)]="config.continuous"
              (change)="updateConfig()">
            <span>Modo Contínuo</span>
          </label>
        </div>

        <div class="setting-item">
          <label>
            <input 
              type="checkbox" 
              [(ngModel)]="config.interimResults"
              (change)="updateConfig()">
            <span>Resultados Intermediários</span>
          </label>
        </div>

        <div class="setting-item">
          <label>Idioma:</label>
          <select [(ngModel)]="config.lang" (change)="updateConfig()">
            <option value="pt-BR">Português (Brasil)</option>
            <option value="en-US">English (US)</option>
            <option value="es-ES">Español</option>
            <option value="fr-FR">Français</option>
          </select>
        </div>
      </div>

      <div class="voice-commands-list" *ngIf="commandPatterns.length > 0">
        <h4>📋 Comandos Disponíveis</h4>
        <ul>
          <li *ngFor="let cmd of commandPatterns">
            <strong>{{ cmd.pattern }}</strong>
            <span>{{ cmd.description }}</span>
          </li>
        </ul>
      </div>

      <div class="voice-history" *ngIf="showHistory && commandHistory.length > 0">
        <h4>📜 Histórico ({{ commandHistory.length }})</h4>
        <div class="history-list">
          <div *ngFor="let cmd of commandHistory.slice(-5).reverse()" class="history-item">
            <span class="history-transcript">{{ cmd.transcript }}</span>
            <span class="history-time">{{ cmd.timestamp | date:'HH:mm:ss' }}</span>
            <span class="history-confidence">{{ (cmd.confidence * 100).toFixed(0) }}%</span>
          </div>
        </div>
      </div>

      <div class="voice-examples" *ngIf="showExamples">
        <h4>💡 Exemplos de Uso</h4>
        <div class="example-card">
          <p><strong>"Abrir menu"</strong> - Abre o menu de navegação</p>
          <p><strong>"Ir para início"</strong> - Navega para página inicial</p>
          <p><strong>"Buscar Aldemiro Valentim"</strong> - Realiza busca</p>
          <p><strong>"Ajuda"</strong> - Mostra ajuda</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .voice-command-container {
      max-width: 600px;
      margin: 0 auto;
    }

    .voice-status {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 24px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      margin-bottom: 24px;
      transition: all 0.3s;

      &.active {
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
        border: 2px solid #667eea;
      }

      &.error {
        background: #fee2e2;
        border: 2px solid #ef4444;
      }
    }

    .status-icon {
      font-size: 48px;
      line-height: 1;

      .pulse {
        display: inline-block;
        animation: pulse 1.5s ease-in-out infinite;
      }
    }

    .status-text {
      flex: 1;

      h3 {
        font-size: 18px;
        font-weight: 700;
        color: #374151;
        margin-bottom: 4px;
      }

      p {
        font-size: 14px;
        color: #6b7280;
        margin: 0;
      }
    }

    .voice-controls {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
    }

    .btn-voice,
    .btn-settings {
      flex: 1;
      padding: 16px 24px;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-voice {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;

      &.listening {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        animation: glow 2s ease-in-out infinite;
      }

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .btn-settings {
      background: #f3f4f6;
      color: #374151;

      &:hover {
        background: #e5e7eb;
      }
    }

    .voice-transcript {
      background: white;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .transcript-current,
    .transcript-final {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }

      small {
        display: block;
        font-size: 12px;
        color: #6b7280;
        margin-bottom: 8px;
        font-weight: 600;
      }

      p {
        font-size: 18px;
        color: #1f2937;
        margin: 0;
        line-height: 1.6;
      }

      .confidence {
        display: inline-block;
        margin-top: 8px;
        padding: 4px 12px;
        background: #10b981;
        color: white;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
      }
    }

    .transcript-current {
      border-left: 4px solid #fbbf24;
      padding-left: 16px;
    }

    .transcript-final {
      border-left: 4px solid #10b981;
      padding-left: 16px;
    }

    .voice-settings {
      background: #f9fafb;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;

      h4 {
        font-size: 16px;
        font-weight: 700;
        color: #374151;
        margin-bottom: 16px;
      }

      .setting-item {
        margin-bottom: 16px;

        &:last-child {
          margin-bottom: 0;
        }

        label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #374151;
          cursor: pointer;
        }

        select {
          margin-top: 8px;
          padding: 8px 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          width: 100%;
        }
      }
    }

    .voice-commands-list,
    .voice-history,
    .voice-examples {
      background: white;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      h4 {
        font-size: 16px;
        font-weight: 700;
        color: #374151;
        margin-bottom: 16px;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &:last-child {
            border-bottom: none;
          }

          strong {
            color: #667eea;
            font-family: monospace;
          }

          span {
            font-size: 14px;
            color: #6b7280;
          }
        }
      }
    }

    .history-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .history-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      background: #f9fafb;
      border-radius: 8px;
      font-size: 14px;

      .history-transcript {
        flex: 1;
        color: #374151;
      }

      .history-time {
        color: #6b7280;
        margin: 0 12px;
      }

      .history-confidence {
        color: #10b981;
        font-weight: 600;
      }
    }

    .example-card {
      p {
        padding: 8px 0;
        font-size: 14px;
        color: #374151;
        line-height: 1.6;

        strong {
          color: #667eea;
          font-family: monospace;
        }
      }
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.8;
      }
    }

    @keyframes glow {
      0%, 100% {
        box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
      }
      50% {
        box-shadow: 0 0 30px rgba(239, 68, 68, 0.8);
      }
    }
  `]
})
export class VoiceCommandComponent implements OnDestroy {
  @Input() config: VoiceCommandConfig = {
    lang: 'pt-BR',
    continuous: false,
    interimResults: true,
    maxAlternatives: 1,
    commands: []
  };
  
  @Input() showHistory = true;
  @Input() showExamples = true;
  @Input() commandPatterns: VoiceCommandPattern[] = [];

  @Output() commandRecognized = new EventEmitter<VoiceCommand>();
  @Output() transcriptChange = new EventEmitter<string>();
  @Output() error = new EventEmitter<string>();

  private recognition: any;
  isSupported = false;
  isListening = false;
  hasError = false;
  showSettings = false;

  currentTranscript = '';
  finalTranscript = '';
  lastConfidence = 0;
  commandHistory: VoiceCommand[] = [];

  constructor() {
    this.initSpeechRecognition();
  }

  private initSpeechRecognition() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      this.isSupported = true;
      this.recognition = new SpeechRecognition();
      this.setupRecognition();
    } else {
      this.hasError = true;
      this.error.emit('Speech Recognition não é suportado neste navegador');
    }
  }

  private setupRecognition() {
    this.recognition.lang = this.config.lang || 'pt-BR';
    this.recognition.continuous = this.config.continuous || false;
    this.recognition.interimResults = this.config.interimResults || true;
    this.recognition.maxAlternatives = this.config.maxAlternatives || 1;

    this.recognition.onstart = () => {
      this.isListening = true;
      this.hasError = false;
      this.currentTranscript = '';
      this.finalTranscript = '';
    };

    this.recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          final += transcript;
          this.lastConfidence = event.results[i][0].confidence;
        } else {
          interim += transcript;
        }
      }

      this.currentTranscript = interim;
      
      if (final) {
        this.finalTranscript = final;
        this.processCommand(final, this.lastConfidence);
        this.transcriptChange.emit(final);
      }
    };

    this.recognition.onerror = (event: any) => {
      this.hasError = true;
      this.isListening = false;
      this.error.emit(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      
      if (this.config.continuous && !this.hasError) {
        // Restart if continuous mode
        setTimeout(() => this.start(), 100);
      }
    };
  }

  toggleListening() {
    if (this.isListening) {
      this.stop();
    } else {
      this.start();
    }
  }

  start() {
    if (this.isSupported && !this.isListening) {
      try {
        this.recognition.start();
      } catch (e) {
        console.error('Error starting recognition:', e);
      }
    }
  }

  stop() {
    if (this.isListening) {
      this.recognition.stop();
    }
  }

  updateConfig() {
    if (this.recognition) {
      this.recognition.lang = this.config.lang;
      this.recognition.continuous = this.config.continuous;
      this.recognition.interimResults = this.config.interimResults;
      this.recognition.maxAlternatives = this.config.maxAlternatives;
    }
  }

  private processCommand(transcript: string, confidence: number) {
    const command: VoiceCommand = {
      command: this.matchCommand(transcript),
      transcript: transcript.trim(),
      confidence,
      timestamp: new Date()
    };

    this.commandHistory.push(command);
    this.commandRecognized.emit(command);
  }

  private matchCommand(transcript: string): string {
    const normalizedTranscript = transcript.toLowerCase().trim();

    for (const pattern of this.commandPatterns) {
      if (typeof pattern.pattern === 'string') {
        if (normalizedTranscript.includes(pattern.pattern.toLowerCase())) {
          return pattern.action;
        }
      } else if (pattern.pattern instanceof RegExp) {
        if (pattern.pattern.test(normalizedTranscript)) {
          return pattern.action;
        }
      }
    }

    return 'unknown';
  }

  getStatusTitle(): string {
    if (this.hasError) return 'Erro no Reconhecimento';
    if (this.isListening) return 'Ouvindo...';
    return 'Comando de Voz';
  }

  getStatusMessage(): string {
    if (this.hasError) return 'Verifique as permissões do microfone';
    if (this.isListening) return 'Fale agora... (ex: "Buscar Aldemiro Valentim")';
    if (!this.isSupported) return 'Seu navegador não suporta reconhecimento de voz';
    return 'Clique para começar a falar';
  }

  clearHistory() {
    this.commandHistory = [];
  }

  ngOnDestroy() {
    if (this.isListening) {
      this.stop();
    }
  }
}
