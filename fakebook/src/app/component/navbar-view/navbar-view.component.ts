import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar-view',
  templateUrl: './navbar-view.component.html',
  styleUrls: ['./navbar-view.component.css'],
})
export class NavbarViewComponent implements OnInit {
  isAuthenticated = false;

  searchName = '';
  constructor(private router: Router, public oktaAuth: AuthService) {}

  ngOnInit(): void {
    this.oktaAuth.subscribeAuthStateChange((authState: boolean) => {
      this.isAuthenticated = authState;
    });
  }

  login(): void {
    this.oktaAuth.login();
  }
  logout(): void {
    this.oktaAuth.logout();
  }
  onNotifySearch(name: any): void {
    console.log(name);
    this.router.navigate([`search/${name}`], { skipLocationChange: false });
  }
}
