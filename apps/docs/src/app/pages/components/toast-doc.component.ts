import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '@muxima-ui/toast';

interface ToastDemo {
  type: 'success' | 'info' | 'warning' | 'error' | 'default';
  variant: 'filled' | 'outlined' | 'soft';
  title: string;
  message: string;
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
}

@Component({
  selector: 'app-toast-doc',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  templateUrl: './toast-doc.component.html',
  styleUrls: ['./toast-doc.component.scss']
})
export class ToastDocComponent {
  copiedStates: { [key: string]: boolean } = {};
  importCode = `import { ToastComponent } from '@muxima-ui/toast';`;
  
  toasts: ToastDemo[] = [];

  showToast(config: Partial<ToastDemo>) {
    const toast: ToastDemo = {
      type: config.type || 'default',
      variant: config.variant || 'filled',
      title: config.title || '',
      message: config.message || '',
      position: config.position
    };
    this.toasts.push(toast);
  }

  removeToast(index: number) {
    this.toasts.splice(index, 1);
  }

  // Métodos de demonstração
  showSuccessToast() {
    this.showToast({
      type: 'success',
      variant: 'filled',
      title: 'Sucesso!',
      message: 'Sua operação foi concluída com sucesso.'
    });
  }

  showErrorToast() {
    this.showToast({
      type: 'error',
      variant: 'filled',
      title: 'Erro!',
      message: 'Algo deu errado. Por favor, tente novamente.'
    });
  }

  showWarningToast() {
    this.showToast({
      type: 'warning',
      variant: 'filled',
      title: 'Atenção!',
      message: 'Esta ação pode ter consequências inesperadas.'
    });
  }

  showInfoToast() {
    this.showToast({
      type: 'info',
      variant: 'filled',
      title: 'Informação',
      message: 'Há uma atualização disponível para o sistema.'
    });
  }

  // Métodos para variante Filled
  showFilledSuccess() {
    this.showToast({ type: 'success', variant: 'filled', title: 'Sucesso!', message: 'Operação concluída com sucesso.' });
  }

  showFilledError() {
    this.showToast({ type: 'error', variant: 'filled', title: 'Erro!', message: 'Não foi possível completar a operação.' });
  }

  showFilledWarning() {
    this.showToast({ type: 'warning', variant: 'filled', title: 'Atenção!', message: 'Verifique os dados antes de prosseguir.' });
  }

  showFilledInfo() {
    this.showToast({ type: 'info', variant: 'filled', title: 'Informação', message: 'Nova versão disponível para download.' });
  }

  showFilledDefault() {
    this.showToast({ type: 'default', variant: 'filled', title: 'Notificação', message: 'Você tem novas mensagens.' });
  }

  // Métodos para variante Outlined
  showOutlinedSuccess() {
    this.showToast({ type: 'success', variant: 'outlined', title: 'Sucesso!', message: 'Dados salvos com êxito.' });
  }

  showOutlinedError() {
    this.showToast({ type: 'error', variant: 'outlined', title: 'Erro!', message: 'Erro ao processar a requisição.' });
  }

  showOutlinedWarning() {
    this.showToast({ type: 'warning', variant: 'outlined', title: 'Aviso!', message: 'Esta ação não pode ser desfeita.' });
  }

  showOutlinedInfo() {
    this.showToast({ type: 'info', variant: 'outlined', title: 'Dica', message: 'Use atalhos de teclado para agilizar.' });
  }

  showOutlinedDefault() {
    this.showToast({ type: 'default', variant: 'outlined', title: 'Lembrete', message: 'Reunião em 15 minutos.' });
  }

  // Métodos para variante Soft
  showSoftSuccess() {
    this.showToast({ type: 'success', variant: 'soft', title: 'Concluído!', message: 'Upload realizado com sucesso.' });
  }

  showSoftError() {
    this.showToast({ type: 'error', variant: 'soft', title: 'Falha!', message: 'Conexão perdida. Reconectando...' });
  }

  showSoftWarning() {
    this.showToast({ type: 'warning', variant: 'soft', title: 'Cuidado!', message: 'Espaço em disco baixo.' });
  }

  showSoftInfo() {
    this.showToast({ type: 'info', variant: 'soft', title: 'Novidade', message: 'Novo recurso adicionado ao sistema.' });
  }

  showSoftDefault() {
    this.showToast({ type: 'default', variant: 'soft', title: 'Atualização', message: 'Sistema atualizado para v2.0.' });
  }

  // Métodos para recursos avançados
  showQuickToast() {
    this.showToast({ type: 'info', variant: 'filled', title: 'Toast Rápido', message: 'Desaparece em 2 segundos.' });
  }

  showPauseToast() {
    this.showToast({ type: 'success', variant: 'filled', title: 'Passe o Mouse', message: 'O timer pausará quando você passar o mouse.' });
  }

  showProgressToast() {
    this.showToast({ type: 'warning', variant: 'soft', title: 'Com Progresso', message: 'Observe a barra de progresso na parte inferior.' });
  }

  showActionToast() {
    this.showToast({ type: 'default', variant: 'outlined', title: 'Nova Mensagem', message: 'Você recebeu uma nova mensagem de João.' });
  }

  showTimestampToast() {
    this.showToast({ type: 'info', variant: 'filled', title: 'Com Timestamp', message: 'Veja o horário de exibição abaixo.' });
  }

  showCustomIconToast() {
    this.showToast({ type: 'success', variant: 'soft', title: 'Ícone Custom', message: 'Use ícones personalizados conforme necessário!' });
  }

  // Métodos para posições
  showTopLeft() {
    this.showToast({ type: 'info', variant: 'filled', title: 'Top Left', message: 'Toast no canto superior esquerdo.', position: 'top-left' });
  }

  showTopCenter() {
    this.showToast({ type: 'info', variant: 'filled', title: 'Top Center', message: 'Toast no topo centralizado.', position: 'top-center' });
  }

  showTopRight() {
    this.showToast({ type: 'info', variant: 'filled', title: 'Top Right', message: 'Toast no canto superior direito.', position: 'top-right' });
  }

  showBottomLeft() {
    this.showToast({ type: 'success', variant: 'soft', title: 'Bottom Left', message: 'Toast no canto inferior esquerdo.', position: 'bottom-left' });
  }

  showBottomCenter() {
    this.showToast({ type: 'success', variant: 'soft', title: 'Bottom Center', message: 'Toast no rodapé centralizado.', position: 'bottom-center' });
  }

  showBottomRight() {
    this.showToast({ type: 'success', variant: 'soft', title: 'Bottom Right', message: 'Toast no canto inferior direito.', position: 'bottom-right' });
  }

  copyCode(code: string) {
    navigator.clipboard.writeText(code);
    this.copiedStates[code] = true;
    setTimeout(() => {
      this.copiedStates[code] = false;
    }, 2000);
  }

  getCodeExample(type: string): string {
    const examples: { [key: string]: string } = {
      basic: `<muxima-toast
  type="success"
  title="Sucesso!"
  message="Operação concluída."
  (closed)="onToastClosed()">
</muxima-toast>`,
      
      variants: `<!-- Filled -->
<muxima-toast variant="filled" type="success"></muxima-toast>

<!-- Outlined -->
<muxima-toast variant="outlined" type="info"></muxima-toast>

<!-- Soft -->
<muxima-toast variant="soft" type="warning"></muxima-toast>`
    };
    return examples[type] || '';
  }
}
