import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleToggleComponent } from './toggle-toggle.component';

describe('ToggleToggleComponent', () => {
  let component: ToggleToggleComponent;
  let fixture: ComponentFixture<ToggleToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
