import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NavbarViewComponent } from './navbar-view.component';

describe('NavbarViewComponent', () => {
  let component: NavbarViewComponent;
  let fixture: ComponentFixture<NavbarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarViewComponent ],
      providers: [
        {provide: Router, useValue: {}}
      ]
    })
    .compileComponents();
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
    spyOn(console, 'log');
    component.login();

    expect(console.log).toHaveBeenCalled();
  });

  it('should call logout', () => {
    spyOn(console, 'log');
    component.logout();

    expect(console.log).toHaveBeenCalled();
  });

  it('should have a empty search name', () => {
    expect(component.searchName).toBe('');
  });
});
