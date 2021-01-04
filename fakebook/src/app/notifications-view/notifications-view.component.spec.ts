import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsViewComponent } from './notifications-view.component';

describe('NotificationsViewComponent', () => {
  let component: NotificationsViewComponent;
  let fixture: ComponentFixture<NotificationsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a list of notifications', (done) => {

  })

  it('should dismiss notifications when viewed', (done) => {

  })

  it('should contain a link to the post or user in the notification', (done) => {

  })

});
