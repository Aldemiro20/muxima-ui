import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimelineTimelineComponent } from './timeline-timeline.component';

describe('TimelineTimelineComponent', () => {
  let component: TimelineTimelineComponent;
  let fixture: ComponentFixture<TimelineTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineTimelineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
