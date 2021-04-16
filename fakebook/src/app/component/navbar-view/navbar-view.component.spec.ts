import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NEVER } from 'rxjs';
import { AuthService } from 'src/app/authentication/core/authentication/auth.service';

import { NavbarViewComponent } from './navbar-view.component';

describe('NavbarViewComponent', () => {
  let component: NavbarViewComponent;
  let fixture: ComponentFixture<NavbarViewComponent>;

  beforeEach(async () => {
    const mockAuthService = {
      authNavStatus$: NEVER,
      isAuthenticated(): boolean {
        return false;
      },
      login(): void {},
      signout(): void {},
    };

    await TestBed.configureTestingModule({
      declarations: [NavbarViewComponent],
      providers: [
        { provide: Router, useValue: {} },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have authentication be false', () => {
    expect(component.isAuthenticated).toBe(false);
  });

  it('should call login', () => {
    spyOn(component.auth, 'login');
    component.login();

    expect(component.auth.login).toHaveBeenCalled();
  });

  it('should call signout', () => {
    spyOn(component.auth, 'signout');
    component.logout();

    expect(component.auth.signout).toHaveBeenCalled();
  });

  it('should have a empty search name', () => {
    expect(component.searchName).toBe('');
  });
});
