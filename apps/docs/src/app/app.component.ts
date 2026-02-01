import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { TimelineItem } from '@muxima-ui/timeline';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  progressValue = 45;
  toggleValue = false;

  timelineItems: TimelineItem[] = [
    {
      title: 'FundaÃ§Ã£o da Muxima',
      description: 'InÃ­cio da jornada de desenvolvimento de soluÃ§Ãµes inovadoras para Ãfrica',
      date: '2024',
      status: 'completed',
      icon: 'ðŸŽ¯'
    },
    {
      title: 'LanÃ§amento da Biblioteca de Componentes',
      description: 'Primeira versÃ£o pÃºblica dos componentes Muxima UI',
      date: '2025',
      status: 'current',
      icon: 'ðŸš€'
    },
    {
      title: 'ExpansÃ£o Continental',
      description: 'AdoÃ§Ã£o em toda Ãfrica e reconhecimento internacional',
      date: '2026',
      status: 'upcoming',
      icon: 'ðŸŒ'
    }
  ];

  form!: FormGroup;
  opcaoSelecionada: any;


 accordionTree = [
  {
    title: 'GestÃ£o de UsuÃ¡rios e AdministraÃ§Ã£o de PermissÃµes em Ambientes Corporativos',
    subtitle: 'Controle completo de acesso por nÃ­veis e funÃ§Ãµes organizacionais',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
    children: [
      {
        title: 'Perfis de Acesso e Gerenciamento de NÃ­veis HierÃ¡rquicos de PermissÃ£o',
      subtitle: 'Controle completo de acesso por nÃ­veis e funÃ§Ãµes organizacionais',
        
        children: [
          {
            title: 'Administrador com Acesso Total Ã s Funcionalidades do Sistema',
           subtitle: 'Controle completo de acesso por nÃ­veis e funÃ§Ãµes organizacionais',
           
            children: [{
            title: 'Administrador com Acesso Total Ã s Funcionalidades do Sistema',
          
           
            children: []
          },]
          },
          {
            title: 'UsuÃ¡rio PadrÃ£o com PermissÃµes Restritas para OperaÃ§Ãµes BÃ¡sicas',
           
           
            children: []
          }
        ]
      },
     
    ]
  },

];

  pagination = {
    currentPage: 0,
    itemsPerPage: 5,
    totalElements: 100,
  };

  // Altere o tipo do array toasts para garantir o tipo correto:
  toasts: Array<{ type: 'success' | 'info' | 'warning' | 'error' | 'danger' | 'default', title: string, message: string, position: string }> = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      selectedUsers: this.fb.array([]), 
      radioSelection: [], 
      opcao:[],
      gender: [''], // ou null
    });
  }

  get selectedUsers(): FormArray {
    return this.form.get('selectedUsers') as FormArray;
  }

  showToast(
  type: 'success' | 'info' | 'warning' | 'error' | 'danger' | 'default',
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right'
) {
  let toastData: any = {};
  switch (type) {
    case 'success':
      toastData = { type, title: 'Sucesso!', message: 'OperaÃ§Ã£o realizada com sucesso.', position };
      break;
    case 'info':
      toastData = { type, title: 'InformaÃ§Ã£o', message: 'Este Ã© um aviso informativo.', position };
      break;
    case 'warning':
      toastData = { type, title: 'AtenÃ§Ã£o', message: 'Verifique os dados informados.', position };
      break;
    case 'error':
      toastData = { type, title: 'Erro', message: 'Ocorreu um erro inesperado.', position };
      break;
    case 'danger':
      toastData = { type, title: 'Perigo', message: 'AÃ§Ã£o perigosa detectada.', position };
      break;
    default:
      toastData = { type: 'default', title: 'Toast', message: 'Mensagem padrÃ£o.', position };
  }
  this.toasts.push(toastData);
}

  removeToast(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  fetchUser(data: any) {
    console.log(data);
  }

  submitForm() {
    console.log(this.form.value.gender); // Logs the selected gender
  }

  get toastsTopRight() {
    return this.toasts.filter(t => t.position === 'top-right');
  }
  get toastsTopLeft() {
    return this.toasts.filter(t => t.position === 'top-left');
  }
  get toastsBottomRight() {
    return this.toasts.filter(t => t.position === 'bottom-right');
  }
  get toastsBottomLeft() {
    return this.toasts.filter(t => t.position === 'bottom-left');
  }
}

