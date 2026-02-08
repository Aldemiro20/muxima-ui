import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilitySettingsItemSettingsItemComponent } from './utility-settings-item-settings-item.component';

describe('UtilitySettingsItemSettingsItemComponent', () => {
  let component: UtilitySettingsItemSettingsItemComponent;
  let fixture: ComponentFixture<UtilitySettingsItemSettingsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilitySettingsItemSettingsItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UtilitySettingsItemSettingsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
