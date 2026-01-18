import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableColumn, TablePagination, PaginationEvent, SortEvent } from '../../../../../../libs/table/src';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  date: string;
}

@Component({
  selector: 'muxima-table-doc',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './table-doc.component.html',
  styleUrls: ['./table-doc.component.scss']
})
export class TableDocComponent {
  // Basic Table
  basicColumns: TableColumn[] = [
    { key: 'id', label: 'ID', width: '80px' },
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'E-mail' },
    { key: 'role', label: 'Cargo' }
  ];

  basicData: User[] = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', role: 'Desenvolvedor', status: 'Ativo', date: '2024-01-15' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', role: 'Designer', status: 'Ativo', date: '2024-02-20' },
    { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', role: 'Gerente', status: 'Inativo', date: '2024-03-10' },
    { id: 4, name: 'Ana Oliveira', email: 'ana@email.com', role: 'Analista', status: 'Ativo', date: '2024-04-05' }
  ];

  // Sortable Table
  sortableColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px' },
    { key: 'name', label: 'Nome', sortable: true },
    { key: 'email', label: 'E-mail', sortable: true },
    { key: 'role', label: 'Cargo', sortable: true },
    { key: 'status', label: 'Status', sortable: false }
  ];

  // Full Featured Table
  fullColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px', align: 'center' },
    { key: 'name', label: 'Nome', sortable: true },
    { key: 'email', label: 'E-mail', sortable: true },
    { key: 'role', label: 'Cargo', sortable: true, align: 'center' },
    { key: 'status', label: 'Status', sortable: true, align: 'center' },
    { key: 'date', label: 'Data Cadastro', sortable: true, align: 'right' }
  ];

  fullData: User[] = [
    { id: 1, name: 'João Silva', email: 'joao.silva@empresa.com', role: 'Desenvolvedor Frontend', status: 'Ativo', date: '15/01/2024' },
    { id: 2, name: 'Maria Santos', email: 'maria.santos@empresa.com', role: 'UX/UI Designer', status: 'Ativo', date: '20/02/2024' },
    { id: 3, name: 'Pedro Costa', email: 'pedro.costa@empresa.com', role: 'Gerente de Projetos', status: 'Inativo', date: '10/03/2024' },
    { id: 4, name: 'Ana Oliveira', email: 'ana.oliveira@empresa.com', role: 'Analista de Dados', status: 'Ativo', date: '05/04/2024' },
    { id: 5, name: 'Carlos Ferreira', email: 'carlos.ferreira@empresa.com', role: 'Desenvolvedor Backend', status: 'Ativo', date: '12/05/2024' },
    { id: 6, name: 'Juliana Alves', email: 'juliana.alves@empresa.com', role: 'Product Owner', status: 'Ativo', date: '18/06/2024' },
    { id: 7, name: 'Ricardo Mendes', email: 'ricardo.mendes@empresa.com', role: 'DevOps Engineer', status: 'Ativo', date: '25/07/2024' },
    { id: 8, name: 'Fernanda Lima', email: 'fernanda.lima@empresa.com', role: 'QA Tester', status: 'Inativo', date: '30/08/2024' },
    { id: 9, name: 'Bruno Cardoso', email: 'bruno.cardoso@empresa.com', role: 'Scrum Master', status: 'Ativo', date: '15/09/2024' },
    { id: 10, name: 'Patrícia Rocha', email: 'patricia.rocha@empresa.com', role: 'Business Analyst', status: 'Ativo', date: '22/10/2024' },
    { id: 11, name: 'Lucas Martins', email: 'lucas.martins@empresa.com', role: 'Tech Lead', status: 'Ativo', date: '05/11/2024' },
    { id: 12, name: 'Camila Souza', email: 'camila.souza@empresa.com', role: 'Marketing Manager', status: 'Ativo', date: '10/12/2024' }
  ];

  fullPagination: TablePagination = {
    currentPage: 0,
    totalElements: 12,
    itemsPerPage: 5
  };

  // Glass Pagination
  glassPagination: TablePagination = {
    currentPage: 0,
    totalElements: 50,
    itemsPerPage: 5
  };

  // Loading State
  loadingData: User[] = [];
  isLoading = true;

  // Variant Tables
  stripedData: User[] = this.basicData;
  hoverableData: User[] = this.basicData;
  borderedData: User[] = this.basicData;
  compactData: User[] = this.basicData;

  // Example 1: Products Table
  productsColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '60px', align: 'center' },
    { key: 'name', label: 'Produto', sortable: true },
    { key: 'category', label: 'Categoria', sortable: true },
    { key: 'price', label: 'Preço', sortable: true, align: 'right' },
    { key: 'stock', label: 'Estoque', sortable: true, align: 'center' }
  ];

  productsData = [
    { id: 1, name: 'Notebook Dell XPS 13', category: 'Eletrônicos', price: 'R$ 8.999,00', stock: 15 },
    { id: 2, name: 'Mouse Logitech MX Master', category: 'Periféricos', price: 'R$ 499,00', stock: 42 },
    { id: 3, name: 'Teclado Mecânico RGB', category: 'Periféricos', price: 'R$ 699,00', stock: 28 },
    { id: 4, name: 'Monitor LG UltraWide 34"', category: 'Monitores', price: 'R$ 3.299,00', stock: 8 },
    { id: 5, name: 'Webcam Logitech C920', category: 'Periféricos', price: 'R$ 599,00', stock: 35 }
  ];

  // Example 2: Transactions Table
  transactionsColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px' },
    { key: 'date', label: 'Data', sortable: true },
    { key: 'description', label: 'Descrição', sortable: true },
    { key: 'amount', label: 'Valor', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true, align: 'center' }
  ];

  transactionsData = [
    { id: 'TXN-001', date: '13/01/2026', description: 'Venda de Produto #1234', amount: '+ R$ 2.500,00', status: 'Concluído' },
    { id: 'TXN-002', date: '13/01/2026', description: 'Reembolso Cliente', amount: '- R$ 150,00', status: 'Processando' },
    { id: 'TXN-003', date: '12/01/2026', description: 'Assinatura Premium', amount: '+ R$ 99,00', status: 'Concluído' },
    { id: 'TXN-004', date: '12/01/2026', description: 'Taxa de Serviço', amount: '- R$ 25,00', status: 'Concluído' },
    { id: 'TXN-005', date: '11/01/2026', description: 'Venda de Produto #5678', amount: '+ R$ 1.899,00', status: 'Concluído' }
  ];

  // Example 3: Tasks Table
  tasksColumns: TableColumn[] = [
    { key: 'id', label: '#', sortable: true, width: '60px', align: 'center' },
    { key: 'title', label: 'Tarefa', sortable: true },
    { key: 'assignee', label: 'Responsável', sortable: true },
    { key: 'priority', label: 'Prioridade', sortable: true, align: 'center' },
    { key: 'dueDate', label: 'Prazo', sortable: true, align: 'center' }
  ];

  tasksData = [
    { id: 1, title: 'Implementar autenticação OAuth', assignee: 'João Silva', priority: 'Alta', dueDate: '15/01/2026' },
    { id: 2, title: 'Corrigir bug no checkout', assignee: 'Maria Santos', priority: 'Crítica', dueDate: '14/01/2026' },
    { id: 3, title: 'Atualizar documentação API', assignee: 'Pedro Costa', priority: 'Média', dueDate: '20/01/2026' },
    { id: 4, title: 'Design novo dashboard', assignee: 'Ana Oliveira', priority: 'Baixa', dueDate: '25/01/2026' },
    { id: 5, title: 'Code review PR #234', assignee: 'Carlos Ferreira', priority: 'Média', dueDate: '16/01/2026' }
  ];

  // Example 4: Sales Table
  salesColumns: TableColumn[] = [
    { key: 'month', label: 'Mês', sortable: true },
    { key: 'revenue', label: 'Receita', sortable: true, align: 'right' },
    { key: 'orders', label: 'Pedidos', sortable: true, align: 'center' },
    { key: 'avgTicket', label: 'Ticket Médio', sortable: true, align: 'right' },
    { key: 'growth', label: 'Crescimento', sortable: true, align: 'center' }
  ];

  salesData = [
    { month: 'Janeiro 2026', revenue: 'R$ 125.430,00', orders: 342, avgTicket: 'R$ 366,81', growth: '+12.5%' },
    { month: 'Dezembro 2025', revenue: 'R$ 111.500,00', orders: 298, avgTicket: 'R$ 374,16', growth: '+8.3%' },
    { month: 'Novembro 2025', revenue: 'R$ 102.980,00', orders: 276, avgTicket: 'R$ 373,12', growth: '+15.7%' },
    { month: 'Outubro 2025', revenue: 'R$ 89.020,00', orders: 245, avgTicket: 'R$ 363,35', growth: '+5.2%' }
  ];

  // Example 5: Invoices Table
  invoicesColumns: TableColumn[] = [
    { key: 'invoice', label: 'Nº Fatura', sortable: true, width: '120px' },
    { key: 'client', label: 'Cliente', sortable: true },
    { key: 'issueDate', label: 'Emissão', sortable: true, align: 'center' },
    { key: 'dueDate', label: 'Vencimento', sortable: true, align: 'center' },
    { key: 'amount', label: 'Valor', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true, align: 'center' }
  ];

  invoicesData = [
    { invoice: 'INV-2026-001', client: 'Empresa Alpha Ltda', issueDate: '01/01/2026', dueDate: '31/01/2026', amount: 'R$ 15.000,00', status: 'Pendente' },
    { invoice: 'INV-2025-152', client: 'Beta Solutions SA', issueDate: '15/12/2025', dueDate: '15/01/2026', amount: 'R$ 8.500,00', status: 'Pago' },
    { invoice: 'INV-2025-151', client: 'Gamma Tech Corp', issueDate: '10/12/2025', dueDate: '10/01/2026', amount: 'R$ 22.300,00', status: 'Pago' },
    { invoice: 'INV-2025-150', client: 'Delta Industries', issueDate: '05/12/2025', dueDate: '05/01/2026', amount: 'R$ 12.750,00', status: 'Atrasado' }
  ];

  // Example 6: Courses Table
  coursesColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '60px', align: 'center' },
    { key: 'name', label: 'Curso', sortable: true },
    { key: 'instructor', label: 'Instrutor', sortable: true },
    { key: 'students', label: 'Alunos', sortable: true, align: 'center' },
    { key: 'rating', label: 'Avaliação', sortable: true, align: 'center' },
    { key: 'duration', label: 'Duração', sortable: true, align: 'center' }
  ];

  coursesData = [
    { id: 1, name: 'Angular Avançado', instructor: 'João Silva', students: 1234, rating: '⭐ 4.8', duration: '40h' },
    { id: 2, name: 'TypeScript do Zero', instructor: 'Maria Santos', students: 2156, rating: '⭐ 4.9', duration: '25h' },
    { id: 3, name: 'RxJS na Prática', instructor: 'Pedro Costa', students: 892, rating: '⭐ 4.7', duration: '30h' },
    { id: 4, name: 'NgRx State Management', instructor: 'Ana Oliveira', students: 645, rating: '⭐ 4.6', duration: '35h' }
  ];

  // Example 7: Events Table
  eventsColumns: TableColumn[] = [
    { key: 'id', label: '#', sortable: true, width: '60px', align: 'center' },
    { key: 'title', label: 'Evento', sortable: true },
    { key: 'date', label: 'Data', sortable: true, align: 'center' },
    { key: 'location', label: 'Local', sortable: true },
    { key: 'attendees', label: 'Participantes', sortable: true, align: 'center' },
    { key: 'type', label: 'Tipo', sortable: true, align: 'center' }
  ];

  eventsData = [
    { id: 1, title: 'Angular Conference 2026', date: '15/03/2026', location: 'São Paulo - SP', attendees: 500, type: 'Presencial' },
    { id: 2, title: 'Webinar: RxJS Patterns', date: '20/01/2026', location: 'Online', attendees: 1200, type: 'Online' },
    { id: 3, title: 'Workshop NgRx', date: '10/02/2026', location: 'Rio de Janeiro - RJ', attendees: 80, type: 'Presencial' },
    { id: 4, title: 'Meetup Angular Brasil', date: '25/01/2026', location: 'Belo Horizonte - MG', attendees: 150, type: 'Híbrido' }
  ];

  ngOnInit() {
    // Simulate loading
    setTimeout(() => {
      this.loadingData = [...this.basicData];
      this.isLoading = false;
    }, 2000);
  }

  onPageChange(event: PaginationEvent) {
    console.log('Page changed:', event);
    this.fullPagination.currentPage = event.page;
    this.fullPagination.itemsPerPage = event.size;
  }

  onSortChange(event: SortEvent) {
    console.log('Sort changed:', event);
    // Implement sorting logic here
  }

  onSort(event: SortEvent) {
    console.log('Sort event:', event);
  }

  copyCode(code: string) {
    navigator.clipboard.writeText(code);
  }

  get importCode(): string {
    return `import { TableComponent, TableColumn, TablePagination } from '@muxima-ui/table';

// No seu componente
export class MyComponent {
  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Nome', sortable: true },
    { key: 'email', label: 'E-mail' }
  ];
  
  data: any[] = [
    { id: 1, name: 'João', email: 'joao@email.com' },
    { id: 2, name: 'Maria', email: 'maria@email.com' }
  ];
  
  pagination: TablePagination = {
    currentPage: 0,
    totalElements: 50,
    itemsPerPage: 10
  };
}`;
  }

  get basicCode(): string {
    return `<muxima-table
  [columns]="columns"
  [data]="data"
  [showPagination]="false"
></muxima-table>`;
  }

  get sortableCode(): string {
    return `<muxima-table
  [columns]="sortableColumns"
  [data]="data"
  [showPagination]="false"
  (sortChange)="onSortChange($event)"
></muxima-table>

// Colunas com sortable: true
columns: TableColumn[] = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Nome', sortable: true },
  { key: 'email', label: 'E-mail', sortable: true }
];`;
  }

  get paginationCode(): string {
    return `<muxima-table
  [columns]="columns"
  [data]="data"
  [pagination]="pagination"
  [showPagination]="true"
  [pageSizeOptions]="[5, 10, 25, 50]"
  (pageChange)="onPageChange($event)"
></muxima-table>

// Configuração de paginação
pagination: TablePagination = {
  currentPage: 0,
  totalElements: 100,
  itemsPerPage: 10
};

onPageChange(event: PaginationEvent) {
  console.log('Page:', event.page, 'Size:', event.size);
}`;
  }

  get variantsCode(): string {
    return `<!-- Striped (Zebrada) -->
<muxima-table
  [striped]="true"
  [columns]="columns"
  [data]="data"
></muxima-table>

<!-- Hoverable -->
<muxima-table
  [hoverable]="true"
  [columns]="columns"
  [data]="data"
></muxima-table>

<!-- Bordered -->
<muxima-table
  [bordered]="true"
  [columns]="columns"
  [data]="data"
></muxima-table>

<!-- Compact -->
<muxima-table
  [compact]="true"
  [columns]="columns"
  [data]="data"
></muxima-table>`;
  }

  get loadingCode(): string {
    return `<muxima-table
  [loading]="isLoading"
  [columns]="columns"
  [data]="data"
></muxima-table>`;
  }

  get glassCode(): string {
    return `<muxima-table
  variant="glass"
  [columns]="columns"
  [data]="data"
  [pagination]="pagination"
  (sortChange)="onSort($event)"
  (pageChange)="onPageChange($event)"
></muxima-table>`;
  }
}
