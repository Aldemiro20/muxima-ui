import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { ChartData } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  const mockChartData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [{
      label: 'Test Data',
      data: [10, 20, 30],
      backgroundColor: '#667eea'
    }]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.data = mockChartData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render canvas element', () => {
    const compiled = fixture.nativeElement;
    const canvas = compiled.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });

  it('should display chart title when provided', () => {
    component.title = 'Test Chart';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const title = compiled.querySelector('.chart-title');
    expect(title?.textContent).toContain('Test Chart');
  });

  it('should apply size class correctly', () => {
    component.size = 'lg';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const container = compiled.querySelector('.chart-container');
    expect(container?.classList.contains('lg')).toBeTruthy();
  });

  it('should render legend with correct labels', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const legendItems = compiled.querySelectorAll('.legend-item');
    expect(legendItems.length).toBeGreaterThan(0);
  });

  it('should draw line chart when type is line', () => {
    component.type = 'line';
    component.data = mockChartData;
    fixture.detectChanges();
    expect(component.type).toBe('line');
  });

  it('should draw bar chart when type is bar', () => {
    component.type = 'bar';
    component.data = mockChartData;
    fixture.detectChanges();
    expect(component.type).toBe('bar');
  });

  it('should draw pie chart when type is pie', () => {
    component.type = 'pie';
    component.data = mockChartData;
    fixture.detectChanges();
    expect(component.type).toBe('pie');
  });

  it('should draw donut chart when type is donut', () => {
    component.type = 'donut';
    component.data = mockChartData;
    fixture.detectChanges();
    expect(component.type).toBe('donut');
  });

  it('should animate chart when animated is true', () => {
    component.animated = true;
    component.data = mockChartData;
    fixture.detectChanges();
    expect(component.animated).toBeTrue();
  });

  it('should handle multiple datasets', () => {
    const multiDataset: ChartData = {
      labels: ['A', 'B', 'C'],
      datasets: [
        { label: 'Series 1', data: [1, 2, 3] },
        { label: 'Series 2', data: [4, 5, 6] }
      ]
    };
    component.data = multiDataset;
    fixture.detectChanges();
    expect(component.data.datasets.length).toBe(2);
  });
});
