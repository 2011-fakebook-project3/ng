import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsService } from '../../service/notifications.service';
import { Type } from '@angular/core';
import { Notification } from '../../model/notification';

import { NotificationsViewComponent } from './notifications-view.component';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../service/auth.service';
import { OktaAuthService } from '@okta/okta-angular';
import { NEVER, Observable } from 'rxjs';

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
