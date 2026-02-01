import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { FormsModule } from '@angular/forms';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event on input change', (done) => {
    component.search.subscribe((query: string) => {
      expect(query).toBe('test');
      done();
    });

    component.searchValue = 'test';
    component.onInputChange();
  });

  it('should clear search value', () => {
    component.searchValue = 'test query';
    component.clearSearch();
    expect(component.searchValue).toBe('');
    expect(component.showSuggestions).toBe(false);
  });

  it('should handle keyboard navigation', () => {
    component.suggestions = [
      { id: '1', text: 'Item 1' },
      { id: '2', text: 'Item 2' },
      { id: '3', text: 'Item 3' }
    ];
    component.showSuggestions = true;
    component.selectedIndex = -1;

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    component.onKeyDown(event);
    expect(component.selectedIndex).toBe(0);

    component.onKeyDown(event);
    expect(component.selectedIndex).toBe(1);
  });
});
