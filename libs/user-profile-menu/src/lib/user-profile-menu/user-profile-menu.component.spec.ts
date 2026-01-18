import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileMenuComponent } from './user-profile-menu.component';

describe('UserProfileMenuComponent', () => {
  let component: UserProfileMenuComponent;
  let fixture: ComponentFixture<UserProfileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileMenuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileMenuComponent);
    component = fixture.componentInstance;
    component.user = {
      name: 'John Doe',
      email: 'john@example.com'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate initials from user name', () => {
    component.user = { name: 'John Doe', email: 'john@example.com' };
    expect(component.getInitials()).toBe('JD');

    component.user = { name: 'Jane Smith Johnson', email: 'jane@example.com' };
    expect(component.getInitials()).toBe('JS');
  });

  it('should toggle menu', () => {
    expect(component.isOpen).toBe(false);
    component.toggleMenu();
    expect(component.isOpen).toBe(true);
    component.toggleMenu();
    expect(component.isOpen).toBe(false);
  });

  it('should emit event on menu item click', (done) => {
    const menuItem = { id: 'profile', label: 'Profile', icon: '👤' };
    
    component.menuItemClick.subscribe((item) => {
      expect(item).toEqual(menuItem);
      done();
    });

    component.onItemClick(menuItem);
  });

  it('should close menu on item click', () => {
    component.isOpen = true;
    const menuItem = { id: 'profile', label: 'Profile', icon: '👤' };
    component.onItemClick(menuItem);
    expect(component.isOpen).toBe(false);
  });
});
