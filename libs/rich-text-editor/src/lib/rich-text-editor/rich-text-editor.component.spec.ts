import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RichTextEditorComponent } from './rich-text-editor.component';

describe('RichTextEditorComponent', () => {
  let component: RichTextEditorComponent;
  let fixture: ComponentFixture<RichTextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichTextEditorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RichTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default placeholder', () => {
    expect(component.placeholder).toBe('Write something...');
  });

  it('should have default height', () => {
    expect(component.height).toBe('300px');
  });

  it('should show toolbar by default', () => {
    expect(component.showToolbar).toBeTruthy();
  });

  it('should emit editorCreated event', (done) => {
    component.editorCreated.subscribe(event => {
      expect(event).toBeDefined();
      done();
    });
    component.ngAfterViewInit();
  });

  it('should implement ControlValueAccessor methods', () => {
    const fn = jasmine.createSpy('onChange');
    component.registerOnChange(fn);
    expect(component['onChange']).toBe(fn);
  });

  it('should handle disabled state', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBeTruthy();
  });
});
