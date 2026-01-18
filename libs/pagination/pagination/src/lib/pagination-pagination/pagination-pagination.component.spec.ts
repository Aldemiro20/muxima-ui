import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationPaginationComponent } from './pagination-pagination.component';

describe('PaginationPaginationComponent', () => {
  let component: PaginationPaginationComponent;
  let fixture: ComponentFixture<PaginationPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
