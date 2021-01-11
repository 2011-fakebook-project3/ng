import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { OktaAuthService } from '@okta/okta-angular';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar-view',
  templateUrl: './navbar-view.component.html',
  styleUrls: ['./navbar-view.component.css']
})
export class NavbarViewComponent implements OnInit {
  isAuthenticated = false;

  searchName = '';
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

  }

  login(): void {
    console.log('login');
    this.authService.login();
  }
  logout(): void {
    console.log('logout');
    this.authService.logout();
  }

  onNotifySearch(name: any): void{
    console.log(name);
    this.router.navigate([`search/${name}`], { skipLocationChange: false });
  }
}
