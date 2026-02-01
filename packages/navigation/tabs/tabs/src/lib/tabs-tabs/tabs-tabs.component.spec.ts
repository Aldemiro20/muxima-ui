import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsTabsComponent } from './tabs-tabs.component';

describe('TabsTabsComponent', () => {
  let component: TabsTabsComponent;
  let fixture: ComponentFixture<TabsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
