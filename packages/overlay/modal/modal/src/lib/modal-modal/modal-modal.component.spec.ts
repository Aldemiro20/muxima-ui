import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModalComponent } from './modal-modal.component';

describe('ModalModalComponent', () => {
  let component: ModalModalComponent;
  let fixture: ComponentFixture<ModalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
