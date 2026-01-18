import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent, TableColumn } from './data-table.component';
import { FormsModule } from '@angular/forms';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  const mockColumns: TableColumn[] = [
    { field: 'id', header: 'ID', sortable: true },
    { field: 'name', header: 'Name', sortable: true, filterable: true },
    { field: 'age', header: 'Age', type: 'number' }
  ];

  const mockData = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 35 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    component.columns = mockColumns;
    component.data = mockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default page size', () => {
    component.ngOnInit();
    expect(component.pageSize).toBe(10);
  });

  it('should process data on init', () => {
    component.ngOnInit();
    expect(component.processedData.length).toBeGreaterThan(0);
  });

  it('should sort data ascending', () => {
    const column = mockColumns[0];
    component.onSort(column);
    expect(component.sortField).toBe('id');
    expect(component.sortOrder).toBe('asc');
  });

  it('should sort data descending on second click', () => {
    const column = mockColumns[0];
    component.onSort(column);
    component.onSort(column);
    expect(component.sortOrder).toBe('desc');
  });

  it('should filter data', () => {
    const column = mockColumns[1];
    const event = { target: { value: 'John' } } as any;
    component.onFilter(column, event);
    expect(component.filters.has('name')).toBeTruthy();
  });

  it('should select row', () => {
    spyOn(component.rowSelect, 'emit');
    const row = mockData[0];
    component.toggleRowSelection(row);
    expect(component.selectedRows.includes(row)).toBeTruthy();
    expect(component.rowSelect.emit).toHaveBeenCalledWith(row);
  });

  it('should calculate total pages', () => {
    component.totalRecords = 25;
    component.pageSize = 10;
    expect(component.totalPages).toBe(3);
  });

  it('should change page', () => {
    spyOn(component.pageChange, 'emit');
    component.onPageChange(2);
    expect(component.currentPage).toBe(2);
    expect(component.pageChange.emit).toHaveBeenCalled();
  });

  it('should get field value from nested object', () => {
    const obj = { user: { name: 'John' } };
    const value = component.getFieldValue(obj, 'user.name');
    expect(value).toBe('John');
  });

  it('should check if all rows are selected', () => {
    component.selectedRows = [...mockData];
    component.processedData = mockData;
    expect(component.allSelected).toBeTruthy();
  });
});
