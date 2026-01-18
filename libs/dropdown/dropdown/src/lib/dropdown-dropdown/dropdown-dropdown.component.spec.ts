import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownDropdownComponent } from './dropdown-dropdown.component';

describe('DropdownDropdownComponent', () => {
  let component: DropdownDropdownComponent;
  let fixture: ComponentFixture<DropdownDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
