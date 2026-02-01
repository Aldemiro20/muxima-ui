import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeBadgeComponent } from './badge-badge.component';

describe('BadgeBadgeComponent', () => {
  let component: BadgeBadgeComponent;
  let fixture: ComponentFixture<BadgeBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
