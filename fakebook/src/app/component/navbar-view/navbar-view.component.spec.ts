// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { NEVER } from 'rxjs';

// import { NavbarViewComponent } from './navbar-view.component';

// describe('NavbarViewComponent', () => {
//   let component: NavbarViewComponent;
//   let fixture: ComponentFixture<NavbarViewComponent>;

//   beforeEach(async () => {
//     const mockOktaAuthService = {
//       $authenticationState: NEVER,
//       isAuthenticated(): Promise<boolean> {
//         return Promise.resolve(false);
//       },
//       signInWithRedirect(): void {},
//       subscribeAuthStateChange(): void {},
//       login(): void {},
//       logout(): void {},
//       signOut(): void {},
//       tokenManager: {
//         clear(): void {},
//       },
//     };

//     await TestBed.configureTestingModule({
//       declarations: [NavbarViewComponent],
//       providers: [
//         { provide: Router, useValue: {} },
//         { provide: AuthService, useValue: mockOktaAuthService },
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(NavbarViewComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should have authentication be false', () => {
//     expect(component.isAuthenticated).toBe(false);
//   });

//   it('should call login', () => {
//     spyOn(component.oktaAuth, 'login');
//     component.login();

//     expect(component.oktaAuth.login).toHaveBeenCalled();
//   });

//   it('should call logout', () => {
//     spyOn(component.oktaAuth, 'logout');
//     component.logout();

//     expect(component.oktaAuth.logout).toHaveBeenCalled();
//   });

//   it('should have a empty search name', () => {
//     expect(component.searchName).toBe('');
//   });
// });
