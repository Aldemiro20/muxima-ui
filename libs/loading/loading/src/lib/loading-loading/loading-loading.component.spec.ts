import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingLoadingComponent } from './loading-loading.component';

describe('LoadingLoadingComponent', () => {
  let component: LoadingLoadingComponent;
  let fixture: ComponentFixture<LoadingLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingLoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
