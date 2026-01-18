import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { TimelineItem } from '@muxima/timeline';

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
      title: 'Fundação da Muxima',
      description: 'Início da jornada de desenvolvimento de soluções inovadoras para África',
      date: '2024',
      status: 'completed',
      icon: '🎯'
    },
    {
      title: 'Lançamento da Biblioteca de Componentes',
      description: 'Primeira versão pública dos componentes Muxima UI',
      date: '2025',
      status: 'current',
      icon: '🚀'
    },
    {
      title: 'Expansão Continental',
      description: 'Adoção em toda África e reconhecimento internacional',
      date: '2026',
      status: 'upcoming',
      icon: '🌍'
    }
  ];

  form!: FormGroup;
  opcaoSelecionada: any;


 accordionTree = [
  {
    title: 'Gestão de Usuários e Administração de Permissões em Ambientes Corporativos',
    subtitle: 'Controle completo de acesso por níveis e funções organizacionais',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
    children: [
      {
        title: 'Perfis de Acesso e Gerenciamento de Níveis Hierárquicos de Permissão',
      subtitle: 'Controle completo de acesso por níveis e funções organizacionais',
        
        children: [
          {
            title: 'Administrador com Acesso Total às Funcionalidades do Sistema',
           subtitle: 'Controle completo de acesso por níveis e funções organizacionais',
           
            children: [{
            title: 'Administrador com Acesso Total às Funcionalidades do Sistema',
          
           
            children: []
          },]
          },
          {
            title: 'Usuário Padrão com Permissões Restritas para Operações Básicas',
           
           
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
      toastData = { type, title: 'Sucesso!', message: 'Operação realizada com sucesso.', position };
      break;
    case 'info':
      toastData = { type, title: 'Informação', message: 'Este é um aviso informativo.', position };
      break;
    case 'warning':
      toastData = { type, title: 'Atenção', message: 'Verifique os dados informados.', position };
      break;
    case 'error':
      toastData = { type, title: 'Erro', message: 'Ocorreu um erro inesperado.', position };
      break;
    case 'danger':
      toastData = { type, title: 'Perigo', message: 'Ação perigosa detectada.', position };
      break;
    default:
      toastData = { type: 'default', title: 'Toast', message: 'Mensagem padrão.', position };
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
