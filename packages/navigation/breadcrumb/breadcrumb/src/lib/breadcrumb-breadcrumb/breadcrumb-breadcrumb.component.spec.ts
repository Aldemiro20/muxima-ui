import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbBreadcrumbComponent } from './breadcrumb-breadcrumb.component';

describe('BreadcrumbBreadcrumbComponent', () => {
  let component: BreadcrumbBreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbBreadcrumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
