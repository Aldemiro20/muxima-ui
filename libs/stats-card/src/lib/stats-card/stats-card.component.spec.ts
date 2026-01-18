import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsCardComponent } from './stats-card.component';

describe('StatsCardComponent', () => {
  let component: StatsCardComponent;
  let fixture: ComponentFixture<StatsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StatsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label and value', () => {
    component.label = 'Total Revenue';
    component.value = '$45,231';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.stats-label').textContent).toContain('Total Revenue');
    expect(compiled.querySelector('.stats-value').textContent).toContain('$45,231');
  });

  it('should show trend direction correctly', () => {
    component.trend = 12.5;
    expect(component.trendDirection).toBe('up');

    component.trend = -5.3;
    expect(component.trendDirection).toBe('down');

    component.trend = 0;
    expect(component.trendDirection).toBe('neutral');
  });

  it('should generate sparkline path', () => {
    component.sparklineData = [10, 20, 15, 25, 30];
    const path = component.getSparklinePath();
    expect(path).toBeTruthy();
    expect(path).toContain('M');
    expect(path).toContain('L');
  });
});
