import { ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationBehaviorOptions , Router } from '@angular/router';
import { NEVER } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { MainViewComponent } from './main-view.component';

describe('MainViewComponent', () => {
  let component: MainViewComponent;
  let fixture: ComponentFixture<MainViewComponent>;
  let navigateSpy: any;
  let isAuth: boolean;

  const FakeAuthService = {
    get isAuthenticated(): boolean {
      return false;
    }
  };

  const FakeRouterService = {
    navigateByUrl(url: string, extras?: NavigationBehaviorOptions): Promise<boolean> { return Promise.resolve(true); }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainViewComponent ],
      providers: [
        { provide: AuthService, useValue: FakeAuthService},
        { provide: Router, useValue: FakeRouterService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainViewComponent);
    fixture.detectChanges();

    component = new MainViewComponent(TestBed.inject(AuthService), TestBed.inject(Router));
    navigateSpy = spyOn(FakeRouterService, 'navigateByUrl');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
////////////
  it('should not route if user is not logged in (default value)', () => {
    const spy = spyOnProperty(FakeAuthService, 'isAuthenticated', 'get');

    expect(navigateSpy).toHaveBeenCalledTimes(0);
  });

  it('should route if user is logged in', () => {
    const authSpy = spyOnProperty(FakeAuthService, 'isAuthenticated', 'get');

    const args = navigateSpy.calls.first().args[0];

    expect(args).toBe('newsfeed');
  });
/////////
  it('should create the exepcted elements on the page', () => {
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(h1.innerHTML).toBe('Welcome to Fakebook! Please sign in.');

    const p = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(p.innerHTML).toBe('Come talk to all the great people enjoying this wonderful site');
  });
});