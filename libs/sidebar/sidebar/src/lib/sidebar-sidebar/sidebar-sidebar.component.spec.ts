import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarSidebarComponent } from './sidebar-sidebar.component';

describe('SidebarSidebarComponent', () => {
  let component: SidebarSidebarComponent;
  let fixture: ComponentFixture<SidebarSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
