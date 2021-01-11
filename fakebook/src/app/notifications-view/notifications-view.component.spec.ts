import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsService } from '../service/notifications.service';
import { Type } from '@angular/core';
import { Notification } from '../model/notification';

import { NotificationsViewComponent } from './notifications-view.component';
import { environment } from 'src/environments/environment';

describe('NotificationsViewComponent', () => {
  let component: NotificationsViewComponent;
  let fixture: ComponentFixture<NotificationsViewComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ NotificationsViewComponent ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsViewComponent);
    component = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a list of notifications', (done) => {
    const testNotifications: Notification[] = [
      { userId: 1, postId: 1, type: 'Like', date: new Date() },
      { userId: 2, postId: 2, type: 'Comment', date: new Date() },
      { userId: 3, type: 'Follow', date: new Date() },
      { userId: 4, postId: 3, type: 'Post', date: new Date() },
    ];

    component.getNotifications();
    const req = httpMock.expectOne(`${environment.baseUrl}/notifications`);
    req.flush(testNotifications);

    expect(req.request.method).toBe('GET');
    expect(component.notifications).toBe(testNotifications);
    done();
  });

});
