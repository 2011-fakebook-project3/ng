import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/authentication/core/authentication/auth.service';

@Component({
  selector: 'app-navbar-view',
  templateUrl: './navbar-view.component.html',
  styleUrls: ['./navbar-view.component.css'],
})
export class NavbarViewComponent implements OnInit {
  isAuthenticated = false;

  searchName = '';
  constructor(private router: Router, public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.authNavStatus$.subscribe((authState: boolean) => {
      this.isAuthenticated = authState;
    });
  }

  login(): void {
    this.auth.login();
  }
  logout(): void {
    this.auth.signout();
  }
  onNotifySearch(name: any): void {
    console.log(name);
    this.router.navigate([`search/${name}`], { skipLocationChange: false });
  }
}
