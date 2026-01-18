import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle collapse state', () => {
    expect(component.collapsed).toBe(false);
    component.toggleCollapse();
    expect(component.collapsed).toBe(true);
  });

  it('should toggle expand state for items', () => {
    const item = { label: 'Test', children: [{ label: 'Child' }] };
    expect(component.isExpanded(item)).toBe(false);
    component.toggleExpand(item);
    expect(component.isExpanded(item)).toBe(true);
  });
});
