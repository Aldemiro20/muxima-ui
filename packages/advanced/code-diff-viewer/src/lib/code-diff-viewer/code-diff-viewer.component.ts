import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface DiffLine {
  lineNumber?: number;
  type: 'added' | 'removed' | 'unchanged' | 'modified';
  content: string;
  oldLineNumber?: number;
  newLineNumber?: number;
}

export interface DiffStats {
  additions: number;
  deletions: number;
  modifications: number;
}

@Component({
  selector: 'muxima-code-diff-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="code-diff-viewer">
      <div class="diff-header">
        <h3>{{ title }}</h3>
        <div class="diff-stats">
          <span class="stat-added">+{{ stats.additions }}</span>
          <span class="stat-removed">-{{ stats.deletions }}</span>
          <span class="stat-modified" *ngIf="stats.modifications > 0">~{{ stats.modifications }}</span>
        </div>
      </div>

      <div class="diff-toolbar">
        <div class="view-modes">
          <button 
            [class.active]="viewMode === 'split'"
            (click)="viewMode = 'split'">
            ⚏ Split View
          </button>
          <button 
            [class.active]="viewMode === 'unified'"
            (click)="viewMode = 'unified'">
            ☰ Unified View
          </button>
        </div>

        <div class="diff-options">
          <label>
            <input type="checkbox" [(ngModel)]="showLineNumbers">
            <span>Números de Linha</span>
          </label>
          <label>
            <input type="checkbox" [(ngModel)]="showWhitespace">
            <span>Espaços em Branco</span>
          </label>
          <label>
            <input type="checkbox" [(ngModel)]="syntaxHighlight">
            <span>Syntax Highlight</span>
          </label>
        </div>
      </div>

      <div class="diff-content" [class.split-view]="viewMode === 'split'" [class.unified-view]="viewMode === 'unified'">
        <!-- Split View -->
        <div *ngIf="viewMode === 'split'" class="split-container">
          <div class="split-pane old-code">
            <div class="pane-header">
              <span>📄 {{ oldFileName || 'Original' }}</span>
              <span class="pane-info">Criado por Aldemiro Valentim</span>
            </div>
            <div class="code-lines">
              <div 
                *ngFor="let line of oldLines" 
                class="code-line"
                [class.line-removed]="line.type === 'removed'"
                [class.line-unchanged]="line.type === 'unchanged'">
                <span class="line-number" *ngIf="showLineNumbers">{{ line.oldLineNumber }}</span>
                <span class="line-indicator">{{ getLineIndicator(line.type) }}</span>
                <pre class="line-content" [innerHTML]="formatCode(line.content)"></pre>
              </div>
            </div>
          </div>

          <div class="split-pane new-code">
            <div class="pane-header">
              <span>📄 {{ newFileName || 'Modificado' }}</span>
              <span class="pane-info">{{ getModificationDate() }}</span>
            </div>
            <div class="code-lines">
              <div 
                *ngFor="let line of newLines" 
                class="code-line"
                [class.line-added]="line.type === 'added'"
                [class.line-unchanged]="line.type === 'unchanged'">
                <span class="line-number" *ngIf="showLineNumbers">{{ line.newLineNumber }}</span>
                <span class="line-indicator">{{ getLineIndicator(line.type) }}</span>
                <pre class="line-content" [innerHTML]="formatCode(line.content)"></pre>
              </div>
            </div>
          </div>
        </div>

        <!-- Unified View -->
        <div *ngIf="viewMode === 'unified'" class="unified-container">
          <div class="unified-header">
            <span>📊 Comparação Unificada</span>
            <span class="author-info">Desenvolvido por Aldemiro Valentim</span>
          </div>
          <div class="code-lines">
            <div 
              *ngFor="let line of unifiedLines" 
              class="code-line"
              [class.line-added]="line.type === 'added'"
              [class.line-removed]="line.type === 'removed'"
              [class.line-unchanged]="line.type === 'unchanged'"
              [class.line-modified]="line.type === 'modified'">
              <span class="line-number old" *ngIf="showLineNumbers">{{ line.oldLineNumber || '-' }}</span>
              <span class="line-number new" *ngIf="showLineNumbers">{{ line.newLineNumber || '-' }}</span>
              <span class="line-indicator">{{ getLineIndicator(line.type) }}</span>
              <pre class="line-content" [innerHTML]="formatCode(line.content)"></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="diff-footer" *ngIf="showStats">
        <div class="footer-stat">
          <span class="label">Total de linhas:</span>
          <span class="value">{{ totalLines }}</span>
        </div>
        <div class="footer-stat">
          <span class="label">Modificações:</span>
          <span class="value">{{ stats.additions + stats.deletions + stats.modifications }}</span>
        </div>
        <div class="footer-stat">
          <span class="label">Taxa de mudança:</span>
          <span class="value">{{ getChangePercentage() }}%</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .code-diff-viewer {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .diff-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;

      h3 {
        font-size: 20px;
        font-weight: 700;
        margin: 0;
      }
    }

    .diff-stats {
      display: flex;
      gap: 12px;
      font-weight: 600;
      font-size: 14px;

      span {
        padding: 4px 12px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.2);
      }

      .stat-added {
        color: #10b981;
        background: rgba(16, 185, 129, 0.2);
      }

      .stat-removed {
        color: #ef4444;
        background: rgba(239, 68, 68, 0.2);
      }

      .stat-modified {
        color: #f59e0b;
        background: rgba(245, 158, 11, 0.2);
      }
    }

    .diff-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      background: #f9fafb;
      border-bottom: 2px solid #e5e7eb;
    }

    .view-modes {
      display: flex;
      gap: 8px;

      button {
        padding: 8px 16px;
        border: 2px solid #e5e7eb;
        background: white;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          border-color: #667eea;
        }

        &.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: #667eea;
        }
      }
    }

    .diff-options {
      display: flex;
      gap: 16px;

      label {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: #374151;
        cursor: pointer;

        input[type="checkbox"] {
          width: 16px;
          height: 16px;
        }
      }
    }

    .diff-content {
      overflow-x: auto;
      max-height: 600px;
      overflow-y: auto;
    }

    .split-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .split-pane {
      border-right: 2px solid #e5e7eb;

      &:last-child {
        border-right: none;
      }
    }

    .pane-header,
    .unified-header {
      padding: 12px 16px;
      background: #f3f4f6;
      border-bottom: 1px solid #e5e7eb;
      font-weight: 600;
      font-size: 14px;
      color: #374151;
      display: flex;
      justify-content: space-between;

      .pane-info,
      .author-info {
        font-size: 12px;
        color: #6b7280;
        font-weight: normal;
        font-style: italic;
      }
    }

    .code-lines {
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 13px;
      line-height: 1.6;
    }

    .code-line {
      display: flex;
      align-items: flex-start;
      border-bottom: 1px solid #f3f4f6;
      transition: background-color 0.2s;

      &:hover {
        background: rgba(102, 126, 234, 0.05);
      }

      &.line-added {
        background: rgba(16, 185, 129, 0.1);

        .line-content {
          color: #065f46;
        }
      }

      &.line-removed {
        background: rgba(239, 68, 68, 0.1);

        .line-content {
          color: #991b1b;
        }
      }

      &.line-modified {
        background: rgba(245, 158, 11, 0.1);

        .line-content {
          color: #92400e;
        }
      }

      &.line-unchanged {
        .line-content {
          color: #374151;
        }
      }
    }

    .line-number {
      min-width: 40px;
      padding: 4px 8px;
      text-align: right;
      color: #9ca3af;
      background: #f9fafb;
      border-right: 1px solid #e5e7eb;
      user-select: none;

      &.old {
        min-width: 35px;
      }

      &.new {
        min-width: 35px;
        border-left: 1px solid #e5e7eb;
      }
    }

    .line-indicator {
      min-width: 24px;
      padding: 4px 8px;
      text-align: center;
      font-weight: 700;
      user-select: none;
    }

    .line-content {
      flex: 1;
      margin: 0;
      padding: 4px 12px;
      white-space: pre-wrap;
      word-break: break-all;
      font-family: inherit;
      font-size: inherit;
    }

    .diff-footer {
      display: flex;
      justify-content: space-around;
      padding: 16px 24px;
      background: #f9fafb;
      border-top: 2px solid #e5e7eb;
    }

    .footer-stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;

      .label {
        font-size: 12px;
        color: #6b7280;
        font-weight: 600;
      }

      .value {
        font-size: 18px;
        color: #667eea;
        font-weight: 700;
      }
    }

    @media (max-width: 768px) {
      .split-container {
        grid-template-columns: 1fr;
      }

      .diff-toolbar {
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
      }
    }
  `]
})
export class CodeDiffViewerComponent implements OnChanges {
  @Input() oldCode = '';
  @Input() newCode = '';
  @Input() oldFileName = '';
  @Input() newFileName = '';
  @Input() title = 'Code Diff Viewer';
  @Input() showStats = true;
  @Input() language = 'typescript';

  viewMode: 'split' | 'unified' = 'split';
  showLineNumbers = true;
  showWhitespace = false;
  syntaxHighlight = true;

  oldLines: DiffLine[] = [];
  newLines: DiffLine[] = [];
  unifiedLines: DiffLine[] = [];
  stats: DiffStats = { additions: 0, deletions: 0, modifications: 0 };
  totalLines = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['oldCode'] || changes['newCode']) {
      this.computeDiff();
    }
  }

  private computeDiff() {
    const oldCodeLines = this.oldCode.split('\n');
    const newCodeLines = this.newCode.split('\n');

    this.oldLines = [];
    this.newLines = [];
    this.unifiedLines = [];
    this.stats = { additions: 0, deletions: 0, modifications: 0 };

    const maxLines = Math.max(oldCodeLines.length, newCodeLines.length);
    this.totalLines = maxLines;

    for (let i = 0; i < maxLines; i++) {
      const oldLine = oldCodeLines[i];
      const newLine = newCodeLines[i];

      if (oldLine === newLine) {
        // Unchanged
        this.oldLines.push({
          type: 'unchanged',
          content: oldLine || '',
          oldLineNumber: i + 1,
          newLineNumber: i + 1
        });
        this.newLines.push({
          type: 'unchanged',
          content: newLine || '',
          oldLineNumber: i + 1,
          newLineNumber: i + 1
        });
        this.unifiedLines.push({
          type: 'unchanged',
          content: oldLine || '',
          oldLineNumber: i + 1,
          newLineNumber: i + 1
        });
      } else if (oldLine !== undefined && newLine === undefined) {
        // Removed
        this.stats.deletions++;
        this.oldLines.push({
          type: 'removed',
          content: oldLine,
          oldLineNumber: i + 1
        });
        this.unifiedLines.push({
          type: 'removed',
          content: oldLine,
          oldLineNumber: i + 1
        });
      } else if (oldLine === undefined && newLine !== undefined) {
        // Added
        this.stats.additions++;
        this.newLines.push({
          type: 'added',
          content: newLine,
          newLineNumber: i + 1
        });
        this.unifiedLines.push({
          type: 'added',
          content: newLine,
          newLineNumber: i + 1
        });
      } else {
        // Modified
        this.stats.modifications++;
        this.oldLines.push({
          type: 'removed',
          content: oldLine,
          oldLineNumber: i + 1
        });
        this.newLines.push({
          type: 'added',
          content: newLine,
          newLineNumber: i + 1
        });
        this.unifiedLines.push({
          type: 'modified',
          content: newLine,
          oldLineNumber: i + 1,
          newLineNumber: i + 1
        });
      }
    }
  }

  getLineIndicator(type: string): string {
    switch (type) {
      case 'added': return '+';
      case 'removed': return '-';
      case 'modified': return '~';
      default: return ' ';
    }
  }

  formatCode(code: string): string {
    if (!this.syntaxHighlight) {
      return this.escapeHtml(code);
    }

    // Basic syntax highlighting
    let formatted = this.escapeHtml(code);
    
    // Keywords
    formatted = formatted.replace(/\b(const|let|var|function|class|interface|type|export|import|from|return|if|else|for|while|switch|case|break|continue)\b/g, '<span style="color: #d73a49; font-weight: bold;">$1</span>');
    
    // Strings
    formatted = formatted.replace(/(['"`])(.*?)\1/g, '<span style="color: #032f62;">$1$2$1</span>');
    
    // Comments
    formatted = formatted.replace(/(\/\/.*$)/gm, '<span style="color: #6a737d; font-style: italic;">$1</span>');
    
    // Numbers
    formatted = formatted.replace(/\b(\d+)\b/g, '<span style="color: #005cc5;">$1</span>');

    return formatted;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  getChangePercentage(): number {
    const changes = this.stats.additions + this.stats.deletions + this.stats.modifications;
    return this.totalLines > 0 ? Math.round((changes / this.totalLines) * 100) : 0;
  }

  getModificationDate(): string {
    return new Date().toLocaleDateString('pt-BR');
  }
}
