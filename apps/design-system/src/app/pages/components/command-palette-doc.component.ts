import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandPaletteComponent, CommandItem } from '@muxima-ui/command-palette';

@Component({
  selector: 'app-command-palette-doc',
  standalone: true,
  imports: [CommonModule, CommandPaletteComponent],
  templateUrl: './command-palette-doc.component.html',
  styleUrls: ['./command-palette-doc.component.scss']
})
export class CommandPaletteDocComponent {
  @ViewChild(CommandPaletteComponent) commandPalette?: CommandPaletteComponent;

  // Comandos de exemplo
  commands: CommandItem[] = [
    // Navegação
    {
      id: 'nav-home',
      label: 'Ir para Home',
      description: 'Navegar para página inicial',
      icon: '🏠',
      category: 'Navegação',
      shortcut: 'Ctrl+H',
      action: () => this.navigateTo('/'),
      keywords: ['home', 'início', 'principal']
    },
    {
      id: 'nav-dashboard',
      label: 'Ir para Dashboard',
      description: 'Abrir painel de controle',
      icon: '📊',
      category: 'Navegação',
      shortcut: 'Ctrl+D',
      action: () => this.navigateTo('/dashboard'),
      keywords: ['dashboard', 'painel', 'analytics']
    },
    {
      id: 'nav-settings',
      label: 'Abrir Configurações',
      description: 'Acessar preferências do sistema',
      icon: '⚙️',
      category: 'Navegação',
      shortcut: 'Ctrl+,',
      action: () => this.navigateTo('/settings'),
      keywords: ['settings', 'config', 'preferências']
    },
    {
      id: 'nav-profile',
      label: 'Ver Perfil',
      description: 'Acessar perfil do usuário',
      icon: '👤',
      category: 'Navegação',
      action: () => this.navigateTo('/profile'),
      keywords: ['profile', 'perfil', 'usuário']
    },

    // Ações
    {
      id: 'action-new-project',
      label: 'Novo Projeto',
      description: 'Criar um novo projeto',
      icon: '➕',
      category: 'Ações',
      shortcut: 'Ctrl+N',
      action: () => this.createNew('projeto'),
      keywords: ['new', 'novo', 'criar', 'projeto']
    },
    {
      id: 'action-new-task',
      label: 'Nova Tarefa',
      description: 'Adicionar tarefa ao backlog',
      icon: '✅',
      category: 'Ações',
      shortcut: 'Ctrl+T',
      action: () => this.createNew('tarefa'),
      keywords: ['task', 'tarefa', 'todo']
    },
    {
      id: 'action-search',
      label: 'Buscar em Tudo',
      description: 'Pesquisa global no sistema',
      icon: '🔍',
      category: 'Ações',
      shortcut: 'Ctrl+F',
      action: () => this.openSearch(),
      keywords: ['search', 'buscar', 'procurar', 'find']
    },
    {
      id: 'action-export',
      label: 'Exportar Dados',
      description: 'Exportar para CSV ou JSON',
      icon: '📤',
      category: 'Ações',
      action: () => this.exportData(),
      keywords: ['export', 'exportar', 'download']
    },

    // Edição
    {
      id: 'edit-undo',
      label: 'Desfazer',
      description: 'Desfazer última ação',
      icon: '↩️',
      category: 'Edição',
      shortcut: 'Ctrl+Z',
      action: () => this.undo(),
      keywords: ['undo', 'desfazer', 'voltar']
    },
    {
      id: 'edit-redo',
      label: 'Refazer',
      description: 'Refazer ação desfeita',
      icon: '↪️',
      category: 'Edição',
      shortcut: 'Ctrl+Shift+Z',
      action: () => this.redo(),
      keywords: ['redo', 'refazer']
    },
    {
      id: 'edit-copy',
      label: 'Copiar',
      description: 'Copiar seleção',
      icon: '📋',
      category: 'Edição',
      shortcut: 'Ctrl+C',
      action: () => this.copy(),
      keywords: ['copy', 'copiar']
    },

    // Visualização
    {
      id: 'view-dark-mode',
      label: 'Tema Escuro',
      description: 'Ativar modo escuro',
      icon: '🌙',
      category: 'Visualização',
      action: () => this.toggleTheme('dark'),
      keywords: ['dark', 'escuro', 'tema', 'theme']
    },
    {
      id: 'view-light-mode',
      label: 'Tema Claro',
      description: 'Ativar modo claro',
      icon: '☀️',
      category: 'Visualização',
      action: () => this.toggleTheme('light'),
      keywords: ['light', 'claro', 'tema', 'theme']
    },
    {
      id: 'view-fullscreen',
      label: 'Tela Cheia',
      description: 'Entrar em modo tela cheia',
      icon: '⛶',
      category: 'Visualização',
      shortcut: 'F11',
      action: () => this.toggleFullscreen(),
      keywords: ['fullscreen', 'tela cheia', 'maximizar']
    },

    // Ajuda
    {
      id: 'help-docs',
      label: 'Documentação',
      description: 'Abrir documentação oficial',
      icon: '📚',
      category: 'Ajuda',
      shortcut: 'F1',
      action: () => this.openDocs(),
      keywords: ['help', 'ajuda', 'docs', 'documentação']
    },
    {
      id: 'help-shortcuts',
      label: 'Atalhos de Teclado',
      description: 'Ver todos os atalhos',
      icon: '⌨️',
      category: 'Ajuda',
      action: () => this.showShortcuts(),
      keywords: ['shortcuts', 'atalhos', 'keyboard']
    },
    {
      id: 'help-about',
      label: 'Sobre',
      description: 'Informações da aplicação',
      icon: 'ℹ️',
      category: 'Ajuda',
      action: () => this.showAbout(),
      keywords: ['about', 'sobre', 'versão', 'info']
    }
  ];

  // Event handlers
  onCommandExecuted(command: CommandItem): void {
    console.log('Comando executado:', command);
  }

  onPaletteClosed(): void {
    console.log('Command Palette fechado');
  }

  openPalette(): void {
    this.commandPalette?.open();
  }

  // Action implementations
  private navigateTo(route: string): void {
    console.log('Navegando para:', route);
    alert(`Navegando para: ${route}`);
  }

  private createNew(type: string): void {
    console.log('Criando novo:', type);
    alert(`Criando novo ${type}`);
  }

  private openSearch(): void {
    console.log('Abrindo busca global');
    alert('Busca global aberta');
  }

  private exportData(): void {
    console.log('Exportando dados');
    alert('Dados exportados com sucesso!');
  }

  private undo(): void {
    console.log('Desfazendo última ação');
    alert('Última ação desfeita');
  }

  private redo(): void {
    console.log('Refazendo ação');
    alert('Ação refeita');
  }

  private copy(): void {
    console.log('Copiando seleção');
    alert('Seleção copiada');
  }

  private toggleTheme(theme: string): void {
    console.log('Alternando tema:', theme);
    alert(`Tema ${theme} ativado`);
  }

  private toggleFullscreen(): void {
    console.log('Alternando tela cheia');
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  private openDocs(): void {
    console.log('Abrindo documentação');
    window.open('https://github.com/muxima-ui/docs', '_blank');
  }

  private showShortcuts(): void {
    console.log('Mostrando atalhos');
    alert('Atalhos de teclado:\n\nCtrl+K - Command Palette\n↑↓ - Navegar\n↵ - Executar\nESC - Fechar');
  }

  private showAbout(): void {
    console.log('Mostrando sobre');
    alert('Muxima UI Design System\nVersão 1.0.0');
  }
}
