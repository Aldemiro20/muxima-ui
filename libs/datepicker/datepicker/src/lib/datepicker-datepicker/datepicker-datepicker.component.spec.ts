import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatepickerDatepickerComponent } from './datepicker-datepicker.component';

describe('DatepickerDatepickerComponent', () => {
  let component: DatepickerDatepickerComponent;
  let fixture: ComponentFixture<DatepickerDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerDatepickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatepickerDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
