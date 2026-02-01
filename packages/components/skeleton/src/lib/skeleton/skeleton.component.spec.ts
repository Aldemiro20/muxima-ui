import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
  let component: SkeletonComponent;
  let fixture: ComponentFixture<SkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default shape as rectangle', () => {
    expect(component.shape).toBe('rectangle');
  });

  it('should have default animation as pulse', () => {
    expect(component.animation).toBe('pulse');
  });

  it('should return correct animation class', () => {
    component.animation = 'wave';
    expect(component.animationClass).toBe('skeleton-wave');
  });

  it('should return circle style for circle shape', () => {
    component.shape = 'circle';
    component.size = 'md';
    const style = component.skeletonStyle;
    expect(style.borderRadius).toBe('50%');
    expect(style.width).toBe('48px');
    expect(style.height).toBe('48px');
  });

  it('should return avatar style', () => {
    component.shape = 'avatar';
    component.size = 'lg';
    const style = component.skeletonStyle;
    expect(style.borderRadius).toBe('50%');
    expect(style.width).toBe('64px');
  });

  it('should generate correct count array', () => {
    component.count = 5;
    expect(component.countArray.length).toBe(5);
  });

  it('should use custom width and height', () => {
    component.width = '200px';
    component.height = '50px';
    const style = component.skeletonStyle;
    expect(style.width).toBe('200px');
    expect(style.height).toBe('50px');
  });
});
