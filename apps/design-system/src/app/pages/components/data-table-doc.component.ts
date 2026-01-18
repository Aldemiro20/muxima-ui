import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent, TableColumn, TableConfig } from '@muxima-ui/data-table';

@Component({
  selector: 'muxima-data-table-doc',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './data-table-doc.component.html',
  styleUrls: ['./data-table-doc.component.scss']
})
export class DataTableDocComponent {
  codeExample1 = `columns: TableColumn[] = [
  { field: 'id', header: 'ID', sortable: true },
  { field: 'name', header: 'Name', sortable: true, filterable: true },
  { field: 'email', header: 'Email', filterable: true },
  { field: 'role', header: 'Role', sortable: true }
];

<muxima-data-table
  [columns]="columns"
  [data]="data">
</muxima-data-table>`;

  codeExample2 = `config: TableConfig = {
  pageable: true,
  pageSize: 10,
  pageSizeOptions: [5, 10, 20, 50],
  sortable: true,
  filterable: true,
  selectable: true,
  multiSelect: true,
  resizable: true,
  exportable: true
};`;

  // Basic example
  basicColumns: TableColumn[] = [
    { field: 'id', header: 'ID', width: '80px', sortable: true },
    { field: 'name', header: 'Name', sortable: true, filterable: true },
    { field: 'email', header: 'Email', filterable: true },
    { field: 'role', header: 'Role', sortable: true }
  ];

  basicData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'User' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin' }
  ];

  // Advanced example with more data
  advancedColumns: TableColumn[] = [
    { field: 'id', header: 'ID', width: '80px', sortable: true },
    { field: 'name', header: 'Name', sortable: true, filterable: true },
    { field: 'email', header: 'Email', filterable: true },
    { field: 'department', header: 'Department', sortable: true, filterable: true },
    { field: 'salary', header: 'Salary', type: 'number', align: 'right', sortable: true },
    { field: 'status', header: 'Status', sortable: true }
  ];

  advancedData = this.generateAdvancedData();

  advancedConfig: TableConfig = {
    pageable: true,
    pageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
    sortable: true,
    filterable: true,
    selectable: true,
    multiSelect: true,
    resizable: true,
    exportable: true
  };

  // With selection
  selectedRows: any[] = [];

  // Compact table
  compactColumns: TableColumn[] = [
    { field: 'id', header: '#', width: '60px', sortable: true },
    { field: 'name', header: 'Product', sortable: true, filterable: true },
    { field: 'category', header: 'Category', sortable: true },
    { field: 'price', header: 'Price', type: 'number', align: 'right', sortable: true },
    { field: 'stock', header: 'Stock', type: 'number', align: 'center', sortable: true }
  ];

  compactData = [
    { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 45 },
    { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 29.99, stock: 150 },
    { id: 3, name: 'USB-C Cable', category: 'Accessories', price: 12.99, stock: 300 },
    { id: 4, name: 'Monitor 27"', category: 'Electronics', price: 399.99, stock: 28 },
    { id: 5, name: 'Keyboard RGB', category: 'Accessories', price: 89.99, stock: 67 }
  ];

  compactConfig: TableConfig = {
    pageable: false,
    sortable: true,
    filterable: true,
    selectable: false,
    exportable: false
  };

  // Server-side table (simulated)
  serverColumns: TableColumn[] = [
    { field: 'id', header: 'Order ID', width: '100px', sortable: true },
    { field: 'customer', header: 'Customer', sortable: true, filterable: true },
    { field: 'product', header: 'Product', filterable: true },
    { field: 'amount', header: 'Amount', type: 'number', align: 'right', sortable: true },
    { field: 'status', header: 'Status', sortable: true },
    { field: 'date', header: 'Date', sortable: true }
  ];

  serverData: any[] = [];
  serverLoading = false;
  serverTotalRecords = 0;
  currentServerPage = 1;

  serverConfig: TableConfig = {
    pageable: true,
    pageSize: 10,
    sortable: true,
    filterable: true,
    selectable: false,
    exportable: true
  };

  constructor() {
    this.loadServerData();
  }

  generateAdvancedData() {
    const names = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams', 'Charlie Brown', 'David Lee', 'Emma Davis', 'Frank Miller', 'Grace Wilson', 'Henry Taylor'];
    const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance'];
    const statuses = ['Active', 'Inactive', 'On Leave'];
    
    return Array.from({ length: 45 }, (_, i) => ({
      id: i + 1,
      name: names[i % names.length] + ' ' + (Math.floor(i / names.length) + 1),
      email: `user${i + 1}@example.com`,
      department: departments[i % departments.length],
      salary: Math.floor(Math.random() * 100000) + 50000,
      status: statuses[i % statuses.length]
    }));
  }

  onSort(event: any) {
    console.log('Sort event:', event);
  }

  onFilter(event: any) {
    console.log('Filter event:', event);
  }

  onRowSelect(row: any) {
    console.log('Row selected:', row);
  }

  onSelectionChange(rows: any[]) {
    this.selectedRows = rows;
    console.log('Selection changed:', rows);
  }

  onPageChange(event: any) {
    console.log('Page changed:', event);
  }

  onExport(data: any) {
    console.log('Exporting data:', data);
  }

  loadServerData() {
    this.serverLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
      const customers = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams', 'Charlie Brown'];
      const products = ['Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Headset', 'Webcam', 'Speaker'];
      
      this.serverData = Array.from({ length: 25 }, (_, i) => ({
        id: `ORD-${1000 + i}`,
        customer: customers[i % customers.length],
        product: products[i % products.length],
        amount: Math.floor(Math.random() * 1000) + 50,
        status: statuses[i % statuses.length],
        date: new Date(2024, 0, 1 + i).toLocaleDateString()
      }));
      
      this.serverTotalRecords = 25;
      this.serverLoading = false;
    }, 1000);
  }

  onServerPageChange(event: any) {
    this.currentServerPage = event.page;
    this.loadServerData();
  }
}
