import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsService } from '../../services/notifications.service';
import { Notification } from '../../model/notification';

import { NotificationsViewComponent } from './notifications-view.component';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authentication/core/authentication/auth.service';

describe('NotificationsViewComponent', () => {
  let component: NotificationsViewComponent;
  let fixture: ComponentFixture<NotificationsViewComponent>;

  beforeEach(async () => {
    const mockAuthService = {
      getAccessToken(): string {
        return 'token';
      },
    };

    const mockNotifservice = {
      notificationsObs: new Observable<Notification>(),

      setRead(): void {},
    };

    await TestBed.configureTestingModule({
      declarations: [NotificationsViewComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: NotificationsService, useValue: mockNotifservice },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsViewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a toggleable notifications view', () => {
    expect(component.notificationsView).toBeFalse();
    component.toggleNotifications();
    expect(component.notificationsView).toBeTrue();
    component.toggleNotifications();
    expect(component.notificationsView).toBeFalse();
  });
});
