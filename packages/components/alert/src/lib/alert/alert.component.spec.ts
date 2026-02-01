import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuximaAlertComponent } from './alert.component';

describe('MuximaAlertComponent', () => {
  let component: MuximaAlertComponent;
  let fixture: ComponentFixture<MuximaAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuximaAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuximaAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
