import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentViewerComponent } from './document-viewer.component';

describe('DocumentViewerComponent', () => {
  let component: DocumentViewerComponent;
  let fixture: ComponentFixture<DocumentViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentViewerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select first document on init', () => {
    component.documents = [
      { name: 'Test.pdf', type: 'pdf', url: 'test.pdf' }
    ];
    component.ngOnInit();
    expect(component.currentDocument).toBeTruthy();
  });

  it('should navigate between documents', () => {
    component.documents = [
      { name: 'Doc1.pdf', type: 'pdf', url: 'doc1.pdf' },
      { name: 'Doc2.pdf', type: 'pdf', url: 'doc2.pdf' }
    ];
    component.ngOnInit();
    expect(component.currentIndex).toBe(0);
    
    component.nextDocument();
    expect(component.currentIndex).toBe(1);
    
    component.previousDocument();
    expect(component.currentIndex).toBe(0);
  });

  it('should handle zoom levels', () => {
    component.setZoom('150');
    expect(component.zoomLevel).toBe('150');
  });
});
