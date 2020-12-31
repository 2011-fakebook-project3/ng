import { CommonModule, Location } from '@angular/common';
import { ComponentFixture, TestBed, inject, async, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarViewComponent } from './navbar-view.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

describe('NavbarViewComponent', () => {

  let component: NavbarViewComponent;
  let fixture: ComponentFixture<NavbarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ {provider: Router, useValue: routerSpy } ]
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



});
