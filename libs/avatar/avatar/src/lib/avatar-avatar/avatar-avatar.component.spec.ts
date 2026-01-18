import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarAvatarComponent } from './avatar-avatar.component';

describe('AvatarAvatarComponent', () => {
  let component: AvatarAvatarComponent;
  let fixture: ComponentFixture<AvatarAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarAvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
